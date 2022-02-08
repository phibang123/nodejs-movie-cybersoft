const { Model, DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  class Banner extends Model {
    static associate(db)
    {
      this.belongsTo(db.Phim, {
        foreignKey: "P_maPhim",
      });
    }
  }

  Banner.init(
    {
      B_maBanner: {
        type: DataTypes.INTEGER, //  
        primaryKey: true,
				autoIncrement: true,
      },
      
      B_hinhAnh: {
        type: DataTypes.STRING, //  
        allowNull: false,
        unique: true,
      },
      
      P_maPhim: {
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
      modelName: "Banner",
      tableName: "banner",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return Banner;
};
