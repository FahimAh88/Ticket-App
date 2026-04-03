import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Artist } from "@/data/mockData"

interface ArtistCardProps {
  artist: Artist;
  index?: number;
  variant?: "circle" | "card";
}

export default function ArtistCard({ artist, index = 0, variant = "circle" }: ArtistCardProps) {
  if (variant === "card") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.07 }}
        whileHover={{ y: -8 }}
      >
        <Link to={`/artists/${artist.id}`} className="group block">
          <div className="rounded-[16px] overflow-hidden bg-card border border-border/40 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500">
            <div className="relative aspect-square overflow-hidden">
              <img
                src={artist.imageUrl}
                alt={artist.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4">
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-accent text-accent-foreground shadow-lg"
                >
                  {artist.genre}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-black text-lg tracking-tight mb-1 group-hover:text-accent transition-colors">
                {artist.name}
              </h3>
              <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-4 opacity-60 transition-opacity group-hover:opacity-100">{artist.country} · {artist.followers} followers</p>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed line-clamp-2 italic">"{artist.bio}"</p>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Link to={`/artists/${artist.id}`} className="group flex flex-col items-center text-center w-32 shrink-0">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 transition-all duration-500 group-hover:scale-110 ring-2 ring-transparent group-hover:ring-accent group-hover:ring-offset-4 bg-secondary">
          <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity" />
        </div>
        <h4 className="font-medium text-xs uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-accent transition-colors">{artist.name}</h4>
        <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-1.5 opacity-60">{artist.genre}</p>
      </Link>
    </motion.div>
  );
}
