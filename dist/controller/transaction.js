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
exports.getInitialData = exports.manageAsset = void 0;
const Cash_1 = __importDefault(require("../modals/Cash"));
const Journal_1 = __importDefault(require("../modals/Journal"));
const Bank_1 = __importDefault(require("../modals/Bank"));
const Capital_1 = __importDefault(require("../modals/Capital"));
const Company_1 = __importDefault(require("../modals/Company"));
const helpers_1 = require("../helpers/helpers");
const Asset_1 = __importDefault(require("../modals/Asset"));
exports.manageAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.is('application/json')) {
        return res.json("Expects 'application/json'");
    }
    try {
        const { id, account, amount, name, type } = req.body;
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
        const company = yield Company_1.default.findById(id);
        if (!company) {
            return res.status(200).json({
                success: false,
                error: 'Company does not exist',
            });
        }
        let code;
        if (account === 'cash') {
            if (type === 'buy') {
                code = helpers_1.generateCode(8);
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: name,
                });
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: 'Cash',
                });
                code = helpers_1.generateCode(8);
                yield Asset_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: name,
                });
                yield Cash_1.default.create({
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
                code = helpers_1.generateCode(8);
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: name,
                });
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: 'Bank',
                });
                code = helpers_1.generateCode(8);
                yield Asset_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: name,
                });
                yield Bank_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
            }
        }
        const resp = yield Journal_1.default.find({ id });
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
exports.getInitialData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(200).json({
                success: false,
                error: 'Error try again',
            });
        }
        const capital = yield Capital_1.default.find({ id }).sort({ pd: -1 });
        const bank = yield Bank_1.default.find({ id }).sort({ pd: -1 });
        const cash = yield Cash_1.default.find({ id }).sort({ pd: -1 });
        const journal = yield Journal_1.default.find({ id }).sort({ pd: -1 });
        const assets = yield Asset_1.default.find({ id }).sort({ pd: -1 });
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: 'Server error',
        });
    }
});
