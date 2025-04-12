'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Xóa bảng ReceiptDetails trước vì nó có khóa ngoại tham chiếu đến Receipts
    await queryInterface.dropTable('ReceiptDetails');
    
    // Xóa bảng Receipts
    await queryInterface.dropTable('Receipts');
  },

  down: async (queryInterface, Sequelize) => {
    // Tạo lại bảng Receipts
    await queryInterface.createTable('Receipts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      supplierId: {
        type: Sequelize.INTEGER
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

    // Tạo lại bảng ReceiptDetails
    await queryInterface.createTable('ReceiptDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      receiptId: {
        type: Sequelize.INTEGER
      },
      productDetailSizeId: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.BIGINT
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
