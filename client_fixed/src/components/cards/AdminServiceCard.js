import React from "react";
import { Card } from "antd";
import defaultImage from "../../images/fancyCar.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminServiceCard = ({ service, handleRemove }) => {
  // destructure
  const { name, description, images, _id } = service;

  return (
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
        <Link to={`/admin/service/${_id}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          onClick={() => handleRemove(_id)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={name}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminServiceCard;