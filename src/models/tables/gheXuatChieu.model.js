const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class GheXuatChieu extends Model {
    static associate(db) {
      //khai báo các mối quan hệ ở đây
      //
      this.belongsTo(db.NguoiDung, {
        as: "danhSachGhe",
        foreignKey: "ND_id",
      })
      
    }
  }

  GheXuatChieu.init(
    {
      G_maGhe: {
        type: DataTypes.INTEGER
      },
      LC_maLichChieu: {
        type: DataTypes.INTEGER
      },
      ND_id: {
        type: DataTypes.INTEGER
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
      modelName: "GheXuatChieu",
      tableName: "gheXuatChieu",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return GheXuatChieu;
};
