"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      "students",
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
        user_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        roll_no: {
          type: DataTypes.INTEGER,
        },
        reg_no: {
          type: DataTypes.BIGINT,
          allowNull: false,
          unique: "actions_unique",
        },
        school_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          unique: "actions_unique",
        },
        class_sec_id: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        phone_no: {
          type: DataTypes.STRING(15),
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        parent_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        parent_mobile_no: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        gender: {
          type: DataTypes.ENUM,
          values: ["male", "female", "transgender"],
          allowNull: false,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        blood_group: {
          type: DataTypes.ENUM,
          values: ["B+ve", "A+ve", "B-ve"],
          allowNull: false,
        },
        date_of_birth: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        is_deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
            fields: ["reg_no", "school_id"],
          },
        },
      }
    );
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("students");
  },
};
