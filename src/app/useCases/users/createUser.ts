import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../../models/User';

export async function createUser(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    if (!name || !email || !password) {
      res.status(400).json({
        'error': 'Name, email and password fields are required!',
      });
    }

    if (req.headers['demo'] === 'true') return res.sendStatus(201).json({
      name,
      email,
      password: passwordHash,
      role
    })

    const user = await User.create({
      name,
      email,
      password: passwordHash,
      role
    });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
