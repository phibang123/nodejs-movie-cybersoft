const express = require("express");
const quanLyNguoiDungRouter = require("./QuanLyNguoiDung/quanLyNguoiDung.router");
const quanLyPhimRouter = require("./QuanLyPhim/quanLyPhim.router");


const rootRouter = express.Router();

// Khai báo userRouter
rootRouter.use("/QuanLyNguoiDung", quanLyNguoiDungRouter);

rootRouter.use("/QuanLyPhim", quanLyPhimRouter);

module.exports = rootRouter;