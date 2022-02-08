const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class DanhSachPhim extends Model {
    static associate(db) {

      this.belongsToMany(db.Rap, {
        through: db.LichChieuTheoPhim,
        foreignKey: "P_maPhim",
      })
      this.belongsToMany(db.Rap, {
        through: db.LichChieuTheoPhim,
        foreignKey: "CR_maCumRap",
      })
    }
  }

  DanhSachPhim.init(
    {
      P_maPhim: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      CR_maCumRap: {
        type: DataTypes.STRING, 
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
      modelName: "DanhSachPhim",
      tableName: "danhSachPhim",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return DanhSachPhim;
};
