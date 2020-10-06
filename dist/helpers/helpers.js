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
exports.jsUcfirst = exports.getAllData = exports.generateCode = exports.getMe = exports.auth = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Bank_1 = __importDefault(require("../modals/Bank"));
const Capital_1 = __importDefault(require("../modals/Capital"));
const Cash_1 = __importDefault(require("../modals/Cash"));
const Journal_1 = __importDefault(require("../modals/Journal"));
const Land_1 = __importDefault(require("../modals/Land"));
const Machine_1 = __importDefault(require("../modals/Machine"));
const Stock_1 = __importDefault(require("../modals/Stock"));
const Vehicle_1 = __importDefault(require("../modals/Vehicle"));
const Cashbook_1 = __importDefault(require("../modals/Cashbook"));
const Sales_1 = __importDefault(require("../modals/Sales"));
const Expense_1 = __importDefault(require("../modals/Expense"));
exports.generateToken = (user, secret) => __awaiter(void 0, void 0, void 0, function* () {
    const code = yield jsonwebtoken_1.default.sign({
        name: user.name,
        id: user.id,
    }, secret);
    return code;
});
exports.auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = (yield jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY));
            if (decoded.id) {
                next();
            }
        }
        catch (e) {
            res.status(200).json({
                message: 'Invalid or expired token',
            });
        }
    }
    else {
        res.status(200).json({
            message: 'Auth token required',
        });
    }
});
exports.getMe = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (token) {
        try {
            return yield jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        }
        catch (e) {
            throw new Error('Your session expired. Sign in again.');
        }
    }
});
exports.generateCode = (len) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.getAllData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const capital = yield Capital_1.default.find({ id });
    const bank = yield Bank_1.default.find({ id });
    const cash = yield Cash_1.default.find({ id });
    const journal = yield Journal_1.default.find({ id }).sort({ pd: -1 });
    const land = yield Land_1.default.find({ id }).sort({ pd: -1 });
    const vehicle = yield Vehicle_1.default.find({ id }).sort({ pd: -1 });
    const machine = yield Machine_1.default.find({ id }).sort({ pd: -1 });
    const stock = yield Stock_1.default.find({ id }).sort({ pd: -1 });
    const cashbook = yield Cashbook_1.default.find({ id }).sort({ pd: -1 });
    const sales = yield Sales_1.default.find({ id }).sort({ pd: -1 });
    const expenses = yield Expense_1.default.find({ id }).sort({ pd: -1 });
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
});
exports.jsUcfirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
