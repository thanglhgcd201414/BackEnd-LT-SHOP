'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Xóa bảng Voucheruseds trước vì nó có khóa ngoại tham chiếu đến Vouchers
    await queryInterface.dropTable('Voucheruseds');
    
    // Xóa bảng Vouchers
    await queryInterface.dropTable('Vouchers');
    
    // Xóa bảng Typevouchers
    await queryInterface.dropTable('Typevouchers');
  },

  down: async (queryInterface, Sequelize) => {
    // Tạo lại bảng Typevouchers
    await queryInterface.createTable('Typevouchers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeVoucher: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.BIGINT
      },
      maxValue: {
        type: Sequelize.BIGINT
      },
      minValue: {
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

    // Tạo lại bảng Vouchers
    await queryInterface.createTable('Vouchers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      fromDate: {
        type: Sequelize.STRING
      },
      toDate: {
        type: Sequelize.STRING
      },
      typeVoucherId: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER
      },
      codeVoucher: {
        type: Sequelize.STRING
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

    // Tạo lại bảng Voucheruseds
    await queryInterface.createTable('Voucheruseds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      voucherId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
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
