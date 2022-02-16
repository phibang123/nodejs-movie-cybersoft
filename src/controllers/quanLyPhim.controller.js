const { layBanner, layPhim,layThongTinPhimTheoMa, xoaPhim ,themPhim ,upHinh, timTim ,capNhatPhim} = require("../services/quanLyPhim.service");
const deleteImag = require("../utils/deleteObjectS3");
const putImag = require("../utils/putObjectS3");

const layDanhSachBaner = async (req, res) => {
	try {
		let banner = await layBanner();
		return res.status(200).json(200, banner);
	} catch (error) {
		if (error === "BAD") {
			return res.status(500).json(500, "serveice error");
		}
		return res.status(400).json(400, error);
	}
};
const layDanhSachPhim = async (req, res) => {
	try {
		let { tenPhim = "" } = req.query;
		let phim = await layPhim(tenPhim);
		return res.status(200).json(200, phim);
	} catch (error) {
		if (error === "BAD") {
			return res.status(500).json(500, "serveice error");
		}
		return res.status(400).json(400, error);
	}
};


const layThongTinPhim = async (req, res) => {
	try {
		let { maPhim } = req.query;
		let phim = await layThongTinPhimTheoMa(maPhim);
		return res.status(200).json(200, phim);
	} catch (error) {
		if (error === "BAD") {
			return res.status(500).json(500, "serveice error");
		}
		return res.status(400).json(400, error);
	}
};

const xoaPhimController = async (req, res) =>
{
	try {
		let { maPhim } = req.query;
		await xoaPhim(maPhim);
		return res.status(200).json(200, "Xóa thành công!");
	} catch (error) {
			if (error === "BAD") {
			return res.status(500).json(500, "serveice error");
		}
		return res.status(400).json(400, error);
	}
}

const themPhimUploadHinhController = async (req, res) =>
{
	try
	{
		let { tenPhim, trailer, moTa = "", ngayKhoiChieu , sapChieu = "", dangChieu = "",  hot = "", danhGia = "" } = req.body;

		const phim = await themPhim({ tenPhim, trailer, moTa, ngayKhoiChieu, sapChieu, dangChieu, hot, danhGia });
 
		let url = await putImag(req.file, tenPhim);
	  console.log(url)
		await upHinh(phim, url);
		return res.status(201).json(201, "success");
	} catch (error)
	{
		console.log(error)
		if (error.name === "SequelizeValidationError") {
			return res.status(400).json(400, error.errors[0].message);
		} else if (error.name === "SequelizeUniqueConstraintError") {
			return res.status(400).json(400, error.errors[0].message);
		} else {
			return res.status(500).json(500, error);
		}
	}
}

const capNhatPhimController = async (req, res) =>
{
	try {
		let { maPhim, tenPhim, trailer, moTa = "", ngayKhoiChieu, sapChieu = "", dangChieu = "", hot = "", danhGia = "" } = req.body;
		let findPhim = await timTim(maPhim);
		let phimUpdate = await capNhatPhim({ maPhim, tenPhim, trailer, moTa , ngayKhoiChieu, sapChieu , dangChieu , hot , danhGia  });
		await deleteImag(findPhim.P_hinhAnh);
		let url = await putImag(req.file, tenPhim);
		await upHinh(phimUpdate, url);
    return res.status(200).json(200, "success");
	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			return res.status(400).json(400, error.errors[0].message);
		} else if (error.name === "SequelizeUniqueConstraintError") {
			return res.status(400).json(400, error.errors[0].message);
		} else {
			return res.status(500).json(500, error);
		}
	}
}
module.exports = {
	layDanhSachBaner,
	layDanhSachPhim,
	layThongTinPhim,
	xoaPhimController,
	themPhimUploadHinhController,
	capNhatPhimController
};
