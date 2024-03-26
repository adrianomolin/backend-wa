import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { getDBModel, switchDB } from '../../../tenant/utils/switchDb';
import { jwtSign } from '../../utils/jwtSign';
import { schemas, tenantSchemas } from '../../../tenant/utils/schemas';

export async function createUser(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    let {
      role,
    } = req.body;

    let orgId = req.user?.orgId;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      if (!orgId) role = 'ADMIN';

      orgId = await addUserToOrg({ orgId, email });
    } catch (err) {
      if (!(err instanceof Error)) return;

      if (err.message === 'email') {
        return res.status(409).json({
          'error': 'This email is already registered in an organization.',
        });
      }
    }

    const tenant = await switchDB(orgId, schemas);
    const model = await getDBModel(tenant, 'User');

    const user = await model.create({
      name,
      email,
      password: passwordHash,
      role,
      orgId,
    });

    const accessToken = jwtSign(user.id, user.orgId, user.permissions);

    return res.json({ accessToken }).status(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function addUserToOrg({ orgId, email, name }: { orgId: string, email: string, name?: string }) {
  const orgTenant = await switchDB('tenant', tenantSchemas);
  const users = await getDBModel(orgTenant, 'users');

  const isEmailAlreadyTaken = await users.findOne({ email });

  if (isEmailAlreadyTaken) {
    throw new Error('email');
  }

  if (!orgId) orgId = uuidv4();

  const organizations = await getDBModel(orgTenant, 'organizations');

  await organizations.create({
    orgId,
    name
  });

  await users.create({
    orgId,
    email: email
  });

  return orgId;
}
