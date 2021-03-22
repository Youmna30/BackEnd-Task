const Sequelize = require('sequelize')
import db  from '../config/database';  

const Category = db.define('Category',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING(45),
        allowNull: false
    },
    parent_id:{
        type: Sequelize.INTEGER,
        references:{
            model: 'categories',
            key:'id'
        },
        allowNull: true
    }
})

Category.sync()

export default Category;