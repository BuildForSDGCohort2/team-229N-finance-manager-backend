import { Router } from 'express';
import { createCompany, getCompanies } from '../controller/company';
import { auth } from '../helpers/helpers';
const router = Router();

/**
 * @description Create company
 * @route  /company/create
 */
router.route('/create').post(auth, createCompany);

/**
 * @description // get companies
 * @route  /company/companies
 */
router.route('/companies').get(auth, getCompanies);

export default router;
// module.exports = router
