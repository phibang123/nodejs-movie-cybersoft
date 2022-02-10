const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class LichChieu extends Model {
    static associate(db) {
      //khai báo các mối quan hệ ở đây
      this.belongsTo(db.LichChieuTheoPhim, {
        foreignKey: "CR_maCumRap",
      });
      this.belongsTo(db.LichChieuTheoPhim, {
        foreignKey: "P_maPhim",
      });
      this.belongsTo(db.LichChieuTheoPhim, {
        foreignKey: "P_maRap",
      });

      //LichChieu N:M  Ghe
      this.belongsToMany(db.Ghe, {
        through: db.GheXuatChieu,
        foreignKey: "LC_maLichChieu",
      })
    }
  }

  LichChieu.init(
    {
      LC_maLichChieu: {
        type: DataTypes.INTEGER, //  
        primaryKey: true,
        autoIncrement: true
      },
      P_maPhim: {
        type: DataTypes.INTEGER, //  
      },
      P_maRap: {
        type: DataTypes.INTEGER, //  
      },
      CR_maCumRap: {
        type: DataTypes.STRING
      },
      
      LC_ngayChieuGioiChieu: {
        type: DataTypes.DATE, //  
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      LC_giaVe: {
        type: DataTypes.FLOAT, //  
        defaultValue: 7.000
      },
      LC_thoiLuong: {
        type: DataTypes.INTEGER,
        defaultValue: 120
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
      modelName: "LichChieu",
      tableName: "lichChieu",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return LichChieu;
};
