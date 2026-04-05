import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Calendar } from "lucide-react"
import { useAppContext } from "@/context/AppContext"
import { AppEvent } from "@/data/mockData"
import { Link, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
};

/* ── Custom Date Picker ─────────────────────────────────── */
function CustomDatePicker({ date, setDate }: { date: string; setDate: (d: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const formatDate = (d: string) => {
    if (!d) return "Select Date";
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div ref={ref} className="relative flex-1">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 w-full h-full px-8 py-5 text-left transition-colors hover:bg-gray-50/50"
      >
        <Calendar className="h-4 w-4 shrink-0 text-gray-400" />
        <span className={cn("text-sm font-medium", date ? "text-gray-900" : "text-gray-400")}>
          {formatDate(date)}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-[100] min-w-[320px]"
          >
             <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                   <h4 className="text-sm font-medium uppercase tracking-widest text-gray-400">Select Date</h4>
                   <button onClick={() => setDate("")} className="text-xs font-medium text-accent hover:underline">Clear</button>
                </div>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => { setDate(e.target.value); setIsOpen(false); }}
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm focus:outline-none [color-scheme:light]"
                />
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
                  Choose a specific date to find events happening at that time. Leave empty to see all upcoming dates.
                </p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Hero Search Bar ───────────────────────────────────── */
function HeroSearchBar() {
  const navigate = useNavigate();
  const { events } = useAppContext();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("location", location);
    if (date) params.set("date", date);
    navigate(`/events?${params.toString()}`);
    setShowDropdown(false);
  };

  const filteredEvents = events.filter((e) => {
    if (!query) return false;
    const q = query.toLowerCase();
    const titleMatch = e.title.toLowerCase().includes(q);
    const venueMatch = e.location.toLowerCase().includes(q);
    const artistMatch = e.artists?.some((a) => a.name.toLowerCase().includes(q));
    return titleMatch || venueMatch || artistMatch;
  }).slice(0, 4);

  const Divider = () => <div className="hidden md:block h-6 w-[1.5px] bg-gray-100/80 self-center opacity-50" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.55, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto mt-10 px-4 relative z-50"
    >
      <div className="rounded-[50px] flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white relative">
        
        {/* Location */}
        <div className="flex items-center gap-3 flex-1 px-8 py-5 transition-colors hover:bg-gray-50/50 rounded-t-[50px] md:rounded-none md:rounded-l-[50px]">
          <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            type="text"
            placeholder="Country or Zip code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-transparent w-full text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none font-medium"
          />
        </div>

        <Divider />

        {/* Date */}
        <CustomDatePicker date={date} setDate={setDate} />

        <Divider />

        {/* Search */}
        <div ref={searchRef} className="flex items-center gap-3 flex-[1.2] px-8 py-5 transition-colors hover:bg-gray-50/50 relative">
          <Search className="h-4 w-4 shrink-0 text-gray-400" />
          <input
            type="text"
            placeholder="Search events, venues..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => {
              if (query) setShowDropdown(true);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-transparent w-full text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none font-medium"
          />

          {/* Live Search Dropdown */}
          <AnimatePresence>
            {showDropdown && query && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                className="absolute top-full left-0 right-0 md:min-w-[360px] mt-4 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-[100] max-h-[400px] overflow-y-auto"
              >
                {filteredEvents.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-[#bced09] px-3 pb-2 border-b border-gray-50">Live Results</h4>
                    {filteredEvents.map((event) => (
                      <div 
                        key={event.id}
                        onClick={() => {
                          navigate(`/events/${event.id}`);
                          setShowDropdown(false);
                        }}
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                         <img src={event.imageUrl} alt={event.title} className="w-14 h-14 rounded-xl object-cover shadow-sm bg-gray-100 shrink-0" />
                         <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-gray-900 truncate">{event.title}</p>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {event.artists?.[0]?.name || event.organizerName} • {event.location}
                            </p>
                         </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <Search className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 font-medium">No results found for "{query}"</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search button */}
        <div className="p-2 flex shrink-0 rounded-b-[50px] md:rounded-none md:rounded-r-[50px]">
          <button
            onClick={handleSearch}
            className="px-10 rounded-full font-medium text-sm tracking-widest uppercase transition-all hover:brightness-110 active:scale-95 flex items-center justify-center min-h-[56px] shadow-lg shadow-accent/20 w-full md:w-auto"
            style={{ backgroundColor: "#bced09", color: "#100c08" }}
          >
            Search
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Slide event info overlay ──────────────────────────── */
function SlideInfoCard({ event }: { event: AppEvent }) {
  const eventDate = new Date(event.date);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
    >
      <div className="max-w-2xl">
        <div className="flex gap-2 mb-3 flex-wrap">
          {event.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide bg-white/10 backdrop-blur-md border border-white/20 text-white">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-tight mb-3 tracking-tight">{event.title}</h2>
        <div className="flex flex-wrap gap-4 text-white/70 text-sm mb-5 font-medium">
          <span className="flex items-center gap-1.5 opacity-80">
            <Calendar className="w-3.5 h-3.5" />
            {eventDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {event.location}, {event.country}
          </span>
        </div>
        <Link to={`/events/${event.id}`}>
          <button className="rounded-full px-8 py-3.5 font-medium text-xs uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-accent/10"
            style={{ backgroundColor: "#bced09", color: "#100c08" }}>
            Get Tickets — from ${event.price}
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Main Hero ─────────────────────────────────────────── */
export default function HeroSection() {
  const { events } = useAppContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const heroEvents = events.slice(0, 5);

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setActiveIndex(index);
  }, []);

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % heroEvents.length;
    goTo(next, 1);
  }, [activeIndex, heroEvents.length, goTo]);

  useEffect(() => {
    if (isPaused || heroEvents.length <= 1) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext, isPaused, heroEvents.length]);

  if (heroEvents.length === 0) return null;
  const activeEvent = heroEvents[activeIndex];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "88vh" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Sliding background */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0"
        >
          <img src={activeEvent.imageUrl} alt={activeEvent.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, #100c08 0%, rgba(16,12,8,0.65) 40%, rgba(16,12,8,0.15) 60%, rgba(16,12,8,0.5) 100%)"
          }} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-16 md:pt-20 px-4" style={{ minHeight: "88vh" }}>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#bced09" }}>
            Live experiences, curated for you
          </p>
          {/* Font weight 500 (medium) as requested */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight whitespace-nowrap">
            Find Your Next&nbsp;
            <span className="font-black" style={{ color: "#bced09" }}>Experience.</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg mt-3 font-normal">
            Concerts · Festivals · Shows · Theater — all in one place.
          </p>
        </motion.div>

        {/* Search bar */}
        <HeroSearchBar />

        {/* Event info */}
        <div className="absolute bottom-0 left-0 right-0">
          <AnimatePresence mode="wait">
            <SlideInfoCard key={activeIndex} event={activeEvent} />
          </AnimatePresence>
        </div>
      </div>

      {/* Dots only, no arrows */}
      <div className="absolute bottom-6 right-8 z-20 flex gap-2 items-center">
        {heroEvents.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === activeIndex ? "24px" : "6px",
              height: "6px",
              backgroundColor: i === activeIndex ? "#bced09" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
