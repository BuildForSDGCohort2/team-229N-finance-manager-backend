import { Request, Response } from 'express';
import Cash from '../modals/Cash';
import Journal from '../modals/Journal';
import { generateCode, getMe } from '../helpers/helpers';
import { Token, CreateCompany } from '../interface/interface';
import Company from '../modals/Company';
import Capital from '../modals/Capital';
import Bank from '../modals/Bank';

export const createCompany = async (req: Request, res: Response) => {
  if (!req.is('application/json')) {
    return res.json("Expects 'application/json'");
  }
  try {
    const { id } = (await getMe(req)) as Token;
    const {
      name,
      email,
      bank,
      desc,
      fb,
      location,
      phone,
      twt,
      yt,
      bankBal,
      cashBal,
    } = req.body as CreateCompany;

    if (!name || !email || !desc) {
      return res.status(200).json({
        success: false,
        error: 'Company name, email, and description are required',
      });
    }
    const company = await Company.findOne({ name });
    if (company) {
      return res.status(200).json({
        success: false,
        error: 'Company already exist',
      });
    }
    const compEmail = await Company.findOne({ email });
    if (compEmail) {
      return res.status(200).json({
        success: false,
        error: `${email} exist on already registered company`,
      });
    }
    if (!cashBal && !bankBal) {
      return res.status(200).json({
        success: false,
        error: 'Cash or bank balance is required',
      });
    }
    const resp = await Company.create({
      name,
      email,
      desc,
      bank,
      fb,
      location,
      phone,
      twt,
      yt,
      user: id,
      pd: new Date().toISOString(),
    });
    const { _id } = resp;
    if (cashBal) {
      const code = generateCode(8);
      await Cash.create({
        amount: cashBal,
        pd: new Date().toISOString(),
        code,
        id: _id,
        type: 'dr',
        details: 'Balance b/d',
      });
      await Capital.create({
        amount: cashBal,
        pd: new Date().toISOString(),
        code,
        id: _id,
        type: 'cr',
        details: 'Cash',
      });
      await Journal.create({
        amount: cashBal,
        pd: new Date().toISOString(),
        code,
        id: _id,
        type: 'dr',
        details: 'Cash',
      });
      await Journal.create({
        amount: cashBal,
        pd: new Date().toISOString(),
        code,
        id: _id,
        type: 'cr',
        details: 'Capital',
      });
    }

    if (bankBal) {
      const code = generateCode(8);
      await Bank.create({
        amount: bankBal,
        pd: new Date().toISOString(),
        code,
        id: _id,
        type: 'dr',
        details: 'Balance b/d',
      });
      await Capital.create({
        amount: bankBal,
        pd: new Date().toISOString(),
        code,
        id: _id,
        type: 'cr',
        details: 'Bank',
      });
      await Journal.create({
        amount: bankBal,
        pd: new Date().toISOString(),
        code,
        id: _id,
        type: 'dr',
        details: 'Bank',
      });
      await Journal.create({
        amount: bankBal,
        pd: new Date().toISOString(),
        code,
        id: _id,
        type: 'cr',
        details: 'Capital',
      });
    }

    return res.status(201).json({
      success: true,
      data: resp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
export const getCompanies = async (req: Request, res: Response) => {
  // if (!req.is('application/json')) {
  //   return res.json("Expects 'application/json'");
  // }
  try {
    const { id } = (await getMe(req)) as Token;

    const data = await Company.find({ user: id }).populate('user');
    if (!data.length) {
      return res.status(200).json({
        success: false,
        error: 'You have no company registerd',
      });
    }
    console.log('data', data);
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
