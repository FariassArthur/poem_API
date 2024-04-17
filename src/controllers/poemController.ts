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

  static async poemCreate(req: Request, res: Response) {
    const user = req.user

    if (!user || user.id === undefined) {
      return res.status(400).json({ message: "ID do usuário não fornecido" });
    }

    const id = user.id
    const title = req.body.title
    const content = req.body.content
    const image = req.body.image

    try {
      if(image) {
        await PoemModel.create(id, title, content, image)

      } else {
        await PoemModel.create( id, title, content)
      }
      
      res.status(201).json({message: "Poema criado com sucesso"})
    } catch (err) {
      res.status(400).json({message: "não foi possível criar o poema", error: err})
    }
  }

  static async takeUserPoems(req: Request, res: Response){
    const user = req.user

    if (!user || user.id === undefined) {
      return res.status(400).json({ message: "ID do usuário não fornecido" });
    }

    try {
      const data = await PoemModel.userPoems(user.id)
      res.status(200).json({data})
    } catch (err) {
      res.status(404).json({message: "Poema não encontrado", error: err})
    }
  }
}
