const express = require("express");
const { authenticate,authorize } = require("../../middlewares/authentication");
const quanLyDatVeController = require("../../controllers/quanLyDatVe.controller")
const quanLyDatVe = express.Router();

quanLyDatVe.get("/LayDanhSachPhongVe", quanLyDatVeController.layDanhSachPhongVeController);

quanLyDatVe.post("/TaoLichChieu", authenticate, authorize("QuanTri") , quanLyDatVeController.taoLichChieuController);


module.exports = quanLyDatVe;