import pool from "../db/conn";

//import
import { Request, Response } from "express";

//model
import UserModel from "../models/UserModel";
import { ResolveFnOutput } from "module";

export default class UserController {
  static async checkAndCreateTable(req: Request, res: Response) {
    try {
      await UserModel.checkAndCreateTable();
      res
        .status(201)
        .json({ message: "Tabela usuários criada/verificada com sucesso" });
    } catch (err) {
      console.error("Erro ao verificar/criar tabela de usuários:", err);
      res
        .status(500)
        .json({ message: "Erro ao verificar/criar tabela de usuários." });
    }
  }

  static async takeAllUsers(req: Request, res: Response) {
    try {
      const data = await UserModel.takeUsers();

      res.status(200).json({ data });
    } catch (err) {
      res.status(404).json({ message: err });
    }
  }

  static async createUser(req: Request, res: Response) {
    res.send("funciona")
  }
}
