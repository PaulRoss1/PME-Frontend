import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { EventContextType, Events } from "../types";

export const EventContext = createContext<EventContextType | null>(null);

const getDefaultCart = (events: Events[]): Record<number, number> => {
  let cart: Record<number, number> = {};
  for (const event of events) {
    cart[event.id] = 0;
  }
  return cart;
};

const getInitialState = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : {};
};

export const EventContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] =
    useState<Record<number, number>>(getInitialState);
  const [events, setEvents] = useState<Events[]>([]);

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

  const addToCart = (id: number) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

  const updateCartItemCount = (newAmount: number, id: number) => {
    setCartItems((prev) => ({ ...prev, [id]: newAmount }));
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    events,
    updateCartItemCount,
  };

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};
