import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 text-muted-foreground py-12 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-foreground mb-4">AuraTickets</h3>
          <p className="text-sm">
            The minimalist platform for your next unforgettable experience.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/events" className="hover:text-foreground">Events</Link></li>
            <li><Link to="/" className="hover:text-foreground">Artists</Link></li>
            <li><Link to="/" className="hover:text-foreground">Venues</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-foreground">Help Center</Link></li>
            <li><Link to="/" className="hover:text-foreground">Contact Us</Link></li>
            <li><Link to="/profile" className="hover:text-foreground">My Account</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-4">Payments</h4>
          <div className="flex flex-wrap gap-2 text-xs">
             <div className="px-2 py-1 bg-white border rounded text-black font-semibold">PayPal</div>
             <div className="px-2 py-1 bg-white border rounded text-black font-semibold">Stripe</div>
             <div className="px-2 py-1 bg-white border rounded text-black font-semibold">Revolut</div>
             <div className="px-2 py-1 bg-white border rounded text-black font-semibold">Visa/MC</div>
             <div className="px-2 py-1 bg-white border rounded text-black font-semibold">Amex</div>
             <div className="px-2 py-1 bg-white border rounded text-black font-semibold">Apple Pay</div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t text-sm text-center">
        &copy; {new Date().getFullYear()} AuraTickets. All rights reserved.
      </div>
    </footer>
  )
}
