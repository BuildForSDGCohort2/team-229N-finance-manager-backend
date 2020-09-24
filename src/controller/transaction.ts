import { Request, Response } from 'express';
import Cash from '../modals/Cash';
import Journal from '../modals/Journal';
import Bank from '../modals/Bank';
import Capital from '../modals/Capital';
import { Transaction } from 'src/interface/interface';
import Company from '../modals/Company';
import { generateCode } from '../helpers/helpers';
import Asset from '../modals/Asset';

export const manageAsset = async (req: Request, res: Response) => {
  if (!req.is('application/json')) {
    return res.json("Expects 'application/json'");
  }
  try {
    // const { id } = (await getMe(req)) as Token;
    const { id, account, amount, name, type } = req.body as Transaction;

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
      if (type === 'buy') {
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
        await Asset.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Cash.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
      }
    }

    if (account === 'bank') {
      if (type === 'buy') {
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
        await Asset.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'dr',
          details: name,
        });
        await Bank.create({
          amount,
          pd: new Date().toISOString(),
          code,
          id,
          type: 'cr',
          details: name,
        });
      }
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
// export const getjournal = async (req: Request, res: Response) => {
//   //   if (!req.is('application/json')) {
//   //     return res.json("Expects 'application/json'");
//   //   }
//   try {
//     // const { id } = (await getMe(req)) as Token;
//     const id = req.params.id as string;

//     if (!id) {
//       return res.status(200).json({
//         success: false,
//         error: 'Error try again',
//       });
//     }

//     const resp = await Journal.find({ id }).sort({ pd: -1 });

//     return res.status(201).json({
//       success: true,
//       data: resp,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: 'Server error',
//     });
//   }
// };

// export const getcash = async (req: Request, res: Response) => {
//   //   if (!req.is('application/json')) {
//   //     return res.json("Expects 'application/json'");
//   //   }
//   try {
//     // const { id } = (await getMe(req)) as Token;
//     const id = req.params.id as string;

//     if (!id) {
//       return res.status(200).json({
//         success: false,
//         error: 'Error try again',
//       });
//     }

//     const resp = await Cash.find({ id }).sort({ pd: -1 });

//     return res.status(201).json({
//       success: true,
//       data: resp,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: 'Server error',
//     });
//   }
// };

// export const getbank = async (req: Request, res: Response) => {
//   //   if (!req.is('application/json')) {
//   //     return res.json("Expects 'application/json'");
//   //   }
//   try {
//     // const { id } = (await getMe(req)) as Token;
//     const id = req.params.id as string;

//     if (!id) {
//       return res.status(200).json({
//         success: false,
//         error: 'Error try again',
//       });
//     }

//     const resp = await Bank.find({ id }).sort({ pd: -1 });

//     return res.status(201).json({
//       success: true,
//       data: resp,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: 'Server error',
//     });
//   }
// };

// export const getcapital = async (req: Request, res: Response) => {
//   //   if (!req.is('application/json')) {
//   //     return res.json("Expects 'application/json'");
//   //   }
//   try {
//     // const { id } = (await getMe(req)) as Token;
//     const id = req.params.id as string;

//     if (!id) {
//       return res.status(200).json({
//         success: false,
//         error: 'Error try again',
//       });
//     }

//     const resp = await Capital.find({ id }).sort({ pd: -1 });

//     return res.status(201).json({
//       success: true,
//       data: resp,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: 'Server error',
//     });
//   }
// };
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

    const capital = await Capital.find({ id }).sort({ pd: -1 });
    const bank = await Bank.find({ id }).sort({ pd: -1 });
    const cash = await Cash.find({ id }).sort({ pd: -1 });
    const journal = await Journal.find({ id }).sort({ pd: -1 });
    const assets = await Asset.find({ id }).sort({ pd: -1 });

    return res.status(201).json({
      success: true,
      data: {
        capital,
        bank,
        cash,
        journal,
        assets,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
};
