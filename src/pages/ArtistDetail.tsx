import { useParams, Link } from "react-router-dom"
import { mockArtists, mockEvents } from "@/data/mockData"
import { motion } from "framer-motion"
import { MapPin, Calendar, ExternalLink, Music2, Users, ArrowLeft, Play } from "lucide-react"
import EventCard from "@/components/domain/EventCard"

export default function ArtistDetail() {
  const { id } = useParams<{ id: string }>();
  const artist = mockArtists.find((a) => a.id === id);

  if (!artist) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Artist not found</h2>
        <Link to="/artists" className="underline text-muted-foreground">Back to Artists</Link>
      </div>
    );
  }

  // Events featuring this artist
  const artistEvents = mockEvents.filter((e) =>
    e.artists.some((a) => a.id === artist.id)
  );

  return (
    <div className="flex-1">
      {/* ── Hero Banner ── */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%)" }}
        />
        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Link to="/artists">
            <motion.button
              whileHover={{ x: -3 }}
              className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Artists
            </motion.button>
          </Link>
        </div>
      </div>

      {/* ── Profile ── */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-24">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="shrink-0"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 shadow-2xl"
              style={{ borderColor: "#bced09" }}
            >
              <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 pt-4 md:pt-16"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2 inline-block"
                  style={{ backgroundColor: "#bced09", color: "#100c08" }}
                >
                  {artist.genre}
                </span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-2">{artist.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {artist.country}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> {artist.followers} followers
                  </span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {artist.socialLinks.instagram && (
                  <a href={artist.socialLinks.instagram} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors" title="Instagram">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {artist.socialLinks.spotify && (
                  <a href={artist.socialLinks.spotify} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors" title="Spotify">
                    <Music2 className="w-4 h-4" />
                  </a>
                )}
                {artist.socialLinks.youtube && (
                  <a href={artist.socialLinks.youtube} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors" title="YouTube">
                    <Play className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-2xl">{artist.bio}</p>
          </motion.div>
        </div>

        {/* ── Upcoming Events ── */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#bced09" }}>Live Dates</p>
              <h2 className="text-3xl font-black tracking-tight">Upcoming Events</h2>
            </div>
          </div>

          {artistEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {artistEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center border border-dashed border-border rounded-2xl">
              <Calendar className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground font-medium">No upcoming events for this artist.</p>
              <Link to="/events" className="text-sm mt-2 inline-block underline text-muted-foreground">Browse all events</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
