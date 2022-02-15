const {
	LoaiNguoiDung,
	sequelize,
	Phim,
	Banner,
	HeThongRap,
	CumRap,
	Rap,
	NguoiDung,
	DanhSachPhim,
	LichChieuTheoPhim,
	LichChieu,
	Ghe,
	DatVe,
	GheXuatChieu,
} = require("../root.model");
const yargs = require("yargs");
const phimModel = require("../tables/phim.model");

const fistData = () => {
	sequelize
		.sync({ force: true })
		// LoaiNguoiDung
		.then((result) => {
			return LoaiNguoiDung.create({
				LND_maLoaiNguoiDung: "KhachHang",
				LND_tenLoai: "Khách hàng",
			});
		})
		// Tạo Quản Trị
		.then((result) => {
			return LoaiNguoiDung.create({
				LND_maLoaiNguoiDung: "QuanTri",
				LND_tenLoai: "Quản trị",
			});
		})
		.then((result) => {
			return NguoiDung.create({
				ND_taiKhoan: "bang",
				ND_hoTen: "bang",
				ND_email: "bang@gmail.com",
				ND_soDt: "111111111",
				ND_matKhau: "1234567",
				LND_maLoaiNguoiDung: "QuanTri",
			});
		})
		.then((result) => {
			return NguoiDung.create({
				ND_taiKhoan: "loi",
				ND_hoTen: "loi",
				ND_email: "bang123@gmail.com",
				ND_soDt: "111111",
				ND_matKhau: "1234567",
				LND_maLoaiNguoiDung: "KhachHang",
			});
		})
		//Phim
		.then((result) => {
			return Phim.create({
				P_tenPhim: "Mắt Biết",
				P_hinhAnh: "http://movieapi.cyberlearn.vn/hinhanh/matt-biec_gp01.jpg",
				P_biDanh: "mat-biet",
				P_trailer: "https://www.youtube.com/watch?v=MNm77lvTfi4",
				P_moTa: "không coi nên không biết",
				P_ngayKhoiChieu: "2022-2-26",
				P_danhGia: 10,
				P_hot: true,
				P_danhChieu: true,
				P_sapChieu: true,
			});
		})
		.then((result) => {
			return Phim.create({
				P_tenPhim: "Spider-Man: No Way Home",
				P_hinhAnh:
					"http://movieapi.cyberlearn.vn/hinhanh/spider-man-no-way-home-1_gp01.jpg",
				P_biDanh: "spider-man-no-way-home",
				P_trailer: "https://www.youtube.com/watch?v=OB3g37GTALc&t=1s",
				P_moTa: "không coi nên không biết",
				P_ngayKhoiChieu: "2022-2-27",
				P_danhGia: 10,
				P_hot: true,
				P_danhChieu: true,
				P_sapChieu: true,
			});
		})
		//banner
		// .then((result) => {
		// 	return Banner.create({
		// 		B_hinhAnh:
		// 			"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Fnamfullbuster%2F48241717707&psig=AOvVaw0YM5E3SJ43ov68x-32-1fS&ust=1644338062041000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJj0rOOC7vUCFQAAAAAdAAAAABAD",
		// 		P_maPhim: 1,
		// 	});
		// })
		.then((result) => {
			return Banner.create({
				B_hinhAnh:
					"https://fb-images.saostar.vn/wp700/pc/1622559104511/saostar-op5e4ap42rpu3pcj.jpg",
				P_maPhim: 2,
			});
		})
		//he thong rap
		.then((result) => {
			return HeThongRap.create({
				HTR_maHeThongRap: "CGV",
				HTR_tenHeThongRap: "cgv",
				HTR_biDanh: "cgv",
				HTR_logo: "http://movieapi.cyberlearn.vn/hinhanh/cgv.png",
			});
		})
		.then((result) => {
			return HeThongRap.create({
				HTR_maHeThongRap: "LotteCinima",
				HTR_tenHeThongRap: "Lotte Cinema",
				HTR_biDanh: "lotte-cinema",
				HTR_logo: "http://movieapi.cyberlearn.vn/hinhanh/lotte-cinema.png",
			});
		})
		//cum rap
		.then((result) => {
			return CumRap.create({
				CR_maCumRap: "cgv-aeon-binh-tan",
				CR_tenCumRap: "CGV - Aeon Bình Tân",
				CR_hinhAnh:
					"https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png",
				CR_diaChi:
					"Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường số 17A, khu phố 11, Bình Trị Đông B, Bình Tân",
				HTR_maHeThongRap: "CGV",
			});
		})
		.then((result) => {
			return CumRap.create({
				CR_maCumRap: "cgv-aeon-tan-phu",
				CR_tenCumRap: "GV - Aeon Tân Phú",
				CR_hinhAnh:
					"https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png",
				CR_diaChi: "30 Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú",
				HTR_maHeThongRap: "CGV",
			});
		})
		.then((result) => {
			return CumRap.create({
				CR_maCumRap: "lotte-cantavil",
				CR_tenCumRap: "Lotte - Cantavil",
				CR_hinhAnh:
					"https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png",
				CR_diaChi: "L7-Cantavil Premier, Xa Lộ Hà Nội, Q.2",
				HTR_maHeThongRap: "LotteCinima",
			});
		})
		.then((result) => {
			return CumRap.create({
				CR_maCumRap: "lotte-diamond",
				CR_tenCumRap: "Lotte - Diamond",
				CR_hinhAnh:
					"https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png",
				CR_diaChi: "L13-Diamond Plaza, 34 Lê Duẩn, Q.1",
				HTR_maHeThongRap: "LotteCinima",
			});
		})
		//danhSach Phim
		.then((result) => {
			return DanhSachPhim.create({
				P_maPhim: 1,
				CR_maCumRap: "cgv-aeon-binh-tan",
			});
		})
		.then((result) => {
			return DanhSachPhim.create({
				P_maPhim: 2,
				CR_maCumRap: "cgv-aeon-binh-tan",
			});
		})
		.then((result) => {
			return DanhSachPhim.create({
				P_maPhim: 1,
				CR_maCumRap: "cgv-aeon-tan-phu",
			});
		})
		.then((result) => {
			return DanhSachPhim.create({
				P_maPhim: 2,
				CR_maCumRap: "cgv-aeon-tan-phu",
			});
		})
		.then((result) => {
			return DanhSachPhim.create({
				P_maPhim: 1,
				CR_maCumRap: "lotte-cantavil",
			});
		})
		.then((result) => {
			return DanhSachPhim.create({
				P_maPhim: 2,
				CR_maCumRap: "lotte-cantavil",
			});
		})
		.then((result) => {
			return DanhSachPhim.create({
				P_maPhim: 1,
				CR_maCumRap: "lotte-diamond",
			});
		})
		.then((result) => {
			return DanhSachPhim.create({
				P_maPhim: 2,
				CR_maCumRap: "lotte-diamond",
			});
		})
		//rap
		.then((result) => {
			return Rap.create({
				R_tenRap: "Rạp 1",
				CR_maCumRap: "cgv-aeon-binh-tan",
			});
		})
		.then((result) => {
			return Rap.create({
				R_tenRap: "Rạp 2",
				CR_maCumRap: "cgv-aeon-binh-tan",
			});
		})
		//
		.then((result) => {
			return Rap.create({
				R_tenRap: "Rạp 1",
				CR_maCumRap: "cgv-aeon-tan-phu",
			});
		})
		.then((result) => {
			return Rap.create({
				R_tenRap: "Rạp 2",
				CR_maCumRap: "cgv-aeon-tan-phu",
			});
		})
		//
		.then((result) => {
			return Rap.create({
				R_tenRap: "Rạp 1",
				CR_maCumRap: "lotte-cantavil",
			});
		})
		.then((result) => {
			return Rap.create({
				R_tenRap: "Rạp 2",
				CR_maCumRap: "lotte-cantavil",
			});
		})
		//
		.then((result) => {
			return Rap.create({
				R_tenRap: "Rạp 1",
				CR_maCumRap: "lotte-diamond",
			});
		})
		.then((result) => {
			return Rap.create({
				R_tenRap: "Rạp 1",
				CR_maCumRap: "lotte-diamond",
			});
		})
		//Lich chiếu theo phim
		// .then((result) => {
		// 	return LichChieuTheoPhim.create({
		// 		R_maRap: 1,
		// 		DSP_id: 1,
		// 	});
		// })
		// .then((result) => {
		// 	return LichChieuTheoPhim.create({
		// 		R_maRap: 2,
		// 		DSP_id: 1,
		// 	});
		// })

		//LichChieu
		.then((result) => {
			return LichChieu.create({
				R_maRap: 1,
				DSP_id: 1,
				LC_ngayChieuGioiChieu: "2022-02-22T22:54:07",
				LC_giaVe: 70000,
				LC_thoiLuong: 120,
			});
		})
		//ghe

		.then((result) => {
			for (let i = 1; i <= 200; i++) {
				Ghe.create({
					G_tenGhe: `${i}`,
					G_loaiGhe: "Vip",
					G_stt: i,
				});
			}
		})
		//datVe
		.then((result) => {
			{
				return DatVe.create({
					ND_id: 2,
				});
			}
		})
		.then((result) => {
			{
				return DatVe.create({
					ND_id: 2,
				});
			}
		})
		//ghe Xuat Chieu
		.then((result) => {
			for (let i = 3; i <= 200; i++) {
				GheXuatChieu.create({
					G_maGhe: i,
					LC_maLichChieu: 1,
					GXC_giaGhe: 50000,
				});
			}
		})
		.then((result) => {
			GheXuatChieu.create({
				G_maGhe: 1,
				LC_maLichChieu: 1,
				DV_maVe: 1,
				
			});
		})
		.then((result) => {
			GheXuatChieu.create({
				G_maGhe: 2,
				LC_maLichChieu: 1,
				DV_maVe: 1,
			});
		});
	  
	
	// //Lich chieu
	// .then((result) => {
	// 	return LichChieu.create({
	// 		P_maPhim: 1,
	// 		R_maRap: 1,
	// 		CR_maCumRap: "lotte-cantavil",
	// 		//LC_ngayChieuGioiChieu: "2022-3-18T05:05:05",
	// 		LC_giaVe: 70000,
	// 		LC_thoiLuong: 120
	// 	});
	// })
};

yargs.command({
	command: "fist_data_posgre",
	handler: fistData,
});

yargs.parse();
