import express from 'express';
import categoryController from "../controllers/category"
let router = express.Router();

router.get('/', categoryController.findAll );
router.post('/', categoryController.validateBody(), categoryController.create)
router.delete('/:id', categoryController.delete)
router.put('/:id', categoryController.validateUpdateBody() , categoryController.update)

export default router;
