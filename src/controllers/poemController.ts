import pool from "../db/conn";

//import
import { Request, Response } from "express";

//model
import PoemModel from "../models/PoemModel";

export default class PoemController {
  static async checkAndCreateTablePoem(req: Request, res: Response) {
    try {
      await PoemModel.checkAndCreateTable();
      res.send("Tabela de usuários verificada ou criada com sucesso.");
    } catch (err) {
      console.error("Erro ao verificar/criar tabela de poems:", err);
      res.status(500).send("Erro ao verificar/criar tabela de usuários.");
    }
  }
}
