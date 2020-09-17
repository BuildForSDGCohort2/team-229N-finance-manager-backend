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
exports.generateCode = exports.getMe = exports.auth = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
            res.status(401).json({
                message: 'Invalid or expired token',
            });
        }
    }
    else {
        res.status(401).json({
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
