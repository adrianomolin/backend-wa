import { Request, Response } from 'express';
import { getDBModel, switchDB } from '../../../tenant/utils/switchDb';
import { schemas } from '../../../tenant/utils/schemas';

export async function deleteUser(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { userId } = req.params;

    const model = await getDBModel(tenant, 'User');

    const user = await model.findById(userId);

    if (!user) {
      return res.sendStatus(404);
    }

    await model.findByIdAndDelete(userId);
    await deleteUserFromTenantRecords(user.orgId, user.email);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function deleteUserFromTenantRecords(orgId: string, email: string) {
  try {
    const orgTenant = await switchDB('tenant', schemas);
    const model = await getDBModel(orgTenant, 'users');

    await model.findOne({ email: email, orgId }).deleteOne();
  } catch (err) {
    console.log(err);
  }
}
