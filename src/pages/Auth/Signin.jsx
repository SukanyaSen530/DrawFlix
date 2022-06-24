import { useState } from "react";
import { Link } from "react-router-dom";

import "./auth.scss";

import sketchLogo from "../../assets/logo1.png";
import { InputField } from "../../components";

import {
  testCredentials,
  initialFormValues,
  validateInputsSignIn,
} from "./helper";
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
  const [errors, setErrors] = useState({});
  const [signInLoading, setSignInLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setUserData((data) => ({ ...data, [name]: value }));

  //Test Credentials
  const handleAuthwithTestCred = (e) => {
    e.preventDefault();
    setUserData(testCredentials);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    const err = validateInputsSignIn(userData);
    setErrors(err);

    if (Object.keys(err).length === 0) {
      setSignInLoading(true);
      setTimeout(() => {
        loginUser(
          { email: userData.email, password: userData.password },
          authDispatch,
          openAlert
        );
        setSignInLoading(false);
        setUserData({ ...initialFormValues });
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

        <p className="para-lg center-aligned t-margin-md">Sign In</p>

        <form onSubmit={(e) => handleAuth(e)}>
          <InputField
            type="email"
            label="Email"
            name="email"
            id="email"
            autoFocus
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

          <button
            className="btn btn-contained defaultDark block-btn btn-md t-margin-sm"
            type="submit"
          >
            {signInLoading ? (
              <span>
                <i className="fas fa-cog fa-spin"></i> Signin in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <button className="test-cred" onClick={handleAuthwithTestCred}>
          Use Test Credentials
        </button>

        <div className="t-margin-lg center-aligned signup-route">
          <span> New to Drawflix? </span>
          <Link to="/signup" className="btn-link">
            Create an account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signin;
