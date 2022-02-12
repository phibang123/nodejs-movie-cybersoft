const jwt = require("jsonwebtoken");
const config = require("../config/index");

const EXPIRES_IN = 60 * 60 * 24; // seconds

const generateToken = (user) =>
{
 
  const payload = {
    id: user.ND_id,
    taiKhoan: user.ND_taiKhoan,
    loaiNguoiDung: user.LND_maLoaiNguoiDung,
    email: user.ND_email,
  };
  const accessToken = jwt.sign(payload, config.secret_key, {
    expiresIn: EXPIRES_IN,
  });

  return {
    accessToken,
  };
};

module.exports = {
  generateToken,
};
