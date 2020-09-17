import { Request, Response } from 'express';
import { generateCode, getMe } from '../helpers/helpers';
import { Token, Transaction } from '../interface/interface';
import Company from '../modals/Company';
import Journal from '../modals/Journal';

export const setUp = async (req: Request, res: Response) => {
  if (!req.is('application/json')) {
    return res.json("Expects 'application/json'");
  }
  try {
    // const { id } = (await getMe(req)) as Token;
    const { id, cash, bank } = req.body as Transaction;

    if (!id) {
      return res.status(200).json({
        success: false,
        error: 'Error try again',
      });
    }
    if (!cash && !bank) {
      return res.status(200).json({
        success: false,
        error: 'Cash or bank balance is required',
      });
    }
    const company = await Company.findById(id);
    if (!company) {
      return res.status(200).json({
        success: false,
        error: 'Company does not exist',
      });
    }

    if (cash) {
      const ref = generateCode(8);
      await Journal.create({
        amount: cash,
        pd: new Date().toISOString(),
        ref,
        id,
        type: 'dr',
        details: 'Cash',
      });
      await Journal.create({
        amount: cash,
        pd: new Date().toISOString(),
        ref,
        id,
        type: 'cr',
        details: 'Capital',
      });
    }
    // console.log('am here');
    if (bank) {
      const ref = generateCode(8);
      await Journal.create({
        amount: bank,
        pd: new Date().toISOString(),
        ref,
        id,
        type: 'dr',
        details: 'Bank',
      });
      await Journal.create({
        amount: bank,
        pd: new Date().toISOString(),
        ref,
        id,
        type: 'cr',
        details: 'Capital',
      });
    }
    const resp = await Journal.find({ id });

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
export const get = async (req: Request, res: Response) => {
  //   if (!req.is('application/json')) {
  //     return res.json("Expects 'application/json'");
  //   }
  try {
    // const { id } = (await getMe(req)) as Token;
    const id = req.params.id as string;

    if (!id) {
      return res.status(200).json({
        success: false,
        error: 'Error try again',
      });
    }

    // const resp = await Journal.find({ id });
    const resp = await Journal.aggregate([
      {
        $group: {
          _id: '$ref',
          data: { $push: '$$ROOT' },
          //   id: { $push: '$id' },
        },
      },
    ]);

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
