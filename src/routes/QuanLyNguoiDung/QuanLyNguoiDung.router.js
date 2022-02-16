const express = require("express");
const quanLyNguoiDungController = require("../../controllers/quanLyNguoiDung.controller");
const { authenticate ,authorize} = require("../../middlewares/authentication");

const quanLyNguoiDungRouter = express.Router();


quanLyNguoiDungRouter.get("/LayDanhSachLoaiNguoiDung", quanLyNguoiDungController.layDanhSachLoaiNguoiDungController);

quanLyNguoiDungRouter.post("/DangKy", quanLyNguoiDungController.dangKyControlelr);

quanLyNguoiDungRouter.post("/DangNhap", quanLyNguoiDungController.dangNhapController);

quanLyNguoiDungRouter.get("/LayDanhSachNguoiDung", quanLyNguoiDungController.layDanhSachNguoiDungController);

quanLyNguoiDungRouter.get("/LayDanhSachNguoiDungPhanTrang", quanLyNguoiDungController.layDanhSachNguoiDungPhanTranController);

quanLyNguoiDungRouter.get("/TimKiemNguoiDung", quanLyNguoiDungController.layDanhSachNguoiDungController); // nhưng lấy từ danh sách người dùng

quanLyNguoiDungRouter.get("/TimKiemNguoiDungPhanTrang", quanLyNguoiDungController.layDanhSachNguoiDungPhanTranController); // nhưng lấy từ lấy danh sách người dùng phân trang

quanLyNguoiDungRouter.get("/ThongTinTaiKhoan", authenticate, quanLyNguoiDungController.layThongTinTaiKhoanController)

quanLyNguoiDungRouter.post("/ThemNguoiDung", authenticate, authorize("QuanTri"), quanLyNguoiDungController.themNguoiDungController)

quanLyNguoiDungRouter.put("/CapNhatThongTinNguoiDung", authenticate, quanLyNguoiDungController.capNhapThongTinNguoiDungController)

quanLyNguoiDungRouter.post("/CapNhatThongTinNguoiDung", authenticate, quanLyNguoiDungController.capNhapThongTinNguoiDungController)

quanLyNguoiDungRouter.delete("/XoaNguoiDung", authenticate, authorize("QuanTri") , quanLyNguoiDungController.xoaNguoiDungController)

module.exports = quanLyNguoiDungRouter;