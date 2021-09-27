import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import defaultImage from "../../images/defaultImage.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  // destructure
  const { title, description, images, slug } = product;

  return (
    <Card
      cover={
        <img
          alt=""
          className="p-1"
          src={images && images.length ? images[0].url : defaultImage}
          style={{ height: "150px", objectFit: "cover" }}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
