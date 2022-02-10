const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class DatVe extends Model {
    static associate(db) {
       //DatVe N:1  NguoiDung
       
      this.hasMany(db.ChiTietDatVe, {
        foreignKey: "DV_id",
      });
    }
  }

  DatVe.init(
    {
      DV_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ND_id: {
        type: DataTypes.INTEGER
      },
      DV_tongTien: {
        type: DataTypes.FLOAT, 
        allowNull: false
      },
      DV_ngayThanhToan: {
        type: DataTypes.DATE, 
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
