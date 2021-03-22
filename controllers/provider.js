import {body} from 'express-validator'
import {checkValidations , apiError} from '../config/checkMethod'
import Provider from '../models/Provider'

export default {

    // View all providers
    async findAll(req,res,next){
        try {            
            let page = +req.query.page || 1, limit = +req.query.limit || 25;            
            let providers = await Provider.findAll({limit: limit, offset: (page -1) * limit,
                order: [['createdAt', 'ASC']]});            
            res.status(200).send(providers)
        } catch (error) {            
            next(error)
        }
    },

    // Validate the data of add new Provider
    validateBody(){
        let validations =[
            body('name').not().isEmpty().withMessage("Enter name of the provider"),            
        ]
        return validations
    },

    // Add a new Provider
    async create(req,res,next){
        try {
            let data = checkValidations(req)
            const provider = await Provider.create(data);
            res.status(201).send(provider)
            
        } catch (error) {
            next(error)
        }
    },

    // Delete an existing provider
    async delete(req,res,next){
        try {
            let id = req.params.id;
            let provider = await Provider.findOne({where:{ id:id}})
            
            if(!provider){
                return next(apiError(404,"Provider isn't found"))
            }

            await Provider.destroy({
                where: {
                  id: id
                }
              });
            
            res.status(200).send("Deleted Successfully")
            
        } catch (error) {
            next(error)
        }
    },
    validateUpdateBody(){
        let validations =[
            body('name').optional().not().isEmpty().withMessage("Enter name of the provider"),            
        ]
        return validations
    },
    // Update an existing Provider
    async update(req,res,next){
        try {
            let {id} = req.params
            let data = checkValidations(req)            
            let provider = await Provider.findOne({where:{id:id}})
            if(!provider){
                return next(apiError(404,"Provider isn't found"))

            }
             provider.name = data.name ? data.name : provider.name
             await provider.save ()
             res.status(201).send(provider)
            
        } catch (error) {
            next(error)
        }
    },
}