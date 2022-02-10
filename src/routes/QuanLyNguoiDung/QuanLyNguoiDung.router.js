const express = require("express");
const quanLyNguoiDungContronller = require("../../controllers/quanLyNguoiDung.controller")

const quanLyNguoiDungRouter = express.Router();

quanLyNguoiDungRouter.post("/DangKy", quanLyNguoiDungContronller.dangKyControlelr);

module.exports = quanLyNguoiDungRouter;