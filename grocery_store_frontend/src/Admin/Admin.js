import React from "react";
import {useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaPlus, FaCreditCard } from "react-icons/fa"; 
import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom"; 
import { GiReceiveMoney } from "react-icons/gi"; 
import { AiOutlineEye } from "react-icons/ai"; 
import { GrPlan } from "react-icons/gr";
import AdminNavbar from "./AdminNavbar";
import "./Styles.css";

function Admin({ children }) {

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    }
  }, [navigate]);
  return (
    <div>
      <AdminNavbar />
      <div className="layout-container">
        <div
          className="sidebar"
          style={{ border: "2px solid black", display: "flex", backgroundColor: "rgb(129, 174, 32)" }}
        >
          <div className="sidebar-header">
            <h3>Admin</h3>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/admin/addcategory"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <MdCategory className="icon" /> Category
            </NavLink>
            <NavLink
              to="/admin/addproducts"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaPlus className="icon" /> Add Products
            </NavLink>
            <NavLink
              to="/admin/viewproducts"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <AiOutlineEye className="icon" /> View Products
            </NavLink>

            <NavLink
              to="/admin/vieworders"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <GrPlan className="icon" /> Orders
            </NavLink>

            <NavLink
              to="/admin/viewPayments"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaCreditCard className="icon" /> Payment
            </NavLink>
          </nav>
        </div>

        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Admin;
