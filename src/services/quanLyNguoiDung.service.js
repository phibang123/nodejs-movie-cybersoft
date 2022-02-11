const { NguoiDung } = require("../models/root.model");
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
      raw: true
    });
    //console.log(JSON.stringify(user, null, 2), "alo")
   
    if (user && bcrypt.compareSync(matKhau, user.ND_matKhau))
    {
      const token = generateToken({ ...user });
      return { 
        taiKhoan: user.ND_taiKhoan,
        hoTen: user.ND_hoTen,
        email: user.ND_email,
        soDT: user.ND_soDT,
        maLoaiNguoiDung: user.LND_maLoaiNguoiDung,
        ...token
    }
    }
    else
    {
      throw new Error("Tài Khoản và mật khẩu không chình xác")
    }
	} catch (error) {
    throw new Error("Tài Khoản và mật khẩu không chình xác")
	}
};

module.exports = {
	dangKy: dangKy,
	dangNhap: dangNhap,
};
