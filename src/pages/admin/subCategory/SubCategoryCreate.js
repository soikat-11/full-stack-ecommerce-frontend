/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// COMPONENT IMPORT
import AdminNav from "../../../components/nav/AdminNav";
import CategoryForm from "../../../components/forms/CategoryForm";
import DebounceSearch from "../../../components/forms/DebounceSearch";

// FUNCTIONS IMPORT
import {
  createSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  removeSubCategory,
} from "../../../functions/subcategory";
import { getAllCategories } from "../../../functions/category";

const SubCategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");

  // * SEARCH FILTER - STEP 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () =>
    getAllCategories().then((c) => setCategories(c.data));

  const loadSubCategories = () =>
    getAllSubCategories().then((c) => setSubCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);

    // when button is clicked
    setLoading(true);
    createSubCategory({ name, parent: parentCategory }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to Delete this item ?")) {
      setLoading(true);
      removeSubCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} had been deleted.`);
          loadSubCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // * SEARCH FILTER - STEP 3
  // handleSearchChange function in DebounceSearch
  // * SEARCH FILTER - STEP 4 - HIGHER ORDER FUNCTION
  const searchValue = (keyword) => (item) =>
    item.name.toLowerCase().includes(keyword);

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
            <h4>Create sub category</h4>
          )}

          <div className="form-group">
            <label>Select Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParentCategory(e.target.value)}
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((item) => (
                  <option key={item._id} value={item._id}>
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

          {/* SEARCH FILTER - STEP 2 */}
          <DebounceSearch keyword={keyword} setKeyword={setKeyword} />

          {/* SEARCH FILTER - STEP 5 */}
          {subCategories.filter(searchValue(keyword)).map((item) => (
            <div key={item._id} className="alert alert-primary">
              {item.name}

              <span
                className="btn btn-sm float-right"
                onClick={() => handleRemove(item.slug)}
              >
                <DeleteOutlined className="text-danger" />
              </span>

              <Link to={`/admin/sub/${item.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
