const { Model, DataTypes, Sequelize } = require("sequelize");



module.exports = (sequelize) => {
	class Phim extends Model {
		static associate(db) {
			this.hasOne(db.Banner, {
				foreignKey: "P_maPhim",
			});

			this.belongsToMany(db.CumRap, {
				through: db.DanhSachPhim,
				foreignKey: "P_maPhim",
			});
			this.hasMany(db.DanhSachPhim, {
				foreignKey: "P_maPhim",
			});
		}
	}

	Phim.init(
		{
			P_maPhim: {
				type: DataTypes.INTEGER, //
				primaryKey: true,
				autoIncrement: true,
			},

			P_tenPhim: {
				type: DataTypes.STRING, //
				collate: "utf8_unicode_ci",
				allowNull: false,
				unique: {
					args: true,
					msg: "tên phim dã tồn tại",
				},
				validate: {
					notNull: {
						msg: "tên phim không được bỏ trống",
					},
				},
			
			},
			P_biDanh: {
				type: DataTypes.STRING, //
				collate: "utf8_unicode_ci",
				defaultValue: "",
			
			},
			P_trailer: {
				type: DataTypes.STRING, //
				allowNull: false,
			},
			P_hinhAnh: {
				type: DataTypes.STRING, //
			},
			P_moTa: {
				type: DataTypes.STRING, //
				allowNull: false,
			},
			P_hot: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			P_dangChieu: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			P_danhGia: {
				type: DataTypes.INTEGER(5),
				defaultValue: 0,
			},
			p_sapChieu: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			P_ngayKhoiChieu: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notNull: {
						msg: "ngày khởi chiếu không được bỏ trống",
					},
					isDate: {
						msg: `Ngày tháng phải theo dạng YYYY-MM-DD hh:mm`,
					},
				},
			},
			createdAt: {
				type: DataTypes.DATE,
				field: "created_at",
			},
			updatedAt: {
				type: DataTypes.DATE,
				field: "updated_at",
			},
		},
		{
			sequelize,
			modelName: "Phim",
			tableName: "phim",
			timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
		}
	);

	return Phim;
};
