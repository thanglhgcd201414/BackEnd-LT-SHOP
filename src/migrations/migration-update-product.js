'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Xóa các bảng liên quan đến Product trước
    try {
      await queryInterface.dropTable('ProductDetailSizes');
    } catch (error) {
      console.log('Bảng ProductDetailSizes không tồn tại hoặc đã bị xóa');
    }
    
    try {
      await queryInterface.dropTable('ProductImages');
    } catch (error) {
      console.log('Bảng ProductImages không tồn tại hoặc đã bị xóa');
    }
    
    try {
      await queryInterface.dropTable('ProductDetails');
    } catch (error) {
      console.log('Bảng ProductDetails không tồn tại hoặc đã bị xóa');
    }
    
    // Tạo bảng Products mới
    await queryInterface.dropTable('Products');
    
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.BIGINT
      },
      description: {
        type: Sequelize.TEXT('long')
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        }
      },
      image: {
        type: Sequelize.BLOB('long')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};
