import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, User, Sun, Moon, Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/ThemeContext"
import { useAppContext } from "@/context/AppContext"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"

/* ── Language options ──────────────────────────────────── */
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
];

/* ── Language Dropdown ─────────────────────────────────── */
function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{selected.flag} {selected.label}</span>
        <span className="sm:hidden">{selected.flag}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 bg-popover border border-border rounded-xl shadow-xl overflow-hidden z-50"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setSelected(lang); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-secondary ${
                  selected.code === lang.code ? "font-semibold text-foreground" : "text-muted-foreground"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
                {selected.code === lang.code && (
                  <span className="ml-auto text-xs" style={{ color: "#bced09" }}>✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Navbar ────────────────────────────────────────────── */
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 shrink-0">
            <span className="text-xl font-black tracking-tighter" style={{ color: "hsl(var(--foreground))" }}>
              AURA<span style={{ color: "#bced09" }}>.</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link to="/events" className="hover:text-foreground transition-colors">Events</Link>
            <Link to="/artists" className="hover:text-foreground transition-colors">Artists</Link>
            <Link to="/admin" className="hover:text-foreground transition-colors">Admin</Link>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right actions */}
          <div className="flex items-center gap-1">
            {/* Language dropdown */}
            <LanguageDropdown />

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ backgroundColor: "#bced09", color: "#100c08" }}
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            <Link to="/auth/signin">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-sm">Log in</Button>
            </Link>
            <Link to="/auth/signup">
              <Button size="sm" className="hidden sm:flex text-sm rounded-full font-semibold px-5" style={{ backgroundColor: "#bced09", color: "#100c08" }}>
                Sign up
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-4 w-4" />
              </Button>
            </Link>

            {/* Mobile menu toggle */}
            <Button variant="ghost" size="icon" className="md:hidden rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-b border-border px-4 py-4 space-y-1 sticky top-16 z-40"
          >
            {[
              { to: "/events", label: "Events" },
              { to: "/artists", label: "Artists" },
              { to: "/cart", label: "Cart" },
              { to: "/admin", label: "Admin" },
              { to: "/auth/signin", label: "Log in" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
