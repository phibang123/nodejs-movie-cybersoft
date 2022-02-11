const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class ChiTietDatVe extends Model {
    static associate(db) {
      //khai báo các mối quan hệ ở đây
      // DatVe 1:N ChiTietDatVe
      this.belongsTo(db.DatVe, {
        as: "chiTietDatVe",
        foreignKey: "DV_id",
      });

      this.hasOne(db.GheXuatChieu, {
        foreignKey: "CTDV_id",
      });
      
     

      
    }
  }

  ChiTietDatVe.init(  
    {
      CTDV_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
      },

      DV_id: {
        type: DataTypes.INTEGER, //  
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
      modelName: "ChiTietDatVe",
      tableName: "chiTietDatVe",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return ChiTietDatVe;
};
