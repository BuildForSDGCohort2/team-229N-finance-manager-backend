"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const code_1 = require("../controller/code");
const helpers_1 = require("../helpers/helpers");
const router = express_1.Router();
router.route('/create').post(helpers_1.auth, code_1.createCode);
router.route('/verify').post(helpers_1.auth, code_1.verifyCode);
exports.default = router;
