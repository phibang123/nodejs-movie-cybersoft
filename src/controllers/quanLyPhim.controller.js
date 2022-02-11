const { layBanner } = require("../services/quanLyPhim.service")

const layDanhSachBaner = async (req, res) =>
{
  try {
    let banner = await layBanner();
    return res.status(200).json(200, banner);
  } catch (error) {
    return res.status(400).json(400, error);
  }
}


module.exports = {
  layDanhSachBaner
};
