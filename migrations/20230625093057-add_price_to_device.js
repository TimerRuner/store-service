'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const [results] = await queryInterface.describeTable('device');
    if (!results.hasOwnProperty('price')) {
      await queryInterface.addColumn('device', 'price', {
        type: Sequelize.INTEGER,
        defaultValue: 40000,
        allowNull: false,
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('device', 'price');
  }
};
