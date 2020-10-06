"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_URL = exports.FORGET_PASSWORD_PREFIX = exports.COOKIE_NAME = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === 'production';
exports.COOKIE_NAME = 'qid';
exports.FORGET_PASSWORD_PREFIX = 'forget-password:';
exports.SERVER_URL = !exports.__prod__
    ? 'http://localhost:8000'
    : 'https://cohot2.herokuapp.com';
