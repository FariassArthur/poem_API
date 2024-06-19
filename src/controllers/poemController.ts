import pool from "../db/conn";

//import
import { Request, Response } from "express";

//model
import PoemModel from "../models/PoemModel";

export default class PoemController {
  static async checkAndCreateTablePoem(req: Request, res: Response) {
    try {
      await PoemModel.checkAndCreateTable();
      res
        .status(201)
        .json({ message: "Tabela poemas criada/verificada com sucesso" });
    } catch (err) {
      console.error("Erro ao verificar/criar tabela de poems:", err);
      res
        .status(500)
        .json({ message: "Erro ao verificar/criar tabela de poemas." });
    }
  }

  static async checkAndCreateTableLikes(req: Request, res: Response) {
    try {
      await PoemModel.checkAndCreateTableLikes();
      res
        .status(201)
        .json({ message: "Tabela likes criada/verificada com sucesso" });
    } catch (err) {
      console.error("Erro ao verificar/criar tabela de poems:", err);
      res
        .status(500)
        .json({ message: "Erro ao verificar/criar tabela de poemas." });
    }
  }

  static async poemCreate(req: Request, res: Response) {
    const user = req.user;

    if (!user || user.id === undefined) {
      return res.status(400).json({ message: "ID do usuário não fornecido" });
    }

    const id = user.id;
    const title = req.body.title;
    const content = req.body.content;
    const image = req.body.image;

    try {
      if (image) {
        await PoemModel.create(id, title, content, image);
      } else {
        await PoemModel.create(id, title, content);
      }

      res.status(201).json({ message: "Poema criado com sucesso" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "não foi possível criar o poema", error: err });
    }
  }

  static async takePoems(req: Request, res: Response) {
    try {
      const data = await PoemModel.takePoemsMod()

      res.status(200).json({data})
    } catch (err) {
      res.status(404).json({message: "Não foi possível trazer os textos", error: err})
    }
  }

  static async takeUserPoems(req: Request, res: Response) {
    const user = req.user;

    if (!user || user.id === undefined) {
      return res.status(400).json({ message: "ID do usuário não fornecido" });
    }

    try {
      const data = await PoemModel.userPoems(user.id);
      res.status(200).json({ data });
    } catch (err) {
      res.status(404).json({ message: "Poema não encontrado", error: err });
    }
  }

  static async deletePoem(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      try {
        await PoemModel.delete(id.toString());
        res.status(200).json({ message: "Poema deletado" });
      } catch (err) {
        res
          .status(400)
          .json({ message: "Não foi possível deletar o poema", error: err });
      }
    } else {
      res.status(400).json({ message: "ID não foi informado" });
    }
  }

  static async takePoemId(req: Request, res: Response) {
    const id: string = req.params.id;

    if (id) {
      try {
        const data = await PoemModel.getById(id);
        res.status(200).json({ data });
      } catch (err) {
        res
          .status(404)
          .json({ message: "Não foi possível encontrar o poema", error: err });
      }
    }
  }

  static async updatePoem(req: Request, res: Response) {
    const id: string = req.body.id;
    const title: string = req.body.title;
    const content: string = req.body.content;
    const image_url: string = req.body.image_url;

    try {
      await PoemModel.updatePoem(id, title, content, image_url);
      res.status(200).json({ message: "Poema atualizado" });
    } catch (err) {
      res
        .status(404)
        .json({ message: "Não foi possível atualizar o poema", error: err });
    }
  }

  static async likePoem(req: Request, res: Response) {
    const poemid = req.params.id;
    const user = req.user;

    if (!user || user.id === undefined) {
      return res.status(400).json({ message: "ID do usuário não fornecido" });
    }

    try {
      await PoemModel.like(poemid, user.id);
      res.status(200).json({ message: "Poema recebeu o like" });
    } catch (err) {
      res
        .status(404)
        .json({ message: "Não foi possível dar like no poema", error: err });
    }
  }

  static async numberOfLikes(req: Request, res: Response) {
    const id = req.params.id

    try {
      const data = await PoemModel.getLikes(id)
      res.status(200).json({data})
    } catch (err) {
      res
        .status(404)
        .json({ message: "Não foi possível receber o poema", error: err });
    }
  }
}
