const { Model, DataTypes, Sequelize, DATE, LichChieu } = require("sequelize");
const db = require("../root.model");

module.exports = (sequelize) => {
  class DatVe extends Model {
    static associate(db) {
       //DatVe 1:N  GheXuatChieu
   

      //NguoiDung 1:N  DatVe
      this.belongsTo(db.NguoiDung, {
        as: "thongTinDatVe",
        foreignKey: "ND_id",
      })

      this.hasMany(db.GheXuatChieu, {
        as: "thongTinVe",
        foreignKey: "DV_maVe",
      })
      
      // this.belongsToMany(db.Ghe, {
        
      //   through: db.GheXuatChieu,
      //   foreignKey: "DV_maVe",
      // })
      // this.belongsToMany(db.LichChieu, {
      //   through: db.GheXuatChieu,
      //   foreignKey: "DV_maVe",
      // })
    }
  }

  DatVe.init(
    {
      DV_maVe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ND_id: {
        type: DataTypes.INTEGER,
      },
      DV_ngayDat: {
        type: DataTypes.DATE, 
        field: "created_at"
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
      modelName: "DatVe",
      tableName: "datVe",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return DatVe;
};
