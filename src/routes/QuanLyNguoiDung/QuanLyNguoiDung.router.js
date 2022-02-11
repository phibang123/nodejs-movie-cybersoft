const express = require("express");
const quanLyNguoiDungContronller = require("../../controllers/quanLyNguoiDung.controller")

const quanLyNguoiDungRouter = express.Router();

quanLyNguoiDungRouter.post("/DangKy", quanLyNguoiDungContronller.dangKyControlelr);

quanLyNguoiDungRouter.post("/DangNhap", quanLyNguoiDungContronller.dangNhapController);

quanLyNguoiDungRouter.get("/LayDanhSachLoaiNguoiDung", quanLyNguoiDungContronller.layDanhSachLoaiNguoiDungController);

module.exports = quanLyNguoiDungRouter;