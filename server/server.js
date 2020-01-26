const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

// BRT ROUTE

const brt = require("./routes/brt");

app.use("/api/brt", brt);

// LOSSCODE ROUTE

const losscode = require("./routes/production");

app.use("/api/production", losscode);

app.listen(5000, () => {
  console.log("SERVER RUNNING");
});
