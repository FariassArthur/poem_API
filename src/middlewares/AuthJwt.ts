import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretKey = process.env.JWT_SECRET || ""; // Substitua por uma chave secreta real

export const authenticateJWT = (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = decoded;
      next();
    });
  } else {
    res.sendStatus(401).json({message: "Autenticação do token falhou"});
  }
};
