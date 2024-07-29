import express from 'express';
import { addProducts,getProductById,getProducts,removeAllProducts} from '../controllers/Products.js';


const router = express.Router();

router.post('/add', addProducts);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.delete("/remove", removeAllProducts);
export default router;