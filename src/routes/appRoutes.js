const express = require("express");
const {
  index,
  signin,
  subSurvey,
  createUser,
} = require("../controller/AppController");

const route = express.Router();

route.get("/", index);

route.post("/signin", signin);

route.post("/create/user", createUser);

route.get("/survey", (req, res) => {
  res.render("survey");
});

route.post("/survey", (req, res) => {
  console.log({ survey: req.body });

  res.redirect("/home");
});

route.get("/users-list", (req, res) => {
  res.render("users-list");
});

route.get("/profile", (req, res) => {
  res.render("profile");
});

module.exports = route;
