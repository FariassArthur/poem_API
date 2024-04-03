"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* const checkAndCreateTable = async (): Promise<void> => {
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
}; */
