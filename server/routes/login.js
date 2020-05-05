const express = require("express");
const router = express.Router();
const sql = require("mssql");
const bcrypt = require("bcrypt");
const moment = require("moment");
const tools = require("./jwthandle");
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
  const hashPassword = bcrypt.hashSync(obj.password, 8);

  // Check existing USERNAME , EMAIL

  const checkQuery =
    "SELECT * FROM [Authority_NMP] WHERE [username] = '" +
    obj.user +
    "' OR [email] = '" +
    obj.email +
    "'";

  // REGISTOR

  const query =
    "INSERT INTO [Authority_NMP] ([username],[password],[email],[user_type],[timedate]) VALUES('" +
    obj.user +
    "','" +
    hashPassword +
    "','" +
    obj.email +
    "','" +
    obj.type +
    "','" +
    moment() +
    "')";

  // Concept is Check User existing --> if have not register
  try {
    const pool = await sql.connect(dbConfig);
    const dataQuery = await pool.request().query(checkQuery);
    console.log(dataQuery.recordset.length);
    if (dataQuery.recordset.length > 0) {
      res.send("USER EXISTING");
      console.log("USER EXISTING");
    } else {
      // Async connect SQL SERVER AND Align Group
      try {
        const pool2 = await sql.connect(dbConfig);
        const dataQuery2 = await pool2.request().query(query);
        res.send(dataQuery2);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
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
        res
          .json({ id: identifier, token: tools.getToKen(identifier) })
          .status(200);
      }
    } else {
      res.status(401).json({ errors: { form: "Invalid Credentials" } });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/access", (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ auth: false, message: "No TOken Provided" });
  }

  const tokenAccess = tools.verifyToken(token);

  return res
    .json({
      uid: tokenAccess.uid,
      iat: tokenAccess.iat,
      exp: tokenAccess.exp
    })
    .status(200);
});

module.exports = router;
