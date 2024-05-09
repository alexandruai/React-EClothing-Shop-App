import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus, getMostOrderedProducts } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [mostOrderedProducts, setMostOrderedProducts] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
    loadMostOrderedProducts();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const loadMostOrderedProducts = () => {
    getMostOrderedProducts(user.token).then((res) => {
      setMostOrderedProducts(res);
      console.log(mostOrderedProducts)
    });
  };

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };
  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-5">
          <h4>Admin Dashboard</h4>
          <div className="col-md-5">
          <h4>Most Ordered Products</h4>
          <LineChart width={500} height={300} data={mostOrderedProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalOrders" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
