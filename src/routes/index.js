const express = require("express");
const quanLyNguoiDungRouter = require("./QuanLyNguoiDung/quanLyNguoiDung.router");
const quanLyPhimRouter = require("./QuanLyPhim/quanLyPhim.router");
const quanLyRapRouter = require("./QuanLyRap/quanLyRap.router");


const rootRouter = express.Router();

// Khai báo userRouter
rootRouter.use("/QuanLyNguoiDung", quanLyNguoiDungRouter);

rootRouter.use("/QuanLyPhim", quanLyPhimRouter);

rootRouter.use("/QuanLyRap", quanLyRapRouter);

module.exports = rootRouter;