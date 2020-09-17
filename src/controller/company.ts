import { Request, Response } from 'express';
import { getMe } from '../helpers/helpers';
import { Token, CreateCompany } from '../interface/interface';
import Company from '../modals/Company';

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
