import { motion } from "framer-motion"
import { mockArtists } from "@/data/mockData"
import ArtistCard from "@/components/domain/ArtistCard"
import { Search } from "lucide-react"
import { useState } from "react"

export default function ArtistsPage() {
  const [query, setQuery] = useState("");

  const filtered = mockArtists.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.genre.toLowerCase().includes(query.toLowerCase()) ||
    a.country.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      {/* Header */}
      <div className="mb-10">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs font-bold tracking-widest uppercase mb-2"
          style={{ color: "#bced09" }}
        >
          Performing at AURA
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black tracking-tight mb-4"
        >
          Featured Artists
        </motion.h1>
        <p className="text-muted-foreground text-lg">
          Discover the artists performing at our upcoming events.
        </p>
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative max-w-sm mb-10"
      >
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search artists or genres..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-secondary rounded-full h-10 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground"
          style={{ "--accent": "#bced09" } as React.CSSProperties}
        />
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((artist, i) => (
          <ArtistCard key={artist.id} artist={artist} index={i} variant="card" />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-muted-foreground">
          No artists found matching &ldquo;{query}&rdquo;.
        </div>
      )}
    </div>
  );
}
