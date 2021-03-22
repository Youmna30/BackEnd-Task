import express from 'express';
import product_providerController from "../controllers/product-provider"
let router = express.Router();

router.get('/', product_providerController.findAll );
router.post('/', product_providerController.validateBody(), product_providerController.create)
router.delete('/:id', product_providerController.delete)
router.put('/:id',product_providerController.validateUpdateBody(), product_providerController.update)


export default router;
