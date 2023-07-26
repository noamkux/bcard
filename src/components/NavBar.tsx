import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import User from "../interfaces/user";

interface NavBarProps {
  userInfo: User;
  setUserInfo: Function;
}

const NavBar: FunctionComponent<NavBarProps> = (userInfo, setUserInfo) => {
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to={"/home"}>
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

              {userInfo.userInfo.email && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/favcards"}>
                      FAVCARDS
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/mycards"}>
                      MYCARDS
                    </NavLink>
                  </li>
                </>
              )}
              {userInfo.userInfo.role == "admin" && (
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
          {userInfo.userInfo.email && (
            <>
              <button className="btn btn-outline-primary me-3" type="submit">
                LOGOUT
              </button>
            </>
          )}
          {!userInfo.userInfo.email &&
          <>
          <NavLink to={"/register"} className="btn btn-outline-primary me-3" type="submit">
            SignUp
          </NavLink>
        </>
          }
          {(userInfo.userInfo.role == "business" ||
            userInfo.userInfo.role == "nonbusiness" ||
            userInfo.userInfo.role == "admin") && (
            <div className="nav-link text-white me-3 pt-1">
              <NavLink className="nav-link" to={"/sandbox"}>
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
