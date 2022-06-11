import { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.scss";

import sketchLogo from "../../assets/logo1.png";
import { InputField } from "../../components";

import { initialFormValues, validateInputs } from "./helper";

import { registerUser } from "../../services";
import { useAuthContext, useGlobalContext } from "../../context";
import useScrollToTop from "../../hooks/useScrollToTop";

const Signup = () => {
  const { authDispatch } = useAuthContext();
  const {
    globalHandlers: { openAlert },
  } = useGlobalContext();

  useScrollToTop();

  const [userData, setUserData] = useState({ ...initialFormValues });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) =>
    setUserData((data) => ({ ...data, [name]: value }));

  const handleAuth = (e) => {
    e.preventDefault();
    const err = validateInputs(userData, true);
    setErrors(err);

    if (Object.keys(err).length === 0) {
      registerUser(
        {
          email: userData.email,
          password: userData.password,
          fullName: userData.fullName,
        },
        authDispatch,
        openAlert
      );
      setUserData({ ...initialFormValues });
    }
  };

  return (
    <section className="flex flex-center auth-section pad-default">
      <div className="auth-container">
        <img
          src={sketchLogo}
          alt="sketch logo"
          className="auth-container__logo"
        />

        <p className="para-lg center-aligned t-margin-md">Sign Up</p>

        <InputField
          type="text"
          label="Full Name"
          name="fullName"
          autoFocus
          value={userData.fullName}
          onChange={handleChange}
          errorMessage={errors.fullName}
        />

        <InputField
          type="email"
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          errorMessage={errors.email}
        />

        <InputField
          type="password"
          label="Password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          errorMessage={errors.password}
        />

        <InputField
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          errorMessage={errors.confirmPassword}
        />

        <button
          className="btn btn-contained defaultDark block-btn btn-md t-margin-sm"
          onClick={handleAuth}
        >
          Sign In
        </button>

        <div className="t-margin-md center-aligned signup-route">
          <span> Already have an account? </span>
          <Link to="/signin" className="btn-link">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;
