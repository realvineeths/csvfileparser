const Ticker = require('../models/index')
const fs = require("fs");
const csv = require("fast-csv");
// const path = require('path');


const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let ticker = [];
    let path1 = __basedir + "/uploads/" + req.file.filename ;

    fs.createReadStream(path1)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        ticker.push(row);
      })
      .on("end", () => {
        Ticker.bulkCreate(ticker)
          .then(() => {
            res.status(200)
          })
          // .send({
          //   message:
          //     "Uploaded the file successfully: " + req.file.originalname,
          // });
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getTicker = (req, res) => {
  Ticker.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving data.",
      });
    });
};

module.exports = {
  upload,
  getTicker
};
