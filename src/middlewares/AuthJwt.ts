import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secretKey = process.env.JWT_SECRET || "";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403).json({message: "Usuário não tem permissão"});
      }
      req.user = decoded as JwtPayload;
      next();
    });
  } else {
    res.status(401).json({ message: "Autenticação do token falhou" });
  }
};
