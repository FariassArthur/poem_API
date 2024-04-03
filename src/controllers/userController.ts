import pool from "../db/conn";

//import
import { Request, Response } from "express";

//model
import UserModel from "../models/UserModel";

export default class UserController {
  static async checkAndCreateTable(req: Request, res: Response) {
    try {
      await UserModel.checkAndCreateTable();
      res.send("Tabela de usuários verificada ou criada com sucesso.");
    } catch (err) {
      console.error("Erro ao verificar/criar tabela de usuários:", err);
      res.status(500).send("Erro ao verificar/criar tabela de usuários.");
    }
  }
}
