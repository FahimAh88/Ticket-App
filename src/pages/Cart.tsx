import { motion, AnimatePresence } from "framer-motion"
import { useAppContext } from "@/context/AppContext"
import { Link } from "react-router-dom"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { cartItems, removeTicketFromCart, addTicketToCart, clearCart, cartTotal, cartCount } = useAppContext();

  return (
    <div className="container mx-auto px-4 py-12 flex-1 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#bced09" }}>Your tickets</p>
          <h1 className="text-4xl font-black tracking-tight">Shopping Cart</h1>
        </div>
        {cartItems.length > 0 && (
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={clearCart}>
            Clear all
          </Button>
        )}
      </div>

      {cartItems.length === 0 ? (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-32 flex flex-col items-center gap-5 text-center"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(188,237,9,0.12)" }}
          >
            <ShoppingCart className="w-8 h-8" style={{ color: "#bced09" }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground">Browse events and add tickets to get started.</p>
          </div>
          <Link to="/events">
            <Button className="rounded-full px-8 gap-2" style={{ backgroundColor: "#bced09", color: "#100c08" }}>
              Browse Events <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items list */}
          <div className="flex-1 space-y-4">
            <AnimatePresence>
              {cartItems.map((item, i) => {
                const eventDate = new Date(item.event.date);
                return (
                  <motion.div
                    key={item.cartItemId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex gap-4 p-4 rounded-2xl border border-border bg-card"
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={item.event.imageUrl}
                        alt={item.event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-1.5 mb-1">
                        {item.event.tags.slice(0, 1).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                            style={{ backgroundColor: "#bced09", color: "#100c08" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link to={`/events/${item.event.id}`}>
                        <h3 className="font-bold text-base leading-tight line-clamp-1 hover:underline">{item.event.title}</h3>
                      </Link>
                      <p className="text-muted-foreground text-sm mt-1">
                        {eventDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · {item.event.location}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Ticket className="w-3.5 h-3.5 text-muted-foreground" />
                        <p className="text-muted-foreground text-xs">
                          Added {new Date(item.purchasedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Quantity + Price */}
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <button
                        onClick={() => removeTicketFromCart(item.cartItemId)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 border border-border rounded-full px-2 py-1">
                          <button
                            onClick={() => removeTicketFromCart(item.cartItemId)}
                            className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => addTicketToCart(item.event, 1)}
                            className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-base w-16 text-right">${(item.event.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-80 shrink-0"
          >
            <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
              <h2 className="font-bold text-lg mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>{cartCount} ticket{cartCount !== 1 ? "s" : ""}</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Service fee</span>
                  <span>${(cartTotal * 0.05).toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>${(cartTotal * 1.05).toFixed(2)}</span>
                </div>
              </div>

              <button
                className="w-full py-3.5 rounded-full font-bold text-sm tracking-wide transition-all hover:brightness-110 active:scale-95"
                style={{ backgroundColor: "#bced09", color: "#100c08" }}
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center mb-4 uppercase tracking-widest font-bold opacity-60">Accepted payments</p>
                <div className="grid grid-cols-4 gap-3 items-center justify-items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 w-auto object-contain bg-white/10 p-0.5 rounded" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 w-auto object-contain bg-white/10 p-0.5 rounded" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 w-auto object-contain bg-white/10 p-0.5 rounded" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4 w-auto object-contain bg-white/10 p-0.5 rounded" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-5 w-auto object-contain bg-white/10 p-0.5 rounded" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-5 w-auto object-contain bg-white/10 p-0.5 rounded" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-5 w-auto object-contain bg-white/10 p-0.5 rounded" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Revolut_logo.svg" alt="Revolut" className="h-3 w-auto object-contain bg-white/10 p-0.5 rounded" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
