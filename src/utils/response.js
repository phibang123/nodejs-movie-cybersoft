// hàm format kết quả trả về của API khi thành công cho client
const moment = require('moment'); 


const ReS = (code, content, message = "") => {
  const resp = { success: true };

  if (message) {
    resp.message = message;
  }
  if (code) {
    resp.statusCode = code;
  }
  resp.dateTime = moment().format();
  resp.messageConstants = null;
  return {  content, ...resp };
};

// hàm format kết quả trả về của API khi thất bại cho client
const ReE = (code, err, message = "") => {
  const resp = { success: false };
  
  resp.dateTime = moment().format();
  resp.messageConstants = null;
  if (code) {
    resp.statusCode = code;
  }

  if (message) {
    resp.message = message;
  }
  else
  {
    resp.message = "Không tìm thấy tài nguyên!";
  }

  // if (Array.isArray(err) && err.length > 0) {
  //   errors = err.map((e) => e.message);
  // } else if (typeof err === "object" && err.message) {
  //   errors = [err.message];
  // } else {
  //   errors = [err];
  // }
  
  if (Array.isArray(err) && err.length > 0) {
    content = err.map((e) => e.message);
  } else if (typeof err === "object" && err.message) {
    content = err.message;
  } else {
    content = err;
  }

  return { content, ...resp };
};

module.exports = {
  ReS,
  ReE,
};
