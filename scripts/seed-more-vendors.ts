import { db } from '@/lib/db'

// Additional vendors to expand the marketplace to 50+
const MORE_VENDORS = [
  // Photographers
  { businessName: 'Wedding Tales Photography', slug: 'wedding-tales-photography', category: 'photographers', city: 'Lahore', area: 'DHA Phase 6', description: 'Cinematic wedding storytelling with a modern touch. Pre-wedding, baraat, valima — all covered with style.', shortDescription: 'Lahore cinematic wedding storytellers', startingPrice: 80000, priceMax: 400000, rating: 4.7, reviewCount: 67, bookingCount: 89, responseTime: '~2 hours', yearsActive: 6, verified: true, featured: false, premium: false, tags: ['Cinematic', 'Pre-wedding', 'Modern'], services: ['Baraat', 'Valima', 'Pre-wedding', 'Film'], teamSize: '4 people', phone: '+92 300 1112233', whatsapp: '+92 300 1112233', instagram: '@weddingtaleslhr', address: 'DHA Phase 6, Lahore' },
  { businessName: 'Capture Moments Studio', slug: 'capture-moments-studio', category: 'photographers', city: 'Karachi', area: 'Gulistan-e-Johar', description: 'Traditional + candid wedding photography. Family portraits, baraat coverage, and cinematic films.', shortDescription: 'Karachi traditional + candid photography', startingPrice: 50000, priceMax: 250000, rating: 4.5, reviewCount: 43, bookingCount: 56, responseTime: '~3 hours', yearsActive: 5, verified: false, featured: false, premium: false, tags: ['Traditional', 'Candid', 'Budget'], services: ['Baraat', 'Mehndi', 'Portraits'], teamSize: '2 people', phone: '+92 321 4445566', whatsapp: '+92 321 4445566', instagram: '@capturemomentskhi', address: 'Gulistan-e-Johar, Karachi' },
  { businessName: 'Evergreen Films', slug: 'evergreen-films', category: 'photographers', city: 'Islamabad', area: 'G-11', description: 'Documentary-style wedding films. We capture real moments, not posed shots. 4K delivery.', shortDescription: 'Islamabad documentary wedding films', startingPrice: 95000, priceMax: 450000, rating: 4.8, reviewCount: 54, bookingCount: 67, responseTime: '~2 hours', yearsActive: 7, verified: true, featured: false, premium: true, tags: ['Documentary', '4K', 'Cinematic'], services: ['Wedding film', 'Baraat', 'Pre-wedding'], teamSize: '5 people', phone: '+92 333 7778888', whatsapp: '+92 333 7778888', instagram: '@evergreenfilmsisb', address: 'G-11 Markaz, Islamabad' },

  // Decorators
  { businessName: 'Blossom Decor Co', slug: 'blossom-decor-co', category: 'decorators', city: 'Karachi', area: 'Malir', description: 'Fresh flower decorations for all wedding functions. Stage, entrance, table centerpieces.', shortDescription: 'Karachi fresh flower decorations', startingPrice: 40000, priceMax: 350000, rating: 4.6, reviewCount: 61, bookingCount: 78, responseTime: '~2 hours', yearsActive: 4, verified: true, featured: false, premium: false, tags: ['Florals', 'Fresh flowers', 'Stage'], services: ['Stage decor', 'Florals', 'Centerpieces'], teamSize: '10 people', phone: '+92 300 5556677', whatsapp: '+92 300 5556677', instagram: '@blossomdecorkhi', address: 'Malir, Karachi' },
  { businessName: 'Dream Weddings Decor', slug: 'dream-weddings-decor', category: 'decorators', city: 'Lahore', area: 'Raiwind Road', description: 'Complete venue transformation — from stage to entrance to lighting. Royal themes our specialty.', shortDescription: 'Lahore complete venue transformation', startingPrice: 70000, priceMax: 600000, rating: 4.7, reviewCount: 48, bookingCount: 62, responseTime: '~3 hours', yearsActive: 6, verified: true, featured: false, premium: false, tags: ['Royal', 'Stage', 'Lighting', 'Complete'], services: ['Stage', 'Entrance', 'Lighting', 'Full venue'], teamSize: '14 people', phone: '+92 321 8889900', whatsapp: '+92 321 8889900', instagram: '@dreamweddingslhr', address: 'Raiwind Road, Lahore' },
  { businessName: 'Elegant Events Decor', slug: 'elegant-events-decor', category: 'decorators', city: 'Faisalabad', area: 'Jinnah Colony', description: 'Affordable yet elegant wedding decor. Mehndi setups, stage backdrops, and floral arrangements.', shortDescription: 'Faisalabad affordable elegant decor', startingPrice: 30000, priceMax: 200000, rating: 4.4, reviewCount: 34, bookingCount: 45, responseTime: '~4 hours', yearsActive: 3, verified: false, featured: false, premium: false, tags: ['Affordable', 'Mehndi', 'Stage'], services: ['Mehndi decor', 'Stage', 'Florals'], teamSize: '6 people', phone: '+92 300 6667778', whatsapp: '+92 300 6667778', instagram: '@eleganteventsfsd', address: 'Jinnah Colony, Faisalabad' },

  // Caterers
  { businessName: 'Spice Route Caterers', slug: 'spice-route-caterers', category: 'caterers', city: 'Lahore', area: 'Township', description: 'Authentic Lahori cuisine — biryani, nihari, qorma, and live BBQ counters. Hygienic kitchen, trained staff.', shortDescription: 'Lahore authentic desi cuisine caterers', startingPrice: 600, priceMax: 2200, rating: 4.6, reviewCount: 78, bookingCount: 102, responseTime: '~1 hour', yearsActive: 8, verified: true, featured: false, premium: false, tags: ['Desi', 'Biryani', 'BBQ', 'Live counters'], services: ['Main course', 'BBQ', 'Dessert', 'Waitstaff'], teamSize: '30+ people', phone: '+92 300 2223334', whatsapp: '+92 300 2223334', instagram: '@spiceroutelhr', address: 'Township, Lahore' },
  { businessName: 'Royal Bites Catering', slug: 'royal-bites-catering', category: 'caterers', city: 'Islamabad', area: 'I-9', description: 'Continental + desi fusion menu. Live pasta counters, BBQ station, and premium dessert tables.', shortDescription: 'Islamabad continental + desi fusion', startingPrice: 900, priceMax: 3000, rating: 4.7, reviewCount: 56, bookingCount: 71, responseTime: '~2 hours', yearsActive: 5, verified: true, featured: false, premium: true, tags: ['Continental', 'Fusion', 'Premium', 'Live counters'], services: ['Main course', 'Live counters', 'Dessert', 'BBQ'], teamSize: '25+ people', phone: '+92 51 1112223', whatsapp: '+92 345 1112223', instagram: '@royalbitesisb', address: 'I-9, Islamabad' },
  { businessName: 'Desi Tadka Caterers', slug: 'desi-tadka-caterers', category: 'caterers', city: 'Karachi', area: 'Nazimabad', description: 'Pure desi catering — biryani, qorma, kebabs, and traditional sweets. Large capacity up to 2000 guests.', shortDescription: 'Karachi pure desi catering — 2000 capacity', startingPrice: 550, priceMax: 1800, rating: 4.5, reviewCount: 67, bookingCount: 89, responseTime: '~2 hours', yearsActive: 6, verified: false, featured: false, premium: false, tags: ['Desi', 'Biryani', 'Large capacity', 'Budget'], services: ['Main course', 'Dessert', 'Waitstaff', 'Crockery'], teamSize: '35+ people', phone: '+92 321 3334445', whatsapp: '+92 321 3334445', instagram: '@desitadkakhi', address: 'Nazimabad, Karachi' },

  // Makeup
  { businessName: 'Bella Bridal Studio', slug: 'bella-bridal-studio', category: 'makeup', city: 'Karachi', area: 'DHA Phase 7', description: 'Premium bridal makeup with HD base and airbrush finish. Trial sessions included. On-location available.', shortDescription: 'Karachi premium bridal makeup — HD + airbrush', startingPrice: 22000, priceMax: 120000, rating: 4.8, reviewCount: 89, bookingCount: 112, responseTime: '~1 hour', yearsActive: 6, verified: true, featured: false, premium: true, tags: ['HD glam', 'Airbrush', 'Bridal', 'On-location'], services: ['Bridal makeup', 'Party makeup', 'Trial', 'Hair', 'Draping'], teamSize: '3 people', phone: '+92 321 5556677', whatsapp: '+92 321 5556677', instagram: '@bellabridalkhi', address: 'DHA Phase 7, Karachi' },
  { businessName: 'Glam by Sana', slug: 'glam-by-sana', category: 'makeup', city: 'Lahore', area: 'Model Town', description: 'Natural glam bridal makeup. Soft and dewy looks. Affordable packages for all functions.', shortDescription: 'Lahore natural glam bridal makeup', startingPrice: 15000, priceMax: 80000, rating: 4.6, reviewCount: 54, bookingCount: 67, responseTime: '~2 hours', yearsActive: 4, verified: false, featured: false, premium: false, tags: ['Natural glam', 'Dewy', 'Affordable'], services: ['Bridal makeup', 'Party makeup', 'Hair', 'Draping'], teamSize: 'Solo + 1', phone: '+92 300 4445556', whatsapp: '+92 300 4445556', instagram: '@glambysana', address: 'Model Town, Lahore' },
  { businessName: 'Makeover Magic Studio', slug: 'makeover-magic-studio', category: 'makeup', city: 'Faisalabad', area: 'Katchery Bazaar', description: 'Bridal and party makeup. Traditional and modern looks. Home studio with premium products.', shortDescription: 'Faisalabad bridal & party makeup studio', startingPrice: 10000, priceMax: 50000, rating: 4.4, reviewCount: 32, bookingCount: 43, responseTime: '~3 hours', yearsActive: 3, verified: false, featured: false, premium: false, tags: ['Budget', 'Bridal', 'Party'], services: ['Bridal makeup', 'Party makeup', 'Hair'], teamSize: 'Solo', phone: '+92 300 7778889', whatsapp: '+92 300 7778889', instagram: '@makeovermagicfsd', address: 'Katchery Bazaar, Faisalabad' },

  // Venues
  { businessName: 'Crystal Hall Lahore', slug: 'crystal-hall-lahore', category: 'venues', city: 'Lahore', area: 'Ferozepur Road', description: 'Modern banquet hall with AC, capacity 800. In-house decor team and ample parking.', shortDescription: 'Lahore modern AC banquet hall — 800 capacity', startingPrice: 200000, priceMax: 1200000, rating: 4.5, reviewCount: 45, bookingCount: 56, responseTime: '~2 hours', yearsActive: 4, verified: true, featured: false, premium: false, tags: ['AC', '800 capacity', 'Parking', 'In-house decor'], services: ['Hall rental', 'In-house decor', 'Bridal room', 'Parking'], teamSize: '20+ staff', phone: '+92 42 3555666', whatsapp: '+92 300 3555666', instagram: '@crystalhalllhr', address: 'Ferozepur Road, Lahore' },
  { businessName: 'Skyline Banquet Karachi', slug: 'skyline-banquet-karachi', category: 'venues', city: 'Karachi', area: 'Gulshan-e-Iqbal', description: 'Rooftop banquet with city views. Perfect for mehndi and engagement. Capacity 500.', shortDescription: 'Karachi rooftop banquet with city views', startingPrice: 180000, priceMax: 800000, rating: 4.6, reviewCount: 38, bookingCount: 49, responseTime: '~3 hours', yearsActive: 3, verified: true, featured: false, premium: false, tags: ['Rooftop', 'City views', '500 capacity', 'Mehndi'], services: ['Hall rental', 'Rooftop', 'Bridal room', 'Parking'], teamSize: '15+ staff', phone: '+92 21 1112223', whatsapp: '+92 321 1112223', instagram: '@skylinebanquetkhi', address: 'Gulshan-e-Iqbal, Karachi' },
  { businessName: 'Margala View Farmhouse', slug: 'margala-view-farmhouse', category: 'venues', city: 'Islamabad', area: 'Bari Imam', description: 'Outdoor farmhouse with Margala hills backdrop. Lush lawns, poolside, and marquee. Capacity 1000.', shortDescription: 'Islamabad farmhouse with Margala views', startingPrice: 280000, priceMax: 1500000, rating: 4.7, reviewCount: 29, bookingCount: 37, responseTime: '~4 hours', yearsActive: 5, verified: true, featured: false, premium: true, tags: ['Outdoor', 'Farmhouse', 'Margala view', '1000 capacity'], services: ['Lawn rental', 'Marquee', 'Poolside', 'Parking', 'Security'], teamSize: '20+ staff', phone: '+92 51 2223334', whatsapp: '+92 345 2223334', instagram: '@margalaview', address: 'Bari Imam, Islamabad' },

  // DJ
  { businessName: 'Party Pulse DJs', slug: 'party-pulse-djs', category: 'dj', city: 'Islamabad', area: 'F-10', description: 'Professional DJs for weddings and parties. Bollywood, EDM, desi mix. Sound + lighting included.', shortDescription: 'Islamabad professional wedding DJs', startingPrice: 30000, priceMax: 120000, rating: 4.5, reviewCount: 34, bookingCount: 45, responseTime: '~2 hours', yearsActive: 4, verified: false, featured: false, premium: false, tags: ['Bollywood', 'EDM', 'Desi', 'Sound system'], services: ['DJ', 'Sound system', 'Lighting', 'MC'], teamSize: '2 people', phone: '+92 333 4445556', whatsapp: '+92 333 4445556', instagram: '@partypulseisb', address: 'F-10, Islamabad' },
  { businessName: 'Rhythm and Beats', slug: 'rhythm-and-beats', category: 'dj', city: 'Karachi', area: 'Korangi', description: 'Wedding DJs with vast desi + Bollywood library. Live dholak fusion available. Affordable packages.', shortDescription: 'Karachi wedding DJs — desi + dholak fusion', startingPrice: 25000, priceMax: 90000, rating: 4.4, reviewCount: 28, bookingCount: 39, responseTime: '~3 hours', yearsActive: 3, verified: false, featured: false, premium: false, tags: ['Desi', 'Bollywood', 'Dholak', 'Budget'], services: ['DJ', 'Sound system', 'Dholak', 'Lighting'], teamSize: '2 people', phone: '+92 300 8889900', whatsapp: '+92 300 8889900', instagram: '@rhythmandbeats', address: 'Korangi, Karachi' },

  // Mehndi
  { businessName: 'Henna Hands Studio', slug: 'henna-hands-studio', category: 'mehndi', city: 'Islamabad', area: 'Bahria Town Phase 4', description: 'Intricate bridal and party mehndi. Arabic, Indian, and fusion styles. Organic henna for deep stain.', shortDescription: 'Islamabad intricate bridal mehndi', startingPrice: 5000, priceMax: 30000, rating: 4.7, reviewCount: 41, bookingCount: 53, responseTime: '~2 hours', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['Bridal', 'Arabic', 'Indian', 'Organic henna'], services: ['Bridal henna', 'Party henna', 'Family henna', 'On-location'], teamSize: 'Solo + 1', phone: '+92 345 6667778', whatsapp: '+92 345 6667778', instagram: '@hennahandsisb', address: 'Bahria Town Phase 4, Islamabad' },
  { businessName: 'Mehndi Art by Zara', slug: 'mehndi-art-by-zara', category: 'mehndi', city: 'Lahore', area: 'Cantt', description: 'Creative and unique mehndi designs. Bridal packages with aftercare. Quick party mehndi available.', shortDescription: 'Lahore creative bridal mehndi designs', startingPrice: 4000, priceMax: 25000, rating: 4.6, reviewCount: 37, bookingCount: 48, responseTime: '~3 hours', yearsActive: 4, verified: false, featured: false, premium: false, tags: ['Creative', 'Bridal', 'Party', 'Aftercare'], services: ['Bridal henna', 'Party henna', 'Custom designs'], teamSize: 'Solo', phone: '+92 300 1112223', whatsapp: '+92 300 1112223', instagram: '@mehndiartzara', address: 'Cantt, Lahore' },

  // Invitations
  { businessName: 'Creative Cards Co', slug: 'creative-cards-co', category: 'invitations', city: 'Islamabad', area: 'Blue Area', description: 'Modern wedding invitation cards. Foil printing, laser cut, and digital invites. Custom monograms.', shortDescription: 'Islamabad modern wedding invitations', startingPrice: 200, priceMax: 2000, rating: 4.5, reviewCount: 23, bookingCount: 31, responseTime: '~4 hours', yearsActive: 4, verified: false, featured: false, premium: false, tags: ['Foil printing', 'Laser cut', 'Digital', 'Custom'], services: ['Card design', 'Foil printing', 'Laser cut', 'Digital invites'], teamSize: '5 people', phone: '+92 51 4445556', whatsapp: '+92 345 4445556', instagram: '@creativecardsisb', address: 'Blue Area, Islamabad' },
  { businessName: 'E-Invite Studio', slug: 'e-invite-studio', category: 'invitations', city: 'Lahore', area: 'Johar Town', description: 'Animated digital wedding invitations. WhatsApp shareable, RSVP tracking, custom music.', shortDescription: 'Lahore animated digital wedding invites', startingPrice: 3000, priceMax: 20000, rating: 4.6, reviewCount: 31, bookingCount: 42, responseTime: '~1 hour', yearsActive: 2, verified: true, featured: false, premium: false, tags: ['Digital', 'Animated', 'WhatsApp', 'RSVP'], services: ['Digital invite', 'Animation', 'RSVP', 'Custom design'], teamSize: '3 people', phone: '+92 300 5556667', whatsapp: '+92 300 5556667', instagram: '@einvitestudio', address: 'Johar Town, Lahore' },
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
  console.log('🌱 Adding more vendors...')

  let added = 0
  for (const v of MORE_VENDORS) {
    const existing = await db.vendor.findUnique({ where: { slug: v.slug } })
    if (existing) {
      console.log(`  ⏭  ${v.slug} exists`)
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
  console.log('✓ Updated counts')

  console.log(`\n✅ Done! Total vendors: ${await db.vendor.count()}`)
}

main()
  .catch((e) => { console.error('Error:', e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })
