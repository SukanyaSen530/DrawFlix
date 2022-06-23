import { Link } from "react-router-dom";
import { useAuthContext } from "../../context";

import "./home.scss";

export default function Home() {
  const {
    authState: {
      user: { token },
    },
  } = useAuthContext();

  return (
    <section className="home-section flex flex-center">
      <div>
        <h2 className="h2 center-aligned">
          DrawFlix a community for creative people!
        </h2>
        <p className="para-md center-aligned">
          Learn from expert professionals
        </p>
        <div className="flex flex-center gap-md t-margin-md">
          <Link
            to="/explore"
            className="btn btn-contained btn-md secondaryLight"
          >
            View Videos
          </Link>
          {!token && (
            <Link to="/signup" className="btn btn-contained btn-md defaultDark">
              Create Account
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
