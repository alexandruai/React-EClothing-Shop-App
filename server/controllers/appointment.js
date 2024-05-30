const mongoose = require('mongoose');
const Appointment = require('../models/appointment');
const Service = require('../models/service');
const User = require('../models/user');
const ObjectId = mongoose.Types.ObjectId;

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { services, status, comment, user, appointmentDate, appointmentHour } = req.body;
    const newAppointment = new Appointment({ services, status, comment, user, appointmentDate, appointmentHour });
    await newAppointment.save();
    res.json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get user's appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const { userName } = req.params;
    console.log("User ", userName);

    // Find the user by username
    const user = await User.findOne({ name: userName }); // Adjust the field if necessary

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Use the user's ObjectId to find appointments
    const appointments = await Appointment.find({ user: user.name });
    console.log("User Appointments ", appointments);

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this user' });
    }

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get appointment for a specific service
exports.getServiceForAppointment = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'No appointments found for this service' });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    // Example of validating ObjectId for each user in appointments
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a specific appointment
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('user', 'name email');
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an appointment
exports.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an appointment
exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};