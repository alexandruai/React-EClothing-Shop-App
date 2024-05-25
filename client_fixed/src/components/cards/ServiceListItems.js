import React from "react";
import { Link } from "react-router-dom";

const ServiceListItem = ({ service }) => {
  const {
    name,
    category,
    description,
    price,
    duration,
    provider,
    availability,
  } = service;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Name{" "}
        <span className="label label-default label-pill pull-xs-right">
          {name}
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          Category{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      <li className="list-group-item">
        Description{" "}
        <span className="label label-default label-pill pull-xs-right">
          {description}
        </span>
      </li>

      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right">
          $ {price}
        </span>
      </li>

      <li className="list-group-item">
        Duration{" "}
        <span className="label label-default label-pill pull-xs-right">
          {duration} mins
        </span>
      </li>

      <li className="list-group-item">
        Provider{" "}
        <span className="label label-default label-pill pull-xs-right">
          {provider}
        </span>
      </li>

      <li className="list-group-item">
        Availability{" "}
        <span className="label label-default label-pill pull-xs-right">
          {availability}
        </span>
      </li>
    </ul>
  );
};

export default ServiceListItem;