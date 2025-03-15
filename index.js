const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*", // Разрешить запросы с любого домена
    methods: ["GET", "POST", "DELETE", "OPTIONS"], // Разрешенные методы
    allowedHeaders: ["Content-Type", "Authorization"], // Разрешенные заголовки
  })
);
app.options("*", cors());
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
