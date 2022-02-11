const { NguoiDung } = require('../models/root.model')




const dangKy = async (data) =>
{
  let { taiKhoan: ND_taiKhoan, matKhau: ND_matKhau, email: ND_email, soDt: ND_soDt, hoTen: ND_hoTen } = data
  
  try {
   await NguoiDung.create({
      ND_taiKhoan,
      ND_hoTen,
      ND_email,
      ND_soDt,
      ND_matKhau,
    });
    
  } catch (error)
  {
    throw error
  }

}




module.exports = {
  dangKy: dangKy,
}