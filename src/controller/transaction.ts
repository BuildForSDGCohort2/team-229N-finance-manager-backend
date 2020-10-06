import { Request, Response } from 'express';
import Cash from '../modals/Cash';
import Journal from '../modals/Journal';
import Bank from '../modals/Bank';
import { Transaction } from '../interface/interface';
import Company from '../modals/Company';
import { generateCode, getAllData, jsUcfirst } from '../helpers/helpers';
import Land from '../modals/Land';
import Machine from '../modals/Machine';
import Vehicle from '../modals/Vehicle';
import Stock from '../modals/Stock';
import Cashbook from '../modals/Cashbook';
import Sale from '../modals/Sales';
import Expense from '../modals/Expense';

export const buyAsset = async (req: Request, res: Response) => {
  if (!req.is('application/json')) {
    return res.json("Expects 'application/json'");
  }
  try {
    // const { id } = (await getMe(req)) as Token;
    const { id, account, amount, name } = req.body as Transaction;

    if (!id) {
      return res.status(200).json({
        success: false,
        error: 'Error try again',
      });
    }
    if (!name || !amount || !account) {
      return res.status(200).json({
        success: false,
        error: 'Missing fields',
      });
    }
    const company = await Company.findById(id);
    if (!company) {
      return res.status(200).json({
        success: false,
        error: 'Company does not exist',
      });
    }
    let code;
    if (name === 'land') {
      if (account === 'cash') {
        code = generateCode(8);
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: 'Cash',
        });
        code = generateCode(8);
        await Land.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: 'Purchased land by cash',
        });
        await Cash.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
        await Cashbook.create({
          bank: amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: `Purchased ${name} by cash`,
        });
      } else if (account === 'bank') {
        code = generateCode(8);
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: 'Bank',
        });
        code = generateCode(8);
        await Land.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: `Purchased ${name} by cheque`,
        });
        await Bank.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
        await Cashbook.create({
          bank: amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: `Purchased ${name} by cheque`,
        });
      }
    }
    if (name === 'machine') {
      if (account === 'cash') {
        code = generateCode(8);
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: 'Cash',
        });
        code = generateCode(8);
        await Machine.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: 'Purchased machine by cash',
        });
        await Cash.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
        await Cashbook.create({
          bank: amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: `Purchased ${name} by cash`,
        });
      } else if (account === 'bank') {
        code = generateCode(8);
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: 'Bank',
        });
        code = generateCode(8);
        await Machine.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: 'Purchased machine by cheque',
        });
        await Bank.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
        await Cashbook.create({
          bank: amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: `Purchased ${name} by cheque`,
        });
      }
    }
    if (name === 'vehicle') {
      if (account === 'cash') {
        code = generateCode(8);
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: 'Cash',
        });
        code = generateCode(8);
        await Vehicle.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: 'Purchased vehicle by cash',
        });
        await Cash.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });

        await Cashbook.create({
          bank: amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: `Purchased ${name} by cash `,
        });
      } else if (account === 'bank') {
        code = generateCode(8);
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: 'Bank',
        });
        code = generateCode(8);
        await Vehicle.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: 'Purchased vehicle by cheque',
        });
        await Bank.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
        await Cashbook.create({
          bank: amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: `Purchased ${name} by cheque`,
        });
      }
    }
    const data = await getAllData(id);
    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
export const buyStock = async (req: Request, res: Response) => {
  if (!req.is('application/json')) {
    return res.json("Expects 'application/json'");
  }
  try {
    // const { id } = (await getMe(req)) as Token;
    const { id, price, qty, account, item, sPrice } = req.body as Transaction;

    if (!id) {
      return res.status(200).json({
        success: false,
        error: 'Error try again',
      });
    }
    if (!item || !price || !qty || !account || !sPrice) {
      return res.status(200).json({
        success: false,
        error: 'Missing fields',
      });
    }
    const company = await Company.findById(id);
    if (!company) {
      return res.status(200).json({
        success: false,
        error: 'Company does not exist',
      });
    }
    let code;
    const itemName = jsUcfirst(item);
    const available = await Stock.find({ item: itemName, id });
    // console.log('available', available);
    if (account === 'cash') {
      code = generateCode(8);
      await Journal.create({
        amount: price * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'dr',
        details: itemName,
      });
      await Journal.create({
        amount: price * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: itemName,
      });
      code = generateCode(8);
      if (!available.length) {
        await Stock.create({
          item: itemName,
          pd: new Date().toISOString(),
          code,
          id,
          qty,
          price,
          sPrice,
        });
      } else {
        await Stock.updateOne({ item: itemName, id }, { $inc: { qty: qty } });
      }

      await Cash.create({
        amount: price * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: itemName,
      });
      await Cashbook.create({
        cash: price * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: `Purchased ${qty} ${item} by cash`,
      });
    }
    if (account === 'bank') {
      code = generateCode(8);
      await Journal.create({
        amount: price * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'dr',
        details: itemName,
      });
      await Journal.create({
        amount: price * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: itemName,
      });
      code = generateCode(8);
      if (!available.length) {
        await Stock.create({
          item: itemName,
          pd: new Date().toISOString(),
          code,
          id,
          qty,
          price,
          sPrice,
        });
      } else {
        await Stock.updateOne({ item: itemName, id }, { $inc: { qty: qty } });
      }
      await Bank.create({
        amount: price * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: itemName,
      });
      await Cashbook.create({
        bank: price * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: `Purchased ${qty} ${item} by cash`,
      });
    }

    const data = await getAllData(id);
    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
export const sellStock = async (req: Request, res: Response) => {
  if (!req.is('application/json')) {
    return res.json("Expects 'application/json'");
  }
  try {
    // const { id } = (await getMe(req)) as Token;
    const { id, sPrice, qty, account, item } = req.body as Transaction;

    if (!id) {
      return res.status(200).json({
        success: false,
        error: 'Error try again',
      });
    }
    if (!item || !sPrice || !qty || !account) {
      return res.status(200).json({
        success: false,
        error: 'Missing fields',
      });
    }

    const company = await Company.findById(id);
    if (!company) {
      return res.status(200).json({
        success: false,
        error: 'Company does not exist',
      });
    }
    let code;

    if (account === 'cash') {
      code = generateCode(8);
      await Journal.create({
        amount: sPrice * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'dr',
        details: `Sold ${qty} ${item} by cash`,
      });
      await Journal.create({
        amount: sPrice * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: `Sold ${qty} ${item} by cash`,
      });
      code = generateCode(8);
      await Stock.updateOne({ item, id }, { $inc: { sqty: qty } });
      await Cash.create({
        amount: sPrice * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'dr',
        details: `Sold ${qty} ${item} by cash`,
      });
      await Cashbook.create({
        cash: sPrice * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'dr',
        details: `Sold ${qty} ${item} by cash`,
      });
      await Sale.create({
        amount: sPrice * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: `Sold ${qty} ${item} by cash`,
      });
    }
    if (account === 'bank') {
      code = generateCode(8);
      await Journal.create({
        amount: sPrice * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'dr',
        details: `Sold ${qty} ${item} by cheque`,
      });
      await Journal.create({
        amount: sPrice * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: `Sold ${qty} ${item} by cheque`,
      });
      code = generateCode(8);
      await Stock.updateOne({ item, id }, { $inc: { sqty: qty } });
      await Bank.create({
        amount: sPrice * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'dr',
        details: `Sold ${qty} ${item} by cheque`,
      });
      await Cashbook.create({
        bank: sPrice * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'dr',
        details: `Sold ${qty} ${item} by cheque`,
      });
      await Sale.create({
        amount: sPrice * qty,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: `Sold ${qty} ${item} by cheque`,
      });
    }

    const data = await getAllData(id);
    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
export const sellAsset = async (req: Request, res: Response) => {
  if (!req.is('application/json')) {
    return res.json("Expects 'application/json'");
  }
  try {
    // const { id } = (await getMe(req)) as Token;
    const { id, account, amount, name } = req.body as Transaction;

    if (!id) {
      return res.status(200).json({
        success: false,
        error: 'Error try again',
      });
    }
    if (!name || !amount || !account) {
      return res.status(200).json({
        success: false,
        error: 'Missing fields',
      });
    }
    const company = await Company.findById(id);
    if (!company) {
      return res.status(200).json({
        success: false,
        error: 'Company does not exist',
      });
    }
    let code;
    if (name === 'land') {
      if (account === 'cash') {
        code = generateCode(8);
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: 'Cash',
        });
        code = generateCode(8);
        await Land.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: 'Sold land by cash',
        });
        await Cash.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Cashbook.create({
          bank: amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: `Sold ${name} by cash`,
        });
      } else if (account === 'bank') {
        code = generateCode(8);
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: 'Bank',
        });
        code = generateCode(8);
        await Land.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: 'Sold land by cheque',
        });
        await Bank.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Cashbook.create({
          bank: amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: `Sold ${name} by cheque`,
        });
      }
    }
    if (name === 'machine') {
      if (account === 'cash') {
        code = generateCode(8);
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: 'Cash',
        });
        code = generateCode(8);
        await Machine.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: 'Sold machine by cash',
        });
        await Cash.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Cashbook.create({
          bank: amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: `Sold ${name} by cash`,
        });
      } else if (account === 'bank') {
        code = generateCode(8);
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: 'Bank',
        });
        code = generateCode(8);
        await Machine.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: 'Sold machine by cheque',
        });
        await Bank.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Cashbook.create({
          bank: amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: `Sold ${name} by cheque`,
        });
      }
    }
    if (name === 'vehicle') {
      if (account === 'cash') {
        code = generateCode(8);
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: 'Cash',
        });
        code = generateCode(8);
        await Vehicle.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: 'Sold vehicle by cash',
        });
        await Cash.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Cashbook.create({
          bank: amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: `Sold ${name} by cash`,
        });
      } else if (account === 'bank') {
        code = generateCode(8);
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
        await Journal.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: 'Bank',
        });
        code = generateCode(8);
        await Vehicle.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: 'Sold vehicle by cheque',
        });
        await Bank.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Cashbook.create({
          bank: amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: `Sold ${name} by cheque`,
        });
      }
    }

    const data = await getAllData(id);
    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
export const getInitialData = async (req: Request, res: Response) => {
  try {
    // const { id } = (await getMe(req)) as Token;
    const id = req.params.id as string;

    if (!id) {
      return res.status(200).json({
        success: false,
        error: 'Error try again',
      });
    }

    const data = await getAllData(id);
    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
export const payExpense = async (req: Request, res: Response) => {
  if (!req.is('application/json')) {
    return res.json("Expects 'application/json'");
  }
  try {
    // const { id } = (await getMe(req)) as Token;
    const { id, account, amount, name } = req.body as Transaction;

    if (!id) {
      return res.status(200).json({
        success: false,
        error: 'Error try again',
      });
    }
    if (!name || !amount || !account) {
      return res.status(200).json({
        success: false,
        error: 'Missing fields',
      });
    }
    const company = await Company.findById(id);
    if (!company) {
      return res.status(200).json({
        success: false,
        error: 'Company does not exist',
      });
    }
    let code;

    if (account === 'cash') {
      code = generateCode(8);
      await Journal.create({
        amount,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'dr',
        details: name,
      });
      await Journal.create({
        amount,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: name,
      });
      code = generateCode(8);
      // await Stock.updateOne({ item }, { $inc: { qty: -qty } });
      await Cash.create({
        amount,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: name,
      });
      await Cashbook.create({
        cash: amount,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: `Paid ${name} by cash`,
      });
      await Expense.create({
        amount,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'dr',
        details: name,
      });
    }
    if (account === 'bank') {
      code = generateCode(8);
      await Journal.create({
        amount,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'dr',
        details: name,
      });
      await Journal.create({
        amount,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: name,
      });
      code = generateCode(8);
      // await Stock.updateOne({ item }, { $inc: { qty: -qty } });
      await Bank.create({
        amount,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: name,
      });
      await Cashbook.create({
        bank: amount,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'cr',
        details: `Paid ${name} by cheque`,
      });
      await Expense.create({
        amount,
        pd: new Date().toISOString(),
        code,
        id,
        type: 'dr',
        details: name,
      });
    }

    const data = await getAllData(id);
    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
