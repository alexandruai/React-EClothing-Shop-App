import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getServicesByCount, removeService } from "../../../functions/service";
import AdminServiceCard from "../../../components/cards/AdminServiceCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllServices();
  }, []);

  const loadAllServices = () => {
    setLoading(true);
    getServicesByCount(100)
      .then((res) => {
        console.log("Fetched data ", res.data)
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Delete?")) {
      removeService(id, user.token)
        .then((res) => {
          loadAllServices();
          toast.error(`${res.data.name} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Services</h4>
          )}
          <div className="row">
            {services.map((service) => (
              <div key={service._id} className="col-md-4 pb-3">
                <AdminServiceCard
                  service={service}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServices;