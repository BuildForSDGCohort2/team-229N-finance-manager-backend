import { Router } from 'express';
import {
  buyAsset,
  getInitialData,
  sellAsset,
  buyStock,
  sellStock,
  payExpense,
} from '../controller/transaction';
import { auth } from '../helpers/helpers';
const router = Router();

/**
 * @description Buy asset
 * @route  /transaction/buyasset
 */
router.route('/buyasset').post(auth, buyAsset);

/**
 * @description Sell asset
 * @route  /transaction/sellasset
 */
router.route('/sellasset').post(auth, sellAsset);
/**
 * @description Buy stock
 * @route  /transaction/buystock
 */
router.route('/buystock').post(auth, buyStock);
/**
 * @description Sell stock
 * @route  /transaction/sellstock
 */
router.route('/sellstock').post(auth, sellStock);
/**
 * @description // Get journal
 * @route  /transactions/getjournal
 */
router.route('/getInitialData/:id').get(auth, getInitialData);

/**
 * @description pay expense
 * @route  /transaction/payexpense
 */
router.route('/payexpense').post(auth, payExpense);
export default router;
