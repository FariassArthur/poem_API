// controller.ts
import { Request, Response } from "express";
import pool from "../db/conn";
import UserModel from "../models/UserModel";

export default class UserController {
  static async checkAndCreateTable(req: Request, res: Response) {
    try {
      await UserModel.checkAndCreateTable();
      res.send("Tabela de usuários verificada ou criada com sucesso.");
    } catch (error) {
      console.error("Erro ao verificar/criar tabela de usuários:", error);
      res.status(500).send("Erro ao verificar/criar tabela de usuários.");
    }
  }
}
