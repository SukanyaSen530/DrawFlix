import { useState } from "react";
import { Link } from "react-router-dom";
import { navData } from "./data";

import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import "./navbar.scss";

import logo from "../../assets/logo.png";

const Navbar = () => {
  const [darkNav, setDarkNav] = useState(false);
  const [show, setShow] = useState(false);

  const changeNavColor = () => {
    if (window.scrollY > 90) setDarkNav(true);
    else setDarkNav(false);
  };

  window.addEventListener("scroll", changeNavColor);

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
        </div>

        <ul className="nav-links"></ul>
      </nav>

      <aside
        className={`${show ? "sidebar-overlay" : ""}`}
        onClick={() => setShow(false)}
      >
        <div className={`${show ? "active sidebar" : "sidebar"}`}>
          <ul>
            <li className="menuClose-btn">
              <AiOutlineClose onClick={() => setShow(false)} />
            </li>
            {navData.map((item) => (
              <li
                key={item.id}
                className="sidebar__links"
                onClick={() => setShow(false)}
              >
                <span>{item.icon}</span>
                <Link to={`${item.path}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
