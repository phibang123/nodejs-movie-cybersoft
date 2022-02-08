const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Ghe extends Model {
    static associate(db) {

    
    }
  }

  Ghe.init(
    {
      G_maGhe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      G_tenGhe: {
        type: DataTypes.STRING, 
        collate: 'utf8_unicode_ci', 
        allowNull: false
      },
      G_loaiGhe: {
        type: DataTypes.STRING, 
        collate: 'utf8_unicode_ci', 
        allowNull: false
      },
      G_stt: {
        type: DataTypes.INTEGER, 
      },
      
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at"
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "Ghe",
      tableName: "ghe",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return Ghe;
};
