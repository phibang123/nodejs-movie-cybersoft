const { HeThongRap } = require("../models/root.model");
const Sequelize = require("sequelize");
const { where } = require("sequelize");
const Op = Sequelize.Op;

const layDanhSachHeThong = async (data) => {
	try {
    const allHeThong = await HeThongRap.findAll({
			where: {
				HTR_maHeThongRap: {
					[Op.like]: `%${data}%`,
				},
			},
			raw: true,
		});
		const heThong = allHeThong.map((ht) => {
			return {
				maHeThongRap: ht.HTR_maHeThongRap,
				tenHeThongRap: ht.HTR_tenHeThongRap,
        biDanh: ht.HTR_biDanh,
        logo: ht.HTR_logo
			};
    });
		return heThong;
	} catch (error) {
		throw error;
	}
};

module.exports = {
  layDanhSachHeThong
}