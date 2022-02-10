const { dangKy } = require("../services/quanLyNguoiDung.service");


const dangKyControlelr = async (req, res) =>
{
  const { taiKhoan, matKhau, email,soDt, hoTen } = req.body;

  try {
    //const user = await NguoiDung.create({ email, password, role });
    await dangKy({ taiKhoan, matKhau, email,soDt, hoTen })
    res.json(201,{ taiKhoan, email,soDt, hoTen }, "xử lý thành công");
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      res.status(400).json(400, err.errors);
    }
    else if (err.name === "SequelizeUniqueConstraintError")
    {
      let path = err.errors[0].path.split("_");
      let value = err.errors[0].value
      let message = `${path[1]}: ${value} đã tồn tại`
      res.status(400).json(400, message);
    }
   
    res.status(500).json(500, "Bad");
    console.log(err);
  }
};



module.exports = {
  dangKyControlelr,
};
