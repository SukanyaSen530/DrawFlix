import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navData } from "./data";

import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import "./navbar.scss";

import logo from "../../assets/logo.png";

const Navbar = () => {
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
      <nav className={`${darkNav ? "dark" : null} navbar`}>
        <div className="brand">
          <span
            className={`${show ? "menu-btn hide" : "menu-btn"}`}
            onClick={() => setShow(true)}
          >
            <FaBars />
          </span>
          <img src={logo} alt="logo image" className="img-responsive" />
          <span className="brand__divider">|</span>
          <span className="brand__path"> {pathName} </span>
        </div>

        <ul className="nav-links">
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Create an account</Link>
        </ul>
      </nav>

      <aside className={`${show ? "active sidebar" : "sidebar"}`}>
        <ul>
          <li className="menuClose-btn">
            <AiOutlineClose onClick={() => setShow(false)} />
          </li>

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
