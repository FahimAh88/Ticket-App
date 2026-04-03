import React, { createContext, useContext, useEffect, useState } from "react";
import { AppEvent, mockEvents } from "@/data/mockData";

/* ── Cart item ─────────────────────────────────────────── */
export interface CartItem {
  cartItemId: string;
  event: AppEvent;
  quantity: number;
  purchasedAt: string;
}

/* ── Context shape ─────────────────────────────────────── */
interface AppState {
  events: AppEvent[];
  addEvent: (event: AppEvent) => void;
  updateEvent: (event: AppEvent) => void;
  removeEvent: (id: string) => void;
  cartItems: CartItem[];
  addTicketToCart: (event: AppEvent, quantity?: number) => void;
  removeTicketFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /* ── Hydrate ── */
  useEffect(() => {
    const storedEvents = localStorage.getItem("ticketapp_events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(mockEvents);
      localStorage.setItem("ticketapp_events", JSON.stringify(mockEvents));
    }
    const storedCart = localStorage.getItem("ticketapp_cart");
    if (storedCart) setCartItems(JSON.parse(storedCart));
    setIsLoaded(true);
  }, []);

  /* ── Persist ── */
  useEffect(() => {
    if (isLoaded) localStorage.setItem("ticketapp_events", JSON.stringify(events));
  }, [events, isLoaded]);

  useEffect(() => {
    if (isLoaded) localStorage.setItem("ticketapp_cart", JSON.stringify(cartItems));
  }, [cartItems, isLoaded]);

  /* ── Event actions ── */
  const addEvent = (event: AppEvent) => setEvents((prev) => [event, ...prev]);

  const updateEvent = (event: AppEvent) =>
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));

  const removeEvent = (id: string) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  /* ── Cart actions ── */
  const addTicketToCart = (event: AppEvent, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.event.id === event.id);
      if (existing) {
        return prev.map((item) =>
          item.event.id === event.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId: `cart-${event.id}-${Date.now()}`,
          event,
          quantity,
          purchasedAt: new Date().toISOString(),
        },
      ];
    });
  };

  const removeTicketFromCart = (cartItemId: string) =>
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.event.price * item.quantity,
    0
  );

  return (
    <AppContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        removeEvent,
        cartItems,
        addTicketToCart,
        removeTicketFromCart,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
