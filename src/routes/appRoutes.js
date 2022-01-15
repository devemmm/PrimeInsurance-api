const express = require("express");
const {
  index,
  createUser,
  signin,
  createNewServey,
  newQuestion,
  deleteService,
  findAllUser,
  updateAccount,
  respondServey,
  surveyStatistics,
} = require("../controller/AppController");

const route = express.Router();

route.get("/", index);

route.post("/signin", signin);

route.post("/create/user", createUser);

route.post("/survey/register/newservice", createNewServey);

route.patch("/survey/register/newquestion", newQuestion);

route.delete("/survey/:service", deleteService);

route.get("/admin/users", findAllUser);

route.patch("/users/update", updateAccount);

route.post("/users/respond/survey", respondServey);

route.get("/admin/survey/statistics", surveyStatistics);

module.exports = route;
