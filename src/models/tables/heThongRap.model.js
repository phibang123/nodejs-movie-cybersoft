const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class HeThongRap extends Model {
    static associate(db) {
      //khai báo các mối quan hệ ở đây
      this.hasMany(db.CumRap, {
        as: "cumRap",
        foreignKey: "HTR_maHeThongRap",
      });
    }
  }

  HeThongRap.init(
    {
      HTR_maHeThongRap: {
        type: DataTypes.STRING, //  
        collate: 'utf8_unicode_ci',
        primaryKey: true,
      },
      HTR_tenHeThongRap: {
        type: DataTypes.STRING, //  
        collate: 'utf8_unicode_ci', 
        allowNull: false,
        unique: true,
      },
      HTR_biDanh: {
        type: DataTypes.STRING, //  
        collate: 'utf8_unicode_ci', 
        allowNull: false,
        unique: true,
      },
      HTR_logo: {
        type: DataTypes.STRING, //  
        allowNull: false,
        unique: true,
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
      modelName: "HeThongRap",
      tableName: "heThongRap",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return HeThongRap;
};
