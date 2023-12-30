import { NavigationButton } from "../../elements/navigation_button";
import "./not_found.scss";

export const NotFound = () => {
  document.title = "Prague Music Events | Page Not Found";

  return (
    <div className="pme-not-found">
      <h2 className="pme-not-found__text">Oops, this page doesn't exist.</h2>
      <NavigationButton buttonText="Back To Homepage" />
    </div>
  );
};
