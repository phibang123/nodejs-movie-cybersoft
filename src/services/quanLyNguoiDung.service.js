const { NguoiDung, LoaiNguoiDung } = require("../models/root.model");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

const dangKy = async (data) => {
	let {
		taiKhoan: ND_taiKhoan,
		matKhau: ND_matKhau,
		email: ND_email,
		soDt: ND_soDt,
		hoTen: ND_hoTen,
	} = data;

	try {
		let user = await NguoiDung.create({
			ND_taiKhoan,
			ND_hoTen,
			ND_email,
			ND_soDt,
			ND_matKhau,
		});
		return user;
	} catch (error) {
		throw error;
	}
};

const dangNhap = async (data) => {
	let { taiKhoan, matKhau } = data;

	try {
		let user = await NguoiDung.findOne({
			where: {
				ND_taiKhoan: taiKhoan,
			},
			raw: true,
		});
		//console.log(JSON.stringify(user, null, 2), "alo")

		if (user && bcrypt.compareSync(matKhau, user.ND_matKhau)) {
			const token = generateToken({ ...user });
			return {
				taiKhoan: user.ND_taiKhoan,
				hoTen: user.ND_hoTen,
				email: user.ND_email,
				soDT: user.ND_soDT,
				maLoaiNguoiDung: user.LND_maLoaiNguoiDung,
				...token,
			};
		} else {
			throw new Error("Tài Khoản và mật khẩu không chình xác");
		}
	} catch (error) {
		throw new Error("Tài Khoản và mật khẩu không chình xác");
	}
};

const loaiNguoiDung = async () => {
	try {
		const loaiND = await LoaiNguoiDung.findAll({
			raw: true,
		});
		const mapLND = loaiND.map((loai) => {
			return {
				maLoaiNguoiDung: loai.LND_maLoaiNguoiDung,
				tenLoai: loai.LND_tenLoai,
			};
		});
		return mapLND;
	} catch (error) {
		throw error;
	}
};

const danhSachNguoiDung = async (data) => {
	try {
		let danhSachND = await NguoiDung.findAll({
			where: {
				ND_hoTen: {
					[Op.like]: `%${data}%`,
				},
			},
			attributes: { exclude: ["ND_matKhau","ND_id"]},
			raw: true
		});
		const mapND = danhSachND.map((nd) => {
			return {
				taiKhoan: nd.ND_taiKhoan,
				hoTen: nd.ND_hoTen,
				email: nd.ND_email,
				soDt: nd.ND_soDt,
				maLoaiNguoiDung: nd.LND_maLoaiNguoiDung,
				createdAt: nd.createdAt,
				updatedAt: nd.updatedAt
			}
		});
		return mapND
	} catch (error)
	{
		throw new error
	}
};

const danhSachNguoiDungPhanTrang = async (data) =>
{
	try {
		let invalue = await NguoiDung.count();
		console.log(invalue)
	} catch (error) {
		
	}
}
module.exports = {
	dangKy: dangKy,
	dangNhap: dangNhap,
	loaiNguoiDung,
	danhSachNguoiDung,
	danhSachNguoiDungPhanTrang
};
