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


const router = express.Router();

router.post('/signup',userRegister);

router.post('/signin',userLogin);

// Cart
router.get('/cart',getAllCartItems);
router.post('/cart',addToCart);
router.post('/cart',removeFromCart);

// order
router.get('/order',getAllOrders);
router.post('/order',placeOrder);

// Favourite
router.get('/favorite', getUserFavourites);
router.post('/favorite',addToFavorites);
router.post('/favorite',removeFromFavorites);

export default router;