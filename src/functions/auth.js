import axios from "axios";

// SENDING REQUEST TO THE BACKEND
export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

// SAVE DATA FOR CURRENTLY LOGGED IN USER
export const currentUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};

// VALIDATE ADMIN
export const currentAdmin = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
};
