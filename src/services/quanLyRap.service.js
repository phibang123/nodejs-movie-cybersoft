const { HeThongRap, CumRap, Rap } = require("../models/root.model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const layDanhSachHeThongRap = async (data) => {
	try {
		const allHeThong = data
			? await HeThongRap.findAll({
					where: {
						HTR_maHeThongRap: data,
					},
					raw: true,
			  })
			: await HeThongRap.findAll({
					raw: true,
			  });

		const heThong = allHeThong.map((ht) => {
			return {
				maHeThongRap: ht.HTR_maHeThongRap,
				tenHeThongRap: ht.HTR_tenHeThongRap,
				biDanh: ht.HTR_biDanh,
				logo: ht.HTR_logo,
			};
		});
		return heThong;
	} catch (error) {
    throw new Error("BAD");
	}
};

const layCumRapHeThongRap = async (data) => {
	try {
		const heThongCumRap = await CumRap.findAll({
			where: {
				HTR_maHeThongRap: data,
			},
			include: [{ model: Rap, as: "danhSachRap" }],
		});
		if (heThongCumRap[0] === undefined) {
			throw new Error("Không Tìm Thấy tài nguyên");
		} else {
			const cumRap = heThongCumRap.map((cr) => {
				return {
					maCumRap: cr.CR_maCumRap,
					tenCumRap: cr.CR_tenCumRap,
					diaChi: cr.CR_diaChi,
					danhSachRap: cr?.danhSachRap.map((r) => {
						return {
							maRap: r.R_maRap,
							tenRap: r.R_tenRap,
						};
					}),
				};
			});
			return cumRap;
		}
	} catch (error) {
		throw new Error("BAD");
	}
};

module.exports = {
	layDanhSachHeThongRap,
	layCumRapHeThongRap,
};
