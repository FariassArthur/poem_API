import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASS,
  port: 5432,
});

pool.connect().then(client => {
  console.log("Conectado ao banco de dados PostgreSQL");
}).catch(err => {
  console.error("Erro ao conectar ao banco de dados:", err);
});

export default pool;
