const fs = require("fs");

require("dotenv").config();

const db = require("./connect");

const sql = fs.readFileSync(__dirname + "/eduFun.sql").toString();

db.query(sql)
  .then(() => {
    console.log("Set-up complete.");
    db.end();
  })
  .catch((error) => console.log(error));
