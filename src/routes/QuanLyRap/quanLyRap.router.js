const express = require("express");
const quanLyRapController = require("../../controllers/quanLyRap.controller")
const quanLyRapRouter = express.Router();

quanLyRapRouter.get("/LayThongTinHeThongRap", quanLyRapController.layThongTinHeThongRap);

quanLyRapRouter.get("/LayThongTinCumRapTheoHeThong", quanLyRapController.layThongTinCumRapTheoHeThong);

//delay
quanLyRapRouter.get("/LayThongTinLichChieuHeThongRap", quanLyRapController.layThongTinLichChieuController);

quanLyRapRouter.get("/LayThongTinLichChieuPhim", quanLyRapController.layThongTinLichChieuPhimController);

module.exports = quanLyRapRouter;