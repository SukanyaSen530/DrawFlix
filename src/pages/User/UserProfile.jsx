import { useAuthContext } from "../../context";

import "./user-profile.scss";

import useScrollToTop from "../../hooks/useScrollToTop";

const UserProfile = () => {
  useScrollToTop();

  const {
    authState: {
      user: { details },
    },
  } = useAuthContext();

  return (
    <section className="profile pad-default">
      <div className="profile__details">
        <p className="profile__details__icon">
          <i className="fa-solid fa-user-astronaut"></i>
        </p>
        <p>
          <span>Name </span> <span> : {details?.fullName} </span>
        </p>
        <p>
          <span>Email </span> <span> : {details?.email} </span>
        </p>
        <p>
          <span>Joined </span>{" "}
          <span>
            :{" "}
            {`${new Date(details?.createdAt).toLocaleString("default", {
              month: "long",
            })} ${new Date(details?.createdAt).getFullYear()}`}
          </span>
        </p>
      </div>
    </section>
  );
};

export default UserProfile;
