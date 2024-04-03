"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
// Função para obter um cliente do pool
function getClient() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        return client;
    });
}
exports.default = getClient;
