const express = require("express");
const quanLyRapController = require("../../controllers/quanLyRap.controller")
const quanLyRapRouter = express.Router();

quanLyRapRouter.get("/LayThongTinHeThongRap", quanLyRapController.layThongTinHeThongRap);

quanLyRapRouter.get("/LayThongTinCumRapTheoHeThong", quanLyRapController.layThongTinCumRapTheoHeThong);

module.exports = quanLyRapRouter;