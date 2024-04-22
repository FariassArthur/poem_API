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
class PoemModel {
    static checkAndCreateTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                //verifica se  a tabela existe
                const tableExistsQuery = yield client.query(`SELECT to_regclass('public.poems')`);
                const tableExists = tableExistsQuery.rows[0].to_regclass !== null;
                if (!tableExists) {
                    yield client
                        .query(`
        CREATE TABLE poems (
            id SERIAL PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            content TEXT NOT NULL,
            image_url VARCHAR(255),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            userId INTEGER REFERENCES public.usuarios(id)
        )
        `)
                        .then(() => console.log("Tabela poems inserida"))
                        .catch((err) => console.error(`Erro na criação ta tabela poems: ${err}`));
                }
                else {
                    console.log("Tabela poems já existe");
                }
                client.release();
            }
            catch (err) {
                console.error(`Erro ao verificar ou criar tabela poems: ${err}`);
                throw err;
            }
        });
    }
    static checkAndCreateTableLikes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                // Verifica se a tabela likes existe
                const tableLikesExistsQuery = yield client.query(`SELECT to_regclass('public.likes')`);
                const tableLikesExists = tableLikesExistsQuery.rows[0].to_regclass !== null;
                // Cria a tabela likes se não existir
                if (!tableLikesExists) {
                    yield client.query(`
        CREATE TABLE likes (
            id SERIAL PRIMARY KEY,
            poem_id INTEGER NOT NULL REFERENCES poems(id),
            user_id INTEGER NOT NULL REFERENCES usuarios(id),
            UNIQUE(poem_id, user_id)
        )
        `);
                    console.log("Tabela likes inserida");
                }
                else {
                    console.log("Tabela likes já existe");
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    static create(userId, title, content, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                let codeQuery;
                let values;
                if (image) {
                    codeQuery = `INSERT INTO poems (title, content, userid, image_url) VALUES ($1, $2, $3, $4)`;
                    values = [title, content, userId, image];
                }
                else {
                    codeQuery = `INSERT INTO poems (title, content, userid) VALUES ($1, $2, $3)`;
                    values = [title, content, userId];
                }
                yield client.query(codeQuery, values);
                client.release();
            }
            catch (err) {
                throw err;
            }
        });
    }
    static userPoems(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                const codeQuery = `SELECT * FROM poems WHERE userid = $1`;
                const values = [id];
                const data = yield client.query(codeQuery, values);
                return data.rows;
                client.release();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                const codeQuery = `DELETE FROM poems WHERE id = $1`;
                const values = [id];
                yield client.query(codeQuery, values);
                client.release();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                const codeQuery = `SELECT * FROM poems WHERE id = $1`;
                const values = [id];
                const data = yield client.query(codeQuery, values);
                client.release();
                return data.rows[0];
            }
            catch (err) {
                throw err;
            }
        });
    }
    static updatePoem(id, title, content, image_url) {
        return __awaiter(this, void 0, void 0, function* () {
            let codeQuery;
            let values;
            try {
                const client = yield conn_1.default.connect();
                if (image_url) {
                    codeQuery = `UPDATE poems SET title = $1, content = $2, image_url = $3 WHERE id = $4`;
                    values = [title, content, image_url, id];
                }
                else {
                    codeQuery = `UPDATE poems SET title = $1, content = $2 WHERE id = $3`;
                    values = [title, content, id];
                }
                yield client.query(codeQuery, values);
                client.release();
            }
            catch (err) {
                throw err;
            }
        });
    }
    static like(poemId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                // Verificar se o usuário já deu like neste poema
                const existingLikeQuery = yield client.query(`SELECT id FROM likes WHERE poem_id = $1 AND user_id = $2`, [poemId, userId]);
                // Se já existir um like para este usuário e poema, retorne uma mensagem informando que o usuário já deu like
                if (existingLikeQuery.rows.length > 0) {
                    client.release();
                    return "Usuário já deu like neste poema";
                }
                // Caso contrário, insira um novo like na tabela
                yield client.query(`INSERT INTO likes (poem_id, user_id) VALUES ($1, $2)`, [poemId, userId]);
                client.release();
                return "Like adicionado com sucesso";
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getLikes(poemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield conn_1.default.connect();
                // Consulta para contar o número de likes para o poema específico
                const likesCountQuery = yield client.query(`SELECT COUNT(*) FROM likes WHERE poem_id = $1`, [poemId]);
                // Extrair o resultado da consulta
                const likesCount = parseInt(likesCountQuery.rows[0].count);
                client.release();
                return likesCount;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = PoemModel;
