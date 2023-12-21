import { NavigationButton } from "../../elements/navigation_button";
import "./not_found.scss";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="pme-not-found">
      <h2 className="pme-not-found__text">xxx not found</h2>
      <NavigationButton buttonText="Back To Homepage" />
    </div>
  );
};
