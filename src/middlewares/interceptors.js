const { ReS, ReE } = require("../utils/response");

const reponseInterceptor = (req, res, next) => {
  // Gán method res.json mặc định của express cho biến originalJson
  const originalJson = res.json;

  // Ghi đè lại hành vi mặc định của res.json của express
  // => sau này khi ta gọi res.json trong các hàm controller là ta đang gọi tới hàm được định nghĩa dưới đây
  res.json = function (code, payload, message) {
    // code nằm trong khoảng từ 200 đến nhỏ hơn 300 là thành công
    if (code >= 200 && code < 300) {
      const formattedData = ReS(code, payload, message);
      originalJson.call(res, formattedData);
      // originalJson(formattedData)
    }

    // Ngược lại là thất bại
    const formattedData = ReE(code, payload, message);
    originalJson.call(res, formattedData);
  };

  next();
};

module.exports = {
  reponseInterceptor,
};
