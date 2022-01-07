const Survey = require("../model/Survey");
const Service = require("../model/Service");
const User = require("../model/User");

const subSurvey = [
  (req, res) => {
    res.send("hello");
  },
];

const index = [
  (req, res) => {
    res.json({ status: 200, message: "index" });
  },
];

const createUser = [
  async (req, res) => {
    try {
      const user = new User({ ...req.body });
      await user.save();

      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (error) {
      if (error.code == 11000) {
        return res.status(500).send({ error: { message: error.message } });
      }
      return res.status(400).send({ error: { message: error.message } });
    }
  },
];

const signin = [
  async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(503)
        .send({ error: { message: "You must provide email and password" } });
    }

    try {
      const user = await User.findByCredentials(email, password);
      const token = await user.generateAuthToken();

      res.status(200).send({ user, token });
    } catch (error) {
      return res.status(400).send({ error: { message: error.message } });
    }
  },
];

const createSurvey = [
  (req, res) => {
    try {
      // const { service, description } = req.body;

      const service = new Service({
        name: req.body.service,
        description: req.body.description,
        creator: "Emmanuel",
      });

      // const servey = new Servey({
      //     service: req.body.service,
      //     quetion: ''
      // })
    } catch (error) {}
  },
];

module.exports = {
  index,
  signin,
  subSurvey,
  createUser,
};
