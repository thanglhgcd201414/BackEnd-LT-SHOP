'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Xóa bảng Banners
    await queryInterface.dropTable('Banners');
  },

  down: async (queryInterface, Sequelize) => {
    // Tạo lại bảng Banners
    await queryInterface.createTable('Banners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT('long')
      },
      name: {
        type: Sequelize.STRING
      },
      statusId: {
        type: Sequelize.STRING
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
  }
};
