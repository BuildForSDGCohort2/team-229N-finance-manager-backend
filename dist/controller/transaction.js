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
exports.get = exports.setUp = void 0;
const helpers_1 = require("../helpers/helpers");
const Company_1 = __importDefault(require("../modals/Company"));
const Journal_1 = __importDefault(require("../modals/Journal"));
exports.setUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.is('application/json')) {
        return res.json("Expects 'application/json'");
    }
    try {
        const { id, cash, bank } = req.body;
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
        const company = yield Company_1.default.findById(id);
        if (!company) {
            return res.status(200).json({
                success: false,
                error: 'Company does not exist',
            });
        }
        if (cash) {
            const ref = helpers_1.generateCode(8);
            yield Journal_1.default.create({
                amount: cash,
                pd: new Date().toISOString(),
                ref,
                id,
                type: 'dr',
                details: 'Cash',
            });
            yield Journal_1.default.create({
                amount: cash,
                pd: new Date().toISOString(),
                ref,
                id,
                type: 'cr',
                details: 'Capital',
            });
        }
        if (bank) {
            const ref = helpers_1.generateCode(8);
            yield Journal_1.default.create({
                amount: bank,
                pd: new Date().toISOString(),
                ref,
                id,
                type: 'dr',
                details: 'Bank',
            });
            yield Journal_1.default.create({
                amount: bank,
                pd: new Date().toISOString(),
                ref,
                id,
                type: 'cr',
                details: 'Capital',
            });
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
exports.get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(200).json({
                success: false,
                error: 'Error try again',
            });
        }
        const resp = yield Journal_1.default.aggregate([
            {
                $group: {
                    _id: '$ref',
                    data: { $push: '$$ROOT' },
                },
            },
        ]);
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
