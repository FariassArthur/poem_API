import pool from "../db/conn";

interface poems {
  id?: number;
  title: string;
  content: string;
  like?: string;
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
            userId INTEGER REFERENCES public.users(id)
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

  static async checkAndCreateTableLikes() {
    try {
      const client = await pool.connect();

      // Verifica se a tabela likes existe
      const tableLikesExistsQuery = await client.query(
        `SELECT to_regclass('public.likes')`
      );
      const tableLikesExists =
        tableLikesExistsQuery.rows[0].to_regclass !== null;

      // Cria a tabela likes se não existir
      if (!tableLikesExists) {
        await client.query(
          `
        CREATE TABLE likes (
            id SERIAL PRIMARY KEY,
            poem_id INTEGER NOT NULL REFERENCES poems(id),
            user_id INTEGER NOT NULL REFERENCES users(id),
            UNIQUE(poem_id, user_id)
        )
        `
        );
        console.log("Tabela likes inserida");
      } else {
        console.log("Tabela likes já existe");
      }
    } catch (err) {
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

  static async takePoemsMod() {
    try {
      const client = await pool.connect();

      const codeQuery: string = `SELECT * FROM poems`;

      const data = await client.query(codeQuery);

      return data.rows;
      client.release();
    } catch (err) {
      throw err;
    }
  }

  static async userPoems(id: string) {
    try {
      const client = await pool.connect();

      const codeQuery: string = `SELECT * FROM poems WHERE userid = $1`;
      const values: string[] = [id];

      const data = await client.query(codeQuery, values);

      return data.rows;
      client.release();
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const client = await pool.connect();

      const codeQuery: string = `DELETE FROM poems WHERE id = $1`;
      const values: string[] = [id];

      await client.query(codeQuery, values);
      client.release();
    } catch (error) {
      throw error;
    }
  }

  static async getById(id: string) {
    try {
      const client = await pool.connect();

      const codeQuery: string = `SELECT * FROM poems WHERE id = $1`;
      const values: string[] = [id];

      const data = await client.query(codeQuery, values);
      client.release();
      return data.rows[0];
    } catch (err) {
      throw err;
    }
  }

  static async updatePoem(
    id: string,
    title: string,
    content: string,
    image_url: string
  ) {
    let codeQuery;
    let values;

    try {
      const client = await pool.connect();

      if (image_url) {
        codeQuery = `UPDATE poems SET title = $1, content = $2, image_url = $3 WHERE id = $4`;
        values = [title, content, image_url, id];
      } else {
        codeQuery = `UPDATE poems SET title = $1, content = $2 WHERE id = $3`;
        values = [title, content, id];
      }

      await client.query(codeQuery, values);
      client.release();
    } catch (err) {
      throw err;
    }
  }

  static async like(poemId: string, userId: string) {
    try {
      const client = await pool.connect();

      // Verificar se o usuário já deu like neste poema
      const existingLikeQuery = await client.query(
        `SELECT id FROM likes WHERE poem_id = $1 AND user_id = $2`,
        [poemId, userId]
      );

      // Se já existir um like para este usuário e poema, retorne uma mensagem informando que o usuário já deu like
      if (existingLikeQuery.rows.length > 0) {
        client.release();
        return "Usuário já deu like neste poema";
      }

      // Caso contrário, insira um novo like na tabela
      await client.query(
        `INSERT INTO likes (poem_id, user_id) VALUES ($1, $2)`,
        [poemId, userId]
      );

      client.release();
      return "Like adicionado com sucesso";
    } catch (err) {
      throw err;
    }
  }

  static async getLikes(poemId: string) {
    try {
      const client = await pool.connect();

      // Consulta para contar o número de likes para o poema específico
      const likesCountQuery = await client.query(
        `SELECT COUNT(*) FROM likes WHERE poem_id = $1`,
        [poemId]
      );

      // Extrair o resultado da consulta
      const likesCount = parseInt(likesCountQuery.rows[0].count);

      client.release();
      return likesCount;
    } catch (err) {
      throw err;
    }
  }
}
