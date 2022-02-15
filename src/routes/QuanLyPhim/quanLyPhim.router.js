const express = require("express");
const quanLyPhimController = require("../../controllers/quanLyPhim.controller");
const { authenticate,authorize } = require("../../middlewares/authentication");

const quanLyPhimRouter = express.Router();

quanLyPhimRouter.get("/LayDanhSachBanner", quanLyPhimController.layDanhSachBaner);

quanLyPhimRouter.get("/LayDanhSachPhim", quanLyPhimController.layDanhSachPhim);

//delay
quanLyPhimRouter.get("/QuanLyPhim", quanLyPhimController.layDanhSachPhim);

quanLyPhimRouter.get("/XoaPhim", authenticate, authorize("QuanTri"), quanLyPhimController.xoaPhimController);

quanLyPhimRouter.get("/XP", authenticate, authorize("QuanTri"), quanLyPhimController.xoaPhimController);

quanLyPhimRouter.get("/LayThongTinPhim" ,quanLyPhimController.layThongTinPhim);


module.exports = quanLyPhimRouter;