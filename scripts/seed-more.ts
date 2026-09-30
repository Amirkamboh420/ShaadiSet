import { db } from '@/lib/db'

// Additional vendors to expand the marketplace to 30+
const ADDITIONAL_VENDORS = [
  // ===== PHOTOGRAPHERS (more) =====
  {
    businessName: 'Candid Moments Studio',
    slug: 'candid-moments-studio',
    category: 'photographers', city: 'Karachi', area: 'Gulshan-e-Iqbal',
    description: 'Candid Moments Studio specializes in unposed, documentary-style wedding photography. We capture the real laughs, tears, and hugs — not stiff portraits. 10 years covering Karachi weddings.',
    shortDescription: 'Karachi\'s candid wedding photographers — real moments, real emotions.',
    startingPrice: 65000, priceMax: 300000, rating: 4.7, reviewCount: 112, bookingCount: 145,
    responseTime: '~2 hours', yearsActive: 10, verified: true, featured: false, premium: false,
    tags: ['Candid', 'Documentary', 'Natural light', 'Affordable'],
    services: ['Baraat', 'Mehndi', 'Valima', 'Pre-wedding', 'Family portraits'],
    teamSize: '3 people', phone: '+92 321 2345678', whatsapp: '+92 321 2345678',
    instagram: '@candidmomentskhi', address: 'Gulshan-e-Iqbal Block 7, Karachi',
  },
  {
    businessName: 'Frame By Frame Films',
    slug: 'frame-by-frame-films',
    category: 'photographers', city: 'Islamabad', area: 'I-8',
    description: 'Frame By Frame Films — cinematic wedding storytellers of Islamabad. We blend traditional coverage with modern cinematic film. 4K delivery, drone shots, same-day teasers.',
    shortDescription: 'Islamabad cinematic wedding films — 4K, drone, same-day teaser.',
    startingPrice: 90000, priceMax: 450000, rating: 4.8, reviewCount: 78, bookingCount: 96,
    responseTime: '~3 hours', yearsActive: 6, verified: true, featured: false, premium: true,
    tags: ['Cinematic film', '4K', 'Drone', 'Same-day teaser'],
    services: ['Wedding film', 'Baraat', 'Mehndi', 'Pre-wedding', 'Drone'],
    teamSize: '5 people', phone: '+92 333 8765432', whatsapp: '+92 333 8765432',
    instagram: '@framebyframeisb', address: 'I-8 Markaz, Islamabad',
  },
  {
    businessName: 'Punarvivah Photography',
    slug: 'punarvivah-photography',
    category: 'photographers', city: 'Faisalabad', area: 'Satiana Road',
    description: 'Punarvivah Photography brings premium wedding coverage to Faisalabad. Traditional + candid blend with elegant albums. Budget-friendly packages for every family.',
    shortDescription: 'Faisalabad premium wedding photography — traditional + candid.',
    startingPrice: 35000, priceMax: 200000, rating: 4.5, reviewCount: 56, bookingCount: 78,
    responseTime: '~6 hours', yearsActive: 7, verified: false, featured: false, premium: false,
    tags: ['Traditional', 'Budget-friendly', 'Albums', 'Candid'],
    services: ['Baraat', 'Mehndi', 'Valima', 'Studio portraits'],
    teamSize: '2 people', phone: '+92 300 1122334', whatsapp: '+92 300 1122334',
    instagram: '@punarvivahfsd', address: 'Satiana Road, Faisalabad',
  },
  // ===== DECORATORS (more) =====
  {
    businessName: 'Floral Fantasy Decor',
    slug: 'floral-fantasy-decor',
    category: 'decorators', city: 'Karachi', area: 'Korangi',
    description: 'Floral Fantasy Decor — Karachi\'s floral specialists. From intimate nikah to grand valima, we create breathtaking floral installations. Imported + local flowers available.',
    shortDescription: 'Karachi floral decor specialists — imported + local flowers.',
    startingPrice: 60000, priceMax: 500000, rating: 4.6, reviewCount: 87, bookingCount: 112,
    responseTime: '~2 hours', yearsActive: 5, verified: true, featured: false, premium: false,
    tags: ['Florals', 'Imported flowers', 'Stage', 'Centerpieces'],
    services: ['Stage decor', 'Floral arch', 'Table centerpieces', 'Bouquets'],
    teamSize: '12 people', phone: '+92 311 9988776', whatsapp: '+92 311 9988776',
    instagram: '@floralfantasykhi', address: 'Korangi Industrial Area, Karachi',
  },
  {
    businessName: 'Royal Stage Crafters',
    slug: 'royal-stage-crafters',
    category: 'decorators', city: 'Islamabad', area: 'G-9',
    description: 'Royal Stage Crafters — grand stage designs for Islamabad\'s most luxurious weddings. Royal Mughal themes, opulent drapes, chandeliers, and bespoke installations.',
    shortDescription: 'Islamabad grand stage designers — royal Mughal themes.',
    startingPrice: 120000, priceMax: 1000000, rating: 4.8, reviewCount: 65, bookingCount: 82,
    responseTime: '~4 hours', yearsActive: 8, verified: true, featured: true, premium: true,
    tags: ['Royal', 'Mughal', 'Grand', 'Chandeliers', 'Luxury'],
    services: ['Stage design', 'Grand entrance', 'Lounge furniture', 'Lighting'],
    teamSize: '20 people', phone: '+92 51 9876543', whatsapp: '+92 345 9876543',
    instagram: '@royalstagecrafters', address: 'G-9 Markaz, Islamabad',
  },
  {
    businessName: 'Budget Decor Faisalabad',
    slug: 'budget-decor-faisalabad',
    category: 'decorators', city: 'Faisalabad', area: 'Jaranwala Road',
    description: 'Budget Decor Faisalabad — beautiful decor at affordable prices. Perfect for intimate mehndi functions and family gatherings. Quick setup, reliable service.',
    shortDescription: 'Faisalabad affordable decor — mehndi & family functions.',
    startingPrice: 25000, priceMax: 150000, rating: 4.4, reviewCount: 43, bookingCount: 67,
    responseTime: '~5 hours', yearsActive: 4, verified: false, featured: false, premium: false,
    tags: ['Affordable', 'Mehndi setup', 'Quick setup', 'Budget'],
    services: ['Mehndi decor', 'Stage backdrop', 'Flowers', 'Lighting'],
    teamSize: '6 people', phone: '+92 300 5566778', whatsapp: '+92 300 5566778',
    instagram: '@budgetdecorfsd', address: 'Jaranwala Road, Faisalabad',
  },
  // ===== CATERERS (more) =====
  {
    businessName: 'Royal Feast Caterers',
    slug: 'royal-feast-caterers',
    category: 'caterers', city: 'Islamabad', area: 'G-10',
    description: 'Royal Feast Caterers — Islamabad\'s premium wedding caterer. Continental + desi menu, live counters, elegant presentation. 50 to 3000 guests. Hygienic certified kitchen.',
    shortDescription: 'Islamabad premium caterers — continental + desi, live counters.',
    startingPrice: 800, priceMax: 3500, rating: 4.7, reviewCount: 134, bookingCount: 178,
    responseTime: '~2 hours', yearsActive: 9, verified: true, featured: false, premium: true,
    tags: ['Continental', 'Desi', 'Live counters', 'Premium', '3000 guests'],
    services: ['Main course', 'BBQ', 'Dessert', 'Live cooking', 'Waitstaff'],
    teamSize: '45+ people', phone: '+92 51 4455667', whatsapp: '+92 345 4455667',
    instagram: '@royalfeastisb', address: 'G-10 Markaz, Islamabad',
  },
  {
    businessName: 'Tandoori Flames BBQ',
    slug: 'tandoori-flames-bbq',
    category: 'caterers', city: 'Lahore', area: 'Multan Road',
    description: 'Tandoori Flames BBQ — Lahore\'s BBQ specialists. Live seekh kebab, chapli, malai boti, and tandoori chicken counters. Perfect for baraat and valima. Per plate pricing.',
    shortDescription: 'Lahore\'s BBQ specialists — live kebab counters.',
    startingPrice: 550, priceMax: 1800, rating: 4.6, reviewCount: 92, bookingCount: 134,
    responseTime: '~1 hour', yearsActive: 6, verified: true, featured: false, premium: false,
    tags: ['BBQ', 'Live counter', 'Seekh kebab', 'Tandoori', 'Affordable'],
    services: ['BBQ station', 'Main course', 'Naan/roti', 'Dessert'],
    teamSize: '20+ people', phone: '+92 300 7788990', whatsapp: '+92 300 7788990',
    instagram: '@tandooriflames', address: 'Multan Road, Lahore',
  },
  {
    businessName: 'Sweet Tooth Desserts Co.',
    slug: 'sweet-tooth-desserts-co',
    category: 'caterers', city: 'Karachi', area: 'DHA Phase 4',
    description: 'Sweet Tooth Desserts Co. — Karachi\'s wedding dessert specialists. Custom cake towers, dessert tables, traditional sweets (gulab jamun, rasmalai, jalebi), and modern desserts.',
    shortDescription: 'Karachi wedding dessert specialists — cakes, sweets, dessert tables.',
    startingPrice: 400, priceMax: 2000, rating: 4.8, reviewCount: 156, bookingCount: 189,
    responseTime: '~2 hours', yearsActive: 5, verified: true, featured: true, premium: false,
    tags: ['Desserts', 'Cake', 'Sweet table', 'Traditional sweets'],
    services: ['Dessert table', 'Wedding cake', 'Traditional sweets', 'Modern desserts'],
    teamSize: '8 people', phone: '+92 321 6677889', whatsapp: '+92 321 6677889',
    instagram: '@sweettoothkhi', address: 'DHA Phase 4, Karachi',
  },
  // ===== MAKEUP (more) =====
  {
    businessName: 'Bridal Glow Studio',
    slug: 'bridal-glow-studio',
    category: 'makeup', city: 'Islamabad', area: 'F-11',
    description: 'Bridal Glow Studio — Islamabad\'s trusted bridal MUAs. Natural to glam looks, HD base, long-lasting wear. Trial sessions included. On-location service across twin cities.',
    shortDescription: 'Islamabad bridal MUAs — natural to glam, on-location.',
    startingPrice: 20000, priceMax: 120000, rating: 4.7, reviewCount: 98, bookingCount: 121,
    responseTime: '~2 hours', yearsActive: 6, verified: true, featured: false, premium: false,
    tags: ['HD glam', 'Natural', 'On-location', 'Trial included'],
    services: ['Bridal makeup', 'Party makeup', 'Trial', 'Hair', 'Draping'],
    teamSize: '3 people', phone: '+92 333 1234567', whatsapp: '+92 333 1234567',
    instagram: '@bridalglowisb', address: 'F-11 Markaz, Islamabad',
  },
  {
    businessName: 'Makeup by Zara',
    slug: 'makeup-by-zara',
    category: 'makeup', city: 'Faisalabad', area: 'Susan Road',
    description: 'Makeup by Zara — Faisalabad\'s rising bridal makeup artist. Affordable bridal glam with premium products. Home studio + on-location. Specializes in dewy natural looks.',
    shortDescription: 'Faisalabad bridal makeup — affordable, dewy, natural.',
    startingPrice: 12000, priceMax: 60000, rating: 4.6, reviewCount: 67, bookingCount: 89,
    responseTime: '~3 hours', yearsActive: 4, verified: false, featured: false, premium: false,
    tags: ['Affordable', 'Dewy', 'Natural', 'Premium products'],
    services: ['Bridal makeup', 'Party makeup', 'Hair styling', 'Draping'],
    teamSize: 'Solo + 1 assistant', phone: '+92 300 8877665', whatsapp: '+92 300 8877665',
    instagram: '@makeupbyzara', address: 'Susan Road, Faisalabad',
  },
  // ===== VENUES (more) =====
  {
    businessName: 'Pearl Continental Banquets',
    slug: 'pearl-continental-banquets',
    category: 'venues', city: 'Karachi', area: 'Club Road',
    description: 'Pearl Continental Banquets — Karachi\'s most prestigious hotel wedding venue. Multiple ballrooms, 5-star catering, valet parking, luxury bridal suite. Capacity 50-2000 guests.',
    shortDescription: 'Karachi 5-star hotel venue — luxury ballrooms, 2000 capacity.',
    startingPrice: 500000, priceMax: 5000000, rating: 4.8, reviewCount: 156, bookingCount: 198,
    responseTime: '~1 hour', yearsActive: 25, verified: true, featured: true, premium: true,
    tags: ['5-star', 'Luxury', '2000 capacity', 'Hotel', 'Valet'],
    services: ['Ballroom rental', 'In-house catering', 'Bridal suite', 'Valet', 'AC'],
    teamSize: '100+ staff', phone: '+92 21 111 222 222', whatsapp: '+92 21 111 222 222',
    instagram: '@pcharbanquets', address: 'Club Road, Karachi',
  },
  {
    businessName: 'Farmhouse Valley Lahore',
    slug: 'farmhouse-valley-lahore',
    category: 'venues', city: 'Lahore', area: 'Bedian Road',
    description: 'Farmhouse Valley Lahore — sprawling outdoor farmhouses for mehndi, baraat, and valima. Lush lawns, poolside setup, marquees, and backup halls. Capacity 100-1500.',
    shortDescription: 'Lahore outdoor farmhouses — lawns, poolside, marquees.',
    startingPrice: 180000, priceMax: 1200000, rating: 4.5, reviewCount: 78, bookingCount: 101,
    responseTime: '~3 hours', yearsActive: 7, verified: true, featured: false, premium: false,
    tags: ['Outdoor', 'Farmhouse', 'Lawn', 'Poolside', 'Marquee'],
    services: ['Lawn rental', 'Marquee', 'Poolside', 'Parking', 'Security'],
    teamSize: '15+ staff', phone: '+92 300 3344556', whatsapp: '+92 300 3344556',
    instagram: '@farmhousevalley', address: 'Bedian Road, Lahore',
  },
  {
    businessName: 'Centaurus Banquet Islamabad',
    slug: 'centaurus-banquet-islamabad',
    category: 'venues', city: 'Islamabad', area: 'F-8',
    description: 'Centaurus Banquet — premium banquet hall in the heart of Islamabad. Modern facilities, capacity 800, in-house decor team, ample parking. AC halls with grand chandeliers.',
    shortDescription: 'Islamabad premium banquet hall — 800 capacity, modern.',
    startingPrice: 350000, priceMax: 2500000, rating: 4.6, reviewCount: 89, bookingCount: 112,
    responseTime: '~2 hours', yearsActive: 5, verified: true, featured: false, premium: true,
    tags: ['Banquet hall', '800 capacity', 'AC', 'Modern', 'Parking'],
    services: ['Hall rental', 'In-house decor', 'Catering tie-ups', 'Parking', 'AC'],
    teamSize: '40+ staff', phone: '+92 51 111 111 111', whatsapp: '+92 345 111 111 111',
    instagram: '@centaurusbanquet', address: 'F-8 Markaz, Islamabad',
  },
  // ===== DJ & SOUND (more) =====
  {
    businessName: 'Sound Nation DJs',
    slug: 'sound-nation-djs',
    category: 'dj', city: 'Karachi', area: 'Shahrah-e-Faisal',
    description: 'Sound Nation DJs — Karachi\'s premium wedding entertainment. Professional DJs, massive sound systems, intelligent lighting, LED walls, and CO2 jets for that wow factor.',
    shortDescription: 'Karachi premium DJs — LED walls, CO2 jets, massive sound.',
    startingPrice: 50000, priceMax: 300000, rating: 4.7, reviewCount: 89, bookingCount: 123,
    responseTime: '~1 hour', yearsActive: 7, verified: true, featured: false, premium: true,
    tags: ['Premium', 'LED wall', 'CO2 jets', 'Lighting', 'Bollywood'],
    services: ['DJ set', 'Sound system', 'LED wall', 'Lighting', 'MC'],
    teamSize: '5 people', phone: '+92 321 5555111', whatsapp: '+92 321 5555111',
    instagram: '@soundnationdjs', address: 'Shahrah-e-Faisal, Karachi',
  },
  {
    businessName: 'Dholak Beats Lahore',
    slug: 'dholak-beats-lahore',
    category: 'dj', city: 'Lahore', area: 'Wapda Town',
    description: 'Dholak Beats Lahore — traditional + modern fusion. Live dholak players with DJ setup for authentic mehndi nights. Affordable packages for dholki and mehndi functions.',
    shortDescription: 'Lahore traditional dholak + DJ fusion for mehndi nights.',
    startingPrice: 20000, priceMax: 100000, rating: 4.5, reviewCount: 56, bookingCount: 78,
    responseTime: '~4 hours', yearsActive: 5, verified: false, featured: false, premium: false,
    tags: ['Dholak', 'Traditional', 'Mehndi', 'Affordable', 'Fusion'],
    services: ['Live dholak', 'DJ', 'Sound system', 'Mehndi setup'],
    teamSize: '4 people', phone: '+92 300 6666777', whatsapp: '+92 300 6666777',
    instagram: '@dholakbeats', address: 'Wapda Town, Lahore',
  },
  // ===== MEHNDI (more) =====
  {
    businessName: 'Henna Tales by Sana',
    slug: 'henna-tales-by-sana',
    category: 'mehndi', city: 'Lahore', area: 'Model Town',
    description: 'Henna Tales by Sana — Lahore\'s artistic mehndi specialist. Story-telling henna designs that incorporate couple names, dates, and motifs. Organic henna, deep stain.',
    shortDescription: 'Lahore artistic mehndi — story-telling bespoke designs.',
    startingPrice: 6000, priceMax: 40000, rating: 4.8, reviewCount: 112, bookingCount: 134,
    responseTime: '~2 hours', yearsActive: 6, verified: true, featured: false, premium: false,
    tags: ['Bespoke', 'Story-telling', 'Organic henna', 'Bridal', 'Mughal'],
    services: ['Bridal henna', 'Party henna', 'Family henna', 'Custom motifs'],
    teamSize: 'Solo + 1 assistant', phone: '+92 333 4455667', whatsapp: '+92 333 4455667',
    instagram: '@hennatales', address: 'Model Town, Lahore',
  },
  {
    businessName: 'Arabic Henna Studio',
    slug: 'arabic-henna-studio',
    category: 'mehndi', city: 'Islamabad', area: 'Bahria Town',
    description: 'Arabic Henna Studio — specializing in bold, flowing Arabic mehndi designs. Quick application, beautiful results. Perfect for party mehndi and dholki guests.',
    shortDescription: 'Islamabad Arabic mehndi — bold, flowing, quick.',
    startingPrice: 2000, priceMax: 20000, rating: 4.6, reviewCount: 78, bookingCount: 95,
    responseTime: '~3 hours', yearsActive: 5, verified: false, featured: false, premium: false,
    tags: ['Arabic', 'Bold', 'Quick', 'Party mehndi'],
    services: ['Party henna', 'Bridal henna', 'Family henna', 'On-location'],
    teamSize: 'Solo', phone: '+92 345 7788990', whatsapp: '+92 345 7788990',
    instagram: '@arabichennaisb', address: 'Bahria Town, Islamabad',
  },
  // ===== INVITATIONS (more) =====
  {
    businessName: 'Digital Invites PK',
    slug: 'digital-invites-pk',
    category: 'invitations', city: 'Karachi', area: 'Online',
    description: 'Digital Invites PK — modern animated digital wedding invitations. WhatsApp-shareable, RSVP tracking, custom music, couple photos. Eco-friendly + instant delivery.',
    shortDescription: 'Animated digital wedding invites — WhatsApp share, RSVP tracking.',
    startingPrice: 2000, priceMax: 25000, rating: 4.7, reviewCount: 89, bookingCount: 134,
    responseTime: '~1 hour', yearsActive: 3, verified: true, featured: true, premium: false,
    tags: ['Digital', 'Animated', 'WhatsApp', 'RSVP', 'Eco-friendly'],
    services: ['Digital invite', 'Animation', 'RSVP tracking', 'Custom design'],
    teamSize: '4 people', phone: '+92 321 3333444', whatsapp: '+92 321 3333444',
    instagram: '@digitalinvitespk', address: 'Online service, Karachi',
  },
  {
    businessName: 'Luxury Box Invitations',
    slug: 'luxury-box-invitations',
    category: 'invitations', city: 'Lahore', area: 'Liberty Market',
    description: 'Luxury Box Invitations — premium box wedding cards with chocolates, favors, and custom monograms. Foil printing, laser cut, embossed details. Heirloom quality.',
    shortDescription: 'Lahore luxury box invitations — chocolates, favors, foil printing.',
    startingPrice: 500, priceMax: 5000, rating: 4.8, reviewCount: 67, bookingCount: 84,
    responseTime: '~5 hours', yearsActive: 8, verified: true, featured: false, premium: true,
    tags: ['Box invites', 'Luxury', 'Foil printing', 'Chocolates', 'Monogram'],
    services: ['Box cards', 'Foil printing', 'Laser cut', 'Custom favors'],
    teamSize: '10 people', phone: '+92 42 2222333', whatsapp: '+92 300 2222333',
    instagram: '@luxuryboxinvites', address: 'Liberty Market, Lahore',
  },
]

const ADDITIONAL_PACKAGES = [
  { vendorSlug: 'candid-moments-studio', name: 'Baraat Coverage', description: '8-hour baraat coverage with 2 photographers.', price: 65000, duration: '8 hours', features: ['2 photographers', '300+ photos', 'Online gallery', '14-day delivery'], popular: true },
  { vendorSlug: 'candid-moments-studio', name: 'Full Wedding', description: '3-day coverage — mehndi, baraat, valima.', price: 180000, duration: '3 days', features: ['2 photographers', '600+ photos', 'Highlight reel', 'Album'], popular: false },
  { vendorSlug: 'frame-by-frame-films', name: 'Cinematic Baraat', description: 'Cinematic film + photography for baraat.', price: 150000, duration: '10 hours', features: ['Cinematic film', '2 cinematographers', '300+ photos', '4K delivery', 'Same-day teaser'], popular: true },
  { vendorSlug: 'floral-fantasy-decor', name: 'Floral Stage', description: 'Floral stage backdrop + entrance.', price: 60000, duration: '1 day', features: ['Stage backdrop', 'Entrance florals', 'Centerpieces', 'Setup'], popular: true },
  { vendorSlug: 'royal-stage-crafters', name: 'Royal Mughal Theme', description: 'Grand Mughal-themed stage with chandeliers.', price: 350000, duration: '2 days', features: ['Grand stage', 'Chandeliers', 'Mughal props', 'Lounge', 'Lighting'], popular: true },
  { vendorSlug: 'royal-feast-caterers', name: 'Premium Buffet', description: 'Per plate — desi + continental spread.', price: 1200, duration: 'Per guest', features: ['8 dishes', '2 live counters', 'Dessert', 'Crockery', 'Waitstaff'], popular: true },
  { vendorSlug: 'tandoori-flames-bbq', name: 'BBQ Package', description: 'Per plate — live BBQ + main course.', price: 550, duration: 'Per guest', features: ['Live BBQ', '3 kebabs', 'Biryani', 'Naan', 'Dessert'], popular: true },
  { vendorSlug: 'sweet-tooth-desserts-co', name: 'Dessert Table', description: 'Full dessert table setup per 100 guests.', price: 40000, duration: 'Per 100 guests', features: ['10 dessert types', 'Wedding cake', 'Traditional sweets', 'Display setup'], popular: true },
  { vendorSlug: 'bridal-glow-studio', name: 'Bridal Premium', description: 'Full bridal with trial session.', price: 60000, duration: '4 hours', features: ['HD glam', 'Trial session', 'Hair styling', 'Draping'], popular: true },
  { vendorSlug: 'pearl-continental-banquets', name: '5-Star Ballroom', description: 'Luxury ballroom for up to 500 guests.', price: 800000, duration: '1 day', features: ['Ballroom', '5-star catering', 'Bridal suite', 'Valet', 'AC'], popular: true },
  { vendorSlug: 'farmhouse-valley-lahore', name: 'Lawn + Marquee', description: 'Outdoor lawn with marquee setup.', price: 250000, duration: '1 day', features: ['Lawn rental', 'Marquee', 'Parking', 'Security'], popular: true },
  { vendorSlug: 'sound-nation-djs', name: 'Premium DJ Package', description: 'DJ + LED wall + lighting for baraat.', price: 120000, duration: '8 hours', features: ['DJ + MC', 'LED wall', 'Intelligent lighting', 'CO2 jets', 'Sound system'], popular: true },
  { vendorSlug: 'henna-tales-by-sana', name: 'Bridal Story Henna', description: 'Bespoke bridal henna with story motifs.', price: 30000, duration: '5 hours', features: ['Bespoke design', 'Story motifs', 'Organic henna', 'Hands + feet'], popular: true },
  { vendorSlug: 'digital-invites-pk', name: 'Animated Invite', description: 'Custom animated digital invitation.', price: 5000, duration: '1 design', features: ['Custom animation', 'RSVP tracking', 'WhatsApp share', 'Music'], popular: true },
  { vendorSlug: 'luxury-box-invitations', name: 'Box Card Premium', description: 'Luxury box card with chocolates.', price: 1500, duration: 'Per card', features: ['Box card', 'Foil printing', 'Chocolates', 'Custom monogram'], popular: true },
]

const ADDITIONAL_REVIEWS = [
  { vendorSlug: 'candid-moments-studio', customerName: 'Ayesha K.', rating: 5, title: 'Real moments captured', comment: 'They captured the real emotions — tears, laughs, hugs. Not stiff posed photos. Exactly what we wanted.', eventDate: '2024-12-20', eventType: 'Baraat' },
  { vendorSlug: 'frame-by-frame-films', customerName: 'Hamza & Sana', rating: 5, title: 'Cinematic magic', comment: 'Our wedding film looks like a movie. 4K quality, drone shots, perfect music. Worth every rupee.', eventDate: '2024-11-18', eventType: 'Full Wedding' },
  { vendorSlug: 'floral-fantasy-decor', customerName: 'Maria Sheikh', rating: 5, title: 'Flowers were breathtaking', comment: 'Imported flowers were fresh and gorgeous. Stage looked like a dream. Very professional team.', eventDate: '2024-12-05', eventType: 'Valima' },
  { vendorSlug: 'royal-stage-crafters', customerName: 'Ali Raza', rating: 5, title: 'Grand setup', comment: 'Royal Mughal theme was opulent. Chandeliers, drapes, everything. Guests were stunned. Premium but worth it.', eventDate: '2024-11-22', eventType: 'Baraat' },
  { vendorSlug: 'royal-feast-caterers', customerName: 'Fatima A.', rating: 4, title: 'Great food, professional', comment: 'Continental + desi mix was hit. Live counters impressed. Service was prompt. Slightly pricey.', eventDate: '2024-12-12', eventType: 'Valima' },
  { vendorSlug: 'tandoori-flames-bbq', customerName: 'Bilal M.', rating: 5, title: 'BBQ was the highlight', comment: 'Live seekh kebabs were the star. Guests loved it. Affordable per plate price. Will book again.', eventDate: '2024-11-28', eventType: 'Baraat' },
  { vendorSlug: 'sweet-tooth-desserts-co', customerName: 'Hira J.', rating: 5, title: 'Dessert table was stunning', comment: 'Cake tower, dessert table, traditional sweets — all beautiful and delicious. Instagram-worthy!', eventDate: '2024-12-15', eventType: 'Valima' },
  { vendorSlug: 'bridal-glow-studio', customerName: 'Noor F.', rating: 5, title: 'Natural glam on point', comment: 'Wanted natural look — got exactly that. Lasted all day. Trial helped finalize. Loved it.', eventDate: '2024-11-30', eventType: 'Baraat' },
  { vendorSlug: 'pearl-continental-banquets', customerName: 'Imran & Saba', rating: 5, title: '5-star experience', comment: 'PC ballroom was luxurious. Service impeccable. Guests impressed. Bridal suite was beautiful. Worth it.', eventDate: '2024-12-22', eventType: 'Baraat' },
  { vendorSlug: 'farmhouse-valley-lahore', customerName: 'Usman A.', rating: 4, title: 'Great outdoor venue', comment: 'Lawn was beautiful for evening baraat. Marquee backup was useful. Parking ample. Good value.', eventDate: '2024-11-15', eventType: 'Baraat' },
  { vendorSlug: 'sound-nation-djs', customerName: 'Ahmed & Iqra', rating: 5, title: 'LED wall was epic', comment: 'CO2 jets + LED wall made the dance floor epic. DJ understood the crowd. Premium but next level.', eventDate: '2024-12-18', eventType: 'Baraat' },
  { vendorSlug: 'henna-tales-by-sana', customerName: 'Sana Y.', rating: 5, title: 'Story-telling henna', comment: 'Sana incorporated our names and wedding date into the design. So unique and beautiful. Deep stain.', eventDate: '2024-12-10', eventType: 'Mehndi' },
  { vendorSlug: 'digital-invites-pk', customerName: 'Kashif R.', rating: 5, title: 'Modern + convenient', comment: 'Animated invite was stunning. RSVP tracking made guest management easy. WhatsApp share was instant.', eventDate: '2024-11-20', eventType: 'Baraat' },
  { vendorSlug: 'luxury-box-invitations', customerName: 'Ayesha & Bilal', rating: 5, title: 'Heirloom quality cards', comment: 'Box cards with chocolates impressed everyone. Foil printing was elegant. Premium pricing but premium product.', eventDate: '2024-12-08', eventType: 'Baraat' },
]

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

async function main() {
  console.log('🌱 Adding additional vendors...')

  let added = 0
  for (const v of ADDITIONAL_VENDORS) {
    const existing = await db.vendor.findUnique({ where: { slug: v.slug } })
    if (existing) {
      console.log(`  ⏭  ${v.slug} already exists, skipping`)
      continue
    }
    const imgs = CATEGORY_IMAGES[v.category] || ['/vendors/hero.jpg']
    await db.vendor.create({
      data: {
        businessName: v.businessName,
        slug: v.slug,
        category: v.category,
        city: v.city,
        area: v.area,
        description: v.description,
        shortDescription: v.shortDescription,
        coverImage: imgs[0],
        gallery: JSON.stringify(imgs),
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
    added++
  }
  console.log(`✓ Added ${added} new vendors`)

  // Add packages
  let pkgAdded = 0
  for (const pkg of ADDITIONAL_PACKAGES) {
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
    pkgAdded++
  }
  console.log(`✓ Added ${pkgAdded} new packages`)

  // Add reviews
  let revAdded = 0
  for (const rev of ADDITIONAL_REVIEWS) {
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
    revAdded++
  }
  console.log(`✓ Added ${revAdded} new reviews`)

  // Recompute vendor ratings & review counts for all vendors
  const allVendors = await db.vendor.findMany()
  for (const v of allVendors) {
    const reviews = await db.review.findMany({ where: { vendorId: v.id } })
    if (reviews.length > 0) {
      const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      await db.vendor.update({
        where: { id: v.id },
        data: {
          rating: parseFloat(avg.toFixed(2)),
          reviewCount: reviews.length,
        },
      })
    }
  }
  console.log('✓ Recomputed ratings & review counts')

  // Update category & city counts
  const categories = await db.category.findMany()
  for (const cat of categories) {
    const count = await db.vendor.count({ where: { category: cat.slug } })
    await db.category.update({ where: { slug: cat.slug }, data: { vendorCount: count } })
  }
  const cities = await db.city.findMany()
  for (const city of cities) {
    const count = await db.vendor.count({ where: { city: city.name } })
    await db.city.update({ where: { slug: city.slug }, data: { vendorCount: count } })
  }
  console.log('✓ Updated category & city counts')

  console.log('\n✅ Expansion complete!')
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
