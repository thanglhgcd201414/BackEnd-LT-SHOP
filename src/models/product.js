'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'categoryData' })
        }
    };
    Product.init({
        name: DataTypes.STRING,
        price: DataTypes.BIGINT,
        description: DataTypes.TEXT('long'),
        categoryId: DataTypes.INTEGER,
        image: DataTypes.BLOB('long')
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};