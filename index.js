const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

let motionDataArr = [];

const ALLOWED_IPS = ["87.117.50.244", "127.0.0.1"]; // Добавьте нужные IP

app.use(cors()); // Включите CORS

app.use((req, res, next) => {
  let clientIP =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress;

  clientIP = clientIP.replace(/^::ffff:/, "");
  clientIP = clientIP === "::1" ? "127.0.0.1" : clientIP;

  console.log("IP:", clientIP);

  if (ALLOWED_IPS.includes(clientIP)) {
    next();
  } else {
    console.log("Blocked IP:", clientIP);
    res.status(403).json({ error: "Forbidden" });
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
