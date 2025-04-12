'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Xóa bảng Messages
    await queryInterface.dropTable('Messages');
    
    // Xóa bảng RoomMessages
    await queryInterface.dropTable('RoomMessages');
  },

  down: async (queryInterface, Sequelize) => {
    // Tạo lại bảng RoomMessages
    await queryInterface.createTable('RoomMessages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userOne: {
        type: Sequelize.INTEGER
      },
      userTwo: {
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

    // Tạo lại bảng Messages
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.TEXT('long')
      },
      userId: {
        type: Sequelize.INTEGER
      },
      roomId: {
        type: Sequelize.INTEGER
      },
      unRead: {
        type: Sequelize.BOOLEAN
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
