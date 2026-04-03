import { motion } from "framer-motion"
import { useAppContext } from "@/context/AppContext"
import EventCard from "@/components/domain/EventCard"
import ArtistCard from "@/components/domain/ArtistCard"
import HeroSection from "@/components/domain/HeroSection"
import { mockArtists } from "@/data/mockData"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

/* ── Reusable section heading ──────────────────────────── */
function SectionHeading({
  label,
  title,
  subtitle,
  linkTo,
  linkLabel = "View all",
}: {
  label: string;
  title: string;
  subtitle?: string;
  linkTo?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-medium tracking-widest uppercase mb-2"
          style={{ color: "#bced09" }}
        >
          {label}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl md:text-4xl font-medium tracking-tight"
        >
          {title}
        </motion.h2>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo}>
          <Button
            variant="ghost"
            className="gap-2 font-medium text-sm hidden sm:flex group"
            style={{ color: "#bced09" }}
          >
            {linkLabel}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      )}
    </div>
  )
}

/* ── Category filter pills ─────────────────────────────── */
const CATEGORIES = ["All", "Concert", "Festival", "Theater", "Comedy", "UK", "Germany", "Austria", "USA", "France"]

function CategoryPills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex gap-2 overflow-x-auto hide-scrollbar pb-1"
    >
      {CATEGORIES.map((cat, i) => (
        <motion.button
          key={cat}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.04 }}
          className="shrink-0 px-5 py-2 rounded-full text-sm font-medium border border-border bg-card text-card-foreground transition-all hover:border-accent hover:bg-accent/10"
          style={{ "--accent": "#bced09" } as React.CSSProperties}
        >
          {cat}
        </motion.button>
      ))}
    </motion.div>
  )
}

/* ── Home Page ─────────────────────────────────────────── */
export default function Home() {
  const { events } = useAppContext()

  const recentEvents = events.slice(0, 4)
  const featuredEvents = events.slice(0, 4)
  const concertEvents = events.filter((e) => e.type === "Concert").slice(0, 4)

  return (
    <div className="flex flex-col">
      {/* Hero with slideshow */}
      <HeroSection />

      {/* ── Categories strip ── */}
      <section className="py-6 border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <CategoryPills />
        </div>
      </section>

      {/* ── Featured Events (tall variant) ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Handpicked"
            title="Featured Events"
            subtitle="Curated concerts and shows you shouldn't miss"
            linkTo="/events"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Events ── */}
      <section className="py-20" style={{ backgroundColor: "hsl(var(--muted)/0.3)" }}>
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Just Added"
            title="Recent Events"
            subtitle="The latest events added to our platform"
            linkTo="/events"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {recentEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Artists ── */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Performing Soon"
            title="Featured Artists"
            linkTo="/artists"
            linkLabel="All Artists"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {mockArtists.slice(0, 4).map((artist, i) => (
              <ArtistCard key={artist.id} artist={artist} index={i} variant="card" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Concerts section ── */}
      {concertEvents.length > 0 && (
        <section className="py-20" style={{ backgroundColor: "hsl(var(--muted)/0.3)" }}>
          <div className="container mx-auto px-4">
            <SectionHeading
              label="Live Music"
              title="Concerts Near You"
              subtitle="Feel the beat, live"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {concertEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
            style={{ backgroundColor: "#100c08" }}
          >
            {/* Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: "#bced09" }}
            />
            <p className="text-sm font-medium tracking-widest uppercase mb-4 relative z-10" style={{ color: "#bced09" }}>
              Become a host
            </p>
            <h2 className="text-4xl md:text-6xl font-medium text-white leading-tight mb-6 relative z-10">
              Want to host <br />your own event?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8 relative z-10">
              Join thousands of event organizers who trust AuraTickets to sell out their shows.
            </p>
            <Link to="/admin" className="relative z-10 inline-block">
              <button
                className="px-10 py-4 rounded-full font-medium text-base tracking-wide transition-all hover:brightness-110 active:scale-95"
                style={{ backgroundColor: "#bced09", color: "#100c08" }}
              >
                Start Organizing
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
