import express from 'express';
import productController from "../controllers/product"
let router = express.Router();

router.get('/', productController.findAll );
router.post('/', productController.validateBody(), productController.create)
router.delete('/:id', productController.delete)
router.put('/:id', productController.validateUpdateBody() ,productController.update)

export default router;
