const { Model, DataTypes, Sequelize } = require("sequelize");
const config = require("../../config/index")
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
			this.hasOne(db.GheXuatChieu, {
				as: "danhSachGhe",
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
				type: DataTypes.FLOAT,
        allowNull: false,
				validate: {
					isNumeric: {
						msg: "số điện thoại phải là số",
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
					notNull: {
						msg: "mật khẩu không được bỏ trống",
					},
				},
        set(value)
        {
          if (value.length <= 6 || value .length>= 32)
          {
            throw new Error('mật khẩu phải lớn hơn 6 và nhỏ hơn 32 kí tự');
          }
					const salt = bcrypt.genSaltSync(Number(config.secrect_bcrypt));
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
