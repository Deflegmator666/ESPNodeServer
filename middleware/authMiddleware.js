const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    let dataFromClientToken = req.headers.cookie;
    if (!dataFromClientToken) {
      return res.status(401).json({ message: "Не авторизовован" });
    }
    let token = dataFromClientToken.substring(8);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.json({ message: error.message });
  }
};
