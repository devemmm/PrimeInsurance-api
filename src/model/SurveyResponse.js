const mongoose = require("mongoose");

const surveyResponseSchema = mongoose.Schema(
  {
    service: {
      type: String,
      trim: true,
      required: true,
    },
    question: {
      type: String,
      trim: true,
    },
    answer: {
      type: Number,
      trim: true,
    },
    customerName: {
      type: String,
      trim: true,
      required: true,
    },
    customerPhone: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SurveyResponse = mongoose.model("SurveyResponse", surveyResponseSchema);

module.exports = SurveyResponse;
