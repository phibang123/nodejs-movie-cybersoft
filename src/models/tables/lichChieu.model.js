const { Model, DataTypes, Sequelize } = require("sequelize");
const moment = require("moment")


module.exports = (sequelize) => {
  class LichChieu extends Model {
    static associate(db) {
      //khai báo các mối quan hệ ở đây

      this.belongsTo(db.DanhSachPhim, {
        as: "phimChieuRap",
        foreignKey: "DSP_id"
			})
      this.belongsTo(db.Rap, {
        as: "rapChieuTheoPhim",
        foreignKey: "R_maRap"
			})

      // this.belongsTo(db.LichChieuTheoPhim, {
      //   foreignKey: "LCTP_id",
      // });
     
      this.hasMany(db.GheXuatChieu, {
        as: "gheLichChieu",
        foreignKey: "LC_maLichChieu",
      })

      //LichChieu N:M  Ghe
      this.belongsToMany(db.Ghe, {
        as: 'ghe',
        through: db.GheXuatChieu,
        foreignKey: "LC_maLichChieu",
      })
       //LichChieu N:M  DatVe
      // this.belongsToMany(db.DatVe, {
      //   as: 'datVe',
      //   through: db.GheXuatChieu,
      //   foreignKey: "LC_maLichChieu",
      // })
    }
  }

  LichChieu.init(
    {
      LC_maLichChieu: {
        type: DataTypes.INTEGER, //  
        primaryKey: true,
        autoIncrement: true
      },
      DSP_id: {
        type: DataTypes.INTEGER, //  
      },
      R_maRap: {
        type: DataTypes.INTEGER, //  
      },
      
      LC_ngayChieuGioiChieu: {
        type: DataTypes.DATE, //  
        allowNull: false,
       // defaultValue: DataTypes.NOW,
        validate: {
          isDate: {
            msg: true,
            args: `Ngày tháng phải theo dạng YYYY-MM-DD hh:mm`
          }
        }
      },
      LC_giaVe: {
        type: DataTypes.FLOAT, //  
        defaultValue: 7000,
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
