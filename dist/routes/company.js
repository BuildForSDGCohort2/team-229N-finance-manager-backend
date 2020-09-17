"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_1 = require("../controller/company");
const helpers_1 = require("../helpers/helpers");
const router = express_1.Router();
router.route('/create').post(helpers_1.auth, company_1.createCompany);
router.route('/companies').get(helpers_1.auth, company_1.getCompanies);
exports.default = router;
