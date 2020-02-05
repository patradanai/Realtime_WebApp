const express = require("express");
const router = express.Router();
const sql = require("mssql");

//Initiallising connection string
const dbConfig = {
  user: "sa",
  password: "qwerty@1",
  server: "172.16.73.146",
  database: "MT740_LOSSCODE"
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

// GET
router.get("/", (req, res) => {
  const query = "select * from NMPSC_TROUBLE ORDER BY convert(int,[No]) ASC";
  executeQuery(res, query);
});

// GET : ID
router.get("/:id", (req, res) => {
  const query = "select * from NMPSC_TROUBLE ORDER BY convert(int,[No]) ASC";
  executeQuery(res, query);
});

// POST INSERT
router.post("/:id", (req, res) => {
  console.log(req.body);
  const query =
    "INSERT INTO NMPSC_TROUBLE (Block,Trouble,Cause) VALUES('" +
    req.body.block +
    "','" +
    req.body.trouble +
    "','" +
    req.body.cause +
    "')";
  executeQuery(res, query);
});

// PUT UPDATE
router.put("/:id", (req, res) => {
  //  const query = "UPDATE NMPSC_TROUBLE SET"+ "Block= +"WHERE convert(int,[No])=" + req.params.id;
  //  res.sendStatus(200);
});

// DELETE
router.delete("/:id", (req, res) => {
  const query = "DELETE FROM NMPSC_TROUBLE WHERE [No]=" + req.params.id;
  executeQuery(res, query);
});

module.exports = router;
