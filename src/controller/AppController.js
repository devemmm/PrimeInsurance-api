const fs = require("fs");
const nodemailer = require("nodemailer");
var json2xls = require("json2xls");
const Survey = require("../model/Survey");
const Service = require("../model/Service");
const User = require("../model/User");
const Comment = require("../model/Comment");
const requireAuth = require("../middleware/requireAuth");
const SurveyResponse = require("../model/SurveyResponse");
const filename = "prime-insurance-report.xlsx";

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

const createNewServey = [
  requireAuth,
  async (req, res) => {
    try {
      const { description, questions } = req.body;

      if (!req.body.service || !description || !questions) {
        throw new Error("missing some data");
      }

      const service = new Service({
        name: req.body.service,
        description,
        creator: req.user.email,
      });

      const survey = new Survey({
        ...req.body,
        creator: req.user.email,
      });

      const isExistingService = await Service.findOne({
        name: req.body.service,
      });
      const isExistingSurvey = await Survey.findOne({
        service: req.body.service,
      });

      if (isExistingService) {
        throw new Error("This Service Already exist");
      }
      if (isExistingSurvey) {
        throw new Error("This Service Already have a setted servey");
      }

      await service.save();
      await survey.save();

      res.json({
        status: 200,
        message: "survey created successful",
        servey: survey.service,
      });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  },
];

const findAllService = [
  async (req, res) => {
    try {
      const service = await Service.find({});

      res.status(200).json({ status: 200, message: "successfull", service });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  },
];

const findServey = [
  async (req, res) => {
    try {
      const survey = await Survey.find({ service: req.params.service });

      res.status(200).json({ status: 200, message: "successfull", survey });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  },
];

const convert = function (responses) {
  var xls = json2xls(responses);
  fs.writeFileSync(filename, xls, "binary", (err) => {
    if (err) {
      console.log("writeFileSync :", err);
    }
    console.log(filename + " file is saved!");
  });
};

const generateReport = [
  requireAuth,
  async (req, res) => {
    try {
      const survey = await SurveyResponse.find({});

      convert(survey);

      const output = `
            <p>Prime Insurance Analysis Tool System Report</p>
            <h3>Contact Details</h3>
            <ul>
                <li>Name: Prime Insurance Analysis Tool System</li>
                <li>Email: diella@prime.rw</li>
                <li>Phone: +250 785 063 340</li>
            </ul>
            <h3>Message</h3>
            <p>This is the report of survey resposes generated at ${new Date()}</p>
        `;

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      // Step 2
      let mailOptions = {
        from: "primaryemmy@gmail.com",
        to: `${req.user.email}`,
        to: `ipacy0002@gmail.com`,
        subject: "Prime Insurance Analysis Tool System Report",
        text: "heading",
        html: output,
        attachments: [
          {
            filename: "prime-insurance-report.xlsx",
            path: "./prime-insurance-report.xlsx",
          },
        ],
      };

      // Step 3
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          return res.send({ error: err });
        }
      });

      return res.status(200).json({
        status: 200,
        message: "report sent to your email please check...",
      });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  },
];

const findServeyResponses = [
  async (req, res) => {
    try {
      const surveyResponses = await SurveyResponse.find({});
      res
        .status(200)
        .json({ status: 200, message: "successfull", surveyResponses });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  },
];
const newQuestion = [
  requireAuth,
  async (req, res) => {
    try {
      const { service, question } = req.body;

      if (!service || !question) {
        throw new Error("missing some required information");
      }

      const survey = await Survey.findOne({
        service: req.body.service,
      });

      if (!survey) {
        throw new Error("survey not exist");
      }

      survey.questions.push({ question });

      await survey.save();

      res.json({ status: 200, message: "survey updated", survey });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  },
];

const deleteService = [
  requireAuth,
  async (req, res) => {
    try {
      if (!req.params.service) {
        throw new Error("missing some required information");
      }

      await Service.findOneAndDelete({ service: req.params.service });

      res.json({
        status: 200,
        message: `this ${req.params.service} deleted successfull`,
      });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  },
];

const findAllUser = [
  requireAuth,
  async (req, res) => {
    try {
      const users = await User.find({});
      res.json({ status: 200, message: "successfull", users });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  },
];

const updateAccount = [
  requireAuth,
  async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "fname",
      "lname",
      "country",
      "phone",
      "avatar",
      "password",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid Update" });
    }

    try {
      updates.forEach((update) => (req.user[update] = req.body[update]));
      await req.user.save();

      res.send(req.user);
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(400).send({ error: "Invalid Object id" });
      }
      return res.status(500).send(error);
    }
  },
];

const respondServey = [
  async (req, res) => {
    try {
      const { name, phone, service, response, comment } = req.body;

      if (!name || !phone || !service || !response) {
        throw new Error("missing some required information");
      }

      response.forEach(async (response) => {
        let surveyResponse = new SurveyResponse({
          service,
          question: response.question,
          answer: response.answer,
          customerName: name,
          customerPhone: phone,
        });

        await surveyResponse.save();
      });

      if (comment !== null) {
        const comment = new Comment({
          service,
          customerName: name,
          customerPhone: phone,
          message: comment,
        });

        await comment.save();
      }
      res.json({ status: 200, message: "successfull" });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  },
];

const getComment = [
  async (req, res) => {
    try {
      const comment = await Comment.find({});
      res.json({ status: 200, message: "successfull", comment });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  },
];

const analy = (data, service, type) => {
  let response = data.filter(
    (dat) => dat.service === service && dat.answer === type
  );

  return {
    service,
    total: response.length,
  };
};
const surveyStatistics = [
  requireAuth,
  async (req, res) => {
    try {
      const services = [];
      const ser = await Service.find({});
      ser.forEach((serv) => {
        services.push(serv.name);
      });

      let statistics = {
        very_satisfied: [],
        satisfied: [],
        neither_satisfied_nor_dissatisfied: [],
        dissatisfied: [],
        verry_dissatisfied: [],
      };

      const data = await SurveyResponse.find({});

      services.forEach((service) => {
        statistics.very_satisfied.push(analy(data, service, 1));
        statistics.satisfied.push(analy(data, service, 2));
        statistics.neither_satisfied_nor_dissatisfied.push(
          analy(data, service, 3)
        );
        statistics.dissatisfied.push(analy(data, service, 4));
        statistics.verry_dissatisfied.push(analy(data, service, 5));
      });

      res.status(200).json({ status: 200, message: "successfull", statistics });
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }
  },
];

module.exports = {
  index,
  signin,
  createUser,
  findAllService,
  findServey,
  findServeyResponses,
  generateReport,
  createNewServey,
  newQuestion,
  deleteService,
  findAllUser,
  updateAccount,
  respondServey,
  getComment,
  surveyStatistics,
};
