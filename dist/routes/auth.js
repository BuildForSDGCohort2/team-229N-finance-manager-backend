"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const router = express_1.Router();
router.route('/login').post(auth_1.login);
router.route('/register').post(auth_1.register);
exports.default = router;
