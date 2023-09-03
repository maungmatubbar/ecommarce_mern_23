import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware'
import { create } from "../controllers/ProductController";
const router = express.Router();



router.post('/create', requireSignIn, isAdmin, create)
// Add routes
// route.get('/',);
// route.post('/', SessionController.store);
// route.put('/', SessionController.store);
// route.delete('/', SessionController.store);

export default router;
