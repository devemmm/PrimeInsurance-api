require("../src/db/databaseConfig");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const appRoutes = require("../src/routes/appRoutes");

const port = process.env.PORT;

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(appRoutes);

const responses = {
  very_satisfied: [
    {
      service: "Tax Vehiclee",
      total: 0,
    },
    {
      service: "Car Insurance",
      total: 0,
    },
  ],
  satisfied: [
    {
      service: "Tax Vehiclee",
      total: 0,
    },
    {
      service: "Car Insurance",
      total: 0,
    },
  ],
  neither_satisfied_nor_dissatisfied: [
    {
      service: "Tax Vehiclee",
      total: 0,
    },
    {
      service: "Car Insurance",
      total: 0,
    },
  ],
  dissatisfied: [
    {
      service: "Tax Vehiclee",
      total: 0,
    },
    {
      service: "Car Insurance",
      total: 0,
    },
  ],
  verry_dissatisfied: [
    {
      service: "Tax Vehiclee",
      total: 0,
    },
    {
      service: "Car Insurance",
      total: 0,
    },
  ],
};

app.listen(port, () => console.log(`Server is running on port ${port}`));
