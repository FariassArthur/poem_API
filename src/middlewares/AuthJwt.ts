import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Defina o tipo para o usuário autenticado
interface AuthenticatedUser {
  id: number;
}

// Estenda o tipo Request para adicionar a propriedade user
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

const secretKey = process.env.JWT_SECRET || "";

export const authenticateJWT = (
  req: Request & { user: AuthenticatedUser },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = decoded as AuthenticatedUser;
      next();
    });
  } else {
    res.status(401).json({ message: "Autenticação do token falhou" });
  }
};
