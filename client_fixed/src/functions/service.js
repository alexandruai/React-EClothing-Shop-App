import axios from "axios";

export const createService = async (service, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/service`, service, {
    headers: {
      authtoken,
    },
  });

export const getServicesByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/services/${count}`);

export const removeService = async (id, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/service/${id}`, {
    headers: {
      authtoken,
    },
  });

export const getService = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/service/${id}`);

export const updateService = async (id, service, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/service/${id}`, service, {
    headers: {
      authtoken,
    },
  });

export const getServices = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/services`, {
    sort,
    order,
    page,
  });

export const getServicesCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/services/total`);

export const serviceStar = async (serviceId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/service/star/${serviceId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getRelatedServices = async (serviceId) =>
  await axios.get(`${process.env.REACT_APP_API}/service/related/${serviceId}`);

export const fetchServicesByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/services`, arg);