const express = require("express");
const quanLyNguoiDungContronller = require("../../controllers/quanLyNguoiDung.controller")

const quanLyNguoiDungRouter = express.Router();


quanLyNguoiDungRouter.get("/LayDanhSachLoaiNguoiDung", quanLyNguoiDungContronller.layDanhSachLoaiNguoiDungController);

quanLyNguoiDungRouter.post("/DangKy", quanLyNguoiDungContronller.dangKyControlelr);

quanLyNguoiDungRouter.post("/DangNhap", quanLyNguoiDungContronller.dangNhapController);

quanLyNguoiDungRouter.get("/LayDanhSachNguoiDung", quanLyNguoiDungContronller.layDanhSachNguoiDungController);

quanLyNguoiDungRouter.get("/LayDanhSachNguoiDungPhanTrang", quanLyNguoiDungContronller.layDanhSachNguoiDungPhanTranController);

quanLyNguoiDungRouter.get("/TimKiemNguoiDung", quanLyNguoiDungContronller.layDanhSachNguoiDungController); // nhưng lấy danh sách người dùng

module.exports = quanLyNguoiDungRouter;