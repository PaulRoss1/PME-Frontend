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

const loadCartFromLocalStorage = () => {
  const currentDay = new Date().getDate();
  const savedData = JSON.parse(localStorage.getItem("cart") || "{}");
  const { cartItems, savedDay } = savedData;

  return String(savedDay) === String(currentDay) ? cartItems : {};
};

export const EventContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<Record<number, number>>(
    loadCartFromLocalStorage
  );
  const [events, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    const currentDay = new Date().getDate();

    const cartData = {
      cartItems,
      savedDay: currentDay,
    };

    localStorage.setItem("cart", JSON.stringify(cartData));
  }, [cartItems]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://pragueevents.pythonanywhere.com/api/v1/events/all/"
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
    loading,
    setLoading,
  };

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};
