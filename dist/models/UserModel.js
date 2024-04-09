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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conn_1 = __importDefault(require("../db/conn"));
class UserModel {
    static checkAndCreateTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                // Verifica se a tabela já existe
                const tableExistsQuery = yield client.query(`SELECT to_regclass('public.usuarios')`);
                const tableExists = tableExistsQuery.rows[0].to_regclass !== null;
                if (!tableExists) {
                    // Cria a tabela se ela não existir
                    yield client.query(`
          CREATE TABLE usuarios (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            senha VARCHAR(100) NOT NULL,
            admin BOOLEAN DEFAULT FALSE
          )
        `);
                    console.log("Tabela usuarios criada com sucesso.");
                }
                else {
                    console.log("Tabela usuarios já existe.");
                }
                client.release();
            }
            catch (error) {
                console.error("Erro ao verificar/criar tabela usuarios:", error);
                throw error; // Propaga o erro para o controlador para tratamento adequado
            }
        });
    }
    static takeUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                const codeQuery = `SELECT * FROM usuarios`;
                const result = yield client.query(codeQuery);
                client.release();
                return result.rows;
            }
            catch (err) {
                console.error(`Erro na solicitação de usuários: ${err}`);
                throw err;
            }
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                const codeQuery = `INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)`;
                const values = [user.nome, user.email, user.senha];
                yield client.query(codeQuery, values);
                client.release();
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = UserModel;
