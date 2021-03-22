const Sequelize = require('sequelize')
import db  from '../config/database';  

const Product = db.define('Product',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING(45),
        allowNull: false
    },
    image_uri:{
        type:Sequelize.STRING,
        allowNull: false
    },
    category_id:{
        type: Sequelize.INTEGER,
        references:{
            model: 'categories',
            key:'id'
        },
        allowNull: false
    },
    featured:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

Product.sync()

export default Product;