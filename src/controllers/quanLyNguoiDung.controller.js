const {
	dangKy,
	dangNhap,
	loaiNguoiDung,
	danhSachNguoiDung,
	danhSachNguoiDungPhanTrang,
	themNguoiDung,
	capNhapNguoiDung,
	xoaNguoiDung,
	layThongTinTaiKhoan
} = require("../services/quanLyNguoiDung.service");

const dangKyControlelr = async (req, res) => {
	const { taiKhoan, matKhau, email, soDt, hoTen } = req.body;

	try {
		await dangKy({ taiKhoan, matKhau, email, soDt, hoTen });
		return res.status(201).json(201, { taiKhoan, email, soDt, hoTen });
	} catch (err) {
		if (err.name === "SequelizeValidationError") {
			return res.status(400).json(400, err.errors[0].message);
		} else if (err.name === "SequelizeUniqueConstraintError") {
			return res.status(400).json(400, err.errors[0].message);
		} else {
			return res.status(500).json(500, err);
		}
	}
};

const dangNhapController = async (req, res) => {
	try {
		const { taiKhoan, matKhau } = req.body;
		let user = await dangNhap({ taiKhoan, matKhau });
		return res.status(200).json(200, user);
	} catch (error) {
		if (error === "BAD") {
			return res.status(500).json(500, "serveice error");
		}
		return res.status(400).json(400, error);
	}
};

const layDanhSachLoaiNguoiDungController = async (req, res) => {
	try {
		let loaiND = await loaiNguoiDung();
		return res.status(200).json(200, loaiND);
	} catch (error) {
		if (error === "BAD") {
			return res.status(500).json(500, "serveice error");
		}
		return res.status(400).json(400, error);
	}
};

const layDanhSachNguoiDungController = async (req, res) => {
	try {
		let { tuKhoa = "" } = req.query;
		const danhSachND = await danhSachNguoiDung(tuKhoa);
		return res.status(200).json(200, danhSachND);
	} catch (error) {
		if (error === "BAD") {
			return res.status(500).json(500, "serveice error");
		}
		return res.status(400).json(400, error);
	}
};

const layDanhSachNguoiDungPhanTranController = async (req, res) => {
	try {
		let { tuKhoa = "" } = req.query;
		await danhSachNguoiDungPhanTrang();
	} catch (error) {
		if (error === "BAD") {
			return res.status(500).json(500, "serveice error");
		}
		return res.status(400).json(400, error);
	}
};

const themNguoiDungController = async (req, res) => {
	try {
		const {
			taiKhoan,
			matKhau,
			email,
			soDt,
			hoTen,
			maLoaiNguoiDung = "KhachHang",
		} = req.body;
		await themNguoiDung({
			taiKhoan,
			matKhau,
			email,
			soDt,
			hoTen,
			maLoaiNguoiDung,
		});
		return res
			.status(201)
			.json(201, { taiKhoan, email, soDt, hoTen, maLoaiNguoiDung });
	} catch (err) {
		if (err.name === "SequelizeValidationError") {
			return res.status(400).json(400, err.errors[0].message);
		} else if (err.name === "SequelizeUniqueConstraintError") {
			return res.status(400).json(400, err.errors[0].message);
		} else if (err.name === "SequelizeForeignKeyConstraintError") {
			return res.status(400).json(400, "Loại người dùng không hợp lệ!");
		} else {
			return res.status(500).json(500, "BAD");
		}
	}
};

const capNhapThongTinNguoiDungController = async (req, res) => {
	try {
		const {
			taiKhoan,
			matKhau,
			email,
			soDt,
			hoTen,
			maLoaiNguoiDung = "KhachHang",
		} = req.body;
		console.log(req.user.id);
		let userUpdate = await capNhapNguoiDung(
			{
				taiKhoan,
				matKhau,
				email,
				soDt,
				hoTen,
				maLoaiNguoiDung,
			},
			req.user.id
		);
		return res.status(200).json(200, userUpdate);
	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			return res.status(400).json(400, error.errors[0].message);
		} else if (error.name === "SequelizeUniqueConstraintError") {
			return res.status(400).json(400, error.errors[0].message);
		} else if (error.name === "SequelizeForeignKeyConstraintError") {
			return res.status(400).json(400, "Loại người dùng không hợp lệ!");
		} else {
			return res.status(500).json(500, error);
		}
	}
};

const xoaNguoiDungController = async (req, res) => {
	try {
		let { TaiKhoan } = req.query;
		await xoaNguoiDung(TaiKhoan);
		return res.status(200).json(200, "Xóa thành công!");
	} catch (error)
	{
		if (error === "BAD") {
			return res.status(500).json(500, error);
		}
		return res.status(400).json(400, error);
	}
};

const layThongTinTaiKhoanController = async (req, res) =>
{
	try {
		let user = await layThongTinTaiKhoan(req.user.id);
		return res.status(200).json(200, user);
	} catch (error) {
		if (error === "BAD") {
			return res.status(500).json(500, error);
		}
	
		return res.status(400).json(400, error);
	}
}
module.exports = {
	dangKyControlelr,
	dangNhapController,
	layDanhSachLoaiNguoiDungController,
	layDanhSachNguoiDungController,
	layDanhSachNguoiDungPhanTranController,
	themNguoiDungController,
	capNhapThongTinNguoiDungController,
	xoaNguoiDungController,
	layThongTinTaiKhoanController
};
