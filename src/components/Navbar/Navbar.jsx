import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navData, authNavigation } from "./data";

import { FaBars } from "react-icons/fa";

import "./navbar.scss";

import logo from "../../assets/logo.png";

import { authActions, useAuthContext } from "../../context";

const Navbar = () => {
  const {
    authState: {
      user: { token },
    },
    authDispatch,
  } = useAuthContext();

  const [darkNav, setDarkNav] = useState(false);
  const [show, setShow] = useState(false);

  const location = useLocation();

  const changeNavColor = () => {
    if (window.scrollY > 90) setDarkNav(true);
    else setDarkNav(false);
  };

  window.addEventListener("scroll", changeNavColor);

  const pathName =
    location.pathname.split("/")[1] !== ""
      ? location.pathname.split("/")[1]
      : "home";

  return (
    <>
      <nav className={`${darkNav ? "dark" : ""} navbar`}>
        <div className="brand">
          <span className="menu-btn" onClick={() => setShow((val) => !val)}>
            <FaBars />
          </span>

          <Link to="/" className="brand__link">
            <img src={logo} alt="logo image" className="img-responsive" />
          </Link>
          <span className="brand__divider">|</span>
          <span className="brand__path"> {pathName} </span>
        </div>

        <ul className="nav-links">
          {token ? (
            <button onClick={() => authDispatch({ type: authActions.LOGOUT })}>
              Logout
            </button>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </ul>
      </nav>

      <aside className={`${show ? "active sidebar" : "sidebar"}`}>
        <ul className="sidebar__links-container">
          {navData.map((item) => (
            <NavLink
              key={item.id}
              to={`${item.path}`}
              onClick={() => setShow(false)}
              className={({ isActive }) =>
                isActive ? "active_link sidebar__links" : "sidebar__links"
              }
            >
              <span>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}

          {!token ? (
            <>
              <p className="divider"></p>
              {authNavigation.map((item) => (
                <NavLink
                  key={item.id}
                  to={`${item.path}`}
                  onClick={() => setShow(false)}
                  className={({ isActive }) =>
                    isActive ? "active_link sidebar__links" : "sidebar__links"
                  }
                >
                  <span>{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </>
          ) : null}
        </ul>
      </aside>

      <div
        className={`${show ? "sidebar-overlay" : ""}`}
        onClick={() => setShow(false)}
      ></div>
    </>
  );
};

export default Navbar;
