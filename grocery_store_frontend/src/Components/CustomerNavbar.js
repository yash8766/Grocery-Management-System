import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import { BsCartFill } from "react-icons/bs";
import { BsPersonCircle, BsListCheck } from "react-icons/bs";

function CustomerNavbar({ cartCount }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Manage dropdown state
  const navigate = useNavigate(); // To navigate programmatically
  const userId = sessionStorage.getItem("userId");

  // Handle mouse enter and leave to show/hide the dropdown
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  // Handle Login and Register click
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to login page
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to register page
  };

  // Handle Logout click
  const handleLogoutClick = () => {
    // Clear user session or perform necessary API call to log out
    sessionStorage.removeItem("userId");
    navigate("/"); // Redirect to home page or login page after logout
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-3"
      style={{ minHeight: "10vh", backgroundColor: "green" }}
    >
      <div className="container-fluid">
        {/* Brand Logo */}
        <NavLink
          className="navbar-brand text-white d-flex align-items-center"
          to="/"
        >
          <span className="logo-style">GROCEFY</span>
        </NavLink>

        {/* Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Profile Link with Hover Dropdown */}
            <li
              className="nav-item dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="btn btn-white"
                style={{
                  color: "#aeff00",
                  fontWeight: "bold",
                  border: "2px solid #aeff00",
                  marginTop: "12%",
                }}
              >
                <BsPersonCircle size={20} style={{ marginRight: "8px" }} />
                {userId ? "Profile" : "Sign In"}
              </button>

              {/* Dropdown Menu for Profile/SignIn */}
              {userId && isDropdownOpen && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    border: "1px solid #aeff00",
                    borderRadius: "5px",
                    zIndex: 1000, // Ensure the dropdown appears above other content
                  }}
                >
                  <button
                    className="dropdown-item"
                    onClick={() => navigate(`/editprofile/${userId}`)}
                  >
                    Profile
                  </button>
                  {/* Logout option */}
                  <button
                    className="dropdown-item"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </div>
              )}

              {/* Show Login and Register only if no userId */}
              {!userId && isDropdownOpen && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    border: "1px solid #aeff00",
                    borderRadius: "5px",
                    zIndex: 1000,
                  }}
                >
                  <button className="dropdown-item" onClick={handleLoginClick}>
                    Login
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </button>
                </div>
              )}
            </li>

            {/* Orders Link */}
            <li className="nav-item">
              <NavLink className="nav-link fs-4 fw-semibold" to={`/orders/${userId}`}>
                <button
                  type="button"
                  className="btn btn-white"
                  style={{
                    color: "#aeff00",
                    fontWeight: "bold",
                    border: "2px solid #aeff00",
                  }}
                >
                  <BsListCheck size={20} style={{ marginRight: "8px" }} />
                  Orders
                </button>
              </NavLink>
            </li>

            {/* Cart Icon with Dynamic Count */}
            <li className="nav-item">
              <NavLink className="nav-link fs-4 fw-semibold" to={`/viewcart/${userId}`}>
                <button
                  type="button"
                  className="btn btn-white position-relative"
                  style={{ color: "#aeff00", fontWeight: "bold" }}
                >
                  <BsCartFill size={20} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
