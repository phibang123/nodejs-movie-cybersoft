const { layBanner, layPhim,layThongTinPhimTheoMa, xoaPhim } = require("../services/quanLyPhim.service");

const layDanhSachBaner = async (req, res) => {
	try {
		let banner = await layBanner();
		return res.status(200).json(200, banner);
	} catch (error) {
		if (error === "BAD") {
			return res.status(500).json(500, "serveice error");
		}
		return res.status(400).json(400, error.content);
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
		return res.status(400).json(400, error.content);
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
		return res.status(400).json(400, error.content);
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
		return res.status(400).json(400, error.content);
	}
}

const themPhimUploadHinhController = async (req, res) =>
{
	try {
		
	} catch (error) {
		
	}
}
module.exports = {
	layDanhSachBaner,
	layDanhSachPhim,
	layThongTinPhim,
	xoaPhimController,
	themPhimUploadHinhController
};
