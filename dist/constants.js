"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_URL = exports.FORGET_PASSWORD_PREFIX = exports.COOKIE_NAME = exports.__prod__ = void 0;
const is_ci_1 = __importDefault(require("is-ci"));
exports.__prod__ = process.env.NODE_ENV === 'production';
exports.COOKIE_NAME = 'qid';
exports.FORGET_PASSWORD_PREFIX = 'forget-password:';
exports.SERVER_URL = exports.__prod__ || is_ci_1.default ? 'https://cohot2.herokuapp.com' : 'http://localhost:8000';
