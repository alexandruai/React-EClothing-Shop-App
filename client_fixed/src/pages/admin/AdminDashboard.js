import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus, getMostOrderedProducts } from "../../functions/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
      const products = res.map(product => ({
        productId: product._id,
        productName: product.description,
        quantity: product.quantity
      }));
      console.log("Formatted products: ", products);
      setMostOrderedProducts(products);
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
        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          <div className="col-md-12">
            <h4>Most Ordered Products</h4>
            {mostOrderedProducts.length > 0 ? (
              <BarChart width={600} height={300} data={mostOrderedProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity" fill="#8884d8" />
              </BarChart>
            ) : (
              <p>Loading data...</p>
            )}
          </div>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;