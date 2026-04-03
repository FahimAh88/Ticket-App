import { AppEvent } from "@/data/mockData"
import { MapPin, Calendar, Ticket } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useAppContext } from "@/context/AppContext"
import { cn } from "@/lib/utils"

interface EventCardProps {
  event: AppEvent;
  index?: number;
  variant?: "default" | "featured";
}

export default function EventCard({ event, index = 0, variant = "default" }: EventCardProps) {
  const { addTicketToCart } = useAppContext()
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  if (variant === "featured") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <Link to={`/events/${event.id}`} className="group block h-full">
          <div className="relative overflow-hidden rounded-[16px] aspect-[3/4] shadow-2xl border border-border/10 bg-card">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Gradient Overlay - Increased for more pronounced hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

            {/* Top tag - Subtle Neutral Style */}
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              {event.tags.slice(0, 1).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Price badge / Sold Out - Subtle Style */}
            <div className="absolute top-4 right-4">
              {event.isSoldOut ? (
                <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest shadow-lg">
                  Sold Out
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-medium text-white uppercase tracking-widest shadow-lg">
                  ${event.price}
                </div>
              )}
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
              <div>
                <p className="text-accent text-[10px] font-medium uppercase tracking-[0.2em] mb-2">{formattedDate}</p>
                <h3 className="text-white font-medium text-2xl leading-tight tracking-tight mb-2 group-hover:text-accent transition-colors">{event.title}</h3>
                <div className="flex items-center gap-2 text-white/50 text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-accent opacity-70" />
                  <span className="line-clamp-1">{event.location}, {event.country}</span>
                </div>
              </div>
              
              {/* Added CTA Button */}
              <div className="mt-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <button className={cn(
                  "w-full py-3 rounded-full text-[10px] font-medium uppercase tracking-widest transition-all duration-300",
                  event.isSoldOut 
                    ? "bg-muted text-muted-foreground cursor-not-allowed" 
                    : "bg-accent text-accent-foreground hover:brightness-110 shadow-lg shadow-accent/20"
                )}>
                  {event.isSoldOut ? "Sold Out" : "Buy Tickets"}
                </button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div
        className="group relative flex flex-col h-full bg-card rounded-[16px] overflow-hidden border border-border/40 shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.18)] transition-all duration-500"
      >
        {/* Image portion */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Price badge / Sold Out */}
          <div className="absolute top-3 right-3">
             {event.isSoldOut ? (
                <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest shadow-lg">
                   Sold Out
                </div>
             ) : (
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-[10px] font-medium shadow-lg">
                   ${event.price}
                </div>
             )}
          </div>
        </div>

        {/* Text portion */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex-1">
             <p className="text-accent text-[10px] font-medium uppercase tracking-[0.2em] mb-2">
                {event.category || event.type}
             </p>
             <Link to={`/events/${event.id}`}>
               <h3 className="font-medium text-lg tracking-tight leading-tight line-clamp-1 mb-4 group-hover:text-accent transition-colors">
                 {event.title}
               </h3>
             </Link>
             
             <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
                   <Calendar className="w-3.5 h-3.5 text-accent opacity-60" />
                   <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
                   <MapPin className="w-3.5 h-3.5 text-accent opacity-60" />
                   <span className="line-clamp-1">{event.location}, {event.country}</span>
                </div>
             </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-6 pt-5 border-t border-border/30 flex items-center justify-between gap-3">
             <Link to={`/events/${event.id}`} className="flex-1">
                <button className="w-full py-2.5 rounded-full text-[10px] font-medium uppercase tracking-widest bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                   Get Details
                </button>
             </Link>
             <button 
                onClick={(e) => { e.preventDefault(); if(!event.isSoldOut) addTicketToCart(event); }}
                disabled={event.isSoldOut}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95",
                  event.isSoldOut 
                    ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50" 
                    : "bg-accent text-accent-foreground shadow-accent/20 hover:scale-110"
                )}
                title={event.isSoldOut ? "Sold Out" : "Quick Add"}
             >
                <Ticket className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
