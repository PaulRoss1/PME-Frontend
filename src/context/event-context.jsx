import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext(null);

const getDefaultCart = (events) => {
  let cart = {};
  for (const event of events) {
    cart[event.id] = 0;
  }
  return cart;
};

const getInitialState = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : {};
};

export const EventContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getInitialState);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/events/all/"
      );
      const fetchedEvents = response.data;
      setEvents(fetchedEvents);
      if (Object.keys(cartItems).length === 0) {
        setCartItems(getDefaultCart(fetchedEvents));
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = events.find((event) => event.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

  const updateCartItemCount = (newAmount, id) => {
    setCartItems((prev) => ({ ...prev, [id]: newAmount }));
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    events,
    updateCartItemCount,
    getTotalCartAmount,
    loading,
    setLoading,
  };

  return (
    <EventContext.Provider value={contextValue}>
      {props.children}
    </EventContext.Provider>
  );
};
