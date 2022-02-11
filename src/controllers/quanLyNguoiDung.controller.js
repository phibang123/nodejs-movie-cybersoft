const { dangKy } = require("../services/quanLyNguoiDung.service");


const dangKyControlelr = async (req, res) =>
{
  const { taiKhoan, matKhau, email,soDt, hoTen } = req.body;

  try {
    //const user = await NguoiDung.create({ email, password, role });
    await dangKy({ taiKhoan, matKhau, email,soDt, hoTen })
    res.status(201).json(201,{ taiKhoan, email,soDt, hoTen }, "xử lý thành công");
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json(400, err.errors[0].message);
    }
    else if (err.name === "SequelizeUniqueConstraintError")
    {
      res.status(400).json(400, err.errors[0].message);
    }
  }
};



module.exports = {
  dangKyControlelr,
};
