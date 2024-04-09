import pool from "../db/conn";

//import
import { Request, Response } from "express";
import bcrypt from "bcrypt";

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
      res.status(500).json({
        message: "Erro ao verificar/criar tabela de usuários.",
        error: err,
      });
    }
  }

  static async takeAllUsers(req: Request, res: Response) {
    try {
      const data = await UserModel.takeUsers();

      res.status(200).json({ data });
    } catch (err) {
      res
        .status(404)
        .json({ message: "Não foi possível listar os usuários", error: err });
    }
  }

  static async createUser(req: Request, res: Response) {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.password;

    try {
      const salt = process.env.BCRYPT_SALT || "";

      const passwordHashed = await bcrypt.hash(pass, parseInt(salt));

      await UserModel.createUser({
        nome: name,
        email: email,
        senha: passwordHashed,
      });
      res.status(201).json({ message: "Usuário criado" });
    } catch (err) {
      res
        .status(404)
        .json({ message: "Não foi possível criar o usuário", error: err });
    }
  }
}
