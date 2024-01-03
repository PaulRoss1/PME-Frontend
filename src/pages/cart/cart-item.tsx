import React, { useContext } from "react";
import { EventContext } from "../../context/event-context";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import { formatDate } from "../../helpers/helperFunctions";

interface CartItemProps {
  data: {
    id: number;
    name: string;
    image: string;
    price: number;
    venue: string;
    date: string;
    event_type: string;
    slug: string;
  };
}

export const CartItem = (props: CartItemProps) => {
  const { id, name, image, price, venue, date, event_type, slug } = props.data;

  interface CartItemContextType {
    cartItems: Record<number, number>;
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    updateCartItemCount: (newAmount: number, id: number) => void;
  }

  const { addToCart, removeFromCart, cartItems, updateCartItemCount } =
    useContext(EventContext) as CartItemContextType;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    updateCartItemCount(Number(numericValue), id);
  };

  return (
    <Col md={6} xs={12} className="pme-cart__item">
      <img className="pme-cart__item-image" src={image} alt="" />
      <div className="pme-cart__outer">
        <div className="pme-cart__inner">
          <Link className="pme-cart__item-title" to={`/event/${slug}/${id}`}>
            {name}
          </Link>
          <span className="pme-cart__item-info">
            {event_type}, {formatDate(date)}
          </span>
          <span className="pme-cart__item-venue">Venue: {venue}</span>
          <span className="pme-cart__item-price">
            Price: <span>{price} Kč</span>
          </span>
        </div>
        <div className="pme-cart__item-input">
          <button onClick={() => removeFromCart(id)}>-</button>
          <input value={cartItems[id]} onChange={handleInputChange} />
          <button onClick={() => addToCart(id)}>+</button>
        </div>
      </div>
    </Col>
  );
};
