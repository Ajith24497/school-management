"use strict";

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn("schools", "is_deleted", {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn("schools", "is_deleted");
  },
};
