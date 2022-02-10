const express = require("express");
const quanLyNguoiDungRouter = require("./QuanLyNguoiDung/QuanLyNguoiDung.router");

// url: api/v1
const rootRouter = express.Router();

// Khai báo userRouter
rootRouter.use("/QuanLyNguoiDung", quanLyNguoiDungRouter);


module.exports = rootRouter;