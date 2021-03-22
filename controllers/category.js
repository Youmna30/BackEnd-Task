import { body } from 'express-validator'
import { checkValidations, apiError } from '../config/checkMethod'
import Category from '../models/Category'

export default {

    // View all Catgories
    async findAll(req, res, next) {
        try {
            let page = +req.query.page || 1, limit = +req.query.limit || 25;
            let categories = await Category.findAll({ limit: limit, offset: (page - 1) * limit,  
                order: [['createdAt', 'ASC']] });
            res.status(200).send(categories)
        } catch (error) {
            next(error)
        }
    },

    // Validate the data of add new Category
    validateBody() {
        let validations = [
            body('name').not().isEmpty().withMessage("Enter name of the category"),
            body('parent_id').optional().not().isEmpty().withMessage("Enter category's parent"),

        ]
        return validations
    },

    // Add a new Category
    async create(req, res, next) {
        try {
            let data = checkValidations(req)
            if (data.parent_id) {
                let parent_category = await Category.findOne({ where: { id: data.parent_id } })
                if (!parent_category) {
                    return next(apiError(404, "Category's parent isn't found"))

                }
            }
            const category = await Category.create(data);
            res.status(201).send(category)

        } catch (error) {
            next(error)
        }
    },

    // Delete an existing category
    async delete(req, res, next) {
        try {
            let id = req.params.id;
            let category = await Category.findOne({ where: { id: id } })

            if (!category) {
                return next(apiError(404, "Category isn't found"))
            }

            await Category.destroy({
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
            body('name').optional().not().isEmpty().withMessage("Enter name of the category"),
            body('parent_id').optional().not().isEmpty().withMessage("Enter category's parent"),

        ]
        return validations
    },
    // Update an existing Category
    async update(req, res, next) {
        try {
            let { id } = req.params
            let data = checkValidations(req)            
            let category = await Category.findOne({ where: { id: id } })
            if (!category) {
                return next(apiError(404, "Category isn't found"))

            }
            if (data.parent_id) {
                let parent_category = await Category.findOne({ where: { id: data.parent_id } })
                if (!parent_category) {
                    return next(apiError(404, "Category's parent isn't found"))

                }
            }
            category.name = data.name ? data.name : category.name
            category.parent_id = data.parent_id ? data.parent_id : category.parent_id
            await category.save()

            res.status(201).send(category)

        } catch (error) {
            next(error)
        }
    },
}