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
const jwtSecret = process.env.JWT_SECRET || "";
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//model
const UserModel_1 = __importDefault(require("../models/UserModel"));
// Generate user token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};
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
    static takeId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.body.name;
            try {
                const id = yield UserModel_1.default.takeIdUser(name);
                res.status(200).json({ id });
            }
            catch (err) {
                res.status(500).json({
                    message: "Erro ao tentar receber id",
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
                    name: name,
                    email: email,
                    password: passwordHashed,
                });
                const id = yield UserModel_1.default.takeIdUser(name);
                res.status(201).json({
                    message: "Usuário criado",
                    id_user: id,
                    token: generateToken(id),
                });
            }
            catch (err) {
                res
                    .status(404)
                    .json({ message: "Não foi possível criar o usuário", error: err });
            }
        });
    }
    static takeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!user || user.id === undefined) {
                return res.status(400).json({ message: "ID do usuário não fornecido" });
            }
            const id = user.id;
            try {
                const user = yield UserModel_1.default.takeOneUser(id);
                if (user) {
                    res.status(200).json({ user });
                }
                else {
                    res
                        .status(404)
                        .json({ message: "Usuário não foi encontrado no sistema" });
                }
            }
            catch (err) {
                res
                    .status(404)
                    .json({ message: "Não foi possível listar os usuários", error: err });
            }
        });
    }
    static userAtt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verifica se id está definido
            const user = req.user;
            if (!user || user.id === undefined) {
                return res.status(400).json({ message: "ID do usuário não fornecido" });
            }
            const id = user.id;
            const name = req.body.name; // corrigindo para req.body.nome
            const email = req.body.email; // corrigindo para req.body.email
            const password = req.body.password; // corrigindo para req.body.password
            try {
                const salt = process.env.BCRYPT_SALT || "";
                const passwordHashed = yield bcrypt_1.default.hash(password, parseInt(salt));
                if (!id) {
                    return res.status(404).json({
                        message: "O usuário solicitado não foi encontrado no servidor",
                    });
                }
                const user = yield UserModel_1.default.UpdateUser(id.toString(), name, email, passwordHashed);
                res
                    .status(200)
                    .json({ message: "Usuário atualizado com sucesso", user: user });
            }
            catch (err) {
                res
                    .status(404)
                    .json({ message: "Não foi possível atualizar o usuário", error: err });
            }
        });
    }
    static userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            try {
                const user = yield UserModel_1.default.takeOneUserEmail(email);
                if (!user) {
                    return res.status(404).json({ message: "Usuário não encontrado" });
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: "Credenciais inválidas" });
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, jwtSecret, {
                    expiresIn: "7d",
                });
                res
                    .status(200)
                    .json({ message: "Login bem-sucedido", token, id: user.id });
            }
            catch (err) {
                console.error("Erro ao fazer login:", err);
                res.status(500).json({ message: "Erro ao fazer login", error: err });
            }
        });
    }
    static userDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verifica se id está definido
            const user = req.user;
            if (!user || user.id === undefined) {
                return res.status(400).json({ message: "ID do usuário não fornecido" });
            }
            const id = user.id;
            try {
                yield UserModel_1.default.deleteUser(id);
                res.status(200).json({ message: "usuário deletado" });
            }
            catch (err) {
                res
                    .status(500)
                    .json({ message: "Não foi possível deletar o usuário", error: err });
            }
        });
    }
}
exports.default = UserController;
