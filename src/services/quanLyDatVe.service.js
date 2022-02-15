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

const funcMangGhe = (id,giaVe) =>
{
  let mangGhe = [];
	for (var i = 1; i <= 200; i++) {
    mangGhe.push({
      G_maGhe: i,
      LC_maLichChieu: id,
      GXC_giaGhe: giaVe,
    });
  }
  return mangGhe
};


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
          tenPhim: pv?.phimChieuRap?.Phim === null ? "PHIM ĐÃ BỊ XÓA" : pv?.phimChieuRap?.Phim?.P_tenPhim,
          tenRap: pv.rapChieuTheoPhim.R_tenRap,
        },
        danhSachGhe: pv.gheLichChieu.map((ghe) =>
        {
          return {
            daDat: ghe.DV_maVe === null ? false : true,
            giaVe: ghe.GXC_giaGhe,
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

const taoLichChieu = async (data) =>
{
  try
  {
    console.log(data)
    let maCumRap = await Rap.findOne({
      where: {
        R_maRap: data.maRap
      },
      include: [{
        model: CumRap,
        as: "danhSachRap",
      }],
    })
    let phimM = await Phim.findOne({
      where: {
        P_maPhim: data.maPhim
      }
    })
    //console.log(JSON.stringify(maCumRap, null, 2), "alo")
    if (!maCumRap)
    {
      throw new Error("Rạp không tồn tại")
    }
    if (!phimM)
    {
      throw new Error("Phim không tồn tại")
    }
    let phimTrongDanhSach = await DanhSachPhim.findOne({
      where: {
        P_maPhim: data.maPhim,
        CR_maCumRap: maCumRap.danhSachRap.CR_maCumRap
      }
    })
    if (!phimTrongDanhSach)
    {
      let taoDanhSach = await DanhSachPhim.create({
        P_maPhim: data.maPhim,
        CR_maCumRap: maCumRap.danhSachRap.CR_maCumRap
      })
      let lChieu = await LichChieu.create({
        DSP_id: taoDanhSach.DSP_id,
        R_maRap: maCumRap.R_maRap,
        LC_ngayChieuGioiChieu: data.ngayChieuGioChieu,
        LC_giaVe: data.giaVe
      })  
      let mangGhe = funcMangGhe(lChieu.LC_maLichChieu,data.giaVe)
      await GheXuatChieu.bulkCreate(mangGhe)
    }
    else
    {
      let lChieu = await LichChieu.create({
        DSP_id: phimTrongDanhSach.DSP_id,
        R_maRap: maCumRap.R_maRap,
        LC_ngayChieuGioiChieu: data.ngayChieuGioChieu,
        LC_giaVe: data.giaVe
      })  
      let mangGhe = funcMangGhe(lChieu.LC_maLichChieu,data.giaVe)
      await GheXuatChieu.bulkCreate(mangGhe)
    }
  } catch (error)
  {
    throw error
  }
}


module.exports = {
  layDanhSachPhongVe,
  taoLichChieu
};
