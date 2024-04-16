import pool from "../db/conn";

// Modelo de usuário
interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  admin?: boolean;
}

export default class UserModel {
  static async takeIdUser(name: string) {
    try {
      const client = await pool.connect();
      const codeQuery: string = `SELECT id FROM usuarios WHERE nome = $1`; // Corrigindo para "nome"
      const values: string[] = [name];

      const data = await client.query(codeQuery, values);
      client.release();

      if (data.rows.length === 0) {
        // Se nenhum usuário for encontrado com o nome especificado, retorne null ou outro valor adequado
        return null;
      }

      // Retorne o ID do usuário encontrado
      return data.rows[0].id;
    } catch (err) {
      throw err;
    }
  }

  static async checkAndCreateTable(): Promise<void> {
    try {
      const client = await pool.connect();

      // Verifica se a tabela já existe
      const tableExistsQuery = await client.query(
        `SELECT to_regclass('public.usuarios')`
      );
      const tableExists = tableExistsQuery.rows[0].to_regclass !== null;

      if (!tableExists) {
        // Cria a tabela se ela não existir
        await client.query(`
          CREATE TABLE usuarios (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            senha VARCHAR(100) NOT NULL,
            admin BOOLEAN DEFAULT FALSE
          )
        `);
        console.log("Tabela usuarios criada com sucesso.");
      } else {
        console.log("Tabela usuarios já existe.");
      }

      client.release();
    } catch (error) {
      console.error("Erro ao verificar/criar tabela usuarios:", error);
      throw error; // Propaga o erro para o controlador para tratamento adequado
    }
  }

  static async takeUsers(): Promise<Usuario[]> {
    try {
      const client = await pool.connect();
      const codeQuery: string = `SELECT * FROM usuarios`;

      const result = await client.query(codeQuery);
      client.release();

      return result.rows;
    } catch (err) {
      console.error(`Erro na solicitação de usuários: ${err}`);
      throw err;
    }
  }

  static async createUser(user: Usuario): Promise<void> {
    try {
      const client = await pool.connect();
      const codeQuery: string = `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)`;
      const values: string[] = [user.nome, user.email, user.senha];

      await client.query(codeQuery, values);
      client.release();
    } catch (err) {
      throw err;
    }
  }

  static async takeOneUser(
    id: string,
    email?: string
  ): Promise<Usuario | null> {
    try {
      const client = await pool.connect();
      let codeQuery: string;
      let values: string[];

      if (email) {
        codeQuery = `SELECT * FROM usuarios WHERE email = $1`;
        values = [email];
      } else {
        codeQuery = `SELECT * FROM usuarios WHERE id = $1`;
        values = [id];
      }

      const result = await client.query(codeQuery, values);
      client.release();

      if (result.rows.length === 0) {
        return null; // Retorna null se nenhum usuário for encontrado
      }

      // Retorna o primeiro usuário encontrado
      return result.rows[0] as Usuario;
    } catch (err) {
      throw err;
    }
  }

  static async UpdateUser(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    try {
      const client = await pool.connect();
      let codeQuery: string = `UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4`;
      let values: string[] = [name, email, password, id];

      await client.query(codeQuery, values);
      client.release();
    } catch (err) {
      throw err;
    }
  }
}
