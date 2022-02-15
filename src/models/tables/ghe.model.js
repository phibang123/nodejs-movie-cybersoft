const { Model, DataTypes, Sequelize , LichChieu} = require("sequelize");

module.exports = (sequelize) => {
  class Ghe extends Model {
    static associate(db) {
       //Ghe N:M  LichChieu
      this.belongsToMany(db.LichChieu, {
        through: db.GheXuatChieu,
        foreignKey: "G_maGhe",
      })
      //Ghe N:M  DatVe
      // this.belongsToMany(db.DatVe, {
      //   through: db.GheXuatChieu,
      //   foreignKey: "G_maGhe",
      // })

      this.hasMany(db.GheXuatChieu, {
        as: "gheChieuPhim",
        foreignKey: "G_maGhe",
      })
    }
  }

  Ghe.init(
    {
      G_maGhe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      G_tenGhe: {
        type: DataTypes.STRING, 
        collate: 'utf8_unicode_ci', 
        set(value)
        {
          if (Number(value) < 10)
          {
            this.setDataValue("G_tenGhe","0"+ value);
          }
          else
          {
            this.setDataValue("G_tenGhe", value)
          }
				},
       
      },
      // G_giaMD: {
      //   type: DataTypes.INTEGER, 
      //   allowNull: false,
      // },
      G_loaiGhe: {
        type: DataTypes.STRING, 
        collate: 'utf8_unicode_ci', 
        allowNull: false,
        get()
        {
          return this.getDataValue('G_loaiGhe')
        }
      },
    
      G_stt: {
        type: DataTypes.STRING, 
        set(value)
        {
          if (value < 10)
          {
            this.setDataValue("G_stt","0"+ value);
          }
          else
          {
            this.setDataValue("G_stt", value)
          }
				},
      },
      
      // G_giaVe: {
      //   type: DataTypes.INTEGER, 
        
      // },

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
      modelName: "Ghe",
      tableName: "ghe",
      timestamps: true, // Nếu false bỏ qua createdAt, updatedAt
    }
  );

  return Ghe;
};
