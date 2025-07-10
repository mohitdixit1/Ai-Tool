import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Navbar.css"

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-left">
        <p className="logo">
          Mohit Web
        </p>
        
      </div>

      <div className="navbar-right">
        {user ? (
          <span className="nav-user">
            <i className="glyphicon glyphicon-user"></i> {user.username}
          </span>
        ) : (
          <Link to="/signup" className="nav-item">
            <i className="glyphicon glyphicon-user"></i> Sign Up
          </Link>
        )}
        {user ? (
          <span onClick={handleLogout} className="nav-item clickable">
            <i className="glyphicon glyphicon-log-in"></i> Log Out
          </span>
        ) : (
          <Link to="/signin" className="nav-item">
            <i className="glyphicon glyphicon-log-in"></i> Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
