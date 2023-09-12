export interface Events {
  id: number;
  event_type: string;
  name: string;
  get_absolute_url: string;
  venue: string;
  address: string;
  date: string;
  lat_long: string;
  image: string;
  price: string;
}

export interface EventContextType {
  cartItems: Record<number, number>;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  events: Events[];
  updateCartItemCount: (newAmount: number, id: number) => void;
}
