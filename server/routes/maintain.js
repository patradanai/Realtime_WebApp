const express = require("express");
const router = express.Router();
const sql = require("mssql");
const moment = require("moment");

//Initiallising connection string
const dbConfig = {
  user: "sa",
  password: "qwerty@1",
  server: "mt700svr",
  database: "MT700PDDB"
};

// GET
