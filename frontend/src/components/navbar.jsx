import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            Mohit Web
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li className="active">
            <Link to="/">Home</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            {user ? (
              <span className="navbar-text">
                <i className="glyphicon glyphicon-user"></i> {user.username}
              </span>
            ) : (
              <Link to="/signup">
                <i className="glyphicon glyphicon-user"></i> Sign Up
              </Link>
            )}
          </li>
          <li>
            {user ? (
              <span
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  padding: "15px 15px",
                }}
              >
                <i className="glyphicon glyphicon-log-in"></i> Log Out
              </span>
            ) : (
              <Link to="/signin">
                <i className="glyphicon glyphicon-log-in"></i> Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
