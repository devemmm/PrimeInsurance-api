const mongoose = require("mongoose");

const surveySchema = mongoose.Schema(
  {
    service: {
      type: String,
      required: true,
      required: true,
    },
    questions: [
      {
        question: {
          type: String,
          trim: true,
        },
      },
    ],
    creator: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Survey = mongoose.model("Survey", surveySchema);
module.exports = Survey;
