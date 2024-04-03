"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
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
exports.default = pool;
