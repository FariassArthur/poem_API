import pool from "../db/conn";

interface poems {
  id?: number;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
}

export default class PoemModel {
  static async checkAndCreateTable(): Promise<void> {
    try {
      const client = await pool.connect();

      //verifica se  a tabela existe
      const tableExistsQuery = await client.query(
        `SELECT to_regclass('public.poems')`
      );
      const tableExists = tableExistsQuery.rows[0].to_regclass !== null;

      if (!tableExists) {
        await client
          .query(
            `
        CREATE TABLE poems (
            id SERIAL PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            content TEXT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            userId INTEGER REFERENCES public.usuarios(id)
        )
        `
          )
          .then(() => console.log("Tabela poems inserida"))
          .catch((err) =>
            console.error(`Erro na criação ta tabela poems: ${err}`)
          );
      } else {
        console.log("Tabela poems já existe");
      }

      client.release();
    } catch (err) {
      console.error(`Erro ao verificar ou criar tabela poems: ${err}`);
      throw err
    }
  }
}
