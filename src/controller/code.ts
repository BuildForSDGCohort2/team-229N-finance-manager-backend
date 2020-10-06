import { Request, Response } from 'express';
import Security from '../modals/Security';
import nodemailer from 'nodemailer';

import { generateCode, getMe } from '../helpers/helpers';
interface Code {
  email: string;
  id: string;
  code: string;
}

export const createCode = async (req: Request, res: Response) => {
  if (!req.is('application/json')) {
    return res.json("Expects 'application/json'");
  }
  try {
    const { id } = (await getMe(req)) as Code;
    const { email } = req.body as Code;

    if (!email) {
      return res.status(200).json({
        success: false,
        error: 'Action failed',
      });
    }
    const user = (await Security.findOne({
      email,
      uid: id,
    }).lean()) as Code;
    const newCode = generateCode(8);
    if (user) {
      await Security.updateOne({ uid: id }, { code: newCode, email });
    } else {
      await Security.create({ code: newCode, email, uid: id });
    }
    try {
      const transporter = await nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'info@netbritz.com',
          pass: 'ATbba5fBkTjK',
        },
      });

      await transporter.sendMail({
        from: '"Finance manager 👻" <info@netbritz.com>', // sender address
        to: email, // list of receivers
        subject: `FINANCE MANAGER SECURITY CODE`, // Subject line
        // text: "Hello world?",
        html: `<p><b>Hello ${email},</b> your security code to login into finance manager system is <b>${newCode}</b>. Note this code is valid for 24hrs</p>`,
        // html: Welcome(firstName, code, lastName, password, email) // html body
      });
    } catch (error) {
      console.log(error);
    }

    return res.status(201).json({
      success: true,
      info: 'Security code sent',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};
export const verifyCode = async (req: Request, res: Response) => {
  if (!req.is('application/json')) {
    return res.json("Expects 'application/json'");
  }
  try {
    const { id } = (await getMe(req)) as Code;
    const { email, code } = req.body as Code;
    if (!code) {
      return res.status(200).json({
        success: false,
        error: 'Activation code is required',
      });
    }
    if (!email) {
      return res.status(200).json({
        success: false,
        error: 'Action failed',
      });
    }
    const activationCode = await Security.findOne({
      code,
      uid: id,
      email,
    });
    if (!activationCode) {
      return res.status(200).json({
        success: false,
        error: 'Activation code is invalid',
      });
    }
    await Security.deleteOne({ uid: id });

    return res.status(201).json({
      success: true,
      info: 'Security code accepted',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};
