'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Xóa bảng Products cũ nếu tồn tại
    try {
      await queryInterface.dropTable('Products');
    } catch (error) {
      console.log('Bảng Products không tồn tại hoặc đã bị xóa');
    }
    
    // Tạo bảng Products mới với cấu trúc đơn giản
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.BIGINT,
        allowNull: false
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
