const { NguoiDung, LoaiNguoiDung } = require("../models/root.model");
const Sequelize = require("sequelize");
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
		await NguoiDung.create({
			ND_taiKhoan,
			ND_hoTen,
			ND_email,
			ND_soDt,
			ND_matKhau,
		});
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
		throw new Error("BAD");
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
			attributes: { exclude: ["ND_matKhau", "ND_id"] },
			raw: true,
		});
		const mapND = danhSachND.map((nd) => {
			return {
				taiKhoan: nd.ND_taiKhoan,
				hoTen: nd.ND_hoTen,
				email: nd.ND_email,
				soDt: nd.ND_soDt,
				maLoaiNguoiDung: nd.LND_maLoaiNguoiDung,
				createdAt: nd.createdAt,
				updatedAt: nd.updatedAt,
			};
		});
		return mapND;
	} catch (error) {
		throw new Error("BAD");
	}
};

const danhSachNguoiDungPhanTrang = async (data) => {
	try {
		let invalue = await NguoiDung.count();
		console.log(invalue);
	} catch (error) {
		throw new Error("BAD");
	}
};

const themNguoiDung = async (data) => {
	try {
		let {
			taiKhoan: ND_taiKhoan,
			matKhau: ND_matKhau,
			email: ND_email,
			soDt: ND_soDt,
			hoTen: ND_hoTen,
			maLoaiNguoiDung: LND_maLoaiNguoiDung,
		} = data;

		await NguoiDung.create({
			ND_taiKhoan,
			ND_hoTen,
			ND_email,
			ND_soDt,
			ND_matKhau,
			LND_maLoaiNguoiDung,
		});
	} catch (error) {
		throw error;
	}
};

const capNhapNguoiDung = async (data,token) =>
{
	try {
	  
		let user = await NguoiDung.findOne({
			where: {
				ND_id: token
			},
			include: [{model: LoaiNguoiDung,as: "loaiNguoiDung",}]
		})
	
		if (!data.taiKhoan)
		{
			throw new Error("Dữ liệu không hợp lệ!")
		}
		if (!user || user.ND_taiKhoan !== data.taiKhoan)
		{
			throw new Error("Bạn không có quyền thay đổi thông tin của người khác")
		}
		else
		{
			user.ND_matKhau = data.matKhau,
		  user.ND_hoTen = data.hoTen,
			user.ND_email = data.email,
			user.soDt = data.soDt,
			user.LND_maLoaiNguoiDung = data.maLoaiNguoiDung	
			let userUpdate = await user.save();

			console.log(JSON.stringify(userUpdate, null, 2));
			return userUpdate
		}
	} catch (error) {
		throw error;
	}
}
module.exports = {
	dangKy: dangKy,
	dangNhap: dangNhap,
	loaiNguoiDung,
	danhSachNguoiDung,
	danhSachNguoiDungPhanTrang,
	themNguoiDung,
	capNhapNguoiDung
};
