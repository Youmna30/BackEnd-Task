import express from 'express';
import productRoutes from './routes/product'
import categoryRoutes from './routes/category'
import providerRoutes from './routes/provider'
import product_providerRoutes from './routes/product-provider'

var router = express.Router();

// handle all routes 

router.use('/product',productRoutes)
router.use('/category',categoryRoutes)
router.use('/provider',providerRoutes)
router.use('/product_provider',product_providerRoutes)

export default router;
