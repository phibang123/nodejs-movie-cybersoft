const { Banner , Phim} = require("../models/root.model");
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
		throw new Error("BAD");
	}
};

const layPhim = async (data) => {
  try
  {
		const allPhim = await Phim.findAll({
			where: {
				P_tenPhim: {
					[Op.like]: `%${data}%`,
				},
			},
			raw: true,
		});
		const phim = allPhim.map((p) => {
			return {
				maPhim: p.P_maPhim,
				biDanh: p.P_biDanh,
        trailer: p.P_trailer,
        hinhAnh: p.P_hinhAnh,
        moTa: p.P_moTa,
        ngayKhoiChieu: p.P_ngayKhoiChieu,
        danhGia: p.P_danhGia,
        hot: p.P_hot,
        dangChieu: p.P_dangChieu,
        sapChieu: p.P_sapChieu
			};
		});
		return phim;
	} catch (error) {
		throw new Error("BAD");
	}
};

module.exports = {
	layBanner,
	layPhim,
};