/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// COMPONENT IMPORT
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";

// FUNCTIONS IMPORT
import {
  updateSubCategory,
  getSingleSubCategory,
} from "../../../functions/subcategory";
import { getAllCategories } from "../../../functions/category";

const SubCategoryUpdate = ({ match, history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);

  const loadCategories = () =>
    getAllCategories().then((c) => setCategories(c.data));

  const loadSubCategory = () =>
    getSingleSubCategory(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);

    // when button is clicked
    setLoading(true);
    updateSubCategory(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`Updated name is "${res.data.name}"`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update sub category</h4>
          )}

          <div className="form-group">
            <label>Select Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                    selected={item._id === parent}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategoryUpdate;
