const jwt = require("jsonwebtoken");

const generateJwt = () => {
  return jwt.sign({ iss: "ESPNodeServer" }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

const login = async (req, res) => {
  try {
    let { login, password } = req.body;
    if (!login || !password) {
      return res.json({ message: "Введите Ваш логин и пароль" });
    }
    if (
      login === process.env.RAILWAY_VOLUME_NAME &&
      password === process.env.WEB_PASSWORD
    ) {
      const token = generateJwt();
      return res.json({ token });
    } else {
      res.status(401).json({ message: "Некорректный логин или пароль" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = login;
