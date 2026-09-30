import { db } from '@/lib/db'

// Wedding vendor marketplace seed data
// Pakistani context: Lahore, Karachi, Islamabad, Faisalabad

const CATEGORIES = [
  { name: 'Photographers & Videographers', slug: 'photographers', icon: 'Camera', description: 'Capture every moment — baraat, rukhsati, mehndi, valima.', imageUrl: '/vendors/cat-photographer.jpg' },
  { name: 'Decorators', slug: 'decorators', icon: 'Flower2', description: 'Stage, florals, lighting, mandap & full venue transformation.', imageUrl: '/vendors/cat-decorator.jpg' },
  { name: 'Caterers', slug: 'caterers', icon: 'UtensilsCrossed', description: 'Biryani, BBQ, desi feast & live counters for any guest count.', imageUrl: '/vendors/cat-caterer.jpg' },
  { name: 'Bridal Makeup Artists', slug: 'makeup', icon: 'Sparkles', description: 'Bridal glam, party makeup & trials by top MUAs.', imageUrl: '/vendors/cat-makeup.jpg' },
  { name: 'Venues & Banquet Halls', slug: 'venues', icon: 'Building2', description: 'Banquet halls, farmhouses, lawns & marquees.', imageUrl: '/vendors/cat-venue.jpg' },
  { name: 'DJ & Sound', slug: 'dj', icon: 'Music', description: 'Dholki nights, baraat DJ, sound & lighting rigs.', imageUrl: '/vendors/cat-dj.jpg' },
  { name: 'Mehndi Artists', slug: 'mehndi', icon: 'Brush', description: 'Intricate bridal & party henna, Arabic & Mughal styles.', imageUrl: '/vendors/cat-mehndi.jpg' },
  { name: 'Invitation Cards', slug: 'invitations', icon: 'Mail', description: 'Luxury wedding cards, digital invites & box invitations.', imageUrl: '/vendors/cat-invitations.jpg' },
]

const CITIES = [
  { name: 'Lahore', slug: 'lahore' },
  { name: 'Karachi', slug: 'karachi' },
  { name: 'Islamabad', slug: 'islamabad' },
  { name: 'Faisalabad', slug: 'faisalabad' },
]

type VendorSeed = {
  businessName: string
  slug: string
  category: string
  city: string
  area: string
  description: string
  shortDescription: string
  coverImage: string
  gallery: string[]
  startingPrice: number
  priceMax: number
  rating: number
  reviewCount: number
  bookingCount: number
  responseTime: string
  yearsActive: number
  verified: boolean
  featured: boolean
  premium: boolean
  tags: string[]
  services: string[]
  teamSize: string
  phone: string
  whatsapp: string
  instagram: string
  address: string
}

const VENDORS: VendorSeed[] = [
  // ===== PHOTOGRAPHERS =====
  {
    businessName: 'Lens & Light Studios',
    slug: 'lens-and-light-studios',
    category: 'photographers',
    city: 'Lahore',
    area: 'Gulberg III',
    description: 'Lens & Light Studios is Lahore\'s premier wedding photography collective, capturing candid love stories with cinematic flair. From the dholki beats to the rukhsati tears, we frame every emotion. Our team of 5 photographers and 2 cinematographers covers baraat, mehndi, valima and nikah with both traditional and documentary styles.',
    shortDescription: 'Cinematic wedding photography & film in Lahore — candid, timeless, you.',
    coverImage: '/vendors/photo-1.jpg',
    gallery: ['/vendors/photo-1.jpg', '/vendors/photo-2.jpg', '/vendors/photo-3.jpg'],
    startingPrice: 75000,
    priceMax: 350000,
    rating: 4.9,
    reviewCount: 187,
    bookingCount: 234,
    responseTime: '~2 hours',
    yearsActive: 8,
    verified: true,
    featured: true,
    premium: true,
    tags: ['Cinematic', 'Candid', 'Pre-wedding', 'Drone', 'Same-day edit'],
    services: ['Baraat coverage', 'Mehndi function', 'Valima', 'Pre-wedding shoot', 'Cinematic film', 'Drone shots'],
    teamSize: '7 people',
    phone: '+92 300 1234567',
    whatsapp: '+92 300 1234567',
    instagram: '@lensandlight',
    address: 'M M Alam Road, Gulberg III, Lahore',
  },
  {
    businessName: 'Aap Ki Kahani Films',
    slug: 'aap-ki-kahani-films',
    category: 'photographers',
    city: 'Karachi',
    area: 'DHA Phase 6',
    description: 'Aap Ki Kahani Films — Karachi\'s storytelling wedding cinema. We believe every shaadi is a film waiting to be told. Specializing in documentary-style coverage that captures the real, unscripted moments. Award-winning team featured in Bridal Asia and Hum TV weddings.',
    shortDescription: 'Award-winning wedding cinema in Karachi — your story, our lens.',
    coverImage: '/vendors/photo-2.jpg',
    gallery: ['/vendors/photo-2.jpg', '/vendors/photo-3.jpg', '/vendors/photo-1.jpg'],
    startingPrice: 120000,
    priceMax: 600000,
    rating: 4.8,
    reviewCount: 142,
    bookingCount: 178,
    responseTime: '~3 hours',
    yearsActive: 6,
    verified: true,
    featured: true,
    premium: false,
    tags: ['Documentary', 'Cinematic film', 'Editorial', 'Same-day teaser'],
    services: ['Full wedding film', 'Baraat', 'Mehndi', 'Pre-wedding', 'Teaser in 24h'],
    teamSize: '4 people',
    phone: '+92 321 9876543',
    whatsapp: '+92 321 9876543',
    instagram: '@aapkikahani',
    address: 'Khayaban-e-Bukhari, DHA Phase 6, Karachi',
  },
  {
    businessName: 'Subh Shaam Photography',
    slug: 'subh-shaam-photography',
    category: 'photographers',
    city: 'Islamabad',
    area: 'F-7 Markaz',
    description: 'Subh Shaam Photography captures Islamabad weddings from dawn (subh) to night (shaam). Specializing in natural light, scenic Margalla backdrop shoots, and intimate nikah ceremonies. Perfect for couples wanting elegant, minimal, timeless imagery.',
    shortDescription: 'Natural-light wedding photography in Islamabad — elegant & timeless.',
    coverImage: '/vendors/photo-3.jpg',
    gallery: ['/vendors/photo-3.jpg', '/vendors/photo-1.jpg', '/vendors/photo-2.jpg'],
    startingPrice: 55000,
    priceMax: 250000,
    rating: 4.7,
    reviewCount: 89,
    bookingCount: 121,
    responseTime: '~5 hours',
    yearsActive: 5,
    verified: true,
    featured: false,
    premium: false,
    tags: ['Natural light', 'Minimal', 'Nikah', 'Margalla shoots'],
    services: ['Nikah coverage', 'Pre-wedding', 'Valima', 'Portrait sessions'],
    teamSize: '3 people',
    phone: '+92 333 5555199',
    whatsapp: '+92 333 5555199',
    instagram: '@subhshaam',
    address: 'F-7 Markaz, Islamabad',
  },
  {
    businessName: 'Click Studio Faisalabad',
    slug: 'click-studio-faisalabad',
    category: 'photographers',
    city: 'Faisalabad',
    area: 'D Ground',
    description: 'Faisalabad\'s trusted wedding photographers since 2014. Specializing in traditional Punjabi wedding coverage with vibrant colors, energetic baraat entry shots, and full family portraits. Affordable packages for every budget.',
    shortDescription: 'Trusted Faisalabad wedding photographers — vibrant, traditional, affordable.',
    coverImage: '/vendors/photo-1.jpg',
    gallery: ['/vendors/photo-1.jpg', '/vendors/photo-3.jpg', '/vendors/photo-2.jpg'],
    startingPrice: 40000,
    priceMax: 180000,
    rating: 4.6,
    reviewCount: 64,
    bookingCount: 92,
    responseTime: '~4 hours',
    yearsActive: 10,
    verified: false,
    featured: false,
    premium: false,
    tags: ['Traditional', 'Budget-friendly', 'Punjabi weddings', 'Family portraits'],
    services: ['Baraat', 'Mehndi', 'Valima', 'Studio portraits'],
    teamSize: '2 people',
    phone: '+92 300 4441188',
    whatsapp: '+92 300 4441188',
    instagram: '@clickstudiofsd',
    address: 'D Ground, People Colony, Faisalabad',
  },

  // ===== DECORATORS =====
  {
    businessName: 'Marigold & Maroon Decor',
    slug: 'marigold-and-maroon-decor',
    category: 'decorators',
    city: 'Lahore',
    area: 'Johar Town',
    description: 'Marigold & Maroon Decor transforms venues into dreamscapes. Specializing in stage design, floral arches, maroon-and-cream color palettes, and full venue transformation. From intimate nikah to grand 1000-guest valima, we bring your moodboard to life.',
    shortDescription: 'Lahore\'s signature wedding decor — stage, florals & full venue magic.',
    coverImage: '/vendors/decor-1.jpg',
    gallery: ['/vendors/decor-1.jpg', '/vendors/decor-2.jpg', '/vendors/decor-3.jpg'],
    startingPrice: 85000,
    priceMax: 800000,
    rating: 4.9,
    reviewCount: 156,
    bookingCount: 198,
    responseTime: '~1 hour',
    yearsActive: 9,
    verified: true,
    featured: true,
    premium: true,
    tags: ['Stage design', 'Florals', 'Lighting', 'Marigold', 'Mandap'],
    services: ['Stage decor', 'Entrance arch', 'Table centerpieces', 'Lighting', 'Full venue theme'],
    teamSize: '15 people',
    phone: '+92 300 2222333',
    whatsapp: '+92 300 2222333',
    instagram: '@marigoldmaroon',
    address: 'Johar Town Block H, Lahore',
  },
  {
    businessName: 'Dholki Nights Decor Co.',
    slug: 'dholki-nights-decor-co',
    category: 'decorators',
    city: 'Karachi',
    area: 'Clifton',
    description: 'Dholki Nights Decor Co. brings the festive mehndi function to life. Vibrant marigold strings, dholki centerpieces, yellow-orange-magenta color play, and traditional jhoomar lighting. Karachi\'s go-to for fun, colorful mehndi & dholki setups.',
    shortDescription: 'Karachi\'s mehndi & dholki decor specialists — vibrant, festive, fun.',
    coverImage: '/vendors/decor-2.jpg',
    gallery: ['/vendors/decor-2.jpg', '/vendors/decor-1.jpg', '/vendors/decor-3.jpg'],
    startingPrice: 45000,
    priceMax: 300000,
    rating: 4.7,
    reviewCount: 98,
    bookingCount: 134,
    responseTime: '~2 hours',
    yearsActive: 4,
    verified: true,
    featured: false,
    premium: false,
    tags: ['Mehndi setup', 'Marigold', 'Dholki', 'Traditional'],
    services: ['Mehndi decor', 'Dholki setup', 'Sehra', 'Haldi decor'],
    teamSize: '8 people',
    phone: '+92 311 5555666',
    whatsapp: '+92 311 5555666',
    instagram: '@dholkinights',
    address: 'Zamzama Boulevard, Clifton, Karachi',
  },
  {
    businessName: 'Petals & Drapes Islamabad',
    slug: 'petals-and-drapes-islamabad',
    category: 'decorators',
    city: 'Islamabad',
    area: 'Blue Area',
    description: 'Petals & Drapes — Islamabad\'s elegant wedding decor studio. Minimal-chic stage designs, pastel florals, and bespoke themed setups. Perfect for couples wanting modern, refined, Instagram-worthy aesthetics.',
    shortDescription: 'Islamabad\'s modern wedding decor — minimal, chic, bespoke.',
    coverImage: '/vendors/decor-3.jpg',
    gallery: ['/vendors/decor-3.jpg', '/vendors/decor-1.jpg', '/vendors/decor-2.jpg'],
    startingPrice: 95000,
    priceMax: 700000,
    rating: 4.8,
    reviewCount: 76,
    bookingCount: 88,
    responseTime: '~3 hours',
    yearsActive: 5,
    verified: true,
    featured: true,
    premium: false,
    tags: ['Modern', 'Pastel', 'Bespoke', 'Minimal-chic'],
    services: ['Stage design', 'Florals', 'Table styling', 'Themed setup'],
    teamSize: '10 people',
    phone: '+92 345 7777888',
    whatsapp: '+92 345 7777888',
    instagram: '@petalsanddrapes',
    address: 'Blue Area, F-7, Islamabad',
  },

  // ===== CATERERS =====
  {
    businessName: 'Desi Dastarkhwan Caterers',
    slug: 'desi-dastarkhwan-caterers',
    category: 'caterers',
    city: 'Lahore',
    area: 'Model Town',
    description: 'Desi Dastarkhwan — Lahore\'s most-loved wedding caterers. Famous for authentic Lahori biryani, seekh kebabs, nihari, and live BBQ counters. Serving 100 to 5000 guests. Hygienic kitchen, trained waitstaff, and full setup included.',
    shortDescription: 'Lahore\'s beloved biryani & BBQ caterers — 100 to 5000 guests.',
    coverImage: '/vendors/food-1.jpg',
    gallery: ['/vendors/food-1.jpg', '/vendors/food-2.jpg'],
    startingPrice: 650,
    priceMax: 2500,
    rating: 4.8,
    reviewCount: 211,
    bookingCount: 312,
    responseTime: '~1 hour',
    yearsActive: 12,
    verified: true,
    featured: true,
    premium: true,
    tags: ['Biryani', 'BBQ', 'Live counters', 'Nihari', '5000+ guests'],
    services: ['Main course', 'BBQ station', 'Dessert', 'Live cooking', 'Waitstaff', 'Crockery setup'],
    teamSize: '50+ people',
    phone: '+92 300 9999000',
    whatsapp: '+92 300 9999000',
    instagram: '@desidastarkhwan',
    address: 'Model Town Link Road, Lahore',
  },
  {
    businessName: 'Karachi Kitchen Catering',
    slug: 'karachi-kitchen-catering',
    category: 'caterers',
    city: 'Karachi',
    area: 'Bahadurabad',
    description: 'Karachi Kitchen — biryani that made Karachi famous. Authentic Sindhi biryani, korma, shami kebabs, and a legendary dessert spread. Specialty in sea-food counters and BBQ. Buffet & sit-down service available.',
    shortDescription: 'Karachi\'s legendary biryani caterers — seafood, BBQ & full buffet.',
    coverImage: '/vendors/food-2.jpg',
    gallery: ['/vendors/food-2.jpg', '/vendors/food-1.jpg'],
    startingPrice: 700,
    priceMax: 3000,
    rating: 4.7,
    reviewCount: 174,
    bookingCount: 245,
    responseTime: '~2 hours',
    yearsActive: 8,
    verified: true,
    featured: false,
    premium: false,
    tags: ['Sindhi biryani', 'Seafood', 'Shami kebab', 'Buffet'],
    services: ['Main course', 'Seafood counter', 'Dessert', 'BBQ', 'Buffet setup'],
    teamSize: '40+ people',
    phone: '+92 321 1111222',
    whatsapp: '+92 321 1111222',
    instagram: '@karachikitchen',
    address: 'Bahadurabad Chowrangi, Karachi',
  },

  // ===== BRIDAL MAKEUP =====
  {
    businessName: 'Glow by Ayesha MUA',
    slug: 'glow-by-ayesha-mua',
    category: 'makeup',
    city: 'Lahore',
    area: 'Gulberg V',
    description: 'Glow by Ayesha — Lahore\'s bridal makeup queen. HD bridal glam, airbrush base, flawless dewy finish that lasts through rukhsati tears and valima dances. Trial sessions included. Featured in Hello Pakistan & Sunday magazines.',
    shortDescription: 'Lahore\'s bridal makeup queen — HD glam that lasts all day.',
    coverImage: '/vendors/makeup-1.jpg',
    gallery: ['/vendors/makeup-1.jpg', '/vendors/makeup-2.jpg'],
    startingPrice: 25000,
    priceMax: 150000,
    rating: 4.9,
    reviewCount: 234,
    bookingCount: 198,
    responseTime: '~30 mins',
    yearsActive: 7,
    verified: true,
    featured: true,
    premium: true,
    tags: ['HD glam', 'Airbrush', 'Dewy finish', 'Trial included', 'Bridal'],
    services: ['Bridal makeup', 'Party makeup', 'Trial session', 'Hair styling', 'Draping'],
    teamSize: '4 people',
    phone: '+92 300 5555444',
    whatsapp: '+92 300 5555444',
    instagram: '@glowbyayesha',
    address: 'Gulberg V, Lahore',
  },
  {
    businessName: 'Radiance Bridal Studio',
    slug: 'radiance-bridal-studio',
    category: 'makeup',
    city: 'Karachi',
    area: 'Tariq Road',
    description: 'Radiance Bridal Studio — Karachi\'s trusted bridal makeup since 2015. From soft glam to full editorial, our MUAs tailor each look to your outfit & features. Premium products, hygienic brushes, and on-location service available across Karachi.',
    shortDescription: 'Karachi\'s trusted bridal studio — soft glam to full editorial.',
    coverImage: '/vendors/makeup-2.jpg',
    gallery: ['/vendors/makeup-2.jpg', '/vendors/makeup-1.jpg'],
    startingPrice: 18000,
    priceMax: 100000,
    rating: 4.7,
    reviewCount: 132,
    bookingCount: 167,
    responseTime: '~1 hour',
    yearsActive: 9,
    verified: true,
    featured: false,
    premium: false,
    tags: ['Soft glam', 'Editorial', 'On-location', 'Premium products'],
    services: ['Bridal makeup', 'Party makeup', 'On-location', 'Hair', 'Draping'],
    teamSize: '3 people',
    phone: '+92 333 7777000',
    whatsapp: '+92 333 7777000',
    instagram: '@radiancebridal',
    address: 'Tariq Road, PECHS, Karachi',
  },

  // ===== VENUES =====
  {
    businessName: 'The Grand Marquee Lahore',
    slug: 'the-grand-marquee-lahore',
    category: 'venues',
    city: 'Lahore',
    area: 'Raiwind Road',
    description: 'The Grand Marquee — Lahore\'s most prestigious wedding venue. Capacity 1500 guests, grand chandeliers, in-house decor team, ample parking, and AC halls. Perfect for baraat, mehndi, valima all under one roof.',
    shortDescription: 'Lahore\'s prestigious marquee — 1500 guests, grand chandeliers, AC.',
    coverImage: '/vendors/venue-1.jpg',
    gallery: ['/vendors/venue-1.jpg', '/vendors/venue-2.jpg'],
    startingPrice: 250000,
    priceMax: 1500000,
    rating: 4.6,
    reviewCount: 89,
    bookingCount: 112,
    responseTime: '~2 hours',
    yearsActive: 6,
    verified: true,
    featured: true,
    premium: true,
    tags: ['1500 capacity', 'AC hall', 'Parking', 'In-house decor'],
    services: ['Hall rental', 'In-house decor', 'Catering tie-ups', 'Bridal room', 'Valet parking'],
    teamSize: '30+ staff',
    phone: '+92 42 3545678',
    whatsapp: '+92 300 3545678',
    instagram: '@grandmarqueelhr',
    address: 'Raiwind Road, Lahore',
  },
  {
    businessName: 'Royal Garden Lawns Islamabad',
    slug: 'royal-garden-lawns-islamabad',
    category: 'venues',
    city: 'Islamabad',
    area: 'Bani Gala',
    description: 'Royal Garden Lawns — Islamabad\'s premier outdoor wedding venue. Sprawling lawns against Margalla backdrop, capacity 2000, in-house marquees, and backup indoor hall. Ideal for summer evening weddings.',
    shortDescription: 'Islamabad\'s premier lawns — Margalla views, 2000 capacity.',
    coverImage: '/vendors/venue-2.jpg',
    gallery: ['/vendors/venue-2.jpg', '/vendors/venue-1.jpg'],
    startingPrice: 300000,
    priceMax: 2000000,
    rating: 4.7,
    reviewCount: 67,
    bookingCount: 84,
    responseTime: '~3 hours',
    yearsActive: 5,
    verified: true,
    featured: false,
    premium: true,
    tags: ['Outdoor lawns', '2000 capacity', 'Margalla view', 'Marquee backup'],
    services: ['Lawn rental', 'Marquee setup', 'Bridal room', 'Parking', 'Security'],
    teamSize: '25+ staff',
    phone: '+92 51 2345678',
    whatsapp: '+92 300 2345678',
    instagram: '@royalgardenlawns',
    address: 'Bani Gala, Islamabad',
  },

  // ===== DJ & SOUND =====
  {
    businessName: 'Beat Drop DJs Lahore',
    slug: 'beat-drop-djs-lahore',
    category: 'dj',
    city: 'Lahore',
    area: 'DHA Phase 5',
    description: 'Beat Drop DJs — Lahore\'s wedding party starters. Professional DJ team with vast desi + Bollywood + EDM library, full sound system, intelligent lighting, and fog machines. Dholki nights, baraat entry, and valima dance floor covered.',
    shortDescription: 'Lahore\'s wedding party DJs — desi, Bollywood, EDM & lighting.',
    coverImage: '/vendors/dj-1.jpg',
    gallery: ['/vendors/dj-1.jpg'],
    startingPrice: 35000,
    priceMax: 150000,
    rating: 4.8,
    reviewCount: 121,
    bookingCount: 156,
    responseTime: '~1 hour',
    yearsActive: 6,
    verified: true,
    featured: true,
    premium: false,
    tags: ['Desi', 'Bollywood', 'EDM', 'Lighting', 'Sound system'],
    services: ['DJ set', 'Sound system', 'Lighting', 'Fog machine', 'MC services'],
    teamSize: '3 people',
    phone: '+92 321 4444111',
    whatsapp: '+92 321 4444111',
    instagram: '@beatdropdjs',
    address: 'DHA Phase 5, Lahore',
  },

  // ===== MEHNDI ARTISTS =====
  {
    businessName: 'Henna by Hira',
    slug: 'henna-by-hira',
    category: 'mehndi',
    city: 'Karachi',
    area: 'North Nazimabad',
    description: 'Henna by Hira — Karachi\'s most intricate mehndi artist. Specializing in bridal henna: Arabic, Mughal, Indian, and fusion styles. Each design is bespoke and can take 4-8 hours for full bridal coverage. Organic henna for deep, lasting stain.',
    shortDescription: 'Karachi\'s intricate bridal henna — Arabic, Mughal & fusion styles.',
    coverImage: '/vendors/mehndi-1.jpg',
    gallery: ['/vendors/mehndi-1.jpg'],
    startingPrice: 8000,
    priceMax: 50000,
    rating: 4.9,
    reviewCount: 167,
    bookingCount: 143,
    responseTime: '~2 hours',
    yearsActive: 8,
    verified: true,
    featured: true,
    premium: true,
    tags: ['Bridal henna', 'Arabic', 'Mughal', 'Organic henna', 'Bespoke'],
    services: ['Bridal henna', 'Party henna', 'Family henna', 'On-location', 'Custom designs'],
    teamSize: 'Solo + 2 assistants',
    phone: '+92 333 8888999',
    whatsapp: '+92 333 8888999',
    instagram: '@hennabyhira',
    address: 'North Nazimabad, Block H, Karachi',
  },
  {
    businessName: 'Mehndi by Mehwish',
    slug: 'mehndi-by-mehwish',
    category: 'mehndi',
    city: 'Lahore',
    area: 'Cantt',
    description: 'Mehndi by Mehwish — Lahore\'s beloved henna artist. Quick yet beautiful designs for mehndi functions, dholki nights, and bridal. Affordable packages for whole family. Arabic and modern minimalist styles a specialty.',
    shortDescription: 'Lahore\'s beloved henna artist — beautiful, affordable, fast.',
    coverImage: '/vendors/mehndi-1.jpg',
    gallery: ['/vendors/mehndi-1.jpg'],
    startingPrice: 3000,
    priceMax: 25000,
    rating: 4.6,
    reviewCount: 89,
    bookingCount: 112,
    responseTime: '~4 hours',
    yearsActive: 5,
    verified: false,
    featured: false,
    premium: false,
    tags: ['Affordable', 'Arabic', 'Minimalist', 'Family packages'],
    services: ['Bridal henna', 'Party henna', 'Family henna', 'Quick designs'],
    teamSize: 'Solo + 1 assistant',
    phone: '+92 300 1212344',
    whatsapp: '+92 300 1212344',
    instagram: '@mehndibymehwish',
    address: 'Cantt, Lahore',
  },

  // ===== INVITATION CARDS =====
  {
    businessName: 'Royal Cards & Invites',
    slug: 'royal-cards-and-invites',
    category: 'invitations',
    city: 'Lahore',
    area: 'Anarkali',
    description: 'Royal Cards & Invites — crafting heirloom wedding invitations since 1985. Foil printing, laser-cut, box invitations, and digital invites. Each set is bespoke-designed with your monogram and wedding colors. Bulk discounts available.',
    shortDescription: 'Lahore\'s heirloom wedding invitations — foil, laser-cut & box invites.',
    coverImage: '/vendors/cat-invitations.jpg',
    gallery: ['/vendors/cat-invitations.jpg'],
    startingPrice: 150,
    priceMax: 1500,
    rating: 4.7,
    reviewCount: 76,
    bookingCount: 98,
    responseTime: '~5 hours',
    yearsActive: 39,
    verified: true,
    featured: false,
    premium: false,
    tags: ['Foil printing', 'Laser-cut', 'Box invites', 'Digital invites', 'Monogram'],
    services: ['Card design', 'Foil printing', 'Box invitations', 'Digital invites', 'RSVP cards'],
    teamSize: '12 people',
    phone: '+92 42 3712345',
    whatsapp: '+92 300 3712345',
    instagram: '@royalcardslhr',
    address: 'Anarkali Main Bazaar, Lahore',
  },
]

const PACKAGES = [
  // Lens & Light Studios
  { vendorSlug: 'lens-and-light-studios', name: 'Nikah Essential', description: 'Perfect for intimate nikah ceremonies. 4 hours coverage, 1 photographer, 200+ edited photos.', price: 75000, duration: '4 hours', features: ['1 photographer', '200+ edited photos', 'Online gallery', 'Delivery in 14 days'], popular: false },
  { vendorSlug: 'lens-and-light-studios', name: 'Baraat Premium', description: 'Full baraat coverage with cinematic film. Most popular package.', price: 175000, duration: '10 hours', features: ['2 photographers', '1 cinematographer', 'Cinematic film (3-5 min)', '500+ edited photos', 'Drone shots', 'Same-day teaser'], popular: true },
  { vendorSlug: 'lens-and-light-studios', name: 'Full Wedding', description: 'Complete 3-day coverage — mehndi, baraat, valima. The full story.', price: 350000, duration: '3 days', features: ['3 photographers', '2 cinematographers', 'Full wedding film', '1000+ edited photos', 'Pre-wedding shoot', 'Premium album', 'Drone shots'], popular: false },
  // Aap Ki Kahani Films
  { vendorSlug: 'aap-ki-kahani-films', name: 'Documentary Baraat', description: 'Story-driven documentary coverage of your baraat with cinematic film.', price: 180000, duration: '10 hours', features: ['2 cinematographers', 'Cinematic film', '400+ photos', 'Story consultation', 'Same-day teaser'], popular: true },
  { vendorSlug: 'aap-ki-kahani-films', name: 'Wedding Film Suite', description: 'Full 3-day wedding film — mehndi, baraat, valima. Award-winning storytelling.', price: 600000, duration: '3 days', features: ['4-person team', 'Full wedding film (10-15 min)', '800+ photos', 'Pre-wedding film', 'Director consultation', 'Premium album'], popular: false },
  // Marigold & Maroon Decor
  { vendorSlug: 'marigold-and-maroon-decor', name: 'Stage Essential', description: 'Beautiful stage backdrop + entrance arch for intimate weddings.', price: 85000, duration: '1 day setup', features: ['Stage backdrop (20ft)', 'Entrance arch', 'Flower arrangements', 'Basic lighting', 'Draping'], popular: false },
  { vendorSlug: 'marigold-and-maroon-decor', name: 'Full Venue Premium', description: 'Complete venue transformation — most popular for grand weddings.', price: 350000, duration: '2 day setup', features: ['Stage design (40ft)', 'Full entrance', 'Table centerpieces', 'Premium lighting', 'Florals throughout', 'Ceiling drapes'], popular: true },
  { vendorSlug: 'marigold-and-maroon-decor', name: 'Luxury Signature', description: 'Bespoke designer wedding with imported florals and grand installations.', price: 800000, duration: '3 day setup', features: ['Bespoke stage', 'Grand entrance', 'Imported florals', 'Designer lighting', 'Lounge furniture', 'Custom installations'], popular: false },
  // Desi Dastarkhwan Caterers
  { vendorSlug: 'desi-dastarkhwan-caterers', name: 'Buffet Essential', description: 'Per plate — biryani, 2 curries, naan, salad, dessert.', price: 650, duration: 'Per guest', features: ['Biryani', '2 curries', 'Naan/roti', 'Salad', 'Dessert', 'Crockery & waitstaff'], popular: true },
  { vendorSlug: 'desi-dastarkhwan-caterers', name: 'BBQ Premium', description: 'Per plate — adds live BBQ counter, kebabs, and extra desserts.', price: 1200, duration: 'Per guest', features: ['Everything in Essential', 'Live BBQ counter', 'Seekh & chapli kebab', 'Extra desserts', 'Welcome drinks'], popular: false },
  { vendorSlug: 'desi-dastarkhwan-caterers', name: 'Royal Feast', description: 'Per plate — full luxury spread with 12+ items and live counters.', price: 2500, duration: 'Per guest', features: ['12+ dishes', '3 live counters', 'Seafood station', 'Premium desserts', 'Welcome drinks', 'Premium crockery'], popular: false },
  // Glow by Ayesha MUA
  { vendorSlug: 'glow-by-ayesha-mua', name: 'Party Glam', description: 'Party makeup with hair styling and draping.', price: 25000, duration: '2 hours', features: ['HD makeup', 'Hair styling', 'Draping', 'False lashes'], popular: false },
  { vendorSlug: 'glow-by-ayesha-mua', name: 'Bridal Premium', description: 'Full bridal package with trial. Most popular for brides.', price: 85000, duration: '4-5 hours', features: ['HD bridal glam', 'Trial session', 'Hair styling', 'Draping', 'Touch-up kit', 'Sister/mother discount'], popular: true },
  { vendorSlug: 'glow-by-ayesha-mua', name: 'Bridal Luxury', description: 'Premium bridal with airbrush, 2 looks, and all-day touch-ups.', price: 150000, duration: '6 hours', features: ['Airbrush base', '2 looks (mehndi + baraat)', 'On-location', 'All-day touch-up artist', 'Hair & draping', 'Premium products'], popular: false },
  // The Grand Marquee
  { vendorSlug: 'the-grand-marquee-lahore', name: 'Hall Rental', description: 'Marquee hall rental for one function. Up to 1500 guests.', price: 250000, duration: '1 day', features: ['Hall rental', 'AC', 'Parking', 'Basic lighting', 'Bridal room'], popular: true },
  { vendorSlug: 'the-grand-marquee-lahore', name: 'Premium Package', description: 'Hall + in-house decor + lighting. Turnkey wedding venue.', price: 700000, duration: '1 day', features: ['Hall rental', 'In-house stage decor', 'Premium lighting', 'Bridal room', 'Valet parking', 'Welcome desk'], popular: false },
  // Beat Drop DJs
  { vendorSlug: 'beat-drop-djs-lahore', name: 'Dholki DJ', description: 'DJ for dholki/mehndi night. 4 hours, basic sound + lighting.', price: 35000, duration: '4 hours', features: ['DJ', 'Basic sound system', 'Basic lighting', 'Desi + Bollywood mix'], popular: false },
  { vendorSlug: 'beat-drop-djs-lahore', name: 'Baraat Premium', description: 'Full baraat DJ with intelligent lighting. Most booked.', price: 75000, duration: '8 hours', features: ['DJ + MC', 'Full sound system', 'Intelligent lighting', 'Fog machine', 'Custom playlist', 'Groom entry mix'], popular: true },
  // Henna by Hira
  { vendorSlug: 'henna-by-hira', name: 'Party Henna', description: 'Quick beautiful henna for dholki/mehndi guests.', price: 8000, duration: '30 mins', features: ['Per person', 'Arabic style', 'Organic henna', 'Quick designs'], popular: false },
  { vendorSlug: 'henna-by-hira', name: 'Bridal Henna', description: 'Full bridal henna — intricate bespoke design. 4-6 hours.', price: 35000, duration: '4-6 hours', features: ['Bespoke design', 'Arabic/Mughal/fusion', 'Organic henna', 'Hands + feet', 'Aftercare kit'], popular: true },
]

const REVIEWS = [
  { vendorSlug: 'lens-and-light-studios', customerName: 'Ayesha & Bilal', rating: 5, title: 'Best decision for our wedding!', comment: 'Lens & Light team captured our baraat beautifully. The cinematic film made us cry happy tears. Same-day teaser was a hit on WhatsApp! Highly recommend.', eventDate: '2024-12-15', eventType: 'Baraat' },
  { vendorSlug: 'lens-and-light-studios', customerName: 'Sana Malik', rating: 5, title: 'Professional and creative', comment: 'Booked them for my nikah. Photos came out elegant and timeless. Team was punctual and friendly.', eventDate: '2024-11-20', eventType: 'Nikah' },
  { vendorSlug: 'lens-and-light-studios', customerName: 'Hassan Raza', rating: 4, title: 'Great work, slightly pricey', comment: 'Quality is top-notch. Premium package was a bit expensive but worth every rupee for memories.', eventDate: '2024-10-05', eventType: 'Full Wedding' },
  { vendorSlug: 'marigold-and-maroon-decor', customerName: 'Fatima Khan', rating: 5, title: 'Stage was a dream!', comment: 'They transformed the venue into a fairytale. Maroon and cream theme was exactly what I wanted. Guests were taking photos non-stop!', eventDate: '2024-12-22', eventType: 'Valima' },
  { vendorSlug: 'marigold-and-maroon-decor', customerName: 'Usman & Iqra', rating: 5, title: 'Exceeded expectations', comment: 'Booking to delivery — smooth. The team understood our vision. Premium package worth it for grand weddings.', eventDate: '2024-11-28', eventType: 'Baraat' },
  { vendorSlug: 'desi-dastarkhwan-caterers', customerName: 'Imran Sheikh', rating: 5, title: 'Biryani was legendary', comment: 'Guests still talk about the biryani at our valima. 800 plates, not a single complaint. BBQ counter was the highlight.', eventDate: '2024-12-10', eventType: 'Valima' },
  { vendorSlug: 'desi-dastarkhwan-caterers', customerName: 'Zainab Ali', rating: 4, title: 'Good food, slight delay', comment: 'Taste was authentic Lahori. Service had a small delay but team managed. Will book again for family events.', eventDate: '2024-11-15', eventType: 'Baraat' },
  { vendorSlug: 'glow-by-ayesha-mua', customerName: 'Mariam Tariq', rating: 5, title: 'My bridal glow!', comment: 'Ayesha gave me exactly the dewy look I wanted. Lasted through rukhsati AND valima. Trial session helped us finalize the look. Worth every rupee.', eventDate: '2024-12-18', eventType: 'Baraat' },
  { vendorSlug: 'glow-by-ayesha-mua', customerName: 'Hira Nadeem', rating: 5, title: 'Talented and professional', comment: 'Booked for party makeup. HD finish looked natural in photos. Will book for sister\'s wedding too.', eventDate: '2024-10-30', eventType: 'Party' },
  { vendorSlug: 'the-grand-marquee-lahore', customerName: 'Bilal Ahmed', rating: 4, title: 'Great venue, AC was lifesaver', comment: 'Held our baraat in December. AC was perfect for guests. In-house decor team made setup easy. Parking was ample.', eventDate: '2024-12-20', eventType: 'Baraat' },
  { vendorSlug: 'beat-drop-djs-lahore', customerName: 'Ali & Noor', rating: 5, title: 'Dance floor never stopped', comment: 'DJ understood the crowd. Bollywood to EDM transition was smooth. Groom entry mix was epic. Fog machine made photos epic.', eventDate: '2024-12-14', eventType: 'Baraat' },
  { vendorSlug: 'henna-by-hira', customerName: 'Saba Yousuf', rating: 5, title: 'Intricate and beautiful', comment: 'Hira did my bridal henna — 6 hours of pure art. Deep stain lasted 2 weeks. Arabic-Mughal fusion was unique. Highly recommend!', eventDate: '2024-12-16', eventType: 'Mehndi' },
  { vendorSlug: 'aap-ki-kahani-films', customerName: 'Sara & Fahad', rating: 5, title: 'Our story, beautifully told', comment: 'Documentary style was perfect for us. The film captured real moments, not posed. Award-worthy work.', eventDate: '2024-11-25', eventType: 'Full Wedding' },
  { vendorSlug: 'radiance-bridal-studio', customerName: 'Nimra Javed', rating: 4, title: 'Soft glam on point', comment: 'Wanted soft glam for nikah — got exactly that. MUA was patient and listened. Slightly pricey for party makeup.', eventDate: '2024-11-10', eventType: 'Nikah' },
  { vendorSlug: 'karachi-kitchen-catering', customerName: 'Asad Mahmood', rating: 5, title: 'Authentic Karachi biryani', comment: 'Biryani was exactly like Karachi. Seafood counter impressed guests. 600 plates, smooth service.', eventDate: '2024-12-08', eventType: 'Valima' },
]

const BLOG_POSTS = [
  { title: '2025 Wedding Budget Guide: Lahore, Karachi & Islamabad', slug: '2025-wedding-budget-guide', excerpt: 'Planning your shaadi in 2025? Here\'s a realistic breakdown of what each vendor category costs across major Pakistani cities.', content: 'Full budget breakdown here...', category: 'Planning', author: 'ShaadiSet Team' },
  { title: 'Top 10 Mehndi Function Decor Trends for 2025', slug: 'mehndi-decor-trends-2025', excerpt: 'From marigold chandeliers to neon signs — the mehndi decor trends taking over Pakistani weddings this year.', content: 'Trends content here...', category: 'Decor', author: 'Ayesha Khan' },
  { title: 'How to Choose the Right Wedding Photographer', slug: 'choose-right-wedding-photographer', excerpt: 'Cinematic vs documentary vs traditional — which style suits your wedding? Our guide to making the right choice.', content: 'Guide content...', category: 'Photography', author: 'Bilal Sheikh' },
]

async function main() {
  console.log('🌱 Seeding wedding marketplace database...')

  // Clean existing data
  await db.inquiry.deleteMany()
  await db.review.deleteMany()
  await db.package.deleteMany()
  await db.vendor.deleteMany()
  await db.category.deleteMany()
  await db.city.deleteMany()
  await db.blogPost.deleteMany()

  // Seed cities
  for (const city of CITIES) {
    await db.city.create({ data: city })
  }
  console.log(`✓ ${CITIES.length} cities seeded`)

  // Seed categories
  for (const cat of CATEGORIES) {
    await db.category.create({ data: cat })
  }
  console.log(`✓ ${CATEGORIES.length} categories seeded`)

  // Seed vendors
  for (const v of VENDORS) {
    await db.vendor.create({
      data: {
        businessName: v.businessName,
        slug: v.slug,
        category: v.category,
        city: v.city,
        area: v.area,
        description: v.description,
        shortDescription: v.shortDescription,
        coverImage: v.coverImage,
        gallery: JSON.stringify(v.gallery),
        startingPrice: v.startingPrice,
        priceMax: v.priceMax,
        rating: v.rating,
        reviewCount: v.reviewCount,
        bookingCount: v.bookingCount,
        responseTime: v.responseTime,
        yearsActive: v.yearsActive,
        verified: v.verified,
        featured: v.featured,
        premium: v.premium,
        tags: JSON.stringify(v.tags),
        services: JSON.stringify(v.services),
        teamSize: v.teamSize,
        phone: v.phone,
        whatsapp: v.whatsapp,
        instagram: v.instagram,
        address: v.address,
      },
    })
  }
  console.log(`✓ ${VENDORS.length} vendors seeded`)

  // Update category & city counts
  for (const cat of CATEGORIES) {
    const count = await db.vendor.count({ where: { category: cat.slug } })
    await db.category.update({ where: { slug: cat.slug }, data: { vendorCount: count } })
  }
  for (const city of CITIES) {
    const count = await db.vendor.count({ where: { city: city.name } })
    await db.city.update({ where: { slug: city.slug }, data: { vendorCount: count } })
  }

  // Seed packages
  for (const pkg of PACKAGES) {
    const vendor = await db.vendor.findUnique({ where: { slug: pkg.vendorSlug } })
    if (!vendor) continue
    await db.package.create({
      data: {
        vendorId: vendor.id,
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        duration: pkg.duration,
        features: JSON.stringify(pkg.features),
        popular: pkg.popular,
      },
    })
  }
  console.log(`✓ ${PACKAGES.length} packages seeded`)

  // Seed reviews
  for (const rev of REVIEWS) {
    const vendor = await db.vendor.findUnique({ where: { slug: rev.vendorSlug } })
    if (!vendor) continue
    await db.review.create({
      data: {
        vendorId: vendor.id,
        customerName: rev.customerName,
        rating: rev.rating,
        title: rev.title,
        comment: rev.comment,
        eventDate: rev.eventDate,
        eventType: rev.eventType,
      },
    })
  }
  console.log(`✓ ${REVIEWS.length} reviews seeded`)

  // Seed blog posts
  for (const post of BLOG_POSTS) {
    await db.blogPost.create({
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        published: true,
      },
    })
  }
  console.log(`✓ ${BLOG_POSTS.length} blog posts seeded`)

  // ===== Remap images to available generated assets =====
  // Map each vendor's cover & gallery to category-appropriate images that exist
  const CATEGORY_IMAGES: Record<string, string[]> = {
    photographers: ['/vendors/cat-photographer.jpg', '/vendors/hero.jpg', '/vendors/cat-decorator.jpg'],
    decorators: ['/vendors/cat-decorator.jpg', '/vendors/hero.jpg', '/vendors/cat-photographer.jpg'],
    caterers: ['/vendors/cat-caterer.jpg', '/vendors/hero.jpg', '/vendors/cat-decorator.jpg'],
    makeup: ['/vendors/cat-makeup.jpg', '/vendors/hero.jpg', '/vendors/cat-photographer.jpg'],
    venues: ['/vendors/cat-venue.jpg', '/vendors/hero.jpg', '/vendors/cat-decorator.jpg'],
    dj: ['/vendors/cat-dj.jpg', '/vendors/hero.jpg', '/vendors/cat-photographer.jpg'],
    mehndi: ['/vendors/cat-mehndi.jpg', '/vendors/hero.jpg', '/vendors/cat-makeup.jpg'],
    invitations: ['/vendors/cat-invitations.jpg', '/vendors/hero.jpg', '/vendors/cat-decorator.jpg'],
  }

  const allVendors = await db.vendor.findMany()
  for (const v of allVendors) {
    const imgs = CATEGORY_IMAGES[v.category] || ['/vendors/hero.jpg', '/vendors/cat-photographer.jpg']
    // Rotate the gallery so different vendors in same category have different first image
    const offset = (allVendors.indexOf(v)) % imgs.length
    const rotated = [...imgs.slice(offset), ...imgs.slice(0, offset)]
    await db.vendor.update({
      where: { id: v.id },
      data: {
        coverImage: rotated[0],
        gallery: JSON.stringify(rotated),
      },
    })
  }
  console.log('✓ Remapped vendor images to available assets')

  console.log('✅ Seeding complete!')
  console.log(`Total vendors: ${await db.vendor.count()}`)
  console.log(`Total packages: ${await db.package.count()}`)
  console.log(`Total reviews: ${await db.review.count()}`)
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
