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
            image_url VARCHAR(255),
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
      throw err;
    }
  }

  static async create(
    userId: string,
    title: string,
    content: string,
    image?: string
  ) {
    try {
      const client = await pool.connect();
      let codeQuery: string;
      let values: string[];
      if (image) {
        codeQuery = `INSERT INTO poems (title, content, userid, image_url) VALUES ($1, $2, $3, $4)`;
        values = [title, content, userId, image];
      } else {
        codeQuery = `INSERT INTO poems (title, content, userid) VALUES ($1, $2, $3)`;
        values = [title, content, userId];
      }
      await client.query(codeQuery, values);
      client.release();
    } catch (err) {
      throw err;
    }
  }

  static async userPoems(id: string) {
    try {
      const client = await pool.connect()

      const codeQuery: string = `SELECT * FROM poems WHERE userid = $1`
      const values: string[] = [id]

      const data = await client.query(codeQuery, values)

      return data.rows
      client.release()
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const client = await pool.connect()

      const codeQuery: string = `DELETE FROM poems WHERE id = $1`
      const values: string[] = [id]

      await client.query(codeQuery, values)
      client.release()
    } catch (error) {
      throw error;
    }
  }
}
