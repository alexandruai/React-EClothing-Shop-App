import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultServiceImage from "../../images/fancyCar.png";
import ServiceListItems from "./ServiceListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const { TabPane } = Tabs;

// this is a child component of Service page
const SingleService = ({ service, onStarClick, star }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, appointmentManager } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  // router
  let history = useHistory();

  const { title, images, description, _id } = service;

  const handleBookAppointment = () => {
    history.push(`/appointment/${_id}`);
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={defaultServiceImage} className="mb-3 card-image" />}></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call us on 077777777777 to learn more about this service.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {service && service.ratings && service.ratings.length > 0 ? (
          showAverage(service)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

        <Card
          actions={[
            <Tooltip placement="top" title={tooltip}>
              <a onClick={handleBookAppointment} disabled={service.quantity < 1}>
                <CalendarOutlined className="text-danger" />
                <br />
                Book Appointment
              </a>
            </Tooltip>,

            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ServiceListItems service={service} />
        </Card>
      </div>
    </>
  );
};

export default SingleService;