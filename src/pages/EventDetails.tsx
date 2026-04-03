import React from "react"
import { useParams, Link } from "react-router-dom"
import { useAppContext } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Clock, Share } from "lucide-react"
import { cn } from "@/lib/utils"

export default function EventDetails() {
  const { id } = useParams<{ id: string }>()
  const { events, addTicketToCart } = useAppContext()
  const event = events.find(e => e.id === id)
  const [isAdded, setIsAdded] = React.useState(false)

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <Link to="/events"><Button>Back to Events</Button></Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addTicketToCart(event)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const eventDate = new Date(event.date)
  const isPast = eventDate.getTime() < new Date().getTime()

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left Col - Image */}
        <div className="lg:w-2/3">
           <div className="relative aspect-video rounded-xl overflow-hidden mb-8 shadow-2xl">
              <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex gap-2">
                 {event.tags.map(tag => (
                   <Badge key={tag} className="bg-background/80 backdrop-blur text-foreground hover:bg-background/90 text-sm">
                     {tag}
                   </Badge>
                 ))}
              </div>
           </div>

           <div className="space-y-8">
             <div>
               <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{event.title}</h1>
               <p className="text-lg text-muted-foreground whitespace-pre-wrap">Join us for an unforgettable experience at the {event.title}. Don't miss out on this amazing opportunity with the best artists in the world.</p>
             </div>

             <div>
               <h3 className="text-2xl font-semibold mb-6">Lineup</h3>
               <div className="flex gap-6 flex-wrap">
                  {event.artists.map(artist => (
                    <div key={artist.id} className="flex items-center gap-4 group">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <span className="font-medium text-lg">{artist.name}</span>
                    </div>
                  ))}
               </div>
             </div>
           </div>
        </div>

        {/* Right Col - Info & CTA */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 bg-card border border-border/50 rounded-2xl p-8 shadow-xl">
             <div className="mb-8 pb-8 border-b border-border/50 space-y-5 text-sm">
                <div className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-accent" />
                   </div>
                   <div>
                     <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mb-1">Date & Time</p>
                     <p className="font-bold text-lg">{eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric'})}</p>
                     <p className="text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="w-4 h-4" /> {eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                     </p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                   </div>
                   <div>
                     <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mb-1">Location</p>
                     <p className="font-bold text-lg">{event.location}</p>
                     <p className="text-muted-foreground">{event.country}</p>
                     <a href={`https://maps.google.com/?q=${event.location},${event.country}`} target="_blank" rel="noreferrer" className="text-accent hover:underline text-xs font-bold mt-2 inline-block">
                        VIEW ON MAP
                     </a>
                   </div>
                </div>
             </div>

             <div className="mb-8 space-y-2">
                <div className="flex justify-between items-end">
                   <span className="text-muted-foreground font-medium">Starting from</span>
                   <span className="text-4xl font-black">${event.price}</span>
                </div>
                {event.isSoldOut ? (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-destructive" />
                    <p className="text-xs font-bold text-destructive uppercase tracking-tighter">Tickets Sold Out</p>
                  </div>
                ) : !isPast && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <p className="text-xs font-bold text-accent uppercase tracking-tighter">Tickets Available</p>
                  </div>
                )}
             </div>

             <div className="flex flex-col gap-3">
                <Button 
                  size="lg" 
                  className={cn(
                    "w-full h-14 font-bold text-base rounded-full transition-all duration-300",
                    isAdded ? "bg-emerald-500 hover:bg-emerald-600 text-white" : 
                    event.isSoldOut ? "bg-muted text-muted-foreground" :
                    "bg-accent text-accent-foreground hover:brightness-110"
                  )} 
                  disabled={isPast || isAdded || event.isSoldOut}
                  onClick={handleAddToCart}
                >
                  {isPast ? "Event Ended" : event.isSoldOut ? "Tickets Sold Out" : isAdded ? "Added to Cart ✓" : "Buy Tickets"}
                </Button>
                <Button variant="outline" size="lg" className="w-full h-14 rounded-full gap-2 border-border/50 font-bold">
                  <Share className="w-4 h-4" /> Share Event
                </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
