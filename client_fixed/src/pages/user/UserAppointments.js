import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserNav from "../../components/nav/UserNav";
import { getUserAppointments, updateAppointment } from "../appointment/appointment";
import { useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { userName } = useParams();

  useEffect(() => {
    loadUserAppointments();
  }, []);

  const loadUserAppointments = async () => {
    try {
      const res = await getUserAppointments(userName);
      setAppointments(res);
    } catch (error) {
      console.error("Error loading appointments", error);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await updateAppointment(id, { status: "Canceled", comment: "Client canceled" });
      loadUserAppointments(); // Reload appointments after updating
    } catch (error) {
      console.error("Error canceling appointment", error);
    }
  };

  const showAppointmentsInTable = (appointment) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Service</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Status</th>
          <th scope="col">Comment</th>
          <th scope="col">Actions</th> {/* Add column for actions */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{appointment.services.join(", ")}</td>
          <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
          <td>{appointment.appointmentHour}</td>
          <td>{appointment.status}</td>
          <td>{appointment.comment}</td>
          <td>
            {appointment.status !== "Canceled" && (
              <button onClick={() => cancelAppointment(appointment._id)}>Cancel</button>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );

  const showEachAppointments = () =>
    appointments.reverse().map((appointment, i) => (
      <div key={i} className="m-5 p-3 card">
        {showAppointmentsInTable(appointment)}
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav userName={user && user.name ? user.name : "Guest"} />
        </div>
        <div className="col text-center">
          <h4>
            {appointments.length > 0 ? "User Appointments" : "No Appointments"}
          </h4>
          {showEachAppointments()}
        </div>
      </div>
    </div>
  );
};

export default UserAppointments;