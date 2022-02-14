const { layDanhSachPhongVe } = require("../services/quanLyDatVe.service");






const layDanhSachPhongVeController = async (req, res) =>
{
  try
  {
    let { MaLichChieu } = req.query;
    let phongVe = await layDanhSachPhongVe(MaLichChieu);
    return res
			.status(200)
			.json(200, phongVe);
  } catch (error) {
    if (error === "BAD") {
			return res.status(500).json(500, "serveice error");
		}
		return res.status(400).json(400, error.content);
  }
}


module.exports = {
  layDanhSachPhongVeController
}