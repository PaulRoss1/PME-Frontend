import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useParams, useNavigate } from "react-router-dom";

import { EventContext } from "../context/event-context";

export const Navbar = () => {
  interface NavbarContextType {
    // cartItemsCount: number;

    cartItems: Record<number, number>;
  }

  const { cartItems } = useContext(EventContext) as NavbarContextType;

  const navigate = useNavigate();

  let cartItemsCount = 0;
  Object.values(cartItems).forEach((count) => {
    cartItemsCount += count;
  });

  return (
    <div className="pme-navbar">
      <Link to="/" className="pme-navbar__logo">
        Prague <span>Music</span> Events
      </Link>
      <h1 className="pme-navbar__slogan">
        Find the <span>next event</span> you'll want <span>to attend.</span>
      </h1>
      <button className="pme-navbar__cart" onClick={() => navigate("/cart")}>
        Cart <span>{`(`}</span>
        {cartItemsCount}
        <span>{`)`}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
        >
          <line
            y1="-0.25"
            x2="31"
            y2="-0.25"
            transform="matrix(4.37114e-08 1 1 -4.37114e-08 0.533081 0)"
            stroke="white"
            stroke-width="1"
          />
          <line
            x1="30.0661"
            y1="0.25"
            x2="-1.14598e-05"
            y2="0.249996"
            stroke="white"
            stroke-width="1"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
        >
          <line
            y1="-0.25"
            x2="31"
            y2="-0.25"
            transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 29.5331 31)"
            stroke="white"
            stroke-width="1"
          />
          <line
            x1="6.10509e-05"
            y1="30.75"
            x2="30.0662"
            y2="30.75"
            stroke="white"
            stroke-width="1"
          />
        </svg>
      </button>
    </div>
  );
};
