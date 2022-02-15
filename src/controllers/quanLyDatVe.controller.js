const { layDanhSachPhongVe, taoLichChieu } = require("../services/quanLyDatVe.service");




const layDanhSachPhongVeController = async (req, res) => {
	try {
		let { MaLichChieu } = req.query;
		let phongVe = await layDanhSachPhongVe(MaLichChieu);
		return res.status(200).json(200, phongVe);
	} catch (error) {
		if (error === "BAD") {
			return res.status(500).json(500, "serveice error");
		}
		return res.status(400).json(400, error);
	}
};

const taoLichChieuController = async (req, res) => {
	try {
    let { maRap , maPhim , ngayChieuGioChieu, giaVe } = req.body;
    let mangGhe = await taoLichChieu({ maRap, maPhim, ngayChieuGioChieu, giaVe })
    return res.status(200).json(200, );
  } catch (error)
  {
		if (error === "BAD") {
			return res.status(500).json(500, "serveice error");
    }
    if (error.name === "SequelizeUniqueConstraintError")
		{
			return res.status(500).json(500, "do thiết kế DB sai dạng chuẩn nên không thể tạo lại phim trong rạp đó đc")
		}
		return res.status(400).json(400, error);
	}
};

module.exports = {
	layDanhSachPhongVeController,
	taoLichChieuController,
};
