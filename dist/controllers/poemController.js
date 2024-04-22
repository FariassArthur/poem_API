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
const PoemModel_1 = __importDefault(require("../models/PoemModel"));
class PoemController {
    static checkAndCreateTablePoem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield PoemModel_1.default.checkAndCreateTable();
                res
                    .status(201)
                    .json({ message: "Tabela poemas criada/verificada com sucesso" });
            }
            catch (err) {
                console.error("Erro ao verificar/criar tabela de poems:", err);
                res
                    .status(500)
                    .json({ message: "Erro ao verificar/criar tabela de poemas." });
            }
        });
    }
    static checkAndCreateTableLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield PoemModel_1.default.checkAndCreateTableLikes();
                res
                    .status(201)
                    .json({ message: "Tabela likes criada/verificada com sucesso" });
            }
            catch (err) {
                console.error("Erro ao verificar/criar tabela de poems:", err);
                res
                    .status(500)
                    .json({ message: "Erro ao verificar/criar tabela de poemas." });
            }
        });
    }
    static poemCreate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!user || user.id === undefined) {
                return res.status(400).json({ message: "ID do usuário não fornecido" });
            }
            const id = user.id;
            const title = req.body.title;
            const content = req.body.content;
            const image = req.body.image;
            try {
                if (image) {
                    yield PoemModel_1.default.create(id, title, content, image);
                }
                else {
                    yield PoemModel_1.default.create(id, title, content);
                }
                res.status(201).json({ message: "Poema criado com sucesso" });
            }
            catch (err) {
                res
                    .status(400)
                    .json({ message: "não foi possível criar o poema", error: err });
            }
        });
    }
    static takeUserPoems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (!user || user.id === undefined) {
                return res.status(400).json({ message: "ID do usuário não fornecido" });
            }
            try {
                const data = yield PoemModel_1.default.userPoems(user.id);
                res.status(200).json({ data });
            }
            catch (err) {
                res.status(404).json({ message: "Poema não encontrado", error: err });
            }
        });
    }
    static deletePoem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                try {
                    yield PoemModel_1.default.delete(id.toString());
                    res.status(200).json({ message: "Poema deletado" });
                }
                catch (err) {
                    res
                        .status(400)
                        .json({ message: "Não foi possível deletar o poema", error: err });
                }
            }
            else {
                res.status(400).json({ message: "ID não foi informado" });
            }
        });
    }
    static takePoemId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                try {
                    const data = yield PoemModel_1.default.getById(id);
                    res.status(200).json({ data });
                }
                catch (err) {
                    res
                        .status(404)
                        .json({ message: "Não foi possível encontrar o poema", error: err });
                }
            }
        });
    }
    static updatePoem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const title = req.body.title;
            const content = req.body.content;
            const image_url = req.body.image_url;
            try {
                yield PoemModel_1.default.updatePoem(id, title, content, image_url);
                res.status(200).json({ message: "Poema atualizado" });
            }
            catch (err) {
                res
                    .status(404)
                    .json({ message: "Não foi possível atualizar o poema", error: err });
            }
        });
    }
    static likePoem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const poemid = req.params.id;
            const user = req.user;
            if (!user || user.id === undefined) {
                return res.status(400).json({ message: "ID do usuário não fornecido" });
            }
            try {
                yield PoemModel_1.default.like(poemid, user.id);
                res.status(200).json({ message: "Poema recebeu o like" });
            }
            catch (err) {
                res
                    .status(404)
                    .json({ message: "Não foi possível dar like no poema", error: err });
            }
        });
    }
    static numberOfLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const data = yield PoemModel_1.default.getLikes(id);
                res.status(200).json({ data });
            }
            catch (err) {
                res
                    .status(404)
                    .json({ message: "Não foi possível receber o poema", error: err });
            }
        });
    }
}
exports.default = PoemController;
