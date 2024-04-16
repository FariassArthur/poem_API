import pool from "../db/conn";

const jwtSecret = process.env.JWT_SECRET || "";

//import
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//model
import UserModel from "../models/UserModel";
import { ResolveFnOutput } from "module";

// Generate user token
const generateToken = (id: number) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

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

  static async takeId(req: Request, res: Response) {
    const name = req.body.name;

    try {
      const id = await UserModel.takeIdUser(name);
      res.status(200).json({ id });
    } catch (err) {
      res.status(500).json({
        message: "Erro ao tentar receber id",
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
      const id = await UserModel.takeIdUser(name);

      await UserModel.createUser({
        nome: name,
        email: email,
        senha: passwordHashed,
      });

      res.status(201).json({
        message: "Usuário criado",
        id_user: id,
        token: generateToken(id),
      });
    } catch (err) {
      res
        .status(404)
        .json({ message: "Não foi possível criar o usuário", error: err });
    }
  }

  static async takeUser(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const user = await UserModel.takeOneUser(id);

      res.status(200).json({ user });
    } catch (err) {
      res
        .status(404)
        .json({ message: "Não foi possível listar os usuários", error: err });
    }
  }

  static async userAtt(req: Request & {user: {id: number}}, res: Response) {
    const id = req.user.id;
    const name = req.body.name; // corrigindo para req.body.nome
    const email = req.body.email; // corrigindo para req.body.email
    const password = req.body.password; // corrigindo para req.body.senha
  
    try {
      const user = await UserModel.takeOneUser(id.toString());

      const salt = process.env.BCRYPT_SALT || "";

      const passwordHashed = await bcrypt.hash(password, parseInt(salt));
  
      if (!user) {
        return res.status(404).json({
          message: "O usuário solicitado não foi encontrado no servidor",
        });
      }
  
      await UserModel.UpdateUser(id.toString(), name, email, passwordHashed);
  
      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (err) {
      res
        .status(404)
        .json({ message: "Não foi possível atualizar o usuário", error: err });
    }
  }
  

  static async userLogin(req: Request, res: Response) {
    const password = req.body.password;
    const email = req.body.email;

    try {
      const user = await UserModel.takeOneUser("", email);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.senha);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
        expiresIn: "7d",
      });

      res.status(200).json({ message: "Login bem-sucedido", token });
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      res.status(500).json({ message: "Erro ao fazer login", error: err });
    }
  }
}
