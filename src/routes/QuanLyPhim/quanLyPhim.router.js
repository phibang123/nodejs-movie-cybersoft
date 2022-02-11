const express = require("express");
const quanLyPhimController = require("../../controllers/quanLyPhim.controller")

const quanLyPhimRouter = express.Router();

quanLyPhimRouter.get("/LayDanhSachBanner", quanLyPhimController.layDanhSachBaner);

quanLyPhimRouter.get("/LayDanhSachPhim", quanLyPhimController.layDanhSachPhim);

module.exports = quanLyPhimRouter;