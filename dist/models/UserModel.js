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
    static takeIdUser(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                const codeQuery = `SELECT id FROM users WHERE name = $1`; // Corrigindo para "name"
                const values = [name];
                const data = yield client.query(codeQuery, values);
                client.release();
                if (data.rows.length === 0) {
                    // Se nenhum usuário for encontrado com o name especificado, retorne null ou outro valor adequado
                    return null;
                }
                // Retorne o ID do usuário encontrado
                return data.rows[0].id;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static checkAndCreateTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                // Verifica se a tabela já existe
                const tableExistsQuery = yield client.query(`SELECT to_regclass('public.users')`);
                const tableExists = tableExistsQuery.rows[0].to_regclass !== null;
                if (!tableExists) {
                    // Cria a tabela se ela não existir
                    yield client.query(`
          CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            admin BOOLEAN DEFAULT FALSE
          )
        `);
                    console.log("Tabela users criada com sucesso.");
                }
                else {
                    console.log("Tabela users já existe.");
                }
                client.release();
            }
            catch (error) {
                console.error("Erro ao verificar/criar tabela users:", error);
                throw error; // Propaga o erro para o controlador para tratamento adequado
            }
        });
    }
    static takeUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                const codeQuery = `SELECT * FROM users`;
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
                const codeQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;
                const values = [user.name, user.email, user.password];
                yield client.query(codeQuery, values);
                client.release();
            }
            catch (err) {
                throw err;
            }
        });
    }
    static takeOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                let codeQuery;
                let values;
                codeQuery = `SELECT * FROM users WHERE id = $1`;
                values = [id];
                const result = yield client.query(codeQuery, values);
                client.release();
                if (result.rows.length === 0) {
                    return null; // Retorna null se nenhum usuário for encontrado
                }
                // Retorna o primeiro usuário encontrado
                return result.rows[0];
            }
            catch (err) {
                throw err;
            }
        });
    }
    static takeOneUserEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                let codeQuery;
                let values;
                codeQuery = `SELECT * FROM users WHERE email = $1`;
                values = [email];
                const result = yield client.query(codeQuery, values);
                client.release();
                if (result.rows.length === 0) {
                    return null; // Retorna null se nenhum usuário for encontrado
                }
                // Retorna o primeiro usuário encontrado
                return result.rows[0];
            }
            catch (err) {
                throw err;
            }
        });
    }
    static UpdateUser(id, name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                let codeQuery = `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`;
                let values = [name, email, password, id];
                yield client.query(codeQuery, values);
                client.release();
            }
            catch (err) {
                throw err;
            }
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                let codeQuery = `DELETE FROM users WHERE id = $1`;
                let values = [id];
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
