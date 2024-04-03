"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASS,
    port: 5432,
    max: 20, // Número máximo de conexões no pool
    idleTimeoutMillis: 30000, // Tempo máximo em milissegundos que uma conexão pode ficar ociosa antes de ser fechada
    connectionTimeoutMillis: 2000, // Tempo máximo em milissegundos para estabelecer uma conexão com o banco de dados
});
pool.connect((err, client, release) => {
    if (err) {
        return console.error("Erro ao obter cliente do pool", err);
    }
    console.log("Conectado ao banco de dados PostgreSQL");
});
exports.default = pool;
