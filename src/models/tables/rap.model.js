const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Rap extends Model {
    static associate(db)
    {
      this.belongsTo(db.CumRap, {
        as: "danhSachRap",
        foreignKey: "CR_maCumRap",
      });
      this.belongsToMany(db.DanhSachPhim, {
        through: db.LichChieu,
        foreignKey: "R_maRap",
      })


      this.hasMany(db.LichChieu, {
        as: "rapChieuTheoPhim",
        foreignKey: "R_maRap"
      })
    }
  }

  Rap.init(
    {
      R_maRap: {
        type: DataTypes.INTEGER, //  
        primaryKey: true,
				autoIncrement: true,
      },
      R_tenRap: {
        type: DataTypes.STRING, //  
        allowNull: false,
        collate: 'utf8_unicode_ci', 
      },
      //ma cum rap
      CR_maCumRap: {
        type: DataTypes.STRING, //  
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
      modelName: "Rap",
      tableName: "rap",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return Rap;
};
