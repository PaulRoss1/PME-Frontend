import React, { useContext, useEffect, useState } from "react";
import "./cart.scss";
import { EventContext } from "../../context/event-context";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./cart-item";
import { Events } from "../../types";
import { Tooltip } from "react-tooltip";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { NavigationButton } from "../../elements/navigation_button";

export const Cart = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  document.title = "Prague Music Events | Cart";

  interface CartContextType {
    events: Events[];
    cartItems: Record<number, number>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const { events, cartItems, loading, setLoading } = useContext(
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

  const navigate = useNavigate();

  return events.length === 0 ? (
    <span className="pme-events__loading"></span>
  ) : (
    <>
      {totalAmount == 0 ? (
        <div className="pme-cart__empty">
          <h2 className="pme-cart__empty-text">Your cart is empty.</h2>
          <NavigationButton buttonText="Continue Browsing" />
        </div>
      ) : (
        <>
          <div className="pme-cart">
            <div>
              <h2 className="pme-cart__title">Cart Items</h2>
            </div>
            <div className="pme-cart__items">
              <Container>
                <Row>
                  {events.map((event) => {
                    if (cartItems[event.id] !== 0) {
                      return <CartItem data={event} key={event.id} />;
                    }
                  })}
                </Row>
              </Container>
            </div>
          </div>

          <div className="pme-cart__checkout">
            <span className="pme-cart__subtotal">
              Subtotal: <span>{totalAmount} Kč</span>
            </span>
            <NavigationButton buttonText="Continue Browsing" />
            <button className="pme-cart__checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </>
  );
};
