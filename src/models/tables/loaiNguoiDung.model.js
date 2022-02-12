const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class LoaiNguoiDung extends Model {
    static associate(db)
    {
      this.hasMany(db.NguoiDung, {
        as: "loaiNguoiDung",
        foreignKey: "LND_maLoaiNguoiDung",
      })
    }
  }

  LoaiNguoiDung.init(
    {
      LND_maLoaiNguoiDung: {
        type: DataTypes.STRING, //  
        unique: true,
        primaryKey: true,
      },
      LND_tenLoai: {
        type: DataTypes.STRING, //  
       
      },
     
    },
    {
      sequelize,
      modelName: "LoaiNguoiDung",
      tableName: "loaiNguoiDung",
      timestamps: false, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return LoaiNguoiDung;
};
