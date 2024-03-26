import { Request, Response } from 'express';
import { User } from '../models/User';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const accessToken = jwtSign(user.id, user.orgId, user.permissions);

    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        permissions: user.permissions,
        role: user.role,
      },
      token,
    });
  }
}

export default new AuthController();
