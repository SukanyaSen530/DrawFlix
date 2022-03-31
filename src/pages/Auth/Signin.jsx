import { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.scss";

import sketchLogo from "../../assets/sketch.png";
import { InputField } from "../../components";

import { testCredentials, initialFormValues, validateInputs } from "./helper";

const Signin = () => {
  const [userData, setUserData] = useState({ ...initialFormValues });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) =>
    setUserData((data) => ({ ...data, [name]: value }));

  //Test Credentials
  const handleAuthwithTestCred = (e) => {
    e.preventDefault();
    setUserData(testCredentials);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    const err = validateInputs(userData);
    setErrors(err);

    if (Object.keys(err).length === 0) {
      loginUser(
        { email: userData.email, password: userData.password },
        authDispatch
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

        <p className="para-lg center-aligned t-margin-md">Sign In</p>

        <InputField
          type="email"
          label="Email"
          name="email"
          autoFocus
          value={userData.email}
          onChange={handleChange}
          errorMessage={errors.email}
        />
        <InputField
          type="password"
          label="Password"
          name="password"
          required
          value={userData.password}
          onChange={handleChange}
          errorMessage={errors.password}
        />

        <button
          className="btn btn-contained defaultDark block-btn btn-md t-margin-sm"
          onClick={handleAuth}
        >
          Sign In
        </button>

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
