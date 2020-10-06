import jwt from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import { Token } from '../interface/interface';
import Bank from '../modals/Bank';
import Capital from '../modals/Capital';
import Cash from '../modals/Cash';
import Journal from '../modals/Journal';
import Land from '../modals/Land';
import Machine from '../modals/Machine';
import Stock from '../modals/Stock';
import Vehicle from '../modals/Vehicle';
import Cashbook from '../modals/Cashbook';
import Sale from '../modals/Sales';
import Expense from '../modals/Expense';

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
      res.status(200).json({
        message: 'Invalid or expired token',
      });
    }
  } else {
    res.status(200).json({
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
export const getAllData = async (id: string) => {
  const capital = await Capital.find({ id });
  const bank = await Bank.find({ id });
  const cash = await Cash.find({ id });
  const journal = await Journal.find({ id }).sort({ pd: -1 });
  const land = await Land.find({ id }).sort({ pd: -1 });
  const vehicle = await Vehicle.find({ id }).sort({ pd: -1 });
  const machine = await Machine.find({ id }).sort({ pd: -1 });
  const stock = await Stock.find({ id }).sort({ pd: -1 });
  const cashbook = await Cashbook.find({ id }).sort({ pd: -1 });
  const sales = await Sale.find({ id }).sort({ pd: -1 });
  const expenses = await Expense.find({ id }).sort({ pd: -1 });
  return {
    capital,
    bank,
    cash,
    journal,
    land,
    vehicle,
    machine,
    stock,
    sales,
    cashbook,
    expenses,
  };
};

export const jsUcfirst = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
