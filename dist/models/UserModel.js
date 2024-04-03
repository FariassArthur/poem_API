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
const checkAndCreateTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield (0, conn_1.default)();
    let exists;
    try {
        const result = yield client.query(`SELECT EXISTS (
             SELECT FROM information_schema.tables 
             WHERE table_name = 'usuarios'
           )`);
        exists = result.rows[0].exists;
    }
    catch (error) {
        throw error;
    }
});
