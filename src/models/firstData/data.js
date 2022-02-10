const {
	LoaiNguoiDung,
	sequelize,
	Phim,
	Banner,
	HeThongRap,
	CumRap
} = require("../root.model");
const yargs = require("yargs");
const phimModel = require("../tables/phim.model");

const fistData = () => {
	sequelize
		.sync({ force: true })
	  // LoaiNguoiDung
		.then((result) => {
			return LoaiNguoiDung.create({
				LND_maLoaiNguoiDung: "KhachHang"
			});
		})
		.then((result) => {
			return LoaiNguoiDung.create({
				LND_maLoaiNguoiDung: "QuanTri"
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
		.then((result) => {
			return Banner.create({
				B_hinhAnh:
					"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Fnamfullbuster%2F48241717707&psig=AOvVaw0YM5E3SJ43ov68x-32-1fS&ust=1644338062041000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJj0rOOC7vUCFQAAAAAdAAAAABAD",
				P_maPhim: 1,
			});
		})
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
				CR_hinhAnh: "https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png",
				CR_diaChi: "Tầng 3, TTTM Aeon Mall Bình Tân, Số 1 đường số 17A, khu phố 11, Bình Trị Đông B, Bình Tân",
				HTR_maHeThongRap: "CGV"
			});
		})
		.then((result) => {
			return CumRap.create({
				CR_maCumRap: "cgv-aeon-tan-phu",
				CR_tenCumRap: "GV - Aeon Tân Phú",
				CR_hinhAnh: "https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png",
				CR_diaChi: "30 Bờ Bao Tân Thắng, Sơn Kỳ, Tân Phú",
				HTR_maHeThongRap: "CGV"
			});
		})
		.then((result) => {
			return CumRap.create({
				CR_maCumRap: "lotte-cantavil",
				CR_tenCumRap: "Lotte - Cantavil",
				CR_hinhAnh: "https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png",
				CR_diaChi: "L7-Cantavil Premier, Xa Lộ Hà Nội, Q.2",
				HTR_maHeThongRap: "LotteCinima"
			});
		})
		.then((result) => {
			return CumRap.create({
				CR_maCumRap: "lotte-diamond",
				CR_tenCumRap: "Lotte - Diamond",
				CR_hinhAnh: "https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png",
				CR_diaChi: "L13-Diamond Plaza, 34 Lê Duẩn, Q.1",
				HTR_maHeThongRap: "LotteCinima"
			});
		})
};

yargs.command({
	command: "fist_data_posgre",
	handler: fistData,
});

yargs.parse();
