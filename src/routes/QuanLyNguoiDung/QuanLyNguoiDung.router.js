const express = require("express");
const quanLyNguoiDungController = require("../../controllers/quanLyNguoiDung.controller")

const quanLyNguoiDungRouter = express.Router();


quanLyNguoiDungRouter.get("/LayDanhSachLoaiNguoiDung", quanLyNguoiDungController.layDanhSachLoaiNguoiDungController);

quanLyNguoiDungRouter.post("/DangKy", quanLyNguoiDungController.dangKyControlelr);

quanLyNguoiDungRouter.post("/DangNhap", quanLyNguoiDungController.dangNhapController);

quanLyNguoiDungRouter.get("/LayDanhSachNguoiDung", quanLyNguoiDungController.layDanhSachNguoiDungController);

quanLyNguoiDungRouter.get("/LayDanhSachNguoiDungPhanTrang", quanLyNguoiDungController.layDanhSachNguoiDungPhanTranController);

quanLyNguoiDungRouter.get("/TimKiemNguoiDung", quanLyNguoiDungController.layDanhSachNguoiDungController); // nhưng lấy danh sách người dùng

module.exports = quanLyNguoiDungRouter;