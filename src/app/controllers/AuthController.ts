import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';
import { jwtSign } from '../utils/jwtSign';
import { getDBModel, switchDB } from '../../tenant/utils/switchDb';
import { schemas, tenantSchemas } from '../../tenant/utils/schemas';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const tenant = await switchDB('tenant', tenantSchemas);

    const usersTenant = await getDBModel(tenant, 'users');
    const userTenant = await usersTenant.findOne({ email });

    if (!userTenant) {
      return res.sendStatus(401);
    }

    const userOrg = await switchDB(userTenant.orgId, schemas);
    const users = await getDBModel(userOrg, 'User');

    const user = await users.findOne({ email: email });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const accessToken = jwtSign(user.id, user.orgId, user.permissions);

    return res.json({ accessToken });
  }
}

export default new AuthController();
