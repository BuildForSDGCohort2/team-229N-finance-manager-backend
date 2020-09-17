import { Router } from 'express';
import { createCode, verifyCode } from '../controller/code';
import { auth } from '../helpers/helpers';
const router = Router();

/**
 * @description create security code
 * @route  /code/create
 */
router.route('/create').post(auth, createCode);

/**
 * @description // verify security code
 * @route  /code/verify
 */
router.route('/verify').post(auth, verifyCode);

export default router;
// module.exports = router
