import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import {
    create,
    getProducts,
    getSingleProduct,
    getProductPhoto,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js";
import formidable from "express-formidable";
const router = express.Router();



router.post('/create', requireSignIn, isAdmin, formidable(), create);
router.get('/list', getProducts);
router.get('/single-product/:slug', getSingleProduct);
router.get('/photo-product/:pid', getProductPhoto);
router.put('/update/:pid', requireSignIn, isAdmin, formidable(), updateProduct);
router.delete('/delete/:pid', requireSignIn, isAdmin, formidable(), deleteProduct);
// Add routes
// route.get('/',);
// route.post('/', SessionController.store);
// route.put('/', SessionController.store);
// route.delete('/', SessionController.store);

export default router;
