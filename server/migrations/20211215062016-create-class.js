"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      "classes",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.BIGINT,
        },
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: "actions_unique",
        },
        school_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          unique: "actions_unique",
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ["name", "school_id"],
          },
        },
      }
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("classes");
  },
};
