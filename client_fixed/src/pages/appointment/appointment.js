import axios from "axios";

// Create a new appointment
export const createAppointment = async (appointment, authtoken) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/appointment`, appointment, {
      headers: {
        authtoken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Get user's appointments
//Vezi cum o faci
export const getUserAppointments = async (userName) => {
  try {

    // const response = await axios.get(`${process.env.REACT_APP_API}/service/${serviceId}`);
    // return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Get service for an appoinment
export const getServiceAppointments = async (serviceId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/service/${serviceId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Get all appointments
export const getAppointments = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/appointments`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Get a specific appointment
export const getAppointment = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/appointment/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Update an appointment
export const updateAppointment = async (id, appointment, authtoken) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API}/appointment/${id}`, appointment, {
      headers: {
        authtoken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Delete an appointment
export const deleteAppointment = async (id, authtoken) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API}/appointment/${id}`, {
      headers: {
        authtoken,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};