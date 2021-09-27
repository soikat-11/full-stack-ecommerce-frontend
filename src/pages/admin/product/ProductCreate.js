/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

// COMPONENT IMPORT
import AdminNav from "../../../components/nav/AdminNav";
import FileUpload from "../../../components/forms/FileUpload";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

// FUNCTIONS IMPORT
import { createProduct } from "../../../functions/product";
import { getAllCategories, getCategorySubs } from "../../../functions/category";

const initialState = {
  title: "Macbook Pro",
  description: "This is the best Apple product",
  price: "45000",
  categories: [],
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: "50",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Lenovo", "SONY", "Samsung", "LG", "OnePlus", "DELL"],
  color: "White",
  brand: "Apple",
};

const ProductCreate = () => {
  const [loading, setLoading] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [values, setValues] = useState(initialState);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getAllCategories().then((c) =>
      setValues({ ...values, categories: c.data })
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });

    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product create</h4>
          )}
          <hr />

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            values={values}
            showSub={showSub}
            setValues={setValues}
            subOptions={subOptions}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCatagoryChange={handleCatagoryChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
