import { useAppContext } from "@/context/AppContext"
import EventCard from "@/components/domain/EventCard"

export default function AllEvents() {
  const { events } = useAppContext()

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">All Events</h1>
        <p className="text-muted-foreground text-lg">Explore all upcoming events globally.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      
      {events.length === 0 && (
        <div className="text-center py-24 text-muted-foreground">
          No events found.
        </div>
      )}
    </div>
  )
}
