import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useParams, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="pme-navbar">
      <Link to="/" className="navbar__header">
        Prague <span>Music</span> Events
      </Link>
      <h1 className="navbar__slogan">
        Find the <span>next event</span> you'll want <span>to attend.</span>
      </h1>
      <button className="navbar__cart" onClick={() => navigate("/cart")}>
        Cart
      </button>
    </div>
  );
};
