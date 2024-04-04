import pool from "../db/conn";

//import
import { Request, Response } from "express";

//model
import PoemModel from "../models/PoemModel";

export default class PoemController {
  static async checkAndCreateTablePoem(req: Request, res: Response) {
    try {
      const newTablePoem = await PoemModel.checkAndCreateTable();
      res.status(201).json({ message: "Tabela poemas criada/verificada com sucesso" });
    } catch (err) {
      console.error("Erro ao verificar/criar tabela de poems:", err);
      res
        .status(500)
        .json({ message: "Erro ao verificar/criar tabela de poemas." });
    }
  }
}
