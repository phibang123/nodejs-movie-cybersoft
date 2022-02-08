const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class LoaiNguoiDung extends Model {
    static associate(db)
    {
      this.hasMany(db.NguoiDung, {
        foreignKey: "LND_maLoaiNguoiDung",
      })
    }
  }

  LoaiNguoiDung.init(
    {
      LND_maLoaiNguoiDung: {
        type: DataTypes.STRING, //  
        primaryKey: true,
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
      modelName: "LoaiNguoiDung",
      tableName: "loaiNguoiDung",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return LoaiNguoiDung;
};
