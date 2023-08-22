import express from "express";
import { createCategory } from "../controllers/categoryController.js";
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'


const router = express.Router();


//Category create
router.post('/create', requireSignIn, isAdmin, createCategory);


export default router;