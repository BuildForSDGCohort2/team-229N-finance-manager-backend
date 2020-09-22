import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../modals/User';

import process from 'process';
import { generateToken } from '../helpers/helpers';
import { Register, Login } from '../interface/interface';
interface UserData {
  name: string;
  _id: string;
  password: string;
  email: string;
}

export const register = async (req: Request, res: Response) => {
  if (!req.is('application/json')) {
    return res.json("Expects 'application/json'");
  }
  try {
    const { name, email, password } = req.body as Register;
    if (!name || !email || !password) {
      return res.status(200).json({
        success: false,
        error: 'All fields are required',
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({
        success: false,
        error: 'User already exist',
      });
    }
    const pHash = await bcrypt.hash(password, 12);
    const resp = await User.create({
      email,
      password: pHash,
      name,
      pd: new Date().toISOString(),
    });

    const obj = {
      name,
      id: resp._id,
    };

    const token = await generateToken(obj, process.env.SECRET_KEY as string);

    return res.status(200).json({
      success: true,
      data: resp,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  if (!req.is('application/json')) {
    return res.json("Expects 'application/json'");
  }
  try {
    const { email, password } = req.body as Login;
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        error: 'All fields are required',
      });
    }
    // await User.deleteMany({})
    // return
    const user = (await User.findOne({
      email,
    }).lean()) as UserData;
    if (!user) {
      return res.status(200).json({
        success: false,
        error: 'User does not exist',
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).json({
        success: false,
        error: 'Wrong crendetials',
      });
    }
    await User.updateOne({ email }, { lastLogin: new Date().toISOString() });

    const { name, _id } = user as UserData;
    const obj = {
      name,
      id: _id,
    };

    const token = await generateToken(obj, process.env.SECRET_KEY as string);

    return res.status(200).json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
  // res.send('Login here')
  // const {propertyName} = req.body
};
