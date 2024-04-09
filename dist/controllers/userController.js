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
const bcrypt_1 = __importDefault(require("bcrypt"));
//model
const UserModel_1 = __importDefault(require("../models/UserModel"));
class UserController {
    static checkAndCreateTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserModel_1.default.checkAndCreateTable();
                res
                    .status(201)
                    .json({ message: "Tabela usuários criada/verificada com sucesso" });
            }
            catch (err) {
                console.error("Erro ao verificar/criar tabela de usuários:", err);
                res.status(500).json({
                    message: "Erro ao verificar/criar tabela de usuários.",
                    error: err,
                });
            }
        });
    }
    static takeAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserModel_1.default.takeUsers();
                res.status(200).json({ data });
            }
            catch (err) {
                res
                    .status(404)
                    .json({ message: "Não foi possível listar os usuários", error: err });
            }
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.body.name;
            const email = req.body.email;
            const pass = req.body.password;
            try {
                const salt = process.env.BCRYPT_SALT || "";
                const passwordHashed = yield bcrypt_1.default.hash(pass, parseInt(salt));
                yield UserModel_1.default.createUser({
                    nome: name,
                    email: email,
                    senha: passwordHashed,
                });
                res.status(201).json({ message: "Usuário criado" });
            }
            catch (err) {
                res
                    .status(404)
                    .json({ message: "Não foi possível criar o usuário", error: err });
            }
        });
    }
}
exports.default = UserController;
