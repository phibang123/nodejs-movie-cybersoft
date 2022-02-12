const { Model, DataTypes, Sequelize, Phim, CumRap } = require("sequelize");

module.exports = (sequelize) => {
  class LichChieuTheoPhim extends Model {
    static associate(db) {
      //khai báo các mối quan hệ ở đây
      this.hasMany(db.LichChieu, {
        foreignKey: "LCTP_id",
      })
     
    }
  }

  LichChieuTheoPhim.init(
    {
      LCTP_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false 
      },
      R_maRap: {
        type: DataTypes.INTEGER, //  
        allowNull: false
      },
      DSP_id: {
        type: DataTypes.INTEGER,
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
      modelName: "LichChieuTheoPhim",
      tableName: "lichChieuTheoPhim",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return LichChieuTheoPhim;
};
