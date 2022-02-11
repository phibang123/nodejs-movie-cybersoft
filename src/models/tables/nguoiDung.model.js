const { Model, DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize) => {
	class NguoiDung extends Model {
		static associate(db) {
			//khai báo các mối quan hệ ở đây
			this.belongsTo(db.LoaiNguoiDung, {
				as: "loaiNguoiDung",
				foreignKey: "LND_maLoaiNguoiDung",
			});

			// NguoiDung 1:N DatVe
			this.hasMany(db.DatVe, {
				foreignKey: "ND_id",
			});
		}
	}

	NguoiDung.init(
		{
			ND_id: {
				type: DataTypes.INTEGER, //
				primaryKey: true,
				autoIncrement: true,
			},
			ND_taiKhoan: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "tai khoản không được bỏ trống",
					},
				},
				unique: {
					args: true,
					msg: "Tài khoản dã tồn tại",
				},
			},
			ND_hoTen: {
				type: DataTypes.STRING,
				collate: "utf8_unicode_ci",
				allowNull: false,
				validate: {
					notNull: {
						msg: "họ tên không được bỏ trống",
					},
				},
			},
			ND_email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: {
						msg: "Email không đúng định dạng!",
					},
					notNull: {
						msg: "email không được bỏ trống",
					},
				},
				unique: {
					args: true,
					msg: "Email đã tồn tại",
				},
			},
			ND_soDt: {
				type: DataTypes.INTEGER,
        allowNull: false,
				validate: {
					isNumeric: {
						msg: "số điện thoại không đúng định dạng",
					},
					notNull: {
						msg: "số điện thoại không được bỏ trống",
					},
				},
				unique: {
					args: true,
					msg: "số điện thoại đã được sử dụng",
				},
			},
			ND_matKhau: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					// min: {
					//   args: 6,
					//   msg: "mật khẩu phải lớn hơn 5 kí tự"
					// },
					// max: {
					//   args: 32,
					//   msg: "mật khẩu phải nhỏ hơn 32 kí tự"
					// },
					notNull: {
						msg: "mật khẩu không được bỏ trống",
					},
				},
				set(value) {
					const salt = bcrypt.genSaltSync();
					const hash = bcrypt.hashSync(value, salt);

					this.setDataValue("ND_matKhau", hash);
				},
			},
			LND_maLoaiNguoiDung: {
				type: DataTypes.STRING, //
				defaultValue: "KhachHang",
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
			modelName: "NguoiDung",
			tableName: "nguoiDung",
			timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
		}
	);

	return NguoiDung;
};
