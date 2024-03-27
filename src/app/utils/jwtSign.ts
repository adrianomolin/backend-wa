import jwt from 'jsonwebtoken';
import { env } from '../../config/env';

export function jwtSign(id: string, orgId: string, permissions: string[]) {
  const token = jwt.sign({
    id,
    permissions,
    orgId,
  }, env.jwtSecret, { expiresIn: '1d' });

  return token;
}
