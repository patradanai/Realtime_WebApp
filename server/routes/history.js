const express = require("express");
const router = express.Router();
const sql = require("mssql");

//Initiallising connection string
const dbConfig = {
  user: "sa",
  password: "qwerty@1",
  server: "172.16.73.146",
  database: "MT700PDDB"
};

// GET
router.get("/", async (req, res) => {
  const search = req.query.data;
  console.log(search);
  // Prepare Query messsage
  const query =
    "SELECT [Lot],[PartName],[Machine],[Block],[EmpCode],[OprCode],[Problem],[LossCode],[LossTime],[Action],[Details],[timedate] FROM [MT700PDDB].[dbo].[NMPSC_GANT] WHERE [Lot] = '" +
    search +
    "' OR [PartName] = '" +
    search +
    "' ORDER BY [timedate] ASC";
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
