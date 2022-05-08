const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    service: {
      type: String,
      trim: true,
      required: true,
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
    message: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
