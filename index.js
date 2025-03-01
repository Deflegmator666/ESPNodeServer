const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/data", (req, res) => {
  let { id, state } = req.body;
  let currentDate = new Date().toLocaleString();
  let formingDataObj = {
    id,
    state,
    currentDate,
  };
  console.log("Полученные данные:", formingDataObj);

  return res.json({ message: "Данные получены", currentDate });
});

// app.get("/data", (req, res) => {
//   return res.json({ message: "Данные получены", received: req.body });
// });

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
