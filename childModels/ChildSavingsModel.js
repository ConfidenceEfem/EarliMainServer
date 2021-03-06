const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    plan: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "card",
    },
    duration: {
      type: String,
      required: true,
    },
    amount: {
      type : Number,
      required: true,
    },
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "child",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("saving", schema);
