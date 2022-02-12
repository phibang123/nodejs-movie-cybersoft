const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class DanhSachPhim extends Model {
    static associate(db) {

      this.belongsToMany(db.Rap, {
        through: db.LichChieuTheoPhim,
        foreignKey: "DSP_id",
      })
   
    }
  }

  DanhSachPhim.init(
    {
      DSP_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      P_maPhim: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      
      CR_maCumRap: {
        type: DataTypes.STRING, 
        allowNull: false
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
