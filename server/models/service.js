const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    duration: {
      type: String, // e.g., "2 hours", "30 minutes"
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
        {
          type: ObjectId,
          ref: "Sub",
        },
      ],
      images: {
        type: Array,
      },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);