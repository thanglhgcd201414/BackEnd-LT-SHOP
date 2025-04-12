'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Xóa các bảng liên quan đến voucher
    try {
      await queryInterface.dropTable('Voucheruseds');
    } catch (error) {
      console.log('Bảng Voucheruseds không tồn tại hoặc đã bị xóa');
    }
    
    try {
      await queryInterface.dropTable('Vouchers');
    } catch (error) {
      console.log('Bảng Vouchers không tồn tại hoặc đã bị xóa');
    }
    
    try {
      await queryInterface.dropTable('Typevouchers');
    } catch (error) {
      console.log('Bảng Typevouchers không tồn tại hoặc đã bị xóa');
    }
    
    // Xóa bảng Banner
    try {
      await queryInterface.dropTable('Banners');
    } catch (error) {
      console.log('Bảng Banners không tồn tại hoặc đã bị xóa');
    }
    
    // Xóa các bảng liên quan đến messages
    try {
      await queryInterface.dropTable('Messages');
    } catch (error) {
      console.log('Bảng Messages không tồn tại hoặc đã bị xóa');
    }
    
    try {
      await queryInterface.dropTable('RoomMessages');
    } catch (error) {
      console.log('Bảng RoomMessages không tồn tại hoặc đã bị xóa');
    }
    
    // Xóa bảng Statistics nếu có
    try {
      await queryInterface.dropTable('Statistics');
    } catch (error) {
      console.log('Bảng Statistics không tồn tại hoặc đã bị xóa');
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Không cần khôi phục các bảng này vì chúng ta đang tối ưu hóa ứng dụng
    console.log('Không thể khôi phục các bảng đã xóa');
  }
};
