// app.delete("/data", (req, res) => {
//   try {
//     let { objId } = req.body;

//     let resultSearch = motionDataArr.filter((item) => item.objId !== objId);
//     motionDataArr = resultSearch;
//     return res.json(motionDataArr);
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/data", (req, res) => {
//   try {
//     let { deviceId, state } = req.body;
//     let currentDate = new Date().toLocaleString("ru-RU", {
//       timeZone: "Europe/Moscow",
//     });
//     let formingDataObj = {
//       deviceId,
//       objId: Math.random().toString().substring(2, 8),
//       state,
//       currentDate,
//     };
//     motionDataArr.push(formingDataObj);
//     console.log("Полученные данные:", formingDataObj);

//     return res.json({ message: "Данные получены", currentDate });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get("/data", (req, res) => {
//   try {
//     res.json(motionDataArr);
//   } catch (error) {
//     console.log(error);
//   }
// });

let cash = require("../cashDataArray/dataArr");

const delEvent = async (req, res) => {
  try {
    let { objId } = req.body;

    let resultSearch = cash.filter((item) => item.objId !== objId);
    cash = resultSearch;
    return res.json(cash);
  } catch (error) {
    console.log(error);
  }
};

const getAllEvents = async (req, res) => {
  try {
    res.json(cash);
  } catch (error) {
    console.log(error);
  }
};

const createEvent = async (req, res) => {
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
    cash.push(formingDataObj);

    console.log("Полученные данные:", formingDataObj);

    return res.json({ message: "Данные получены", currentDate });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteFn = delEvent;
exports.getFn = getAllEvents;
exports.createFn = createEvent;
