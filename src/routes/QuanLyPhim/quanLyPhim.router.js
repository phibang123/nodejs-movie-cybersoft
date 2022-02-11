const express = require("express");
const quanLyPhimContronller = require("../../controllers/quanLyPhim.controller")

const quanLyPhimRouter = express.Router();


quanLyPhimRouter.get("/LayDanhSachBanner", quanLyPhimContronller.layDanhSachBaner);

module.exports = quanLyPhimRouter;