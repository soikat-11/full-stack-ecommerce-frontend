import axios from "axios";

// GET ALL CATEGORIES
export const getAllCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/categories`);

// GET SINGLE CATEGORY
export const getSingleCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);

// REMOVE A CATEGORY
export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

// UPDATE A CATEGORY
export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });

// CREATE A CATEGORY
export const createCategory = async (category, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken,
    },
  });

// GET SUBS ON PRODUCT PAGE BASED ON PARENT
export const getCategorySubs = async (_id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
