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

// Functon Connect SQL SERVER

const executeQuery = (res, query) => {
  sql.connect(dbConfig, function(err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      res.send(err);
    } else {
      // create Request object
      const request = new sql.Request();
      // query to the database
      request.query(query, (err, recordset) => {
        if (err) {
          console.log("Error while querying database :- " + err);
          res.send(err);
        } else {
          res.send(recordset);
        }
      });
    }
  });
};

// Functon Connect SQL SERVER RETURN

//GET
router.get("/", async (req, res) => {
  const query = "SELECT * FROM [dbo].[NMPSC_PRODUCTION]";
  executeQuery(res, query);
});

//GET OVERVIEW
router.get("/overview/", async (req, res) => {
  let dataArr = new Array();
  const start = req.query.startDate;
  const finish = req.query.finishDate;
  const arrDate = getDates(start, finish);

  // Prepare Add Date plus one
  let momentDate = moment(finish, "YYYY-MM-DD")
    .clone()
    .format("YYYY-MM-DD");
  momentDate = moment(momentDate).add(1, "days");

  // Prepare Query messsage
  const query =
    "SELECT SUM(convert(int,[OutputProduct])) as Output,Machine,SUBSTRING([timedate],0,11) as TimeDate FROM [MT700PDDB].[dbo].[NMPSC_LOSSTIME] WHERE [timedate] BETWEEN '" +
    start +
    "' AND '" +
    moment(momentDate).format("YYYY-MM-DD") +
    "' GROUP BY [Machine],SUBSTRING([timedate],0,11)";

  // Async connect SQL SERVER AND Align Group
  try {
    const pool = await sql.connect(dbConfig);
    const dataQuery = await pool.request().query(query);

    // Loop Date
    arrDate.forEach(payload => {
      let tmpobj = {};
      // Filter From Date
      const existing = dataQuery.recordset.filter(data => {
        return data.TimeDate === payload;
      });

      // Align New Obj
      tmpobj["name"] = payload;
      existing.forEach(data => {
        tmpobj[data.Machine] = data.Output;
      });

      // Push to Array
      dataArr.push(tmpobj);
    });
  } catch (err) {
    console.log(err);
  }
  res.send(dataArr);
});

// Function Date ARray
const getDates = (start, stop) => {
  let varDate = new Array();
  let startDate = new Date(start);
  let finishDate = new Date(stop);
  while (startDate <= finishDate) {
    varDate.push(moment(startDate).format("YYYY-MM-DD"));
    startDate.setDate(startDate.getDate() + 1);
  }
  return varDate;
};

//GET ID
router.get("/:id", (req, res) => {
  const query =
    "SELECT * FROM [dbo].[NMPSC_PRODUCTION] WHERE [MachineNo] = '" +
    req.params.id +
    "'";
  executeQuery(res, query);
});

//POST : INSERT
router.post("/:id", (req, res) => {
  res.send("INSERT DATA");
});

//PUT : UPDATE
router.put("/:id", (req, res) => {
  res.send("UPDATE DATA");
});
//DELETE
router.delete("/:id", (req, res) => {
  res.send("DELETE DATA");
});

module.exports = router;
