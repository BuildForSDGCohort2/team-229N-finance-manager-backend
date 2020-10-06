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
const axios_1 = __importDefault(require("axios"));
const api_1 = require("./api");
describe('Company', () => {
    test('should show error when no auth token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const expected = {
            message: 'Auth token required',
        };
        const res = yield api_1.getCompanies();
        expect(res.data).toEqual(expected);
    }));
    test('should list registerd companies when auth token is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield api_1.login({
            email: 'herbertbruce8@gmail.com',
            password: 'mmmmmm',
        });
        const token = data.token;
        axios_1.default.defaults.headers.common['Authorization'] = token;
        const res = yield api_1.getCompanies();
        expect(res.data.data[0].name).toEqual('Netbritz');
    }));
});
