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

app.listen(port, () => console.log(`Server is running on port ${port}`));
