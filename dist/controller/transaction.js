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
exports.getInitialData = void 0;
const Cash_1 = __importDefault(require("../modals/Cash"));
const Journal_1 = __importDefault(require("../modals/Journal"));
const Bank_1 = __importDefault(require("../modals/Bank"));
const Capital_1 = __importDefault(require("../modals/Capital"));
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
        return res.status(201).json({
            success: true,
            data: {
                capital,
                bank,
                cash,
                journal,
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
