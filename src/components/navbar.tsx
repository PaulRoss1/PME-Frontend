import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useParams, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <Link to="/">Prague Music Events</Link>
      <h1>Find the next event you'll want to attend.</h1>
      <button onClick={() => navigate("/cart")}>Cart</button>
    </div>
  );
};
