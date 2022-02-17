const { Banner, Phim, DanhSachPhim } = require("../models/root.model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");
const kebabCase = require("lodash.kebabcase");
const _ = require("lodash");
const validateDate = require("validate-date");

Date.prototype.isValid = function () {
	// An invalid date object returns NaN for getTime() and NaN is the only
	// object not strictly equal to itself.
	return this.getTime() === this.getTime();
};

const layBanner = async (data) => {
	try {
		const allBanner = await Banner.findAll({ raw: true });
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
	try {
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
				tenPhim: p.P_tenPhim,
				maPhim: p.P_maPhim,
				biDanh: p.P_biDanh,
				trailer: p.P_trailer,
				hinhAnh: p.P_hinhAnh,
				moTa: p.P_moTa,
				ngayKhoiChieu: p.P_ngayKhoiChieu,
				danhGia: p.P_danhGia,
				hot: p.P_hot,
				dangChieu: p.P_dangChieu,
				sapChieu: p.P_sapChieu,
			};
		});
		return phim;
	} catch (error) {
		throw new Error("BAD");
	}
};

const layThongTinPhimTheoMa = async (data) => {
	try {
		let phim = await Phim.findOne({
			where: { P_maPhim: data },
		});

		if (!phim) {
			throw new Error("Không tìm thấy phim");
		}
		let thongTinPhim = [phim].map((ttp) => {
			return {
				biDanh: ttp.P_biDanh,
				dangChieu: ttp.P_dangChieu,
				danhGia: ttp.P_danhGia,
				hinhAnh: ttp.P_hinhAnh,
				hot: ttp.P_hot,
				maPhim: ttp.P_maPhim,
				moTa: ttp.P_moTa,
				ngayKhoiChieu: ttp.P_ngayKhoiChieu,
				sapChieu: ttp.P_sapChieu,
				tenPhim: ttp.P_tenPhim,
				trailer: ttp.P_trailer,
			};
		});
		return thongTinPhim;
	} catch (error) {
		throw error;
	}
};

const layPhimPhanTrang = async (data) => {
	try {
		let { soTrang, soPhanTuTrenTrang, tenPhim } = data;
		let phimPhanTrang = await Phim.findAll({
			where: {
				P_tenPhim: {
					[Op.like]: `%${tenPhim}%`,
				},
			},
		});

		let phimCUS = phimPhanTrang.slice(
			Number(soTrang * soPhanTuTrenTrang - soPhanTuTrenTrang),
			Number(soTrang * soPhanTuTrenTrang)
		);

		let phanTrang = {
			currentPage: Number(soTrang),
			count: phimCUS.length,
			totalPages: Math.round(Number(phimPhanTrang.length / soPhanTuTrenTrang)),
			totalCount: phimPhanTrang.length,
			items: phimCUS.map((p) => {
				return {
					maPhim: p.P_maPhim,
					tenPhim: p.P_tenPhim,
					biDanh: p.P_biDanh,
					trailer: p.P_trailer,
					hinhAnh: p.P_hinhAnh,
					moTa: p.P_moTa,
					ngayKhoiChieu: p.P_ngayKhoiChieu,
					danhGia: p.P_danhGia,
					hot: p.P_hot,
					dangChieu: p.P_dangChieu,
					sapChieu: p.P_sapChieu,
				};
			}),
		};
		return phanTrang;
	} catch (error) {
		throw error;
	}
};

const layThongTinPhimTheoNgay = async (data) => {
	try
	{
		console.log(231)
		const formatDate = "yyyy-MM-dd HH:mm:ss";
		let { soTrang, soPhanTuTrenTrang, tenPhim, tuNgay, denNgay } = data;

		if (
			!validateDate(tuNgay, (responseType = "boolean")) ||
			!validateDate(denNgay, (responseType = "boolean"))
		) {
			console.log(123);
			throw new Error(
				"Vui lòng nhập đúng định dạnh ngày tháng năm, vd: dd/MM/yyyy"
			);
		}

		let formatTuNgay = moment(tuNgay).format(formatDate);
		let formatDenNgay = moment(denNgay).format(formatDate);

		let phimPhanTrang = await Phim.findAll({
			where: {
				P_tenPhim: {
					[Op.like]: `%${tenPhim}%`,
				},
				P_ngayKhoiChieu: {
					[Op.gte]: formatTuNgay,
					[Op.lte]: formatDenNgay,
				},
			},
		});
		let phimCUS = phimPhanTrang.slice(
			Number(soTrang * soPhanTuTrenTrang - soPhanTuTrenTrang),
			Number(soTrang * soPhanTuTrenTrang)
		);

		let phanTrang = {
			currentPage: Number(soTrang),
			count: phimCUS.length,
			totalPages: Math.round(Number(phimPhanTrang.length / soPhanTuTrenTrang)),
			totalCount: phimPhanTrang.length,
			formDate: formatTuNgay,
			toDate: formatDenNgay,
			items: phimCUS.map((p) => {
				return {
					maPhim: p.P_maPhim,
					tenPhim: p.P_tenPhim,
					biDanh: p.P_biDanh,
					trailer: p.P_trailer,
					hinhAnh: p.P_hinhAnh,
					moTa: p.P_moTa,
					ngayKhoiChieu: p.P_ngayKhoiChieu,
					danhGia: p.P_danhGia,
					hot: p.P_hot,
					dangChieu: p.P_dangChieu,
					sapChieu: p.P_sapChieu,
				};
			}),
		};
		return phanTrang;
	} catch (error) {
		throw error;
	}
};

const xoaPhim = async (data) => {
	try {
		// await LichChieu.destroy({
		// 	where: {
		// 		P_maPhim: data,
		// 	},
		// });
		await Banner.destroy({
			where: {
				P_maPhim: data,
			},
		});
		await Phim.destroy({
			where: {
				P_maPhim: data,
			},
		});
		// await DanhSachPhim.destroy({
		// 	where: {
		// 		P_maPhim: data,
		// 	},
		// });
		// console.log(danhSachP)
		// await danhSachP.destroy()
		// await banner.destroy()
		// await phim.destroy()
	} catch (error) {
		throw error;
	}
};

const themPhim = async (data) => {
	try {
		let {
			tenPhim: P_tenPhim,
			trailer: P_trailer,
			moTa: P_moTa,
			ngayKhoiChieu: P_ngayKhoiChieu,
			sapChieu: P_sapChieu,
			dangChieu: P_dangChieu,
			hot: P_hot,
			danhGia: P_danhGia,
		} = data;
		let P_biDanh = encodeURI(kebabCase(P_tenPhim));
		let phim = await Phim.create({
			P_tenPhim,
			P_trailer,
			P_moTa,
			P_biDanh,
			P_ngayKhoiChieu,
			P_sapChieu,
			P_dangChieu,
			P_hot,
			P_danhGia,
		});
		return phim;
	} catch (error) {
		throw error;
	}
};

const upHinh = async (data, url) => {
	try {
		data.set({
			P_hinhAnh: url,
		});
		await data.save();
	} catch (error) {
		throw error;
	}
};

const timTim = async (data) => {
	try {
		let phim = await Phim.findOne({
			where: {
				P_maPhim: data,
			},
		});
		return phim;
	} catch (error) {
		throw error;
	}
};

const capNhatPhim = async (data) => {
	try {
		let {
			maPhim,
			tenPhim,
			trailer,
			moTa,
			ngayKhoiChieu,
			sapChieu,
			dangChieu,
			hot,
			danhGia,
		} = data;

		let phim = await Phim.findOne({
			where: {
				P_maPhim: maPhim,
			},
		});
		phim.set({
			P_tenPhim: tenPhim,
			P_trailer: trailer,
			P_moTa: moTa,
			P_ngayKhoiChieu: ngayKhoiChieu,
			P_sapChieu: sapChieu,
			P_dangChieu: dangChieu,
			P_hot: hot,
			P_danhGia: danhGia,
		});
		let phimUpdate = await phim.save();
		return phimUpdate;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	layBanner,
	layPhim,
	layThongTinPhimTheoMa,
	xoaPhim,
	themPhim,
	upHinh,
	timTim,
	capNhatPhim,
	layPhimPhanTrang,
	layThongTinPhimTheoNgay,
};
