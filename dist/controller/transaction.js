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
exports.payExpense = exports.getInitialData = exports.sellAsset = exports.sellStock = exports.buyStock = exports.buyAsset = void 0;
const Cash_1 = __importDefault(require("../modals/Cash"));
const Journal_1 = __importDefault(require("../modals/Journal"));
const Bank_1 = __importDefault(require("../modals/Bank"));
const Company_1 = __importDefault(require("../modals/Company"));
const helpers_1 = require("../helpers/helpers");
const Land_1 = __importDefault(require("../modals/Land"));
const Machine_1 = __importDefault(require("../modals/Machine"));
const Vehicle_1 = __importDefault(require("../modals/Vehicle"));
const Stock_1 = __importDefault(require("../modals/Stock"));
const Cashbook_1 = __importDefault(require("../modals/Cashbook"));
const Sales_1 = __importDefault(require("../modals/Sales"));
const Expense_1 = __importDefault(require("../modals/Expense"));
exports.buyAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.is('application/json')) {
        return res.json("Expects 'application/json'");
    }
    try {
        const { id, account, amount, name } = req.body;
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
        if (name === 'land') {
            if (account === 'cash') {
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
                yield Land_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: 'Purchased land by cash',
                });
                yield Cash_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
                yield Cashbook_1.default.create({
                    bank: amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: `Purchased ${name} by cash`,
                });
            }
            else if (account === 'bank') {
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
                yield Land_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: `Purchased ${name} by cheque`,
                });
                yield Bank_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
                yield Cashbook_1.default.create({
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
                yield Machine_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: 'Purchased machine by cash',
                });
                yield Cash_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
                yield Cashbook_1.default.create({
                    bank: amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: `Purchased ${name} by cash`,
                });
            }
            else if (account === 'bank') {
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
                yield Machine_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: 'Purchased machine by cheque',
                });
                yield Bank_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
                yield Cashbook_1.default.create({
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
                yield Vehicle_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: 'Purchased vehicle by cash',
                });
                yield Cash_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
                yield Cashbook_1.default.create({
                    bank: amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: `Purchased ${name} by cash `,
                });
            }
            else if (account === 'bank') {
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
                yield Vehicle_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: 'Purchased vehicle by cheque',
                });
                yield Bank_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
                yield Cashbook_1.default.create({
                    bank: amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: `Purchased ${name} by cheque`,
                });
            }
        }
        const data = yield helpers_1.getAllData(id);
        return res.status(201).json({
            success: true,
            data,
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
exports.buyStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.is('application/json')) {
        return res.json("Expects 'application/json'");
    }
    try {
        const { id, price, qty, account, item, sPrice } = req.body;
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
        const company = yield Company_1.default.findById(id);
        if (!company) {
            return res.status(200).json({
                success: false,
                error: 'Company does not exist',
            });
        }
        let code;
        const itemName = helpers_1.jsUcfirst(item);
        const available = yield Stock_1.default.find({ item: itemName, id });
        if (account === 'cash') {
            code = helpers_1.generateCode(8);
            yield Journal_1.default.create({
                amount: price * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'dr',
                details: itemName,
            });
            yield Journal_1.default.create({
                amount: price * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: itemName,
            });
            code = helpers_1.generateCode(8);
            if (!available.length) {
                yield Stock_1.default.create({
                    item: itemName,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    qty,
                    price,
                    sPrice,
                });
            }
            else {
                yield Stock_1.default.updateOne({ item: itemName, id }, { $inc: { qty: qty } });
            }
            yield Cash_1.default.create({
                amount: price * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: itemName,
            });
            yield Cashbook_1.default.create({
                cash: price * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: `Purchased ${qty} ${item} by cash`,
            });
        }
        if (account === 'bank') {
            code = helpers_1.generateCode(8);
            yield Journal_1.default.create({
                amount: price * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'dr',
                details: itemName,
            });
            yield Journal_1.default.create({
                amount: price * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: itemName,
            });
            code = helpers_1.generateCode(8);
            if (!available.length) {
                yield Stock_1.default.create({
                    item: itemName,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    qty,
                    price,
                    sPrice,
                });
            }
            else {
                yield Stock_1.default.updateOne({ item: itemName, id }, { $inc: { qty: qty } });
            }
            yield Bank_1.default.create({
                amount: price * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: itemName,
            });
            yield Cashbook_1.default.create({
                bank: price * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: `Purchased ${qty} ${item} by cash`,
            });
        }
        const data = yield helpers_1.getAllData(id);
        return res.status(201).json({
            success: true,
            data,
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
exports.sellStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.is('application/json')) {
        return res.json("Expects 'application/json'");
    }
    try {
        const { id, sPrice, qty, account, item } = req.body;
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
        const company = yield Company_1.default.findById(id);
        if (!company) {
            return res.status(200).json({
                success: false,
                error: 'Company does not exist',
            });
        }
        let code;
        if (account === 'cash') {
            code = helpers_1.generateCode(8);
            yield Journal_1.default.create({
                amount: sPrice * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'dr',
                details: `Sold ${qty} ${item} by cash`,
            });
            yield Journal_1.default.create({
                amount: sPrice * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: `Sold ${qty} ${item} by cash`,
            });
            code = helpers_1.generateCode(8);
            yield Stock_1.default.updateOne({ item, id }, { $inc: { sqty: qty } });
            yield Cash_1.default.create({
                amount: sPrice * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'dr',
                details: `Sold ${qty} ${item} by cash`,
            });
            yield Cashbook_1.default.create({
                cash: sPrice * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'dr',
                details: `Sold ${qty} ${item} by cash`,
            });
            yield Sales_1.default.create({
                amount: sPrice * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: `Sold ${qty} ${item} by cash`,
            });
        }
        if (account === 'bank') {
            code = helpers_1.generateCode(8);
            yield Journal_1.default.create({
                amount: sPrice * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'dr',
                details: `Sold ${qty} ${item} by cheque`,
            });
            yield Journal_1.default.create({
                amount: sPrice * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: `Sold ${qty} ${item} by cheque`,
            });
            code = helpers_1.generateCode(8);
            yield Stock_1.default.updateOne({ item, id }, { $inc: { sqty: qty } });
            yield Bank_1.default.create({
                amount: sPrice * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'dr',
                details: `Sold ${qty} ${item} by cheque`,
            });
            yield Cashbook_1.default.create({
                bank: sPrice * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'dr',
                details: `Sold ${qty} ${item} by cheque`,
            });
            yield Sales_1.default.create({
                amount: sPrice * qty,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: `Sold ${qty} ${item} by cheque`,
            });
        }
        const data = yield helpers_1.getAllData(id);
        return res.status(201).json({
            success: true,
            data,
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
exports.sellAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.is('application/json')) {
        return res.json("Expects 'application/json'");
    }
    try {
        const { id, account, amount, name } = req.body;
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
        if (name === 'land') {
            if (account === 'cash') {
                code = helpers_1.generateCode(8);
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: 'Cash',
                });
                code = helpers_1.generateCode(8);
                yield Land_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: 'Sold land by cash',
                });
                yield Cash_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: name,
                });
                yield Cashbook_1.default.create({
                    bank: amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: `Sold ${name} by cash`,
                });
            }
            else if (account === 'bank') {
                code = helpers_1.generateCode(8);
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: 'Bank',
                });
                code = helpers_1.generateCode(8);
                yield Land_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: 'Sold land by cheque',
                });
                yield Bank_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: name,
                });
                yield Cashbook_1.default.create({
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
                code = helpers_1.generateCode(8);
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: 'Cash',
                });
                code = helpers_1.generateCode(8);
                yield Machine_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: 'Sold machine by cash',
                });
                yield Cash_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: name,
                });
                yield Cashbook_1.default.create({
                    bank: amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: `Sold ${name} by cash`,
                });
            }
            else if (account === 'bank') {
                code = helpers_1.generateCode(8);
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: 'Bank',
                });
                code = helpers_1.generateCode(8);
                yield Machine_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: 'Sold machine by cheque',
                });
                yield Bank_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: name,
                });
                yield Cashbook_1.default.create({
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
                code = helpers_1.generateCode(8);
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: 'Cash',
                });
                code = helpers_1.generateCode(8);
                yield Vehicle_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: 'Sold vehicle by cash',
                });
                yield Cash_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: name,
                });
                yield Cashbook_1.default.create({
                    bank: amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: `Sold ${name} by cash`,
                });
            }
            else if (account === 'bank') {
                code = helpers_1.generateCode(8);
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: name,
                });
                yield Journal_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: 'Bank',
                });
                code = helpers_1.generateCode(8);
                yield Vehicle_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'cr',
                    details: 'Sold vehicle by cheque',
                });
                yield Bank_1.default.create({
                    amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: name,
                });
                yield Cashbook_1.default.create({
                    bank: amount,
                    pd: new Date().toISOString(),
                    code,
                    id,
                    type: 'dr',
                    details: `Sold ${name} by cheque`,
                });
            }
        }
        const data = yield helpers_1.getAllData(id);
        return res.status(201).json({
            success: true,
            data,
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
        const data = yield helpers_1.getAllData(id);
        return res.status(201).json({
            success: true,
            data,
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
exports.payExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.is('application/json')) {
        return res.json("Expects 'application/json'");
    }
    try {
        const { id, account, amount, name } = req.body;
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
                details: name,
            });
            code = helpers_1.generateCode(8);
            yield Cash_1.default.create({
                amount,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: name,
            });
            yield Cashbook_1.default.create({
                cash: amount,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: `Paid ${name} by cash`,
            });
            yield Expense_1.default.create({
                amount,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'dr',
                details: name,
            });
        }
        if (account === 'bank') {
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
                details: name,
            });
            code = helpers_1.generateCode(8);
            yield Bank_1.default.create({
                amount,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: name,
            });
            yield Cashbook_1.default.create({
                bank: amount,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'cr',
                details: `Paid ${name} by cheque`,
            });
            yield Expense_1.default.create({
                amount,
                pd: new Date().toISOString(),
                code,
                id,
                type: 'dr',
                details: name,
            });
        }
        const data = yield helpers_1.getAllData(id);
        return res.status(201).json({
            success: true,
            data,
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
