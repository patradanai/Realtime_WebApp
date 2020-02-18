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

// History ROUTE

const history = require("./routes/history");

app.use("/api/history", history);

const maintain = require("./routes/maintain");

app.use("/api/maintain", maintain);

// Login

const login = require("./routes/login");

app.use("/api/auth", login);

app.listen(5000, () => {
  console.log("SERVER RUNNING");
});
