const { layDanhSachHeThongRap, layCumRapHeThongRap } = require("../services/quanLyRap.service");

const layThongTinHeThongRap = async (req, res) =>
{
  try {
    let { maHeThongRap = "" } = req.query;
    let cumRap = await layDanhSachHeThongRap(maHeThongRap);
    return res.status(200).json(200, cumRap);
  } catch (error) {
    if (error === "BAD")
    {
      return res.status(500).json(500, "serveice error");
    }
    return res.status(400).json(400, error.content);
  }
}
const layThongTinCumRapTheoHeThong = async (req, res) =>
{
  try
  {
    let { maHeThongRap } = req.query;
    if (maHeThongRap === undefined)
    {
      return res.status(400).json(400, "Không tìm thấy tài nguyên!");
    }
    let rap = await layCumRapHeThongRap(maHeThongRap);
    return res.status(200).json(200, rap);
  } catch (error)
  {
    if (error === "BAD")
    {
      return res.status(500).json(500, "serveice error");
    }
    return res.status(400).json(400, error.content);
  }
}

module.exports = {
  layThongTinHeThongRap,
  layThongTinCumRapTheoHeThong
};
