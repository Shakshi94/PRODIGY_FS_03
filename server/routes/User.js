import express from 'express';
import {userRegister,
    userLogin, 
    getAllCartItems, 
    addToCart, 
    removeFromCart,
    getAllOrders,
    placeOrder,
    getUserFavourites,
    addToFavorites,
    removeFromFavorites} from '../controllers/User.js';
import { verifyToken, } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/signup',userRegister);

router.post('/signin',userLogin);

// Cart
router.get('/cart', verifyToken,getAllCartItems);
router.post('/cart', verifyToken,addToCart);
router.post('/cart', verifyToken,removeFromCart);

// order
router.get('/order' ,verifyToken,getAllOrders);
router.post('/order', verifyToken,placeOrder);

// Favourite
router.get('/favorite', verifyToken, getUserFavourites);
router.post('/favorite', verifyToken,addToFavorites);
router.post('/favorite', verifyToken,removeFromFavorites);

export default router;