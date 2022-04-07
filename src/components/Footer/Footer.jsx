import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__navigation b-margin-sm">
        <Link to="/">
          <img className="footer__brand-icon" src={logo} alt="brand-logo" />
        </Link>
        <div>
          <h4 className="h4">My Account</h4>
          <ul className="footer__links-container">
            {/* <Link to="/" className="footer__links">
              My Account
            </Link> */}
            <Link to="/playlists" className="footer__links">
              My Playlists
            </Link>
            <Link to="/history" className="footer__links">
              History
            </Link>
            <Link to="/liked" className="footer__links">
              Liked Videos
            </Link>
          </ul>
        </div>

        <div>
          <h4 className="h4">Connect With Us!</h4>
          <ul className="footer__links-container">
            <a
              href="https://www.linkedin.com/in/sukanya-sen-615980130/"
              className="footer__links"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/SukanyaSen530"
              className="footer__links"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
            <a
              href="https://twitter.com/Sukanya71873255"
              className="footer__links"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </ul>
        </div>
      </div>

      <div className="footer__copyright">
        <p>
          <strong>Disclaimer - </strong>
          This website is just for illustration purposes.
        </p>
        <p>
          <strong> Copyright &copy; </strong> by Sukanya Sen, 2022
        </p>
      </div>
    </footer>
  );
};

export default Footer;
