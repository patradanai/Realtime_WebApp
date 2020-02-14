const express = require("express");
const router = express.Router();
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Initiallising connection string
const dbConfig = {
  user: "sa",
  password: "qwerty@1",
  server: "172.16.73.146",
  database: "MT700PDDB"
};

router.post("/registor", async (req, res) => {
  // Prepare Query messsage
  const obj = req.body;
  const hashPassword = bcrypt.hashSync(req.body.password, 8);
  const query =
    "INSERT [username],[password],[email],[user_type] VALUES() FROM [MT700PDDB].[dbo].[Authority_NMP] WHERE [username]";
});

router.post("/", async (req, res) => {
  const { identifier, password } = req.body;

  // Prepare Query messsage
  const query =
    "SELECT [username],[password],[email],[user_type] FROM [MT700PDDB].[dbo].[Authority_NMP] WHERE [username] = '" +
    identifier +
    "'";

  // Async connect SQL SERVER AND Align Group
  try {
    const pool = await sql.connect(dbConfig);
    const dataQuery = await pool.request().query(query);

    if (dataQuery.recordset.length > 0) {
      const passwordIsvalid = bcrypt.compareSync(
        password,
        dataQuery.recordset[0].password
      );
      if (!passwordIsvalid) {
        res.status(401).json("ERROR");
      } else {
        res.status(200);
      }
    } else {
      res.status(401).json({ errors: { form: "Invalid Credentials" } });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
