import { useNavigate } from "react-router-dom";
import "./elements.scss";

export const NavigationButton = ({ buttonText = "Continue Browsing" }) => {
  const navigate = useNavigate();
  return (
    <button className="pme-navigation-button" onClick={() => navigate("/")}>
      {buttonText}
    </button>
  );
};
