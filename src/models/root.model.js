const config = require("../config/index");
const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	config.db_name,
	config.db_user,
	config.db_password,
	{
		dialect: config.db_dialect,
		host: config.db_host,
		port: config.db_port,
	}
);
const db = {};

const connected = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

connected();



const basename = path.basename(__filename);



fs.readdirSync(path.join(__dirname, "/tables"))
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file.slice(-3) === ".js" && file !== basename
    );
  })
	.forEach((file) =>
	{
    const model = require(path.join(__dirname , "/tables", file))(sequelize);
    db[model.name] = model;
	});
	
	Object.keys(db).forEach((model) => {
		// Nếu bên trong model có định nghĩa các mối quan hệ
		if (db[model].associate) {
			db[model].associate(db);
		}
	});




	



// Tự động sync dữ liệu giữa model và table trong db
//sequelize.sync({ force: true });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
