const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const appointmentSchema = new mongoose.Schema(
  {
    services: [{
      type: String,
      required: true,
    }],
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    status: {
        type: String,
        default: "Booked",
        required: true,
    },
    comment: {
      type: String,
      default: "No observations",
      required: true,
  },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentHour: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);