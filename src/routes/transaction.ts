import { Router } from 'express';
import { setUp, get } from '../controller/transaction';
import { auth } from '../helpers/helpers';
const router = Router();

/**
 * @description setup balances
 * @route  /transaction/setup
 */
router.route('/setup').post(auth, setUp);

/**
 * @description // verify security code
 * @route  /code/verify
 */
router.route('/get/:id').get(auth, get);

export default router;
