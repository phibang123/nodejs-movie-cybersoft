const {
	HeThongRap,
	CumRap,
	Rap,
	Phim,
	DanhSachPhim,
	LichChieu,
} = require("../models/root.model");
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

const layThongTinLichChieu = async (data) => {
	try {
		let thongTinRap = await HeThongRap.findOne({
			where: {
				HTR_maHeThongRap: data,
			},
			include: [
				{
					model: CumRap,
					as: "cumRap",
					include: [
						{
							model: DanhSachPhim,
							include: [
								{
									model: LichChieu,
									include: { model: Rap },
									as: "phimChieuRap",
								},
								{ model: Phim },
							],
						},
					],
				},
			],
		});
		console.log(JSON.stringify(thongTinRap, null, 2));
		let [mapHeThong] = [thongTinRap].map((ht) => {
			return {
				logo: ht.HTR_logo,
				maHeThongRap: ht.HTR_maHeThongRap,
				tenHeThongRap: ht.HTR_tenHeThongRap,
				lstCumRap: ht.cumRap.map((cr) => {
					return {
						diaChi: cr.CR_diaChi,
						hinhAnh: cr.CR_hinhAnh,
						maCumRap: cr.CR_maCumRap,
						tenCumRap: cr.CR_tenCumRap,
						danhSachPhim: cr.DanhSachPhims.map((p) => {
							return {
								dangChieu: p.Phim.P_dangChieu,
								hinhAnh: p.Phim.P_hinhAnh,
								hot: p.Phim.P_hot,
								maPhim: p.Phim.P_maPhim,
								sapChieu: p.Phim.P_sapChieu,
								tenPhim: p.Phim.P_tenPhim,

								lstLichChieuTheoPhim: p.phimChieuRap.map((lc) => {
									return {
										maLichChieu: lc.LC_maLichChieu,
										giaVe: lc.LC_giaVe,
										maRap: String(lc.R_maRap),
										ngayChieuGioChieu: lc.LC_ngayChieuGioChieu,
										tenRap: lc.Rap.R_tenRap,
									};
								}),
							};
						}),
					};
				}),
			};
		});
		//console.log(mapHeThong);
		return mapHeThong;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const layThongTinLichChieuTheoPhim = async (data) => {
	try {
		let thongtinPhim = await Phim.findOne({
			where: {
				P_maPhim: data,
			},
		});
		let thongTinCumRap = await HeThongRap.findAll({
			include: [
				{
					model: CumRap,
					as: "cumRap",
					include: {
						model: DanhSachPhim,
						include: [{ model: LichChieu, as: "phimChieuRap"}],
						where: { P_maPhim: data },
					},
					required: false
				},
			],
		});
		console.log(JSON.stringify(thongTinCumRap, null, 2));
	} catch (error) {
		console.log(error);
		throw error;
	}
};
module.exports = {
	layDanhSachHeThongRap,
	layCumRapHeThongRap,
	layThongTinLichChieu,
	layThongTinLichChieuTheoPhim,
};
