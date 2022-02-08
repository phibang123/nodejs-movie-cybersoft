const { Model, DataTypes, Sequelize, Phim, CumRap } = require("sequelize");

module.exports = (sequelize) => {
  class LichChieuTheoPhim extends Model {
    static associate(db) {
      //khai báo các mối quan hệ ở đây
      this.hasMany(db.LichChieu, {
        foreignKey: "P_maPhim",
      })
      this.hasMany(db.LichChieu, {
        foreignKey: "R_maRap",
      })
      this.hasMany(db.LichChieu, {
        foreignKey: "CR_maCumRap",
      })
    }
  }

  LichChieuTheoPhim.init(
    {
      P_maPhim: {
        type: DataTypes.INTEGER,
      },
      R_maRap: {
        type: DataTypes.INTEGER, //  
      },
      CR_maCumRap: {
        type: DataTypes.STRING
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
      modelName: "LichChieuTheoPhim",
      tableName: "lichChieuTheoPhim",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return LichChieuTheoPhim;
};
