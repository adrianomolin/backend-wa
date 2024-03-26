import { Request, Response } from 'express';
import { getDBModel } from '../../../tenant/utils/switchDb';

export async function deleteCategory(req: Request, res: Response) {
  try {
    const tenant = req.tenant;
    const { categoryId } = req.params;

    const model = await getDBModel(tenant, 'Category');
    await model.findByIdAndDelete(categoryId);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
