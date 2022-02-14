const {
	NguoiDung,
	LoaiNguoiDung,
	GheXuatChieu,
	LichChieu,
	DanhSachPhim,
	DatVe,
  Rap,
  CumRap,
  Phim,
  Ghe
} = require("../models/root.model");
const Sequelize = require("sequelize");
const moment = require("moment")
const Op = Sequelize.Op;

const layDanhSachPhongVe = async (data) => {
	try {
		let PhongVe = await LichChieu.findOne({
			where: {
				LC_maLichChieu: data,
			},
			include: [
				{
					as: "phimChieuRap",
          model: DanhSachPhim,
          include: [{
            model: Phim
          }]
				},
				{
					as: "rapChieuTheoPhim",
          model: Rap,
          include: [{
            model: CumRap,
            as: "danhSachRap",
          }]
				},
				{
					model: GheXuatChieu,
					as: "gheLichChieu",
					include: [
						{
							model: Ghe,
							as: "gheChieuPhim",
						},
						{
							model: DatVe,
              as: "thongTinVe",
              include: [{
                model: NguoiDung,
                as: "thongTinDatVe",
              }]
						},
					],
				},
			],
		});
    //console.log(JSON.stringify(PhongVe, null, 2));
    let [phongVeCustom] = [PhongVe].map((pv) =>
    {
      return {
        thongTinPhim: {
          diaChi: pv.rapChieuTheoPhim.danhSachRap.CR_diaChi,
          gioChieu: moment(pv.LC_ngayChieuGioiChieu).format('LT'),
          hinhAnh: pv.rapChieuTheoPhim.danhSachRap.CR_hinhAnh,
          maLichChieu: pv.LC_maLichChieu,
          ngayChieu: moment(pv.LC_ngayChieuGioiChieu).format('L'),
          tenCumRap: pv.rapChieuTheoPhim.danhSachRap.CR_tenCumRap,
          tenPhim: pv?.phimChieuRap?.Phim?.P_tenPhim === null ? "PHIM ĐÃ BỊ XÓA" : pv?.phimChieuRap?.Phim?.P_tenPhim,
          tenRap: pv.rapChieuTheoPhim.R_tenRap,
        },
        danhSachGhe: pv.gheLichChieu.map((ghe) =>
        {
          return {
            daDat: ghe.DV_maVe === null ? false : true,
            giaVe: ghe.DV_giaGhe,
            loaiGhe: ghe.gheChieuPhim.G_loaiGhe,
            maGhe: ghe.GXC_id,
            maRap: pv.R_maRap,
            stt: ghe.gheChieuPhim.G_stt,
            taiKhoanNguoiDat: ghe.thongTinVe == null ? null : ghe.thongTinVe?.thongTinDatVe?.ND_taiKhoan,
            tenGhe: ghe.gheChieuPhim.G_tenGhe,
          }
        })
      }
    })
    return phongVeCustom
	} catch (error) {
		console.log(error);
		throw error;
	}
};

module.exports = {
	layDanhSachPhongVe,
};
