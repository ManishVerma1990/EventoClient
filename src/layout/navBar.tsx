import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import axios from "axios";
import type { User } from "../store/userSlice";

export default function NavBar() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user: User | null = useAppSelector((state) => state.user.user);
  console.log("NavBar user:", user);

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/user/logout",
        {},
        { withCredentials: true } // important for session cookies
      );
      dispatch({ type: "user/logout" });
    } catch (err: any) {
      console.error(err);
    }
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid ">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Events
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/newEvent">
                  New event
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">
                  About
                </a>
              </li>
            </ul>
            <div className="d-flex me-2">
              <input className="form-control me-2" name="search" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </div>
            {!isLoggedIn ? (
              <Link to={"/login"} className="btn btn-primary">
                Login
              </Link>
            ) : (
              // <button onClick={handleLogout} className="btn btn-danger">
              //   Logout
              // </button>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i> User
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to={`user/${user?.userId}`}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={`event/organizer/${user?.userId}`}>
                      My Events
                    </Link>
                  </li>
                  <li>
                    <Link to={`/registration/event/${user?.userId}`} className="dropdown-item">
                      My Registrations
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
