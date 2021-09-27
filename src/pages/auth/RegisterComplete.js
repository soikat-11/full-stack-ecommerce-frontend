/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

// FUNCTIONS IMPORT
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dispatch = useDispatch();
  // const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // email and password validation
    if (!email || !password) {
      toast.error("Email and Password is Required");
      return;
    }

    // password length check
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      //* pass email and full url link
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      //   console.log("RESULT", result);

      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");

        // get user id token for backend communication
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user, "idtokken", idTokenResult);

        // call backend communication function - & - dispatch result to redux store
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                _id: res.data._id,
                name: res.data.name,
                role: res.data.role,
                email: res.data.email,
                token: idTokenResult.token,
              },
            });
          })
          .catch((err) => console.log(err));

        // redirect the user
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" disabled className="form-control" value={email} />

      <input
        autoFocus
        type="password"
        className="form-control"
        value={password}
        placeholder="Enter your Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
