import { db } from '@/lib/db'

// Add new cities and vendors for Multan, Rawalpindi, Peshawar
const NEW_CITIES = [
  { name: 'Multan', slug: 'multan' },
  { name: 'Rawalpindi', slug: 'rawalpindi' },
  { name: 'Peshawar', slug: 'peshawar' },
]

const NEW_VENDORS = [
  // ===== MULTAN =====
  { businessName: 'Multan Wedding Studio', slug: 'multan-wedding-studio', category: 'photographers', city: 'Multan', area: 'Bosan Road', description: 'Multan ki top wedding photography team. Traditional + cinematic coverage for baraat, mehndi, valima.', shortDescription: 'Multan top wedding photographers', startingPrice: 45000, priceMax: 250000, rating: 4.6, reviewCount: 34, bookingCount: 45, responseTime: '~3 hours', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['Traditional', 'Cinematic', 'Candid'], services: ['Baraat', 'Mehndi', 'Valima', 'Pre-wedding'], teamSize: '3 people', phone: '+92 300 1110001', whatsapp: '+92 300 1110001', instagram: '@multanweddingstudio', address: 'Bosan Road, Multan' },
  { businessName: 'Sufi Decor Multan', slug: 'sufi-decor-multan', category: 'decorators', city: 'Multan', area: 'Chungi No 14', description: 'Multan ki famous wedding decorators. Stage, florals, lighting — sab kuch under one roof. Affordable packages.', shortDescription: 'Multan famous wedding decorators', startingPrice: 35000, priceMax: 300000, rating: 4.5, reviewCount: 28, bookingCount: 37, responseTime: '~4 hours', yearsActive: 4, verified: false, featured: false, premium: false, tags: ['Stage', 'Florals', 'Lighting', 'Affordable'], services: ['Stage decor', 'Florals', 'Lighting', 'Full venue'], teamSize: '8 people', phone: '+92 300 1110002', whatsapp: '+92 300 1110002', instagram: '@sufidecormultan', address: 'Chungi No 14, Multan' },
  { businessName: 'Shahi Dastarkhwan Multan', slug: 'shahi-dastarkhwan-multan', category: 'caterers', city: 'Multan', area: 'Vehari Road', description: 'Multan ki shahi catering — biryani, qorma, kebabs, aur traditional sweets. 50 to 2000 guests.', shortDescription: 'Multan shahi catering — biryani & kebabs', startingPrice: 500, priceMax: 1800, rating: 4.5, reviewCount: 41, bookingCount: 53, responseTime: '~2 hours', yearsActive: 7, verified: true, featured: false, premium: false, tags: ['Biryani', 'Kebabs', 'Traditional', '2000 guests'], services: ['Main course', 'BBQ', 'Dessert', 'Waitstaff'], teamSize: '25+ people', phone: '+92 300 1110003', whatsapp: '+92 300 1110003', instagram: '@shahidastarkhwan', address: 'Vehari Road, Multan' },
  { businessName: 'Bridal Glow Multan', slug: 'bridal-glow-multan', category: 'makeup', city: 'Multan', area: 'Gulgasht Colony', description: 'Multan ki trusted bridal makeup artist. HD glam, dewy finish, aur traditional bridal looks.', shortDescription: 'Multan trusted bridal makeup artist', startingPrice: 15000, priceMax: 70000, rating: 4.6, reviewCount: 23, bookingCount: 31, responseTime: '~3 hours', yearsActive: 4, verified: false, featured: false, premium: false, tags: ['HD glam', 'Bridal', 'Dewy'], services: ['Bridal makeup', 'Party makeup', 'Hair', 'Draping'], teamSize: 'Solo + 1', phone: '+92 300 1110004', whatsapp: '+92 300 1110004', instagram: '@bridalglowmultan', address: 'Gulgasht Colony, Multan' },
  { businessName: 'Grand Marquee Multan', slug: 'grand-marquee-multan', category: 'venues', city: 'Multan', area: 'Northern Bypass', description: 'Multan ka grand marquee — AC hall, 1000 capacity, ample parking. Perfect for baraat aur valima.', shortDescription: 'Multan grand marquee — 1000 capacity AC', startingPrice: 180000, priceMax: 900000, rating: 4.4, reviewCount: 19, bookingCount: 25, responseTime: '~4 hours', yearsActive: 3, verified: false, featured: false, premium: false, tags: ['AC', '1000 capacity', 'Parking'], services: ['Hall rental', 'In-house decor', 'Bridal room', 'Parking'], teamSize: '15+ staff', phone: '+92 300 1110005', whatsapp: '+92 300 1110005', instagram: '@grandmarqueemultan', address: 'Northern Bypass, Multan' },

  // ===== RAWALPINDI =====
  { businessName: 'Pindi Wedding Films', slug: 'pindi-wedding-films', category: 'photographers', city: 'Rawalpindi', area: 'Saddar', description: 'Rawalpindi ki rising wedding photography team. Cinematic films aur candid photography.', shortDescription: 'Rawalpindi rising wedding photography', startingPrice: 55000, priceMax: 280000, rating: 4.7, reviewCount: 31, bookingCount: 42, responseTime: '~2 hours', yearsActive: 4, verified: true, featured: false, premium: false, tags: ['Cinematic', 'Candid', 'Film'], services: ['Baraat', 'Mehndi', 'Pre-wedding', 'Film'], teamSize: '3 people', phone: '+92 300 2220001', whatsapp: '+92 300 2220001', instagram: '@pindiweddingfilms', address: 'Saddar, Rawalpindi' },
  { businessName: 'Royal Events Pindi', slug: 'royal-events-pindi', category: 'decorators', city: 'Rawalpindi', area: 'Commercial Market', description: 'Rawalpindi ki premium wedding decor. Stage design, floral arrangements, aur complete venue setup.', shortDescription: 'Rawalpindi premium wedding decor', startingPrice: 55000, priceMax: 450000, rating: 4.6, reviewCount: 26, bookingCount: 34, responseTime: '~3 hours', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['Premium', 'Stage', 'Florals', 'Complete'], services: ['Stage decor', 'Florals', 'Lighting', 'Full venue'], teamSize: '12 people', phone: '+92 300 2220002', whatsapp: '+92 300 2220002', instagram: '@royaleventspindi', address: 'Commercial Market, Rawalpindi' },
  { businessName: 'Pindi Kitchen Caterers', slug: 'pindi-kitchen-caterers', category: 'caterers', city: 'Rawalpindi', area: 'Westridge', description: 'Rawalpindi ki best caterers — desi aur continental menu. Live BBQ counters aur premium dessert tables.', shortDescription: 'Rawalpindi best caterers — desi & continental', startingPrice: 650, priceMax: 2200, rating: 4.6, reviewCount: 38, bookingCount: 49, responseTime: '~2 hours', yearsActive: 6, verified: true, featured: false, premium: false, tags: ['Desi', 'Continental', 'BBQ', 'Live counters'], services: ['Main course', 'BBQ', 'Dessert', 'Waitstaff'], teamSize: '20+ people', phone: '+92 300 2220003', whatsapp: '+92 300 2220003', instagram: '@pindikitchen', address: 'Westridge, Rawalpindi' },
  { businessName: 'Glam Studio Pindi', slug: 'glam-studio-pindi', category: 'makeup', city: 'Rawalpindi', area: 'Bahria Town Phase 7', description: 'Rawalpindi ki premium bridal makeup studio. HD base, airbrush, aur flawless bridal looks.', shortDescription: 'Rawalpindi premium bridal makeup studio', startingPrice: 20000, priceMax: 90000, rating: 4.7, reviewCount: 29, bookingCount: 38, responseTime: '~2 hours', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['HD glam', 'Airbrush', 'Bridal', 'Premium'], services: ['Bridal makeup', 'Party makeup', 'Trial', 'Hair'], teamSize: '2 people', phone: '+92 300 2220004', whatsapp: '+92 300 2220004', instagram: '@glamstudiopindi', address: 'Bahria Town Phase 7, Rawalpindi' },
  { businessName: 'Crystal Ballroom Pindi', slug: 'crystal-ballroom-pindi', category: 'venues', city: 'Rawalpindi', area: 'Murree Road', description: 'Rawalpindi ka luxury banquet hall — AC, 600 capacity, grand chandeliers. Perfect for grand weddings.', shortDescription: 'Rawalpindi luxury banquet — 600 capacity', startingPrice: 220000, priceMax: 1000000, rating: 4.5, reviewCount: 22, bookingCount: 29, responseTime: '~3 hours', yearsActive: 4, verified: true, featured: false, premium: true, tags: ['Luxury', 'AC', '600 capacity', 'Chandeliers'], services: ['Hall rental', 'In-house decor', 'Bridal room', 'Valet parking'], teamSize: '20+ staff', phone: '+92 300 2220005', whatsapp: '+92 300 2220005', instagram: '@crystalballroompindi', address: 'Murree Road, Rawalpindi' },

  // ===== PESHAWAR =====
  { businessName: 'Khyber Wedding Photos', slug: 'khyber-wedding-photos', category: 'photographers', city: 'Peshawar', area: 'University Road', description: 'Peshawar ki trusted wedding photographers. Traditional Pashtun wedding coverage + cinematic films.', shortDescription: 'Peshawar trusted wedding photographers', startingPrice: 40000, priceMax: 200000, rating: 4.5, reviewCount: 25, bookingCount: 33, responseTime: '~3 hours', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['Traditional', 'Cinematic', 'Pashtun weddings'], services: ['Baraat', 'Mehndi', 'Valima', 'Film'], teamSize: '2 people', phone: '+92 300 3330001', whatsapp: '+92 300 3330001', instagram: '@khyberweddingphotos', address: 'University Road, Peshawar' },
  { businessName: 'Peshawar Decor Hub', slug: 'peshawar-decor-hub', category: 'decorators', city: 'Peshawar', area: 'Hayatabad', description: 'Peshawar ki modern wedding decor. Stage, florals, lighting — contemporary aur traditional themes.', shortDescription: 'Peshawar modern wedding decor', startingPrice: 38000, priceMax: 280000, rating: 4.4, reviewCount: 20, bookingCount: 27, responseTime: '~4 hours', yearsActive: 3, verified: false, featured: false, premium: false, tags: ['Modern', 'Stage', 'Florals', 'Traditional'], services: ['Stage decor', 'Florals', 'Lighting'], teamSize: '7 people', phone: '+92 300 3330002', whatsapp: '+92 300 3330002', instagram: '@peshawardecorhub', address: 'Hayatabad, Peshawar' },
  { businessName: 'Khyber Caterers', slug: 'khyber-caterers', category: 'caterers', city: 'Peshawar', area: 'Cantt', description: 'Peshawar ki famous caterers — traditional Pashtun cuisine, BBQ, aur desi dishes. 100 to 1500 guests.', shortDescription: 'Peshawar famous caterers — Pashtun cuisine', startingPrice: 550, priceMax: 2000, rating: 4.5, reviewCount: 33, bookingCount: 43, responseTime: '~2 hours', yearsActive: 8, verified: true, featured: false, premium: false, tags: ['Pashtun cuisine', 'BBQ', 'Desi', '1500 guests'], services: ['Main course', 'BBQ', 'Dessert', 'Waitstaff'], teamSize: '22+ people', phone: '+92 300 3330003', whatsapp: '+92 300 3330003', instagram: '@khybercaterers', address: 'Cantt, Peshawar' },
  { businessName: 'Bridal Beauty Peshawar', slug: 'bridal-beauty-peshawar', category: 'makeup', city: 'Peshawar', area: 'Saddar', description: 'Peshawar ki trusted bridal makeup artist. Natural glam aur traditional bridal looks.', shortDescription: 'Peshawar trusted bridal makeup artist', startingPrice: 12000, priceMax: 60000, rating: 4.4, reviewCount: 18, bookingCount: 24, responseTime: '~3 hours', yearsActive: 3, verified: false, featured: false, premium: false, tags: ['Natural glam', 'Bridal', 'Traditional'], services: ['Bridal makeup', 'Party makeup', 'Hair'], teamSize: 'Solo + 1', phone: '+92 300 3330004', whatsapp: '+92 300 3330004', instagram: '@bridalbeautypeshawar', address: 'Saddar, Peshawar' },
  { businessName: 'Grand Hall Peshawar', slug: 'grand-hall-peshawar', category: 'venues', city: 'Peshawar', area: 'Ring Road', description: 'Peshawar ka grand banquet hall — AC, 700 capacity, ample parking. Baraat, mehndi, valima ke liye.', shortDescription: 'Peshawar grand banquet — 700 capacity AC', startingPrice: 200000, priceMax: 800000, rating: 4.3, reviewCount: 16, bookingCount: 21, responseTime: '~4 hours', yearsActive: 3, verified: false, featured: false, premium: false, tags: ['AC', '700 capacity', 'Parking'], services: ['Hall rental', 'In-house decor', 'Bridal room', 'Parking'], teamSize: '15+ staff', phone: '+92 300 3330005', whatsapp: '+92 300 3330005', instagram: '@grandhallpeshawar', address: 'Ring Road, Peshawar' },
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
  console.log('🏙️ Adding new cities...')

  for (const city of NEW_CITIES) {
    const existing = await db.city.findUnique({ where: { slug: city.slug } })
    if (existing) {
      console.log(`  ⏭  ${city.name} already exists`)
    } else {
      await db.city.create({ data: city })
      console.log(`  ✓ Added city: ${city.name}`)
    }
  }

  console.log('\n👥 Adding vendors for new cities...')

  let added = 0
  for (const v of NEW_VENDORS) {
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

  // Update all category & city counts
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
  console.log('✓ Updated all counts')

  console.log(`\n✅ Done! Total vendors: ${await db.vendor.count()}`)
  console.log('Cities:')
  const allCities = await db.city.findMany({ orderBy: { name: 'asc' } })
  allCities.forEach(c => console.log(`  ${c.name}: ${c.vendorCount} vendors`))
}

main()
  .catch((e) => { console.error('Error:', e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })
