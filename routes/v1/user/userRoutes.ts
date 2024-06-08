import { Router } from "express";
import { login, register } from "../../../controllers/v1/user/auth/authController";
import { check } from "express-validator";
import authCheck from "../../../middlewares/authCheck";
import { addReview, listReview } from "../../../controllers/v1/user/review/reviewController";


const router = Router() 

router.post('/register', [
    check('')
],  register)

router.post('/login', [check('email').not().isEmpty(), check('password').not().isEmpty()], login)

router.use(authCheck)

router.post('/review/list', listReview)

router.post('/review/add', [
    check('user').not().isEmpty(),
    check('book').not().isEmpty(),
    check('rating').not().isEmpty(),
    check('message').not().isEmpty()
], addReview)


export default router