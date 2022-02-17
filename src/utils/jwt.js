const jwt = require("jsonwebtoken");
const config = require("../config/index");


const generateToken = (user) =>
{
 
  const payload = {
    id: user.ND_id,
    taiKhoan: user.ND_taiKhoan,
    loaiNguoiDung: user.LND_maLoaiNguoiDung,
    email: user.ND_email,
  };
  const accessToken = jwt.sign(payload, config.secret_key, {
    expiresIn: "24h",
  });

  return {
    accessToken,
  };
};

module.exports = {
  generateToken,
};
