const { layDanhSachHeThong } = require("../services/quanLyRap.service");

const layThongTinHeThongRap = async (req, res) =>
{
  try {
    let { maHeThongRap = "" } = req.query;
    let rap = await layDanhSachHeThong(maHeThongRap);
    return res.status(200).json(200, rap);
  } catch (error) {
    return res.status(400).json(400, error);
  }
}
const layThongTinCumRapTheoHeThong = async (req, res) =>
{
  try
  {

  } catch (error) {
    return res.status(400).json(400, error);
  }
}

module.exports = {
  layThongTinHeThongRap,
  layThongTinCumRapTheoHeThong
};
