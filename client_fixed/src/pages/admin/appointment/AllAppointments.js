import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getAppointments, updateAppointment } from "../../../functions/appointment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    getAppointments(user.token)
      .then((res) => {
        setAppointments(res);
      })
      .catch((err) => {
        toast.error("Failed to load appointments");
      });
  };

  const handleStatusChange = (appointmentId, status) => {
    const updateData = { status };
    if (status === "Canceled") {
      updateData.comment = "Client did not showed up";
    }
    updateAppointment(appointmentId, updateData, user.token)
      .then((res) => {
        toast.success(`Appointment status updated to ${status}`);
        loadAppointments();
      })
      .catch((err) => {
        toast.error("Failed to update appointment status");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h4>All Appointments</h4>
          {appointments.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Services</th>
                  <th scope="col">User</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                  <th scope="col">Hour</th>
                  <th scope="col">Comment</th> {/* New column header */}
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={appointment._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{appointment.services.join(", ")}</td>
                    <td>{appointment.user}</td>
                    <td>{appointment.status}</td>
                    <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                    <td>{appointment.appointmentHour}</td>
                    <td>{appointment.comment}</td> {/* Displaying comment */}
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleStatusChange(appointment._id, "Canceled")}
                        disabled={appointment.status === "Canceled" || appointment.status === "Finished"}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => handleStatusChange(appointment._id, "Finished")}
                        disabled={appointment.status === "Canceled" || appointment.status === "Finished"}
                      >
                        Finish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;