import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createAppointment } from "./appointment/appointment";
import AppointmentCreateForm from "./appointment/AppointmentCreateFrom";
import { getServiceAppointments } from "./appointment/appointment"; // Assume this function fetches service details by ID

const AppointmentCreate = () => {

  const location = useLocation();
  const currentRoute = location.pathname;

  const regex = /\/appointment\/([a-fA-F0-9]{24})$/;
  const match = currentRoute.match(regex);
  const serviceId = match ? match[1] : null;

  const initialState = {
    serviceId,
    services: serviceId ? [getServiceAppointments(serviceId)] : [],
    status: "New",
    user: "",
    appointmentDate: "",
    appointmentHour: "",
  };

  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (serviceId) {
      const fetchService = async () => {
        const service = await getServiceAppointments(serviceId);

        setValues((prevValues) => ({
          ...prevValues,
          services: [...prevValues.services, service],
        }));
      };
      fetchService();
    }
  }, [serviceId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    values.status = "Booked";
    createAppointment(values, user.token)
      .then((res) => {
        console.log(res);
        toast.success("Appointment created successfully");
        // Reset form values after successful submission
        setValues(initialState);
      })
      .catch((err) => {
        console.error("Error creating appointment:", err);
        toast.error("Failed to create appointment. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h4>Appointment create</h4>
          <hr />
          <div className="p-3">
            <AppointmentCreateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCreate;