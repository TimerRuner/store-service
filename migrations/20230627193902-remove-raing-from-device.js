'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.removeColumn('device', 'rating');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('device', 'rating', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    });
  }
};
