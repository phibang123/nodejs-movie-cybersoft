const { layBanner ,layPhim} = require("../services/quanLyPhim.service")

const layDanhSachBaner = async (req, res) =>
{
  try {
    let banner = await layBanner();
    return res.status(200).json(200, banner);
  } catch (error) {
    return res.status(400).json(400, error);
  }
}
const layDanhSachPhim = async (req, res) =>
{
  try
  {
    let { tenPhim = "" } = req.query;
    let phim = await layPhim(tenPhim);
    return res.status(200).json(200, phim);
  } catch (error) {
    return res.status(400).json(400, error);
  }
}

module.exports = {
  layDanhSachBaner,
  layDanhSachPhim
};
