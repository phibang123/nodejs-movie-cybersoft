const express = require("express");

const quanLyNguoiDungRouter = express.Router();

quanLyNguoiDungRouter.get("/", (req, res) =>
{
  res.status(200).json(200, "success");
});

module.exports = quanLyNguoiDungRouter;