const express = require("express");
const quanLyNguoiDungRouter = require("./QuanLyNguoiDung/quanLyNguoiDung.router");

// url: api/v1
const rootRouter = express.Router();

// Khai báo userRouter
rootRouter.use("/QuanLyNguoiDung", quanLyNguoiDungRouter);


module.exports = rootRouter;