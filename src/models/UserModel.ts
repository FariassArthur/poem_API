import { PoolClient } from "pg";
import getClient from "../db/conn";

// Modelo de usuário
interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  admin?: boolean;
}

const checkAndCreateTable = async (): Promise<void> => {
  const client: PoolClient = await getClient();

  let exists;

  try {
    const result = await client.query(
      `SELECT EXISTS (
             SELECT FROM information_schema.tables 
             WHERE table_name = 'usuarios'
           )`
    );
    exists = result.rows[0].exists;
  } catch (error) {
    throw error;
  }
};
