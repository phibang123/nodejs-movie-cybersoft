const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class DanhSachPhim extends Model {
    static associate(db) {

      this.belongsToMany(db.Rap, {
        through: db.LichChieu,
        foreignKey: "DSP_id",
      })
   

      this.belongsTo(db.CumRap, {
        foreignKey: "CR_maCumRap"
      })
      this.belongsTo(db.Phim, {
        foreignKey: "P_maPhim"
      })


      this.hasMany(db.LichChieu, {
        as: "phimChieuRap",
        foreignKey: "DSP_id"
      })
    }
  }

  DanhSachPhim.init(
    {
      DSP_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      P_maPhim: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      
      CR_maCumRap: {
        type: DataTypes.STRING, 
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
