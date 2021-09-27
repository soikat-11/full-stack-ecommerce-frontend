import axios from "axios";

// GET ALL CATEGORIES
export const getAllSubCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

// GET SINGLE CATEGORY
export const getSingleSubCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

// REMOVE A CATEGORY
export const removeSubCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

// UPDATE A CATEGORY
export const updateSubCategory = async (slug, sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

// CREATE A CATEGORY
export const createSubCategory = async (sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
    headers: {
      authtoken,
    },
  });
