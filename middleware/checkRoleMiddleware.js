const jwt = require("jsonwebtoken");

// Для реализации ролей, пока не используется

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Не авторизовован" });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).json({ message: "Нет доступа" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      if (error.message === "jwt expired") {
        return res.status(401).json({
          message: "Время сессии истекло, осуществите вход повторно",
        });
      } else {
        return res.status(500).json({
          message: error,
        });
      }
    }
  };
};
