import React, { useState, useRef, useEffect } from "react"
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom"
import { useAppContext } from "@/context/AppContext"
import { AppEvent, EventType, TicketTier } from "@/data/mockData"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus, Trash2, ChevronDown, ImageIcon, Calendar,
  MapPin, Tag, AlignLeft, Ticket, User, ArrowLeft, Save
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/* ── Constants ─────────────────────────────────────────── */
const EVENT_CATEGORIES = [
  "Concert", "Festival", "Theater", "Comedy", "Show",
  "Exhibition", "Sports", "Conference", "Dance", "Opera",
];

const EVENT_TYPES: EventType[] = ["Concert", "Festival", "Theater", "Comedy", "Show"];

const COUNTRIES = [
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "HU", name: "Hungary", flag: "🇭🇺" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "IS", name: "Iceland", flag: "🇮🇸" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
];

/* ── Types ─────────────────────────────────────────────── */
interface FormState {
  title: string;
  organizerName: string;
  category: string;
  type: EventType;
  description: string;
  date: string;
  location: string;
  country: string;
  imageUrl: string;
  isSoldOut: boolean;
}

interface TierDraft {
  id: string;
  name: string;
  price: string;
  quantity: string;
}

const emptyForm: FormState = {
  title: "",
  organizerName: "",
  category: "Concert",
  type: "Concert",
  description: "",
  date: "",
  location: "",
  country: "",
  imageUrl: "",
  isSoldOut: false,
};

const emptyTier = (): TierDraft => ({
  id: `tier-${Date.now()}-${Math.random()}`,
  name: "",
  price: "",
  quantity: "",
});

/* ── UI Components ── */
function CountryDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const filtered = COUNTRIES.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  const selected = COUNTRIES.find((c) => c.name === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-5 py-3.5 bg-secondary border border-border/50 rounded-xl text-sm font-medium transition-all hover:bg-secondary/80 text-left"
      >
        <span className={selected ? "text-foreground" : "text-muted-foreground"}>
          {selected ? `${selected.flag} ${selected.name}` : "Select country…"}
        </span>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="absolute left-0 right-0 mt-2 bg-popover border border-border shadow-2xl rounded-2xl overflow-hidden z-[100]"
          >
            <div className="p-3 border-b border-border/50">
              <input
                autoFocus
                placeholder="Search country…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div className="max-h-64 overflow-y-auto pt-1 pb-1">
              {filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => { onChange(c.name); setOpen(false); setSearch(""); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-secondary",
                    value === c.name ? "text-accent font-bold bg-accent/5" : "text-muted-foreground"
                  )}
                >
                  <span className="text-lg">{c.flag}</span>
                  <span>{c.name}</span>
                  {value === c.name && <span className="ml-auto text-xs">✓</span>}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border/40 rounded-3xl p-8 space-y-8 shadow-sm">
      <div className="flex items-center gap-3 border-b border-border/40 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <h3 className="text-lg font-black uppercase tracking-tight">{title}</h3>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{label}{required && <span className="text-accent ml-1">*</span>}</label>
      {children}
    </div>
  );
}

const inputBase = "w-full bg-secondary border border-border/50 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-muted-foreground/50";

/* ── Main Page Component ── */
export default function EventFormPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const duplicateId = searchParams.get("duplicateFrom");
  
  const { events, addEvent, updateEvent } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [tiers, setTiers] = useState<TierDraft[]>([emptyTier()]);
  const [imgPreviewError, setImgPreviewError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load data if editing or duplicating
  useEffect(() => {
    const targetId = id || duplicateId;
    if (targetId) {
      const existing = events.find(e => e.id === targetId);
      if (existing) {
        setForm({
          title: duplicateId ? `Copy of ${existing.title}` : existing.title,
          organizerName: existing.organizerName || "",
          category: existing.category || existing.type,
          type: existing.type,
          description: existing.description || "",
          date: existing.date ? new Date(existing.date).toISOString().slice(0, 16) : "",
          location: existing.location,
          country: existing.country,
          imageUrl: existing.imageUrl,
          isSoldOut: !!existing.isSoldOut,
        });
        setTiers(existing.ticketTiers?.map(t => ({
          id: `tier-${Date.now()}-${Math.random()}`,
          name: t.name,
          price: String(t.price),
          quantity: String(t.totalQuantity),
        })) || [emptyTier()]);
      }
    }
  }, [id, duplicateId, events]);

  const updateForm = (key: keyof FormState, val: string) => setForm(p => ({ ...p, [key]: val }));
  const addTier = () => setTiers(p => [...p, emptyTier()]);
  const removeTier = (id: string) => setTiers(p => p.filter(t => t.id !== id));
  const updateTier = (id: string, key: keyof TierDraft, val: string) => setTiers(p => p.map(t => t.id === id ? { ...t, [key]: val } : t));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const ticketTiers: TicketTier[] = tiers
      .filter(t => t.name.trim())
      .map(t => ({
        id: t.id,
        name: t.name,
        price: Number(t.price) || 0,
        totalQuantity: Number(t.quantity) || 0,
        soldQuantity: 0,
      }));

    const basePrice = ticketTiers.length > 0 ? Math.min(...ticketTiers.map(t => t.price)) : 0;

    const event: AppEvent = {
        id: id && !duplicateId ? id : `e${Date.now()}`,
        title: form.title,
        organizerName: form.organizerName,
        type: form.type,
        category: form.category,
        description: form.description,
        date: new Date(form.date).toISOString(),
        location: form.location,
        country: form.country,
        imageUrl: form.imageUrl || "https://images.unsplash.com/photo-1540039155733-d73070440ef4?q=80&w=800&auto=format&fit=crop",
        tags: [form.category, "Admin"],
        artists: [],
        price: basePrice,
        ticketTiers,
        isSoldOut: form.isSoldOut,
    };

    if (id && !duplicateId) {
      updateEvent(event);
    } else {
      addEvent(event);
    }

    setTimeout(() => {
      setIsSaving(false);
      navigate("/admin");
    }, 800);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
       {/* Top Nav */}
       <div className="flex items-center justify-between mb-12">
          <Link to="/admin">
            <Button variant="ghost" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full px-8 h-12 font-bold" onClick={() => navigate("/admin")}>Cancel</Button>
            <Button 
                onClick={handleSubmit} 
                disabled={isSaving}
                className="rounded-full px-12 h-12 font-black bg-accent text-accent-foreground hover:brightness-110 shadow-lg shadow-accent/20"
            >
              {isSaving ? "Saving..." : (id && !duplicateId ? "Update Event" : "Create Event")}
              {!isSaving && <Save className="ml-2 w-4 h-4" />}
            </Button>
          </div>
       </div>

       <div className="mb-12">
          <p className="text-accent font-black tracking-widest uppercase mb-2">Event Studio</p>
          <h1 className="text-5xl font-black tracking-tight">{id && !duplicateId ? "Edit Event" : "Create New Event"}</h1>
       </div>

       <form onSubmit={handleSubmit} className="space-y-10 pb-24">
          
          <Section icon={Tag} title="Essential Information">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                   <Field label="Event Title" required>
                      <input 
                        required 
                        value={form.title} 
                        onChange={e => updateForm("title", e.target.value)} 
                        placeholder="e.g. Summer Solstice Underground Night" 
                        className={inputBase} 
                      />
                   </Field>
                </div>
                <Field label="Organizer Name" required>
                   <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input 
                        required 
                        value={form.organizerName} 
                        onChange={e => updateForm("organizerName", e.target.value)} 
                        placeholder="Organization or Individual" 
                        className={cn(inputBase, "pl-12")} 
                      />
                   </div>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                   <Field label="Category">
                      <select value={form.category} onChange={e => updateForm("category", e.target.value)} className={inputBase}>
                         {EVENT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                   </Field>
                   <Field label="Type">
                      <select value={form.type} onChange={e => updateForm("type", e.target.value as EventType)} className={inputBase}>
                         {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                   </Field>
                </div>
             </div>

             <Field label="Description">
                <div className="relative">
                   <AlignLeft className="absolute left-4 top-4 w-4 h-4 text-muted-foreground" />
                   <textarea 
                     value={form.description} 
                     onChange={e => updateForm("description", e.target.value)} 
                     placeholder="Tell the world about your event..." 
                     rows={6} 
                     className={cn(inputBase, "pl-12 resize-none")} 
                   />
                </div>
             </Field>
          </Section>

          <Section icon={Calendar} title="Date & Location">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Field label="Date & Time" required>
                   <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input 
                        type="datetime-local" 
                        required 
                        value={form.date} 
                        onChange={e => updateForm("date", e.target.value)} 
                        className={cn(inputBase, "pl-12 [color-scheme:dark]")} 
                      />
                   </div>
                </Field>
                <Field label="Country" required>
                   <CountryDropdown value={form.country} onChange={v => updateForm("country", v)} />
                </Field>
                <div className="md:col-span-2">
                   <Field label="Venue Address / City" required>
                      <div className="relative">
                         <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                         <input 
                           required 
                           value={form.location} 
                           onChange={e => updateForm("location", e.target.value)} 
                           placeholder="e.g. O2 Arena, London" 
                           className={cn(inputBase, "pl-12")} 
                         />
                      </div>
                   </Field>
                </div>
             </div>
          </Section>

          <Section icon={ImageIcon} title="Visuals">
              <Field label="Featured Image URL">
                 <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                      type="url" 
                      value={form.imageUrl} 
                      onChange={e => { updateForm("imageUrl", e.target.value); setImgPreviewError(false); }} 
                      placeholder="https://images.unsplash.com/photo-..." 
                      className={cn(inputBase, "pl-12")} 
                    />
                 </div>
              </Field>
              {/* Preview Box - Fixed Bug: ensures it updates and survives errors */}
              <div className="mt-4 relative group">
                 <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-secondary border border-border/40 flex items-center justify-center">
                    {form.imageUrl && !imgPreviewError ? (
                      <img 
                        key={form.imageUrl} // Key ensures fresh load on change
                        src={form.imageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        onError={() => setImgPreviewError(true)} 
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-muted-foreground">
                         <ImageIcon className="w-12 h-12 opacity-20" />
                         <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                            {imgPreviewError ? "Failed to load image" : "Image Preview Area"}
                         </p>
                      </div>
                    )}
                 </div>
                 <div className="absolute top-4 left-4">
                    <Badge className="bg-black/80 backdrop-blur border-none font-bold">PREVIEW</Badge>
                 </div>
              </div>
          </Section>

          <Section icon={Ticket} title="Tickets & Pricing">
             <div className="space-y-4">
                {tiers.map((tier, idx) => (
                  <motion.div 
                    key={tier.id} 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex flex-wrap md:flex-nowrap items-end gap-4 p-6 bg-secondary/50 rounded-2xl border border-border/30"
                  >
                     <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Field label="Tier Name">
                           <input value={tier.name} onChange={e => updateTier(tier.id, "name", e.target.value)} placeholder="General, VIP, etc." className={inputBase} />
                        </Field>
                        <Field label="Price ($)">
                           <input type="number" value={tier.price} onChange={e => updateTier(tier.id, "price", e.target.value)} placeholder="0.00" className={inputBase} />
                        </Field>
                        <Field label="Quantity">
                           <input type="number" value={tier.quantity} onChange={e => updateTier(tier.id, "quantity", e.target.value)} placeholder="Total" className={inputBase} />
                        </Field>
                     </div>
                     {tiers.length > 1 && (
                       <Button 
                         type="button" 
                         variant="ghost" 
                         className="h-12 w-12 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                         onClick={() => removeTier(tier.id)}
                       >
                         <Trash2 className="w-5 h-5" />
                       </Button>
                     )}
                  </motion.div>
                ))}
             </div>
             <Button type="button" variant="outline" className="w-full h-14 rounded-2xl border-dashed border-2 hover:bg-accent/5 hover:border-accent/50 group" onClick={addTier}>
                <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" /> Add Another Ticket Tier
             </Button>

             <div className="pt-8 border-t border-border/30 mt-8">
                <div className="flex items-center justify-between p-6 bg-secondary/30 rounded-3xl border border-border/40">
                   <div className="space-y-1 text-left">
                      <h4 className="font-black text-sm uppercase tracking-widest">Inventory Status</h4>
                      <p className="text-xs text-muted-foreground font-medium">Manually override ticket availability</p>
                   </div>
                   <Button 
                     type="button" 
                     onClick={() => setForm(p => ({ ...p, isSoldOut: !p.isSoldOut }))}
                     variant={form.isSoldOut ? "destructive" : "outline"}
                     className={cn("rounded-full px-8 gap-2 font-black text-xs uppercase tracking-widest h-12 shadow-sm", form.isSoldOut && "shadow-lg shadow-destructive/20")}
                   >
                      <div className={cn("w-2 h-2 rounded-full", form.isSoldOut ? "bg-white" : "bg-accent animate-pulse")} />
                      {form.isSoldOut ? "Sold Out" : "Available"}
                   </Button>
                </div>
             </div>
          </Section>

       </form>
    </div>
  );
}
