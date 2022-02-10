const { NguoiDung } = require('../models/root.model')




const dangKy = async (data) =>
{
  let { taiKhoan: ND_taiKhoan, matKhau: ND_matKhau, email: ND_email, soDt: ND_soDT, hoTen: ND_hoTen } = data
  
  try {
    let nguoiDung = await NguoiDung.create({
      ND_taiKhoan,
      ND_hoTen,
      ND_email,
      ND_soDT,
      ND_matKhau,
    });
    return nguoiDung
  } catch (error)
  {
    throw error
  }

}




module.exports = {
  dangKy: dangKy,
}