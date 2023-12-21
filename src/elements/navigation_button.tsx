import { useNavigate } from "react-router-dom";
import "./navigation_button.scss";

export const NavigationButton = ({ buttonText = "Continue Browsing" }) => {
  const navigate = useNavigate();
  return (
    <button className="pme-navigation-button" onClick={() => navigate("/")}>
      {buttonText}
    </button>
  );
};
