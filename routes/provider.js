import express from 'express';
import providerController from "../controllers/provider"
let router = express.Router();

router.get('/', providerController.findAll );
router.post('/', providerController.validateBody(), providerController.create)
router.delete('/:id', providerController.delete)
router.put('/:id', providerController.validateUpdateBody() ,providerController.update)
export default router;
