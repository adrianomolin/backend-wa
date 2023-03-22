import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';

export async function sessionLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required: (email, password)' });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: 'Email not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.'});
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    res.json({
      token,
      user:   {
        id: user._id,
        name: user.name,
        email: user.email,
        permissions: user.permissions,
        role: user.role,
      }
    });
  }
  catch(error) {
    res.status(500).json({ err: 'Ocorreu um erro' });
  }
}
