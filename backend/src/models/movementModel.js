const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Product = require('./productModel.js');

const Movement = sequelize.define('Movement', {
    type: {
        type: DataTypes.ENUM('entrada', 'salida'),
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    description: DataTypes.STRING
}, {
    timestamps: true
}, {
    timestamps: true
})

// relacion: un movieminto pertenece a una producto
Movement.belongsTo(Product, { foreingKey: 'productId'});

module.exports = Movement;