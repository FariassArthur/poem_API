import { PoolClient, Client, Pool } from "pg";

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASS,
  port: 5432,
  max: 20, // Número máximo de conexões no pool
  idleTimeoutMillis: 30000, // Tempo máximo em milissegundos que uma conexão pode ficar ociosa antes de ser fechada
  connectionTimeoutMillis: 2000, // Tempo máximo em milissegundos para estabelecer uma conexão com o banco de dados
});

// Função para obter um cliente do pool
async function getClient(): Promise<PoolClient> {
  const client = await pool.connect();
  return client;
}

export default getClient;
