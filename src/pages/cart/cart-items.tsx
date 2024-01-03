import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { CartItem } from "./cart-item";
import { Events } from "../../types";

interface CartItemsProps {
  events: Events[];
  cartItems: Record<number, number>;
}

export const CartItems = (props: CartItemsProps) => {
  const { events, cartItems } = props;

  return (
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
  );
};
