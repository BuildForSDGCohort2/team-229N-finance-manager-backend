"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanies = exports.createCompany = void 0;
const helpers_1 = require("../helpers/helpers");
const Company_1 = __importDefault(require("../modals/Company"));
exports.createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.is('application/json')) {
        return res.json("Expects 'application/json'");
    }
    try {
        const { id } = (yield helpers_1.getMe(req));
        const { name, email, bank, desc, fb, location, phone, twt, yt, } = req.body;
        if (!name || !email || !desc) {
            return res.status(200).json({
                success: false,
                error: 'Company name, email, and description are required',
            });
        }
        const company = yield Company_1.default.findOne({ name });
        if (company) {
            return res.status(200).json({
                success: false,
                error: 'Company already exist',
            });
        }
        const compEmail = yield Company_1.default.findOne({ email });
        if (compEmail) {
            return res.status(200).json({
                success: false,
                error: `${email} exist on already registered company`,
            });
        }
        const resp = yield Company_1.default.create({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: 'Server error',
        });
    }
});
exports.getCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = (yield helpers_1.getMe(req));
        const data = yield Company_1.default.find({ user: id }).populate('user');
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server error',
        });
    }
});
