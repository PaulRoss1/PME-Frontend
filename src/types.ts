export interface Events {
  id: number;
  event_type: string;
  name: string;
  slug: string;
  venue: string;
  address: string;
  date: string;
  lat_long: string;
  image: string;
  price: number;
}

export interface EventContextType {
  cartItems: Record<number, number>;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  events: Events[];
  updateCartItemCount: (newAmount: number, id: number) => void;
}
