'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Xóa các bảng liên quan đến ProductDetail
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
  },

  down: async (queryInterface, Sequelize) => {
    // Không cần khôi phục các bảng này vì chúng ta đang đơn giản hóa ứng dụng
    console.log('Không thể khôi phục các bảng đã xóa');
  }
};
