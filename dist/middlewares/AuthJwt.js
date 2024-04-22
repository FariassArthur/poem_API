"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.JWT_SECRET || "";
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.sendStatus(403).json({ message: "Usuário não tem permissão" });
            }
            req.user = decoded;
            next();
        });
    }
    else {
        res.status(401).json({ message: "Autenticação do token falhou" });
    }
};
exports.authenticateJWT = authenticateJWT;
