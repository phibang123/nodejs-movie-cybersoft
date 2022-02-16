const express = require("express");
const { upload } = require("../../config");
const quanLyPhimController = require("../../controllers/quanLyPhim.controller");
const { authenticate,authorize } = require("../../middlewares/authentication");
const putImag = require("../../utils/putObjectS3");

const quanLyPhimRouter = express.Router();

quanLyPhimRouter.get("/LayDanhSachBanner", quanLyPhimController.layDanhSachBaner);

quanLyPhimRouter.get("/LayDanhSachPhim", quanLyPhimController.layDanhSachPhim);

quanLyPhimRouter.get("/LayDanhSachPhimPhanTrang", quanLyPhimController.layPhimPhanTrangController);

quanLyPhimRouter.post("/ThemPhimUploadHinh", upload.single("hinhAnh"), /*putImag  ,*/ quanLyPhimController.themPhimUploadHinhController);

quanLyPhimRouter.post("/CapNhatPhimUpload", upload.single("hinhAnh"), /*putImag  ,*/ quanLyPhimController.capNhatPhimController);

quanLyPhimRouter.get("/XoaPhim", authenticate, authorize("QuanTri"), quanLyPhimController.xoaPhimController);

quanLyPhimRouter.get("/XP", authenticate, authorize("QuanTri"), quanLyPhimController.xoaPhimController);

quanLyPhimRouter.get("/LayThongTinPhim" ,quanLyPhimController.layThongTinPhim);


module.exports = quanLyPhimRouter; 