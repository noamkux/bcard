import { FunctionComponent, useEffect, useState } from "react";
import { getUserByid } from "../services/userServices";
import User from "../interfaces/user";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  userInfo: any;
}

const Profile: FunctionComponent<ProfileProps> = ({ userInfo }) => {
  let [user, setUser] = useState<User>();
  let navigate = useNavigate();

  let navigateHome = () => {
    navigate("/");
  };

  useEffect(() => {
    getUserByid(userInfo.userId)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [userInfo.userId]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="profile-page compenent-container container header my-5">
        <h1>Your Profile</h1>
        <div className="row">
          <div className="col-md-6">
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <div className="display-6 fs-5 pt-2">
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Gender: {user.gender}</p>
              <p>
                Location:{" "}
                {`${user.city}, ${user.street} ,${user.houseNumber}, ${user.country}`}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            {user.imageURL === "" || user.imageURL === null ? (
              <div className=" justify-content-center align-items-center d-flex">
                {user.gender === "male" ? (
                  <img
                  alt="user profile pic"
                    className="mb-5"
                    src="images/CardsImg/manProfile.png"
                    style={{ width: "200px", height: "200px" }}
                  ></img>
                ) : (
                  <img
                  alt="user profile pic"
                    className="mb-5 "
                    src="images\CardsImg\womanProfile.png"
                    style={{ width: "200px", height: "200px" }}
                  ></img>
                )}
              </div>
            ) : (
              <>
                <img src={user.imageURL} alt={user.imageAlt} />
              </>
            )}
          </div>
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigateHome()}
        >
          Back to Home
        </button>
      </div>
    </>
  );
};

export default Profile;
