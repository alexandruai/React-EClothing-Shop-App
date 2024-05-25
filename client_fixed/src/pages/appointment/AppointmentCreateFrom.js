import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentCreateForm = ({
  handleSubmit,
  handleChange,
  values,
}) => {
  // Destructure values
  const {
    serviceId,
    status,
    user,
    appointmentDate,
    appointmentHour,
    services, // Include services in destructuring
  } = values;

  // State to store the car inspection service
  const [carInspectionService, setCarInspectionService] = useState(null);
  const [serviceName, setServiceName] = useState("");

  // Function to fetch the car inspection service
  const fetchCarInspectionService = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/service/665225ea8ddf1955348300e9`);
      setCarInspectionService(response.data);
      if (response.data && services.length === 0) {
        // If services array is empty, add the car inspection service
        handleChange({ target: { name: "services", value: [response.data._id] } });
        setServiceName(response.data.name);
      }
    } catch (error) {
      console.error("Error fetching car inspection service:", error);
    }
  };

  // Fetch car inspection service when component mounts
  useEffect(() => {

    if (!serviceId) {
      fetchCarInspectionService();
    } else  if (services.length === 1 && !serviceName) {
      const fetchServiceName = async () => {
        try {

          const response = await axios.get(`${process.env.REACT_APP_API}/service/${serviceId}`);
          setServiceName(response.data.name);
        } catch (error) {
          console.error("Error fetching service name:", error);
        }
      };
      fetchServiceName();
    }
  }, [services, serviceName]);

  // Handle change for services input (disabled for consistency)
  const handleServiceChange = (e) => {
    // Do nothing to prevent user input
  };


  if (services.length > 0 && services[0] instanceof Promise) {
    services.splice(0, 1); // Remove the first item (Promise) from the array
  }

  const filteredServices = services.filter(service => typeof service !== 'object');

  return (
    
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Services</label>
        <input
          type="text"
          name="services"
          className="form-control"
          value={serviceName}
          onChange={handleServiceChange}
          disabled
        />
        {/* Set the services array to contain the id of the car inspection service */}
        <input
          type="hidden"
          name="servicesArray"
          value={carInspectionService ? carInspectionService._id : ""}
        />
      </div>

      <div className="form-group">
        {/* <label>Status</label> */}
        {/* Display the car inspection service name if fetched */}
        <input
          type="hidden"
          name="status"
          className="form-control"
          value={values.status}
          onChange={handleChange}
          disabled
        />
      </div>

      <div className="form-group">
        <label>User Name</label>
        <input
          type="text"
          name="user"
          className="form-control"
          value={user}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Appointment Date</label>
        <input
          type="date"
          name="appointmentDate"
          className="form-control"
          value={appointmentDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Appointment Hour</label>
        <input
          type="time"
          name="appointmentHour"
          className="form-control"
          value={appointmentHour}
          onChange={handleChange}
        />
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default AppointmentCreateForm;