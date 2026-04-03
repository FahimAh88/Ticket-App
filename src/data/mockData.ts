export type EventType = "Concert" | "Show" | "Festival" | "Theater" | "Comedy";

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  genre: string;
  bio: string;
  country: string;
  followers: string;
  socialLinks: {
    instagram?: string;
    spotify?: string;
    youtube?: string;
  };
}

export interface TicketTier {
  id: string;
  name: string;
  description?: string;
  price: number;
  totalQuantity: number;
  soldQuantity: number;
}

export interface AppEvent {
  id: string;
  title: string;
  date: string; // ISO String
  location: string;
  country: string;
  type: EventType;
  tags: string[];
  imageUrl: string;
  artists: Artist[];
  price: number;
  // Extended fields
  description?: string;
  organizerName?: string;
  category?: string;
  ticketTiers?: TicketTier[];
  isSoldOut?: boolean;
}

export const mockArtists: Artist[] = [
  {
    id: "a1",
    name: "The Lumineers",
    imageUrl: "https://images.unsplash.com/photo-1516280440502-6c3671ce716c?q=80&w=600&auto=format&fit=crop",
    genre: "Folk Rock",
    bio: "The Lumineers are an American folk rock band formed in Denver, Colorado. Known for their heartfelt storytelling and timeless acoustic sound, they have captivated millions of fans worldwide with chart-topping albums and electrifying live performances.",
    country: "USA",
    followers: "4.2M",
    socialLinks: { instagram: "#", spotify: "#", youtube: "#" },
  },
  {
    id: "a2",
    name: "Nina Simone Legacy",
    imageUrl: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600&auto=format&fit=crop",
    genre: "Jazz & Soul",
    bio: "A tribute act bringing the legendary sound of Nina Simone back to life. With rich vocals and powerful piano arrangements, this ensemble pays homage to one of the greatest voices in the history of music.",
    country: "UK",
    followers: "980K",
    socialLinks: { instagram: "#", spotify: "#" },
  },
  {
    id: "a3",
    name: "Hans Zimmer Live",
    imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=600&auto=format&fit=crop",
    genre: "Orchestral / Cinematic",
    bio: "Hans Zimmer is one of the most celebrated film composers of all time. His live tours bring together full orchestras and cutting-edge visuals to recreate the iconic soundscapes of films like Inception, The Dark Knight, and Interstellar.",
    country: "Germany",
    followers: "8.7M",
    socialLinks: { instagram: "#", spotify: "#", youtube: "#" },
  },
  {
    id: "a4",
    name: "Aurora",
    imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop",
    genre: "Indie Pop",
    bio: "Aurora is a Norwegian singer-songwriter known for her ethereal voice and emotionally charged performances. Her music blends indie pop with folk influences, creating a sound that is both otherworldly and deeply intimate.",
    country: "Norway",
    followers: "2.1M",
    socialLinks: { instagram: "#", spotify: "#", youtube: "#" },
  },
  {
    id: "a5",
    name: "Moderat",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600&auto=format&fit=crop",
    genre: "Electronic",
    bio: "Moderat is a Berlin-based electronic music supergroup formed by Modeselektor and Apparat. Their dark, brooding soundscapes and hypnotic live shows have made them one of Europe's most acclaimed electronic acts.",
    country: "Germany",
    followers: "1.5M",
    socialLinks: { instagram: "#", spotify: "#" },
  },
  {
    id: "a6",
    name: "Stromae",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    genre: "Electronic Pop",
    bio: "Stromae is a Belgian singer, rapper, and record producer known for fusing electronic music with francophone pop. His theatrical performances and socially conscious lyrics have made him a global icon.",
    country: "Belgium",
    followers: "5.3M",
    socialLinks: { instagram: "#", spotify: "#", youtube: "#" },
  },
  {
    id: "a7",
    name: "Sóley",
    imageUrl: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?q=80&w=600&auto=format&fit=crop",
    genre: "Dream Pop",
    bio: "Sóley is an Icelandic musician and visual artist whose haunting, minimalist compositions defy genre. Her delicate piano arrangements and whispered vocals create an immersive world unlike any other.",
    country: "Iceland",
    followers: "320K",
    socialLinks: { instagram: "#", spotify: "#" },
  },
  {
    id: "a8",
    name: "Bonobo",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=600&auto=format&fit=crop",
    genre: "Downtempo / Jazz",
    bio: "Bonobo, the project of British musician Simon Green, blends jazz, electronica, and world music into richly textured soundscapes. His live performances featuring a full band are heralded as some of the most immersive concert experiences available.",
    country: "UK",
    followers: "3.8M",
    socialLinks: { instagram: "#", spotify: "#", youtube: "#" },
  },
];

export const mockEvents: AppEvent[] = [
  {
    id: "e1",
    title: "Summer Solstice Concert",
    date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: "London",
    country: "UK",
    type: "Concert",
    category: "Concert",
    tags: ["Concert", "New event"],
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop",
    artists: [mockArtists[0]],
    price: 65,
    organizerName: "StageCraft Events",
    description: "Join us for an unforgettable evening under the summer sky. The Lumineers take the stage for a magical outdoor performance filled with timeless folk rock anthems.",
    ticketTiers: [
      { id: "t1", name: "General Admission", price: 65, totalQuantity: 500, soldQuantity: 312 },
      { id: "t2", name: "VIP Floor", price: 120, totalQuantity: 100, soldQuantity: 67 },
      { id: "t3", name: "Backstage Pass", price: 250, totalQuantity: 20, soldQuantity: 18 },
    ],
  },
  {
    id: "e2",
    title: "Global Sounds Festival",
    date: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Berlin",
    country: "Germany",
    type: "Festival",
    category: "Festival",
    tags: ["Festival"],
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    artists: [mockArtists[1], mockArtists[0]],
    price: 120,
    organizerName: "Klang Berlin",
    description: "A two-day celebration of global music, culture, and art. Featuring world-class acts from across every continent, this is Berlin's biggest annual music gathering.",
    ticketTiers: [
      { id: "t1", name: "Day Pass", price: 75, totalQuantity: 2000, soldQuantity: 1430 },
      { id: "t2", name: "Weekend Pass", price: 120, totalQuantity: 1000, soldQuantity: 812 },
      { id: "t3", name: "VIP Weekend", price: 250, totalQuantity: 200, soldQuantity: 143 },
    ],
  },
  {
    id: "e3",
    title: "Orchestral Masterpieces",
    date: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Vienna",
    country: "Austria",
    type: "Theater",
    category: "Concert",
    tags: ["Classical", "New event"],
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop",
    artists: [mockArtists[2]],
    price: 90,
    organizerName: "Wiener Klassik GmbH",
    description: "Hans Zimmer brings his legendary cinematic compositions to life with a full symphony orchestra at the majestic Vienna Concert House. Experience the music of Inception, Gladiator, and more.",
    ticketTiers: [
      { id: "t1", name: "Stalls", price: 90, totalQuantity: 400, soldQuantity: 278 },
      { id: "t2", name: "Grand Circle", price: 150, totalQuantity: 150, soldQuantity: 89 },
      { id: "t3", name: "Royal Box", price: 350, totalQuantity: 20, soldQuantity: 14 },
    ],
  },
  {
    id: "e4",
    title: "Northern Lights Session",
    date: new Date(new Date().getTime() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Oslo",
    country: "Norway",
    type: "Concert",
    category: "Concert",
    tags: ["Concert", "Indie"],
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop",
    artists: [mockArtists[3]],
    price: 75,
    organizerName: "Nordic Stage",
    description: "Aurora performs her ethereal indie-folk magic in Oslo, her home city, for an intimate and breathtaking evening of music under the northern sky.",
    ticketTiers: [
      { id: "t1", name: "General", price: 75, totalQuantity: 300, soldQuantity: 201 },
      { id: "t2", name: "Premium", price: 130, totalQuantity: 80, soldQuantity: 55 },
    ],
  },
  {
    id: "e5",
    title: "Berlin Techno Nights",
    date: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Berlin",
    country: "Germany",
    type: "Show",
    category: "Show",
    tags: ["Electronic", "New event"],
    imageUrl: "https://images.unsplash.com/photo-1571151489861-7b93b69da5b0?q=80&w=800&auto=format&fit=crop",
    artists: [mockArtists[4]],
    price: 55,
    organizerName: "Berghain Collective",
    description: "Moderat takes over Berlin's most iconic electronic music venue for a night of pulsating beats, immersive visuals, and raw energy.",
    ticketTiers: [
      { id: "t1", name: "Standard", price: 55, totalQuantity: 800, soldQuantity: 602 },
    ],
  },
  {
    id: "e6",
    title: "Papier Café Live",
    date: new Date(new Date().getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Brussels",
    country: "Belgium",
    type: "Concert",
    category: "Concert",
    tags: ["Concert", "French Pop"],
    imageUrl: "https://images.unsplash.com/photo-1540039155733-d73070440ef4?q=80&w=800&auto=format&fit=crop",
    artists: [mockArtists[5]],
    price: 85,
    organizerName: "Stromae Productions",
    description: "Stromae returns to his home country for a stunning live show blending electronic beats with his signature theatrical flair. An unmissable night for any fan.",
    ticketTiers: [
      { id: "t1", name: "General", price: 85, totalQuantity: 600, soldQuantity: 441 },
      { id: "t2", name: "VIP Lounge", price: 180, totalQuantity: 60, soldQuantity: 38 },
    ],
  },
  {
    id: "e7",
    title: "Midnight Drift",
    date: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Amsterdam",
    country: "Netherlands",
    type: "Concert",
    category: "Concert",
    tags: ["Downtempo", "Jazz"],
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    artists: [mockArtists[7]],
    price: 70,
    organizerName: "Paradiso Events",
    description: "Bonobo and his full live band bring their cinematic downtempo soundscapes to Amsterdam's legendary Paradiso venue for a sold-out night of musical bliss.",
    isSoldOut: true,
    ticketTiers: [
      { id: "t1", name: "Standing", price: 70, totalQuantity: 700, soldQuantity: 700 },
      { id: "t2", name: "Seated Balcony", price: 110, totalQuantity: 100, soldQuantity: 100 },
    ],
  },
];
