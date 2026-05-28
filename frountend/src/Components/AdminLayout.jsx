import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./AdminDashboard.css";

const AdminLayout = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Products", path: "/admin/products" },
    { name: "Sales", path: "/admin/sales" },
    { name: "Customers", path: "/admin/customers" },
    { name: "Orders", path: "/admin/allorders" },
    { name: "AddOffer", path: "/admin/addoffer" },
  ];

  return (

    <div className="admin-container">

      <div className="sidebar">

        <h2 className="logo">Ashura</h2>

        <ul>

          <h4>Dashboard</h4>

          {menuItems.map((item) => (

            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={
                location.pathname === item.path
                  ? "active"
                  : ""
              }
            >
              {item.name}
            </li>

          ))}

        </ul>

      </div>

      <div className="main-content">

        <Outlet />

      </div>

    </div>
  );
};

export default AdminLayout;