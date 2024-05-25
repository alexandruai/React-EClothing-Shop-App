import React, { useEffect, useState } from "react";
import { getServices, getServicesCount } from "../../functions/service";
import ServiceCard from "../cards/ServiceCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const OurServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [servicesCount, setServicesCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllServices();
  }, [page]);

  useEffect(() => {
    getServicesCount().then((res) => setServicesCount(res.data));
  }, []);

  const loadAllServices = () => {
    setLoading(true);
    // sort, order, limit
    getServices("createdAt", "desc", page).then((res) => {
    console.log("Service data ", res.data)
      setServices(res.data);
      setLoading(false);
    });

  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {services.map((service) => (
              <div key={service._id} className="col-md-4">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(servicesCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default OurServices;