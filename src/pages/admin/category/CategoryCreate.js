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
  createCategory,
  getAllCategories,
  removeCategory,
} from "../../../functions/category";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // * SEARCH FILTER - STEP 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getAllCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);

    // when button is clicked
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
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
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} had been deleted.`);
          loadCategories();
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
            <h4>Create category</h4>
          )}

          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />

          {/* SEARCH FILTER - STEP 2 */}
          <DebounceSearch keyword={keyword} setKeyword={setKeyword} />

          {/* SEARCH FILTER - STEP 5 */}
          {categories.filter(searchValue(keyword)).map((item) => (
            <div key={item._id} className="alert alert-primary">
              {item.name}

              <span
                className="btn btn-sm float-right"
                onClick={() => handleRemove(item.slug)}
              >
                <DeleteOutlined className="text-danger" />
              </span>

              <Link to={`/admin/category/${item.slug}`}>
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

export default CategoryCreate;
