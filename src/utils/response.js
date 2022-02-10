// hàm format kết quả trả về của API khi thành công cho client
const moment = require('moment'); 


const ReS = (code, content, message = "") => {
  const resp = { success: true };

  if (message) {
    resp.message = message;
  }
  resp.statusCode = code;
  resp.dateTime = moment().format();
  return { statusCode ,content, ...resp };
};

// hàm format kết quả trả về của API khi thất bại cho client
const ReE = (code, err, message = "") => {
  const resp = { success: false };
  let errors = [];

  if (code) {
    resp.statusCode = code;
  }

  if (message) {
    resp.message = message;
  }

  if (Array.isArray(err) && err.length > 0) {
    errors = err.map((e) => e.message);
  } else if (typeof err === "object" && err.message) {
    errors = [err.message];
  } else {
    errors = [err];
  }

  return { errors, ...resp };
};

module.exports = {
  ReS,
  ReE,
};
