const Sequelize = require('sequelize')
import db  from '../config/database';  

const Product_Provider = db.define('Product_Provider',{
    product_id: {
        type: Sequelize.INTEGER,
        references:{
            model: 'products',
            key:'id'
        },
        allowNull: false
    },
    provider_id: {
        type: Sequelize.INTEGER,
        references:{
            model: 'providers',
            key:'id'
        },
        allowNull: false
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull: false
    },
    available:{
        type: Sequelize.BOOLEAN,
        allowNull: false
        
    }
})
Product_Provider.sync()

export default Product_Provider;