import { NavigationButton } from "../../elements/navigation_button";

export const EmptyCart = () => (
  <div className="pme-cart__empty">
    <h2 className="pme-cart__empty-text">Your cart is empty.</h2>
    <NavigationButton buttonText="Continue Browsing" />
  </div>
);
