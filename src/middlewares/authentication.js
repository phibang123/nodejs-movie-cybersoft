const jwt = require("jsonwebtoken");
const config = require("../config");

const extractTokenFromHeaderString = (token) => {
  if (!token) {
    return [null, "Token is missing"];
  }

  // token: Bearer abc.xyz
  const parts = token.split(" ");

  if (parts.length < 2 || parts[0] !== "Bearer" || parts[1] === "") {
    return [null, "Token invalid"];
  }

  return [parts[1], null];
};

const authenticate = async (req, res, next) => {
  try
  {
    const [token, error] = extractTokenFromHeaderString(
      req.header("accessToken")
    );

    if (error) {
      res.status(401).json(401, error);
    }

    const payload = jwt.verify(token, config.secret_key);
    
    if (!payload.id || !payload.taiKhoan)
    {
      return res.status(401).json(401, "Token invalid");
    }

    req.user = payload;

    next();
  } catch (error)
  {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json(401, "Token is expired");
    }
    return res.status(401).json(401, error);
  }
};

const authorize =
  (...allowRoles) =>
  (req, res, next) => {
    const { loaiNguoiDung } = req.user;

    const isAllow = allowRoles.some((item) => item === loaiNguoiDung);

    if (!isAllow) {
      return res.status(403).json(403, "Forbidden");
    }
    next();
  };

module.exports = {
  authenticate,
  authorize,
};
