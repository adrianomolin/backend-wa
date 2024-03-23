import { Request, Response } from 'express';
import { User } from '../../models/User';

export async function me(req: Request, res: Response) {
  try {
    const { id: userId } = req.user;

    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
