import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, CalendarOutlined  } from "@ant-design/icons";
import defaultImage from "../../images/fancyCar.png"; // Import your default service image
import { Link } from "react-router-dom";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux"; 
import { useHistory } from "react-router-dom";

const { Meta } = Card;

const ServiceCard = ({ service }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // Redux - if needed
  const { user, appointmentManager, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  let history = useHistory();

  const handleBookService = () => {
    // Handle adding service to cart
    setTooltip("Book Appointment");
    // create appointmentManager array
    let appointmentManager = [];
    if (typeof window !== "undefined") {
      // if appointmentManager is in local storage GET it
      if (localStorage.getItem("appointmentManager")) {
        appointmentManager = JSON.parse(localStorage.getItem("appointmentManager"));
      }
      // push new service to cart
      appointmentManager.push({
        ...service,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(appointmentManager, _.isEqual);
      // save to local storage
      localStorage.setItem("appointmentManager", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to redux state
      dispatch({
        type: "ADD_TO_APPOINMENT_MANAGER",
        payload: unique,
      });
      // show appointmentManager items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const handleBookAppointment = () => {
    history.push(`/appointment/${_id}`);
  };

  // Destructure service object
  const { images, name, description, _id, price } = service;

  return (
    <>

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : defaultImage}
            alt={name}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/service/${_id}`}>
            <EyeOutlined className="text-warning" /> <br /> View Service
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleBookAppointment} disabled={false}>
              <CalendarOutlined  className="text-danger" /> <br />
              {"Book Appointment"}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${name} - $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ServiceCard;