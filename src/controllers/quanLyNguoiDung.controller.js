const { dangKy, dangNhap, loaiNguoiDung,danhSachNguoiDung,danhSachNguoiDungPhanTrang } = require("../services/quanLyNguoiDung.service");


const dangKyControlelr = async (req, res) =>
{
  const { taiKhoan, matKhau, email,soDt, hoTen } = req.body;

  try {
    await dangKy({ taiKhoan, matKhau, email, soDt, hoTen })
    return res.status(201).json(201, {taiKhoan,  email, soDt, hoTen});
  } catch (err)
  {
    console.log(err);
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json(400, err.errors[0].message);
    }
    else if (err.name === "SequelizeUniqueConstraintError")
    {
      return res.status(400).json(400, err.errors[0].message);
    }
    else
    {
      return res.status(500).json(500, err);
    }
  }
};

const dangNhapController = async (req, res) =>
{
  try
  {
    const { taiKhoan, matKhau } = req.body;
    let user = await dangNhap({ taiKhoan, matKhau });
    return res.status(200).json(200, user );
  } catch (error) {
    return res.status(400).json(400, error);
  }
}

const layDanhSachLoaiNguoiDungController = async (req, res) =>
{
  try {
    let loaiND = await loaiNguoiDung();
    return res.status(200).json(200, loaiND );
  } catch (error) {
    return res.status(400).json(400, error);
  }
}

const layDanhSachNguoiDungController = async (req, res) =>
{
  try
  {
    let { tuKhoa = "" } = req.query;
    const danhSachND = await danhSachNguoiDung(tuKhoa);
    return res.status(200).json(200, danhSachND );
  } catch (error) {
    return res.status(500).json(500, error);
  }
}

const layDanhSachNguoiDungPhanTranController = async (req, res) =>
{
  try
  {
    let { tuKhoa = "" } = req.query;
    await danhSachNguoiDungPhanTrang()
  } catch (error) {
    
  }
}
module.exports = {
  dangKyControlelr,
  dangNhapController,
  layDanhSachLoaiNguoiDungController,
  layDanhSachNguoiDungController,
  layDanhSachNguoiDungPhanTranController
};
