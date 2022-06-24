import { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.scss";

import sketchLogo from "../../assets/logo1.png";

import { InputField } from "../../components";
import { initialFormValues, validateInputsSignUp } from "./helper";
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
  const [signUpLoading, setSignUpLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setUserData((data) => ({ ...data, [name]: value }));

  const handleAuth = (e) => {
    e.preventDefault();
    const err = validateInputsSignUp(userData, true);
    setErrors(err);

    if (Object.keys(err).length === 0) {
      setSignUpLoading(true);
      setTimeout(() => {
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
        setSignUpLoading(true);
      }, 1500);
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
          id="fullName"
          autoFocus
          value={userData.fullName}
          onChange={handleChange}
          errorMessage={errors.fullName}
        />

        <InputField
          type="email"
          label="Email"
          name="email"
          id="email"
          value={userData.email}
          onChange={handleChange}
          errorMessage={errors.email}
        />

        <InputField
          type="password"
          label="Password"
          name="password"
          id="password"
          value={userData.password}
          onChange={handleChange}
          errorMessage={errors.password}
        />

        <InputField
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          errorMessage={errors.confirmPassword}
        />

        <button
          className="btn btn-contained defaultDark block-btn btn-md t-margin-sm"
          onClick={handleAuth}
        >
          {signUpLoading ? (
            <span>
              <i className="fas fa-cog fa-spin"></i> Signin up...
            </span>
          ) : (
            "Sign Up"
          )}
        </button>

        <div className="t-margin-md center-aligned signup-route">
          <span> Already have an account? </span>
          <Link to="/signin" className="btn-link">
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;
