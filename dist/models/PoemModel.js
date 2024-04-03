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
}
exports.default = PoemModel;
