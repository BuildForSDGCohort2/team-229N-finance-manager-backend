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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../modals/User"));
const process_1 = __importDefault(require("process"));
const helpers_1 = require("../helpers/helpers");
exports.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.is('application/json')) {
        return res.json("Expects 'application/json'");
    }
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(200).json({
                success: false,
                error: 'All fields are required',
            });
        }
        const user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(200).json({
                success: false,
                error: 'User already exist',
            });
        }
        const pHash = yield bcryptjs_1.default.hash(password, 12);
        const resp = yield User_1.default.create({
            email,
            password: pHash,
            name,
            pd: new Date().toISOString(),
        });
        const obj = {
            name,
            id: resp._id,
        };
        const token = yield helpers_1.generateToken(obj, process_1.default.env.SECRET_KEY);
        return res.status(200).json({
            success: true,
            data: resp,
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
        });
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.is('application/json')) {
        return res.json("Expects 'application/json'");
    }
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({
                success: false,
                error: 'All fields are required',
            });
        }
        const user = (yield User_1.default.findOne({
            email,
        }).lean());
        if (!user) {
            return res.status(200).json({
                success: false,
                error: 'User does not exist',
            });
        }
        const match = yield bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            return res.status(200).json({
                success: false,
                error: 'Wrong crendetials',
            });
        }
        yield User_1.default.updateOne({ email }, { lastLogin: new Date().toISOString() });
        const { name, _id } = user;
        const obj = {
            name,
            id: _id,
        };
        const token = yield helpers_1.generateToken(obj, process_1.default.env.SECRET_KEY);
        return res.status(200).json({
            success: true,
            data: user,
            token,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server error',
        });
    }
});
