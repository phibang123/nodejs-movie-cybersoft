const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class CumRap extends Model {
    static associate(db) {
      //khai báo các mối quan hệ ở đây
      this.belongsTo(db.HeThongRap, {
        as: "cumRap",
        foreignKey: "HTR_maHeThongRap",
      });
      this.hasMany(db.Rap, {
        foreignKey: "CR_maCumRap"
      })
      this.belongsToMany(db.Phim, {
        through: db.DanhSachPhim,
        foreignKey: "CR_maCumRap",
      	as: "danhSachCumRapChieuPhim",
      })
    }
  }

  CumRap.init(
    {
      CR_maCumRap: {
        type: DataTypes.STRING, //  
        collate: 'utf8_unicode_ci',
        primaryKey: true,
      },
      CR_tenCumRap: {
        type: DataTypes.STRING, //  
        collate: 'utf8_unicode_ci', 
        allowNull: false,
      },
      CR_diaChi: {
        type: DataTypes.STRING, //  
        collate: 'utf8_unicode_ci', 
        allowNull: false,
        unique: true,
      },
      CR_hinhAnh: {
        type: DataTypes.STRING, //  
        allowNull: false,
      },

      //fk he thong rap
      HTR_maHeThongRap: {
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
      modelName: "CumRap",
      tableName: "cumRap",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return CumRap;
};
