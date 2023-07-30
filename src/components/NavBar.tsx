import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface NavBarProps {
  userInfo: any;
  setUserInfo: Function;
}

const NavBar: FunctionComponent<NavBarProps> = ({userInfo, setUserInfo}) => {
  let navigate = useNavigate();

  let handleLogout = () => {
    setUserInfo("");
    sessionStorage.removeItem("userInfo");
    navigate("/");
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to={"/"}>
          BCARD
        </NavLink>
        <>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink className="nav-link" to={"/about"}>
                  ABOUT <span className="sr-only">(current)</span>
                </NavLink>
              </li>

              {(userInfo.role === "business" ||
                userInfo.role === "nonbusiness" ||
                userInfo.role === "admin") && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/favcards"}>
                      FAVCARDS
                    </NavLink>
                  </li>
                </>
              )}
              {(userInfo.role === "business" ||
                userInfo.role === "admin") && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/mycards"}>
                      MYCARDS
                    </NavLink>
                  </li>
                </>
              )}

              {userInfo.role === "admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/sandbox"}>
                    SANDBOX
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </>

        <form className="d-flex" role="search">
          {userInfo.email && (
            <>
              <button
                className="btn btn-outline-primary me-3"
                type="submit"
                onClick={handleLogout}
              >
                log-out
              </button>
            </>
          )}
          {!userInfo.email && (
            <>
              <NavLink
                to={"/register"}
                className="btn btn-outline-primary me-3"
                type="submit"
              >
                Sign-Up
              </NavLink>
              
              <NavLink
                to={"/login"}
                className="btn btn-outline-primary me-3"
                type="submit"
              >
                Login
              </NavLink>
            </>
          )}
          {(userInfo.role === "business" ||
            userInfo.role === "nonbusiness" ||
            userInfo.role === "admin") && (
            <div className="nav-link text-white me-3 pt-1">
              <NavLink className="nav-link" to={"/profile"}>
                Profile
              </NavLink>
            </div>
          )}
        </form>
      </nav>
    </>
  );
};

export default NavBar;
