const {
	NguoiDung,
	LoaiNguoiDung,
	GheXuatChieu,
	LichChieu,
	DatVe,
	sequelize,
	DanhSachPhim,
	Phim,
	Rap,
	Ghe,
	HeThongRap,
	CumRap,
} = require("../models/root.model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

const dangKy = async (data) => {
	let {
		taiKhoan: ND_taiKhoan,
		matKhau: ND_matKhau,
		email: ND_email,
		soDt: ND_soDt,
		hoTen: ND_hoTen,
	} = data;

	try {
		await NguoiDung.create({
			ND_taiKhoan,
			ND_hoTen,
			ND_email,
			ND_soDt,
			ND_matKhau,
		});
	} catch (error) {
		throw error;
	}
};

const dangNhap = async (data) => {
	let { taiKhoan, matKhau } = data;

	try {
		let user = await NguoiDung.findOne({
			where: {
				ND_taiKhoan: taiKhoan,
			},
			raw: true,
		});
		//console.log(JSON.stringify(user, null, 2), "alo")

		if (user && bcrypt.compareSync(matKhau, user.ND_matKhau)) {
			const token = generateToken({ ...user });
			return {
				taiKhoan: user.ND_taiKhoan,
				hoTen: user.ND_hoTen,
				email: user.ND_email,
				soDT: user.ND_soDT,
				maLoaiNguoiDung: user.LND_maLoaiNguoiDung,
				...token,
			};
		} else {
			throw new Error("Tài Khoản và mật khẩu không chính xác");
		}
	} catch (error) {
	
		throw new Error("Tài Khoản và mật khẩu không chính xác");
	}
};

const loaiNguoiDung = async () => {
	try {
		const loaiND = await LoaiNguoiDung.findAll({
			raw: true,
		});
		const mapLND = loaiND.map((loai) => {
			return {
				maLoaiNguoiDung: loai.LND_maLoaiNguoiDung,
				tenLoai: loai.LND_tenLoai,
			};
		});
		return mapLND;
	} catch (error) {
		throw new Error("BAD");
	}
};

const danhSachNguoiDung = async (data) => {
	try {
		let danhSachND = await NguoiDung.findAll({
			where: {
				ND_hoTen: {
					[Op.like]: `%${data}%`,
				},
			},
			attributes: { exclude: ["ND_matKhau", "ND_id"] },
			raw: true,
		});
		const mapND = danhSachND.map((nd) => {
			return {
				taiKhoan: nd.ND_taiKhoan,
				hoTen: nd.ND_hoTen,
				email: nd.ND_email,
				soDt: nd.ND_soDt,
				maLoaiNguoiDung: nd.LND_maLoaiNguoiDung,
				createdAt: nd.createdAt,
				updatedAt: nd.updatedAt,
			};
		});
		return mapND;
	} catch (error) {
		throw new Error("BAD");
	}
};

//delay
const danhSachNguoiDungPhanTrang = async (data) => {
	try
	{
		let { soTrang, soPhanTuTrenTrang, tuKhoa } = data;
		let nguoiDungPhanTrang = await NguoiDung.findAll({
			where: {
				ND_hoTen: {
					[Op.like]: `%${tuKhoa}%`,
				},
			},
		});
		let nguoiDungCUS = nguoiDungPhanTrang.slice(Number((soTrang * soPhanTuTrenTrang) - soPhanTuTrenTrang) , Number(soTrang * soPhanTuTrenTrang))
	
		let phanTrang = {
			currentPage: Number(soTrang),
			count: nguoiDungCUS.length,
			totalPages: Math.round(Number(nguoiDungPhanTrang.length / soPhanTuTrenTrang)),
			totalCount: nguoiDungPhanTrang.length,
			items: nguoiDungCUS.map((nd) =>
			{
				return {
					taiKhoan: nd.ND_taiKhoan,
					email: nd.ND_email,
					soDt: nd.ND_soDt,
					maLoaiNguoiDung: nd.LND_maLoaiNguoiDung,
					hoTen: nd.ND_hoTen
				}
			})
		}
		return phanTrang

	} catch (error)
	{
		throw new Error("BAD");
	}
};

const themNguoiDung = async (data) => {
	try {
		let {
			taiKhoan: ND_taiKhoan,
			matKhau: ND_matKhau,
			email: ND_email,
			soDt: ND_soDt,
			hoTen: ND_hoTen,
			maLoaiNguoiDung: LND_maLoaiNguoiDung,
		} = data;

		await NguoiDung.create({
			ND_taiKhoan,
			ND_hoTen,
			ND_email,
			ND_soDt,
			ND_matKhau,
			LND_maLoaiNguoiDung,
		});
	} catch (error) {
		throw error;
	}
};

const capNhapNguoiDung = async (data, token) => {
	try {
		let user = await NguoiDung.findOne({
			where: {
				ND_id: token,
			},
			include: [{ model: LoaiNguoiDung, as: "loaiNguoiDung" }],
		});

		if (!data.taiKhoan) {
			throw new Error("Dữ liệu không hợp lệ!");
		}
		if (!user || user.ND_taiKhoan !== data.taiKhoan) {
			throw new Error("Bạn không có quyền thay đổi thông tin của người khác");
		} else {
			(user.ND_matKhau = data.matKhau),
				(user.ND_hoTen = data.hoTen),
				(user.ND_email = data.email),
				(user.soDt = data.soDt),
				(user.LND_maLoaiNguoiDung = data.maLoaiNguoiDung);
			let userUpdate = await user.save();

			//console.log(JSON.stringify(userUpdate, null, 2));

			let [userUpdated] = [userUpdate].map((user) => {
				return {
					taiKhoan: user.ND_taiKhoan,
					hoTen: user.ND_hoTen,
					email: user.ND_email,
					soDt: user.ND_soDt,
					loaiNguoiDung: user.loaiNguoiDung.LND_tenLoai,
					thongTinDatVe: null,
				};
			});
			return userUpdated;
		}
	} catch (error) {
		throw error;
	}
};

const xoaNguoiDung = async (data) => {
	try {
		let user = await NguoiDung.findOne({
			include: [{ model: DatVe, as: "thongTinDatVe" }],
			where: {
				ND_taiKhoan: data,
			},
		});
		//console.log(JSON.stringify(user, null, 2));
		if (!user) {
			throw new Error("Không tìm thấy người dùng");
		}

		if (user.thongTinDatVe[0]) {
			throw new Error("Người dùng này đã đặt vé xem phim không thể xóa!");
		} else {
			await user.destroy();
		}
		//console.log(JSON.stringify(user, null, 2));
	} catch (error) {
		throw error;
	}
};

const layThongTinTaiKhoan = async (data) => {
	try {
		let user = await NguoiDung.findOne({
			where: {
				ND_id: data,
			},
			include: [
				{
					model: LoaiNguoiDung,
					as: "loaiNguoiDung",
				},
			],
		});

		let maPhimUser = await LichChieu.findAll({
			include: [
				{
					model: GheXuatChieu,
					as: "gheLichChieu",
					include: [
						{
							model: DatVe,
							as: "thongTinVe",
							where: {
								ND_id: data,
							},
						},
						{
							model: Ghe,
							as: "gheChieuPhim",
						},
					],
				},
				{
					model: DanhSachPhim,
					as: "phimChieuRap",
					include: [
						{
							model: Phim,
						},
					],
				},
				{
					model: Rap,
					as: "rapChieuTheoPhim",
					include: [
						{
							model: CumRap,
							as: "danhSachRap",
							include: [
								{
									model: HeThongRap,
									as: "cumRap",
								},
							],
						},
					],
				},
			],
			// include: [{
			// 	model: DanhSachPhim,
			// 	as: "phimChieuRap",
			// 	include: [{
			// 		model: Phim,
			// 	}]
			// }]
		});

		let mangDatVe = await DatVe.findAll({
			where: {
				ND_id: data,
			},

			include: [
				{
					model: GheXuatChieu,
					as: "thongTinVe",
					include: [
						{
							model: LichChieu,
							as: "gheLichChieu",
							include: [
								{
									model: Rap,
									as: "rapChieuTheoPhim",
									include: [
										{
											model: CumRap,
											as: "danhSachRap",
											include: [{
												model: HeThongRap,
												as: "cumRap",
											}]
										},
									],
								},
								{
									model: DanhSachPhim,
									as: "phimChieuRap",
									include: [
										{
											model: Phim,
										},
									],
								},
						
							],
						},
						{
							model: Ghe,
							as: "gheChieuPhim",
						}
					],
				},
			],
		});

		if (!user) {
			throw new Error("BAD");
		}
		//console.log(JSON.stringify(mangDatVe, null, 2));

		//let filterPhim = maPhimUser.filter((mm) => mm.gheLichChieu[0] != null);

		//console.log(JSON.stringify(filterPhim, null, 2));
		let filterPhim = mangDatVe.filter((mm) => mm.thongTinVe[0] != null);
		let [thongTin] = [user].map((ur) => {
			return {
				email: ur.ND_email,
				hoTen: ur.ND_hoTen,
				loaiNguoiDung: ur.loaiNguoiDung.LND_tenLoai,
				soDT: ur.ND_soDt,
				taiKhoan: ur.ND_taiKhoan,
				thongTinDatVe: filterPhim.map((phim) => {
					return {
						tongGiaVe: phim.thongTinVe.reduce(function (total, currentValue) {
							return total + currentValue.GXC_giaGhe;
						}, 0),
						hinhAnh:
							phim.thongTinVe[0].gheLichChieu.phimChieuRap.Phim.P_hinhAnh,
						maVe: phim.DV_maVe,
						ngayDat: phim.DV_ngayDat,
						tenPhim:
							phim.thongTinVe[0].gheLichChieu.phimChieuRap.Phim.P_tenPhim,
						thoiLuongPhim: phim.thongTinVe[0].gheLichChieu.LC_thoiLuong,
						danhSachGhe: phim.thongTinVe.map((ve) => {
							return {
								maCumRap: ve.gheLichChieu.rapChieuTheoPhim.CR_maCumRap,
							  maGhe: ve.G_maGhe,
								maHeThongRap:
								ve.gheLichChieu.rapChieuTheoPhim.danhSachRap.HTR_maHeThongRap,
								maRap: ve.gheLichChieu.rapChieuTheoPhim.R_maRap,
								tenCumRap: ve.gheLichChieu.rapChieuTheoPhim.danhSachRap.CR_tenCumRap,
								tenGhe: ve.gheChieuPhim.G_tenGhe,
								loaiGhe: ve.gheChieuPhim.G_loaiGhe,
								tenHeThongRap: ve.gheLichChieu.rapChieuTheoPhim.danhSachRap.cumRap.HTP_tenHeThongRap,
								tenRap: ve.gheLichChieu.rapChieuTheoPhim.R_tenRap,
							};
						}),
					};
				}),
			};
		});

		// let [thongTin] = [user].map((ur) => {
		// 	return {
		// 		email: ur.ND_email,
		// 		hoTen: ur.ND_hoTen,
		// 		loaiNguoiDung: ur.loaiNguoiDung.LND_tenLoai,
		// 		soDT: ur.ND_soDt,
		// 		taiKhoan: ur.ND_taiKhoan,
		// 		thongTinDatVe: filterPhim.map((phim) => {
		// 			return {
		// 				giaVe: phim.LC_giaVe,
		// 				hinhAnh: phim.phimChieuRap.Phim.P_hinhAnh,
		// 				maVe: phim.gheLichChieu[0].thongTinVe.DV_maVe,
		// 				ngayDat: phim.gheLichChieu[0].thongTinVe.DV_ngayDat,
		// 				tenPhim: phim.phimChieuRap.Phim.P_tenPhim,
		// 				thoiLuongPhim: phim.LC_thoiLuong,
		// 				danhSachGhe: phim.gheLichChieu.map((ve) => {
		// 					return {
		// 						maCumRap: phim.rapChieuTheoPhim.R_tenRap,
		// 						maGhe: ve.G_maGhe,
		// 						maHeThongRap:
		// 							phim.rapChieuTheoPhim.danhSachRap.HTR_maHeThongRap,
		// 						maRap: phim.rapChieuTheoPhim.R_maRap,
		// 						tenCumRap: phim.rapChieuTheoPhim.R_tenRap,
		// 						tenGhe: ve.gheChieuPhim.G_tenGhe,
		// 						tenHeThongRap: phim.rapChieuTheoPhim.danhSachRap.CR_tenCumRap,
		// 						tenRap: phim.rapChieuTheoPhim.R_tenRap,
		// 					};
		// 				}),
		// 			};
		// 		}),
		// 	};
		// });

		return thongTin;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

module.exports = {
	dangKy: dangKy,
	dangNhap: dangNhap,
	loaiNguoiDung,
	danhSachNguoiDung,
	danhSachNguoiDungPhanTrang,
	themNguoiDung,
	capNhapNguoiDung,
	xoaNguoiDung,
	layThongTinTaiKhoan,
};
