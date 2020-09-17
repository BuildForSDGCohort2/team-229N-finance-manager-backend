import { Router } from 'express';
import { register, login } from '../controller/auth';
const router = Router();

/**
 * @description Login user
 * @route  /auth/login
 */
router.route('/login').post(login);

/**
 * @description Register user
 * @route  /auth/register
 */
router.route('/register').post(register);
// @desc    Logout user
// @route   /auth/logout
// router.get('/logout', (req, res) => {
// //   req.logout()
// res.send('Logout here')
// })

export default router;
// module.exports = router
