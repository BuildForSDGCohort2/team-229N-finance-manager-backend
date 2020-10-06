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
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("./api");
describe('Authentication', () => {
    test('should bring an error when login fails ', () => __awaiter(void 0, void 0, void 0, function* () {
        const expected = {
            success: false,
            error: 'Wrong crendetials',
        };
        const res = yield api_1.login({
            email: 'herbertbruce8@gmail.com',
            password: 'mmmmmmnh',
        });
        expect(res.data).toEqual(expected);
    }));
    test('should login successfuly ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield api_1.login({
            email: 'herbertbruce8@gmail.com',
            password: 'mmmmmm',
        });
        expect(res.data.data.name).toEqual('Herbert Kavuma');
    }));
});
