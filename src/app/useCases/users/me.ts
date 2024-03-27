import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function me(req: Request, res: Response) {
  try {
    const { id } = req.user;
    const org = req.tenant;

    const model = await getDBModel(org,'User');
    const user = await model.findById(id);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
