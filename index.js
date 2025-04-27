const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/index");

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: process.env.DEV_URLS,
    credentials: true,
  })
);

app.use("/", router);

app.use(bodyParser.json());

// app.get("/data", (req, res) => {
//   return res.json({ message: "Данные получены", received: req.body });
// });

app.listen(port, () => {
  // console.log(`Сервер запущен на http://localhost:${port}`);
  console.log(`Сервер запущен`);
});
