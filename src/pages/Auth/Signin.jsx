import { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.scss";

import sketchLogo from "../../assets/logo1.png";
import { InputField } from "../../components";

import { testCredentials, initialFormValues } from "./helper";
import { loginUser } from "../../services";
import { useAuthContext, useGlobalContext } from "../../context";
import useScrollToTop from "../../hooks/useScrollToTop";

const Signin = () => {
  const { authDispatch } = useAuthContext();
  const {
    globalHandlers: { openAlert },
  } = useGlobalContext();

  useScrollToTop();

  const [userData, setUserData] = useState({ ...initialFormValues });

  const handleChange = ({ target: { name, value } }) =>
    setUserData((data) => ({ ...data, [name]: value }));

  //Test Credentials
  const handleAuthwithTestCred = (e) => {
    e.preventDefault();
    setUserData(testCredentials);
  };

  const handleAuth = (e) => {
    e.preventDefault();

    loginUser(
      { email: userData.email, password: userData.password },
      authDispatch,
      openAlert
    );
    setUserData({ ...initialFormValues });
  };

  return (
    <section className="flex flex-center auth-section pad-default">
      <div className="auth-container">
        <img
          src={sketchLogo}
          alt="sketch logo"
          className="auth-container__logo"
        />

        <p className="para-lg center-aligned t-margin-md">Sign In</p>

        <form onSubmit={(e) => handleAuth(e)}>
          <InputField
            type="email"
            label="Email"
            name="email"
            autoFocus
            required
            value={userData.email}
            onChange={handleChange}
          />
          <InputField
            type="password"
            label="Password"
            name="password"
            required
            value={userData.password}
            onChange={handleChange}
          />

          <button
            className="btn btn-contained defaultDark block-btn btn-md t-margin-sm"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <div className="t-margin-md center-aligned signup-route">
          <span> New to Drawflix? </span>
          <Link to="/signup" className="btn-link">
            Create an account
          </Link>
        </div>
        <button className="test-cred" onClick={handleAuthwithTestCred}>
          Use Test Credentials
        </button>
      </div>
    </section>
  );
};

export default Signin;
