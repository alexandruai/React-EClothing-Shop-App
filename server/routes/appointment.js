const express = require('express');
const router = express.Router();
const { createAppointment, getUserAppointments, getServiceForAppointment, getAppointments, getAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointment');

// Create a new appointment
router.post('/appointment', createAppointment);

// Get user's appointments
router.get('/appointments/user/:userName', getUserAppointments);

// Get appointment for a specific service
router.get('/appointments/:serviceId', getServiceForAppointment);

// Get all appointments
router.get('/appointments', getAppointments);

// Get a specific appointment
router.get('/appointment/:id', getAppointment);

// Update an appointment
router.put('/appointment/:id', updateAppointment);

// Delete an appointment
router.delete('/appointment/:id', deleteAppointment);

module.exports = router;