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
                res.send("Tabela de usuários verificada ou criada com sucesso.");
            }
            catch (err) {
                console.error("Erro ao verificar/criar tabela de poems:", err);
                res.status(500).send("Erro ao verificar/criar tabela de usuários.");
            }
        });
    }
}
exports.default = PoemController;
