const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class MaNhom extends Model {
    static associate(db) {
      //khai báo các mối quan hệ ở đây
      this.hasMany(db.Phim, {
        foreignKey: "MN_maNhom",
      });
    }
  }

  MaNhom.init(
    {
      MN_maNhom: {
        type: DataTypes.STRING, //  
        primaryKey: true,
        collate: 'utf8_unicode_ci', 
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
      modelName: "MaNhom",
      tableName: "maNhom",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return MaNhom;
};
