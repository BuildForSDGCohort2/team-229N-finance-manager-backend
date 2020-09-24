import { Router } from 'express';
import { manageAsset, getInitialData } from '../controller/transaction';
import { auth } from '../helpers/helpers';
const router = Router();

/**
 * @description buy and sell asset
 * @route  /transaction/getcash
 */
router.route('/manageasset').post(auth, manageAsset);

/**
 * @description get bank balances
 * @route  /transaction/getbank
 */
// router.route('/getbank/:id').get(auth, getbank);
/**
 * @description get capital balances
 * @route  /transaction/getcapital
 */
// router.route('/getcapital/:id').get(auth, getcapital);

/**
 * @description // Get journal
 * @route  /transactions/getjournal
 */
// router.route('/getjournal/:id').get(auth, getjournal);
/**
 * @description // Get journal
 * @route  /transactions/getjournal
 */
router.route('/getInitialData/:id').get(auth, getInitialData);

export default router;
