import express from "express";
import { userRegister, userLogin, test } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
//router object

const router = express.Router();

//routing

//register || Method Post

router.post('/register', userRegister);

// Login || POST
router.post('/login', userLogin);
//test
router.get('/test', requireSignIn, isAdmin, test);


export default router;