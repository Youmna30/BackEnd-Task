import { body } from 'express-validator'
import { checkValidations, apiError } from '../config/checkMethod'
import Product from '../models/Product'
import Provider from '../models/Provider'
import Product_Provider from '../models/Product-provider'
import Sequelize from 'sequelize'
import Category from '../models/Category';
const Op = Sequelize.Op


export default {

    // View all Product-Provviders
    async findAll(req, res, next) {
        try {

            let { category } = req.query
            let page = +req.query.page || 1, limit = +req.query.limit || 25;
            let Product_providers = []
            if (category) {
                let products = await Product.findAll({ where: { category_id: category }, attributes: ['id'], row: true })
                products.forEach(function (product, index) {
                    products[index] = product.id
                })

                Product_providers = await Product_Provider.findAll({
                    where: { product_id: { [Op.in]: products } }, 
                    order: [['price', 'ASC']],
                    limit: limit, offset: (page - 1) * limit,
                    include: [{ model: Product, include: [{ model: Category }] }, { model: Provider }]
                });
            } else {
                Product_providers = await Product_Provider.findAll({ limit: limit, offset: (page - 1) * limit, 
                 include: [{ model: Product, include: [{ model: Category }] }, { model: Provider }],
                 order: [['createdAt', 'ASC'] ]});
            }
            res.status(200).send(Product_providers)
        } catch (error) {
            next(error)
        }
    },

    // Validate the data of add new Product-Provider
    validateBody() {
        let validations = [
            body('product_id').not().isEmpty().withMessage("Enter product's id"),
            body('provider_id').not().isEmpty().withMessage("Enter procider's id"),
            body('price').not().isEmpty().withMessage("Enter price"),
            body('available').not().isEmpty().withMessage("Choose availability")
        ]
        return validations
    },

    // Add a new Product-Provider
    async create(req, res, next) {
        try {
            let data = checkValidations(req)
            let product = await Product.findOne({ where: { id: data.product_id } })
            if (!product) {
                return next(apiError(404, "Product isn't found"))

            }
            let provider = await Provider.findOne({ where: { id: data.provider_id } })
            if (!provider) {
                return next(apiError(404, "Provider isn't found"))

            }
            let product_provider_existed = await Product_Provider.findOne({ where: { product_id: data.product_id, provider_id: data.provider_id } })
            if (product_provider_existed) {
                return next(apiError(404, "Product-Provider is already existed"))
            }
            const product_provider = await Product_Provider.create(data);
            res.status(201).send(product_provider)

        } catch (error) {
            next(error)
        }
    },

    // Delete an existing Product-Provider
    async delete(req, res, next) {
        try {
            let id = req.params.id;
            let product_provider = await Product_Provider.findOne({ where: { id: id } })

            if (!product_provider) {
                return next(apiError(404, "product_provider isn't found"))
            }

            await product_provider.destroy({
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
            body('product_id').not().isEmpty().withMessage("Enter product's id"),
            body('provider_id').not().isEmpty().withMessage("Enter procider's id"),
            body('price').not().isEmpty().withMessage("Enter price"),
            body('available').not().isEmpty().withMessage("Choose availability")
        ]
        return validations
    },
    // Update an existing Product_Provider
    async update(req, res, next) {
        try {
            let { id } = req.params
            let data = checkValidations(req)
            let product_provider = await Product_Provider.findOne({ where: { id: id } })
            if (!product_provider) {
                return next(apiError(404, "Product_Provider isn't found"))

            }
            if (data.product_id) {
                let product = await Product.findOne({ where: { id: data.product_id } })
                if (!product) {
                    return next(apiError(404, "Product isn't found"))

                }
            }
            if (data.provider_id) {
                let provider = await Provider.findOne({ where: { id: data.provider_id } })
                if (!provider) {
                    return next(apiError(404, "Provider isn't found"))

                }
            }
            product_provider.product_id = data.product_id ? data.product_id : product_provider.product_id
            product_provider.provider_id = data.provider_id ? data.provider_id : product_provider.provider_id
            product_provider.price = data.price ? data.price : product_provider.price
            product_provider.available = data.available ? data.available : product_provider.available
            await product_provider.save()

            res.status(201).send(product_provider)

        } catch (error) {
            next(error)
        }
    },
}