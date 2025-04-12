'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Xóa cột voucherId khỏi bảng OrderProducts
    await queryInterface.removeColumn('Orderproducts', 'voucherId');
  },

  down: async (queryInterface, Sequelize) => {
    // Thêm lại cột voucherId vào bảng OrderProducts
    await queryInterface.addColumn('Orderproducts', 'voucherId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};
