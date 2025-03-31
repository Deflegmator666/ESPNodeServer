const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

const ALLOWED_IPS = ["87.117.50.244"];

app.use((req, res, next) => {
  // Получаем IP с учетом прокси (если используется)
  let clientIP = req.headers["x-forwarded-for"]
    ? req.headers["x-forwarded-for"].split(",")[0].trim()
    : req.socket.remoteAddress;

  // Убираем префикс ::ffff: для IPv4 в IPv6 (например, ::ffff:192.168.1.1 → 192.168.1.1)
  if (clientIP.startsWith("::ffff:")) {
    clientIP = clientIP.substring(7);
  }

  // Для локального тестирования (::1 → 127.0.0.1)
  if (clientIP === "::1") {
    clientIP = "127.0.0.1";
  }

  console.log("Запрос от IP:", clientIP);

  if (ALLOWED_IPS[0] === clientIP) {
    next();
  } else {
    console.log("Доступ запрещен для IP:", clientIP);
    res.status(403).json({ error: "Доступ запрещен" });
  }
});

// app.use((req, res, next) => {
//   let clientIP = req.socket.remoteAddress;
//   console.log(clientIP);
//   if (ALLOWED_IPS.includes(clientIP)) {
//     next();
//   } else {
//     res.status(403).json({ error: "Доступ запрещен" });
//   }
// });

// app.use(
//   cors({
//     origin: CORSORIGIN2,
//     methods: ["GET", "POST", "DELETE", "OPTIONS"], // Разрешенные методы
//     allowedHeaders: ["Content-Type", "Authorization"], // Разрешенные заголовки
//   })
// );
//app.options("*", cors());
app.use(bodyParser.json());

let motionDataArr = [];

app.delete("/data", (req, res) => {
  try {
    let { objId } = req.body;

    let resultSearch = motionDataArr.filter((item) => item.objId !== objId);
    motionDataArr = resultSearch;
    return res.json(motionDataArr);
  } catch (error) {
    console.log(error);
  }
});

app.get("/data", (req, res) => {
  try {
    res.json(motionDataArr);
  } catch (error) {
    console.log(error);
  }
});

app.post("/data", (req, res) => {
  try {
    let { deviceId, state } = req.body;
    let currentDate = new Date().toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });
    let formingDataObj = {
      deviceId,
      objId: Math.random().toString().substring(2, 8),
      state,
      currentDate,
    };
    motionDataArr.push(formingDataObj);
    console.log("Полученные данные:", formingDataObj);

    return res.json({ message: "Данные получены", currentDate });
  } catch (error) {
    console.log(error);
  }
});

// app.get("/data", (req, res) => {
//   return res.json({ message: "Данные получены", received: req.body });
// });

app.listen(port, () => {
  // console.log(`Сервер запущен на http://localhost:${port}`);
  console.log(`Сервер запущен`);
});
