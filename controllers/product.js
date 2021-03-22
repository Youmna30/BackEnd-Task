import Product from '../models/Product'
import { body } from 'express-validator'
import { checkValidations, apiError } from '../config/checkMethod'
import Category from '../models/Category'

export default {

    // View all Products
    async findAll(req, res, next) {
        try {
            let page = +req.query.page || 1, limit = +req.query.limit || 25;
            let products = await Product.findAll({
                limit: limit, offset: (page - 1) * limit,
                include: [Category],
                order: [['createdAt', 'ASC']]
            })
            res.status(200).send(products)
        } catch (error) {
            next(error)
        }
    },

    // Validate the data of add new Product
    validateBody() {
        let validations = [
            body('name').not().isEmpty().withMessage("Enter name of the product"),
            body('image_uri').not().isEmpty().withMessage("Enter image uri of the product"),
            body('category_id').not().isEmpty().withMessage("Enter category of the product"),
            body('featured').optional().not().isEmpty().withMessage("Specify Product is featured or not"),
            

        ]
        return validations
    },

    // Add a new Product
    async create(req, res, next) {
        try {
            let data = checkValidations(req)
            let category = await Category.findOne({ where: { id: data.category_id } })
            if (!category) {
                return next(apiError(404, "Category isn't found"))

            }
            const product = await Product.create(data);
            res.status(201).send(product)

        } catch (error) {
            next(error)
        }
    },

    // Delete an existing product
    async delete(req, res, next) {
        try {
            let id = req.params.id;
            let product = await Product.findOne({ where: { id: id } })

            if (!product) {
                return next(apiError(404, "Product isn't found"))
            }

            await Product.destroy({
                where: {
                    id: id
                }
            });

            res.status(200).send("Deleted Successfully")

        } catch (error) {
            next(error)
        }
    },
    validateUpdateBody() {
        let validations = [
            body('name').optional().not().isEmpty().withMessage("Enter name of the product"),
            body('image_uri').optional().not().isEmpty().withMessage("Enter image uri of the product"),
            body('category_id').optional().not().isEmpty().withMessage("Enter category of the product"),
            body('featured').optional().not().isEmpty().withMessage("Specify Product is featured or not"),
            

        ]
        return validations
    },
    // Update an existing Product
    async update(req, res, next) {
        try {
            let { id } = req.params
            let data = checkValidations(req)
            let product = await Product.findOne({ where: { id: id } })
            if (!product) {
                return next(apiError(404, "Product isn't found"))

            }
            if (data.category_id) {
                let category = await Category.findOne({ where: { id: data.category_id } })
                if (!category) {
                    return next(apiError(404, "Category isn't found"))

                }
            }
            product.name = data.name ? data.name : product.name
            product.image_uri = data.image_uri ? data.image_uri : product.image_uri
            product.category_id = data.category_id ? data.category_id : product.category_id
            product.featured = data.featured ? data.featured : product.featured
        
            await product.save()

            res.status(201).send(product)

        } catch (error) {
            next(error)
        }
    },
}