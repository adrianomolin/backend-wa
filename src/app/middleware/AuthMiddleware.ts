import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { switchDB } from '../../tenant/utils/switchDb';
import { schemas } from '../../tenant/utils/schemas';

interface TokenPayload {
  id: string;
  permissions: string[];
  iat: number;
  exp: number;
  orgId: string;
}

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    if (req.route.path === '/users' && req.method === 'POST') return next();
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, env.jwtSecret);
    const { id, permissions, orgId } = data as TokenPayload;

    const org = await switchDB(orgId, schemas);

    req.tenant = org;
    req.user = { id, permissions, orgId };

    return next();
  } catch {
    return res.sendStatus(401);
  }
}
