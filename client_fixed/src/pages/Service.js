import React, { useEffect, useState } from "react";
import { getService, serviceStar } from "../functions/service";
import SingleService from "../components/cards/SingleService";
import { useSelector } from "react-redux";
import { getRelatedServices } from "../functions/service";
import ServiceCard from "../components/cards/ServiceCard";

const Service = ({ match }) => {
  const [service, setService] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadSingleService();
  }, [slug]);

  useEffect(() => {
    if (service.ratings && user) {
      let existingRatingObject = service.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  }, [service, user]);

  const loadSingleService = () => {
    getService(slug).then((res) => {
      setService(res.data);
      // load related
      getRelatedServices(res.data._id).then((res) => setRelated(res.data));
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    serviceStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleService(); // if you want to show updated rating in real time
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleService
          service={service}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Services</h4>
          <hr />
        </div>
      </div>

      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <ServiceCard service={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Services Found</div>
        )}
      </div>
    </div>
  );
};

export default Service;