const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class NguoiDung extends Model {
    static associate(db) {
      //khai báo các mối quan hệ ở đây
      this.belongsTo(db.LoaiNguoiDung, {
        as: "loaiNguoiDung",
        foreignKey: "LND_maLoaiNguoiDung",
      });
    }
  }

  NguoiDung.init(
    {
      ND_id: {
        type: DataTypes.INTEGER, //  
        primaryKey: true,
        autoIncrement: true
      },
      ND_taiKhoan: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      ND_hoTen: {
        type: DataTypes.STRING,
        allowNull: false,
        collate: 'utf8_unicode_ci', 
      },
      ND_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Email không đúng định dạng",
          },
        },
      },
      ND_soDT: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "số điện thoại không đúng định dạng",
          },
        },
      },
      ND_matKhau: {
        type: DataTypes.STRING,
        allowNull: false,
        ///
      },
      LND_maLoaiNguoiDung: {
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
      modelName: "NguoiDung",
      tableName: "nguoiDung",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return NguoiDung;
};
