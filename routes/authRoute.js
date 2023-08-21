import express from "express";
import { userRegister, userLogin, test, forgotPassword } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
//router object

const router = express.Router();

//routing

/************AuthController************/
//register || Method Post

router.post('/register', userRegister);

// Login || POST
router.post('/login', userLogin);
//test
router.get('/test', requireSignIn, isAdmin, test);

//Forgot Password || POST
router.post('/forgot-password',forgotPassword);

//user auth
router.get('/user-auth',requireSignIn, (req, res)=>{
    res.status(200).send({ok: true});
})
/************AuthController************/

export default router;