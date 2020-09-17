import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import { Token } from '../interface/interface';

export const generateToken = async (
  user: Token,
  secret: string
): Promise<string> => {
  const code = await jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    secret
    // {
    //   expiresIn: 0
    // }
  );
  // console.log('Token', code)
  return code;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const decoded = (await jwt.verify(
        token,
        process.env.SECRET_KEY as string
      )) as Token;
      // console.log("decoded token:",decoded)
      if (decoded.id) {
        next();
      }
    } catch (e) {
      res.status(401).json({
        message: 'Invalid or expired token',
      });
    }
  } else {
    res.status(401).json({
      message: 'Auth token required',
    });
  }
};

export const getMe = async (req: Request) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET_KEY as string);
    } catch (e) {
      throw new Error('Your session expired. Sign in again.');
    }
  }
};

export const generateCode = (len: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
