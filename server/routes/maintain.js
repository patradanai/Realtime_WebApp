const express = require("express");
const router = express.Router();
const sql = require("mssql");
const moment = require("moment");

//Initiallising connection string
const dbConfig = {
  user: "sa",
  password: "qwerty@1",
  server: "172.16.73.146",
  database: "MT700PDDB"
};

// GET
router.get("/", async (req, res) => {
  const start = req.query.startDate;
  const finish = req.query.finishDate;

  // Prepare Add Date plus one
  let momentDate = moment(finish, "YYYY-MM-DD")
    .clone()
    .format("YYYY-MM-DD");
  momentDate = moment(momentDate).add(1, "days");

  // Prepare Query messsage
  const query =
    "SELECT [Lot],[Machine],[EmpCode],[OprCode],[Problem],[LossCode],[LossTime],[Action],[timedate] FROM [MT700PDDB].[dbo].[NMPSC_GANT] WHERE [timedate] BETWEEN '" +
    moment(start).format("YYYY-MM-DD") +
    "' AND '" +
    moment(momentDate).format("YYYY-MM-DD") +
    "' AND [LossCode] != 'Stop' AND [LossCode] != 'Start' AND [LossCode] != 'ShortStop' ORDER BY [Machine] ASC,  [timedate]  DESC";
  console.log(query);
  // Async connect SQL SERVER AND Align Group
  try {
    const pool = await sql.connect(dbConfig);
    const dataQuery = await pool.request().query(query);
    res.send(dataQuery);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
