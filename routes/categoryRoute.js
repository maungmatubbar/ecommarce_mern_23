import express from "express";
import {
    createCategory,
    updateCategory,
    getCategories,
    getSingleCategory,
    deleteCategory
} from "../controllers/categoryController.js";
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'


const router = express.Router();


//Category create
router.post('/create', requireSignIn, isAdmin, createCategory);
//Category Update
router.put('/update/:id', requireSignIn, isAdmin, updateCategory);
//Categories list
router.get('/list', getCategories);
//Get single category
router.get('/single/:slug', getSingleCategory);

//Delete category
router.delete('/delete/:id', requireSignIn, isAdmin, deleteCategory);
export default router;