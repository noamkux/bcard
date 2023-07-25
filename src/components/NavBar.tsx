import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        
        <NavLink className="navbar-brand" to={"/home"}>
          BCARD
        </NavLink>{" "}
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
              <li className="nav-item">
                <NavLink className="nav-link" to={"/sandbox"}>
                  SANDBOX
                </NavLink>
              </li>
              
            </ul>
            <form className="d-flex" role="search">
        <button className="btn btn-outline-primary" type="submit">LOGOUT</button>
      </form>
          </div>
        </>
      </nav>
    </>
  );
};

export default NavBar;
