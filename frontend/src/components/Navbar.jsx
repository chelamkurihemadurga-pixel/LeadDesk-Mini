import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <h2 className="logo">LeadDesk Mini</h2>

      <div className="nav-links">
        <a href="#contact">Contact</a>

        <Link to="/admin">
          <button className="admin-btn">
            Admin Login
          </button>
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;