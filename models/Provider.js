const Sequelize = require('sequelize')
import db  from '../config/database';  

const Provider = db.define('Provider',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING(45),
        allowNull: false
    }
})
Provider.sync()

export default Provider;