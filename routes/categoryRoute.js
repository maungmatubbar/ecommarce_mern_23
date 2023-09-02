import express from "express";
import {
    createCategory,
    updateCategory,
    getCategories
} from "../controllers/categoryController.js";
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'


const router = express.Router();


//Category create
router.post('/create', requireSignIn, isAdmin, createCategory);
//Category Update
router.put('/update/:id', requireSignIn, isAdmin, updateCategory);
//Categories list
router.get('/list', getCategories);


export default router;