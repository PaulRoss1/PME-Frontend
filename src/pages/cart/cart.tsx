import React, { useContext, useEffect, useState } from "react";
import "./cart.scss";
import { EventContext } from "../../context/event-context";
import { Events } from "../../types";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { NavigationButton } from "../../elements/navigation_button";
import { Loading } from "../../elements/loading";
import { EmptyCart } from "./empty_cart";
import { CartItems } from "./cart-items";

export const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  document.title = "Prague Music Events | Cart";

  interface CartContextType {
    events: Events[];
    cartItems: Record<number, number>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const { events, cartItems, setLoading } = useContext(
    EventContext
  ) as unknown as CartContextType;

  useEffect(() => {
    setLoading(true);
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = events.find((event) => event.id === Number(item));
        itemInfo && (total += cartItems[item] * itemInfo.price);
      }
    }
    setTotalAmount(total);
  }, [events, cartItems]);

  return events.length === 0 ? (
    <Loading />
  ) : (
    <>
      {totalAmount === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="pme-cart">
            <div>
              <h2 className="pme-cart__title">Cart Items</h2>
            </div>
            <CartItems events={events} cartItems={cartItems} />
          </div>

          <div className="pme-cart__checkout">
            <span className="pme-cart__subtotal">
              Subtotal: <span>{totalAmount} Kč</span>
            </span>
            <NavigationButton buttonText="Continue Browsing" />
            <button
              data-tooltip-id="checkout-tooltip"
              data-tooltip-content="Practice Project - Unavailable"
              className="pme-cart__checkout-btn"
            >
              Checkout
            </button>
            <Tooltip id="checkout-tooltip" />
          </div>
        </>
      )}
    </>
  );
};
