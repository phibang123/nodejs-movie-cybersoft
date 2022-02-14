const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class GheXuatChieu extends Model {
    static associate(db) {
      //khai báo các mối quan hệ ở đây
      //
      this.belongsTo(db.DatVe, {
        as: "thongTinVe",
        foreignKey: "DV_maVe",
      })
      this.belongsTo(db.LichChieu, {
        as: "gheLichChieu",
        foreignKey: "LC_maLichChieu",
      })
      this.belongsTo(db.Ghe, {
        as: "gheChieuPhim",
        foreignKey: "LC_maLichChieu",
      })
    }
  }

  GheXuatChieu.init(
    {
      GXC_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      G_maGhe: {
        type: DataTypes.INTEGER,
        unique: false
      },
      LC_maLichChieu: {
        type: DataTypes.INTEGER,
        unique: false
      },
      DV_maVe: {
        allowNull: true,
        type: DataTypes.INTEGER,
        unique: false
      },
      DV_giaGhe: {
        type: DataTypes.INTEGER,
        defaultValue: 70000
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
      // indexes: [
			// 	{
			// 		unique: false,
			// 		fields: ["G_maGhe", "LC_maLichChieu"],
			// 	},
      // ],
      indexes: [
				{
					unique: false,
					fields: [ "LC_maLichChieu", "G_maGhe"],
				},
			],
      sequelize,
      modelName: "GheXuatChieu",
      tableName: "gheXuatChieu",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return GheXuatChieu;
};
