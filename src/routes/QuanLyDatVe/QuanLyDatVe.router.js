const express = require("express");
const { authenticate,authorize } = require("../../middlewares/authentication");
const quanLyDatVeController = require("../../controllers/quanLyDatVe.controller")
const quanLyDatVe = express.Router();

quanLyDatVe.get("/LayDanhSachPhongVe", quanLyDatVeController.layDanhSachPhongVeController);




module.exports = quanLyDatVe;