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
                res
                    .status(500)
                    .json({ message: "Erro ao verificar/criar tabela de usuários." });
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
                res.status(404).json({ message: err });
            }
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send("funciona");
        });
    }
}
exports.default = UserController;
