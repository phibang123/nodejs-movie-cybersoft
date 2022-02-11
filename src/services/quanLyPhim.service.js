const { Banner } = require("../models/root.model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const layBanner = async (data) => {
	try {
		const allBanner = await Banner.findAll({ raw: true });
		console.log(allBanner);
		const banner = allBanner.map((banner) => {
			return {
				maBanner: banner.B_maBanner,
				maPhim: banner.P_maPhim,
				hinhAnh: banner.B_hinhAnh,
			};
		});

		return banner;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	layBanner,
};
