import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import RedirectCountdown from "./RedirectCountdown";

// FUNCTIONS IMPORT
import { currentAdmin } from "../../functions/auth";

// * PROTECTED ROUTES FOR LOGGED IN USER
const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  // * validate user role
  useEffect(() => {
    // check for user
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          setOk(true);
          console.log("CURRENT ADMIN RES", res);
        })
        .catch((err) => {
          setOk(false);
          console.log("ADMIN ROUTE ERROR", err);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <RedirectCountdown />;
};

export default AdminRoute;
