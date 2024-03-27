import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function listUsers(req: Request, res: Response) {
  try {
    const org = req.tenant;

    const model = await getDBModel(org, 'User');
    const user = await model.find();

    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
