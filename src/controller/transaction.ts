import { Request, Response } from 'express';
import Cash from '../modals/Cash';
import Journal from '../modals/Journal';
import Bank from '../modals/Bank';
import Capital from '../modals/Capital';

// export const setUp = async (req: Request, res: Response) => {
//   if (!req.is('application/json')) {
//     return res.json("Expects 'application/json'");
//   }
//   try {
//     // const { id } = (await getMe(req)) as Token;
//     const { id, cash, bank } = req.body as Transaction;

//     if (!id) {
//       return res.status(200).json({
//         success: false,
//         error: 'Error try again',
//       });
//     }
//     if (!cash && !bank) {
//       return res.status(200).json({
//         success: false,
//         error: 'Cash or bank balance is required',
//       });
//     }
//     const company = await Company.findById(id);
//     if (!company) {
//       return res.status(200).json({
//         success: false,
//         error: 'Company does not exist',
//       });
//     }

//     if (cash) {
//       const code = generateCode(8);
//       await Journal.create({
//         amount: cash,
//         pd: new Date().toISOString(),
//         code,
//         id,
//         type: 'dr',
//         details: 'Cash',
//       });
//       await Journal.create({
//         amount: cash,
//         pd: new Date().toISOString(),
//         code,
//         id,
//         type: 'cr',
//         details: 'Capital',
//       });
//     }

//     if (bank) {
//       const code = generateCode(8);
//       await Journal.create({
//         amount: bank,
//         pd: new Date().toISOString(),
//         code,
//         id,
//         type: 'dr',
//         details: 'Bank',
//       });
//       await Journal.create({
//         amount: bank,
//         pd: new Date().toISOString(),
//         code,
//         id,
//         type: 'cr',
//         details: 'Capital',
//       });
//     }
//     const resp = await Journal.find({ id });

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

    return res.status(201).json({
      success: true,
      data: {
        capital,
        bank,
        cash,
        journal,
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
