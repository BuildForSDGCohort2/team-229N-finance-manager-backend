"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_1 = require("../controller/transaction");
const helpers_1 = require("../helpers/helpers");
const router = express_1.Router();
router.route('/manageasset').post(helpers_1.auth, transaction_1.manageAsset);
router.route('/getInitialData/:id').get(helpers_1.auth, transaction_1.getInitialData);
exports.default = router;
