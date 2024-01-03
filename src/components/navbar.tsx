import { useContext } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { EventContext } from "../context/event-context";

export const Navbar = () => {
  interface NavbarContextType {
    cartItems: Record<number, number>;
  }

  const { cartItems } = useContext(EventContext) as NavbarContextType;

  const navigate = useNavigate();
  const location = useLocation();

  let cartItemsCount = 0;
  Object.values(cartItems).forEach((count) => {
    cartItemsCount += count;
  });

  return (
    <div className="pme-navbar">
      <Link
        to="/"
        onClick={() => location.pathname === "/" && window.location.reload()}
        className="pme-navbar__logo"
      >
        Prague <span>Music</span> Events
      </Link>
      <Link to="/" className="pme-navbar__logo-mobile">
        P<span>M</span>E
      </Link>
      <h1 className="pme-navbar__slogan">
        Find the <span>next event</span> you'll want <span>to attend.</span>
      </h1>
      <svg
        className="pme-navbar__cart-mobile"
        onClick={() => navigate("/cart")}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="40"
        height="40"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M78 52.5C78 52.775 78.225 53 78.5 53C78.775 53 79 52.775 79 52.5C79 52.225 78.775 52 78.5 52C78.225 52 78 52.225 78 52.5M21 60.5C21 60.775 21.225 61 21.5 61C21.775 61 22 60.775 22 60.5C22 60.225 21.775 60 21.5 60C21.225 60 21 60.225 21 60.5M24 65.5C24 65.775 24.225 66 24.5 66C24.775 66 25 65.775 25 65.5C25 65.225 24.775 65 24.5 65C24.225 65 24 65.225 24 65.5"
          fill="#e80c1c"
        />
        <path
          d="M1.376 16.462C0.048 19.923 1.712 21 8.389 21C15.931 21 14.71 18.409 18.523 42.5C22.824 69.673 20.722 68.006 50.654 67.985C62.669 67.976 73.102 67.588 73.837 67.122C74.573 66.655 75.023 65.2 74.837 63.887L74.5 61.5 51.5 61C28.582 60.502 28.499 60.492 28.18 58.25L27.861 56 50.383 56C64.448 56 73.8 55.592 75.288 54.915C76.598 54.318 78.361 52.63 79.205 51.165C81.018 48.019 84.605 26.02 83.693 23.642C83.128 22.169 79.939 22 52.738 22L22.414 22 21.457 18.75L20.5 15.5 11.233 15.212C3.636 14.976 1.86 15.202 1.376 16.462M29.168 74.595C25.838 76.928 26.456 82.856 30.25 84.969C32.72 86.344 33.28 86.344 35.75 84.969C39.544 82.856 40.162 76.928 36.832 74.595C33.957 72.581 32.043 72.581 29.168 74.595M62.168 74.595C58.838 76.928 59.456 82.856 63.25 84.969C65.72 86.344 66.28 86.344 68.75 84.969C72.544 82.856 73.162 76.928 69.832 74.595C66.957 72.581 65.043 72.581 62.168 74.595"
          fill="#e40c1c"
        />
      </svg>

      <button className="pme-navbar__cart" onClick={() => navigate("/cart")}>
        Cart{" "}
        <span>
          {`(`}
          {cartItemsCount}
          {`)`}
        </span>
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
            strokeWidth="1"
          />
          <line
            x1="30.0661"
            y1="0.25"
            x2="-1.14598e-05"
            y2="0.249996"
            stroke="white"
            strokeWidth="1"
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
            strokeWidth="1"
          />
          <line
            x1="6.10509e-05"
            y1="30.75"
            x2="30.0662"
            y2="30.75"
            stroke="white"
            strokeWidth="1"
          />
        </svg>
      </button>
    </div>
  );
};
