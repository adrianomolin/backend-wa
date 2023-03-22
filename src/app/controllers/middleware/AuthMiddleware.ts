import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  permissions: string[];
  role: string[];
  iat: number;
  exp: number
}

export function AuthMiddleware(
  req: Request, res: Response, next: NextFunction
) {

  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!);

    const { id, permissions, role } = data as TokenPayload;

    req.user = { id, permissions, role };

    return next();
  } catch {
    return res.sendStatus(401);
  }
}
