import { db } from '@/lib/db'

// 25 more vendors to reach 98 total
const MORE_VENDORS = [
  // Photographers (5)
  { businessName: 'Studio 24 Photography', slug: 'studio-24-photography', category: 'photographers', city: 'Lahore', area: 'Model Town', description: 'Premium wedding photography with a modern editorial style. Pre-wedding, baraat, valima coverage.', shortDescription: 'Lahore premium editorial wedding photography', startingPrice: 85000, priceMax: 400000, rating: 4.7, reviewCount: 45, bookingCount: 58, responseTime: '~2 hours', yearsActive: 6, verified: true, featured: false, premium: false, tags: ['Editorial', 'Modern', 'Premium'], services: ['Baraat', 'Valima', 'Pre-wedding', 'Film'], teamSize: '4 people', phone: '+92 300 1002001', whatsapp: '+92 300 1002001', instagram: '@studio24lhr', address: 'Model Town, Lahore' },
  { businessName: 'Snap Studio Karachi', slug: 'snap-studio-karachi', category: 'photographers', city: 'Karachi', area: 'Clifton', description: 'Candid wedding photography specialists. Real moments, real emotions. Affordable packages.', shortDescription: 'Karachi candid wedding photography', startingPrice: 45000, priceMax: 200000, rating: 4.5, reviewCount: 38, bookingCount: 49, responseTime: '~3 hours', yearsActive: 4, verified: false, featured: false, premium: false, tags: ['Candid', 'Budget', 'Affordable'], services: ['Baraat', 'Mehndi', 'Portraits'], teamSize: '2 people', phone: '+92 321 1002002', whatsapp: '+92 321 1002002', instagram: '@snapstudiokhi', address: 'Clifton, Karachi' },
  { businessName: 'Flash Works Islamabad', slug: 'flash-works-islamabad', category: 'photographers', city: 'Islamabad', area: 'F-8', description: 'Professional wedding photography and videography. 4K cinematic films, drone shots, same-day teasers.', shortDescription: 'Islamabad 4K cinematic wedding films', startingPrice: 70000, priceMax: 350000, rating: 4.6, reviewCount: 29, bookingCount: 37, responseTime: '~2 hours', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['4K', 'Cinematic', 'Drone'], services: ['Wedding film', 'Baraat', 'Drone', 'Teaser'], teamSize: '3 people', phone: '+92 333 1002003', whatsapp: '+92 333 1002003', instagram: '@flashworksisb', address: 'F-8, Islamabad' },
  { businessName: 'Click Art Faisalabad', slug: 'click-art-faisalabad', category: 'photographers', city: 'Faisalabad', area: 'D Ground', description: 'Traditional + candid wedding photography. Family portraits and event coverage.', shortDescription: 'Faisalabad traditional + candid photography', startingPrice: 35000, priceMax: 150000, rating: 4.4, reviewCount: 22, bookingCount: 28, responseTime: '~4 hours', yearsActive: 5, verified: false, featured: false, premium: false, tags: ['Traditional', 'Budget', 'Family portraits'], services: ['Baraat', 'Mehndi', 'Portraits'], teamSize: '2 people', phone: '+92 300 1002004', whatsapp: '+92 300 1002004', instagram: '@clickartfsd', address: 'D Ground, Faisalabad' },
  { businessName: 'Vision Photography Multan', slug: 'vision-photography-multan', category: 'photographers', city: 'Multan', area: 'Bosan Road', description: 'Cinematic wedding photography and films. Traditional and modern styles.', shortDescription: 'Multan cinematic wedding photography', startingPrice: 40000, priceMax: 180000, rating: 4.5, reviewCount: 18, bookingCount: 24, responseTime: '~3 hours', yearsActive: 4, verified: false, featured: false, premium: false, tags: ['Cinematic', 'Traditional', 'Budget'], services: ['Baraat', 'Mehndi', 'Film'], teamSize: '2 people', phone: '+92 300 1002005', whatsapp: '+92 300 1002005', instagram: '@visionphotomultan', address: 'Bosan Road, Multan' },

  // Decorators (5)
  { businessName: 'Petals & Pearls Decor', slug: 'petals-and-pearls-decor', category: 'decorators', city: 'Lahore', area: 'Gulberg', description: 'Luxury wedding decor with imported flowers. Stage, entrance, table settings — bespoke designs.', shortDescription: 'Lahore luxury decor with imported flowers', startingPrice: 100000, priceMax: 800000, rating: 4.8, reviewCount: 41, bookingCount: 53, responseTime: '~1 hour', yearsActive: 7, verified: true, featured: false, premium: true, tags: ['Luxury', 'Imported flowers', 'Bespoke'], services: ['Stage', 'Entrance', 'Florals', 'Full venue'], teamSize: '18 people', phone: '+92 300 1002006', whatsapp: '+92 300 1002006', instagram: '@petalspearlsdecor', address: 'Gulberg, Lahore' },
  { businessName: 'Creative Decor Karachi', slug: 'creative-decor-karachi', category: 'decorators', city: 'Karachi', area: 'DHA Phase 5', description: 'Modern wedding decor — minimalist, chic, contemporary. Perfect for intimate weddings.', shortDescription: 'Karachi modern minimalist decor', startingPrice: 50000, priceMax: 350000, rating: 4.6, reviewCount: 33, bookingCount: 42, responseTime: '~2 hours', yearsActive: 4, verified: true, featured: false, premium: false, tags: ['Modern', 'Minimalist', 'Chic'], services: ['Stage', 'Florals', 'Lighting'], teamSize: '9 people', phone: '+92 321 1002007', whatsapp: '+92 321 1002007', instagram: '@creativedecorkhi', address: 'DHA Phase 5, Karachi' },
  { businessName: 'Royal Touch Decor', slug: 'royal-touch-decor', category: 'decorators', city: 'Islamabad', area: 'G-9', description: 'Royal Mughal-themed wedding decor. Grand stages, chandeliers, opulent setups.', shortDescription: 'Islamabad royal Mughal-themed decor', startingPrice: 90000, priceMax: 700000, rating: 4.7, reviewCount: 26, bookingCount: 33, responseTime: '~3 hours', yearsActive: 6, verified: true, featured: false, premium: false, tags: ['Royal', 'Mughal', 'Grand'], services: ['Stage', 'Chandeliers', 'Full venue'], teamSize: '15 people', phone: '+92 333 1002008', whatsapp: '+92 333 1002008', instagram: '@royaltouchdecor', address: 'G-9, Islamabad' },
  { businessName: 'Budget Decor Plus', slug: 'budget-decor-plus', category: 'decorators', city: 'Faisalabad', area: 'Jaranwala Road', description: 'Affordable wedding decor for mehndi, baraat, and valima. Quick setup, reliable service.', shortDescription: 'Faisalabad affordable wedding decor', startingPrice: 20000, priceMax: 120000, rating: 4.3, reviewCount: 19, bookingCount: 25, responseTime: '~4 hours', yearsActive: 3, verified: false, featured: false, premium: false, tags: ['Budget', 'Mehndi', 'Quick setup'], services: ['Mehndi decor', 'Stage', 'Florals'], teamSize: '5 people', phone: '+92 300 1002009', whatsapp: '+92 300 1002009', instagram: '@budgetdecorplus', address: 'Jaranwala Road, Faisalabad' },
  { businessName: 'Heritage Decor Pindi', slug: 'heritage-decor-pindi', category: 'decorators', city: 'Rawalpindi', area: 'Saddar', description: 'Traditional Pakistani wedding decor with a modern twist. Stage, florals, lighting.', shortDescription: 'Rawalpindi traditional + modern decor', startingPrice: 45000, priceMax: 300000, rating: 4.5, reviewCount: 21, bookingCount: 27, responseTime: '~3 hours', yearsActive: 4, verified: false, featured: false, premium: false, tags: ['Traditional', 'Modern', 'Stage'], services: ['Stage', 'Florals', 'Lighting'], teamSize: '8 people', phone: '+92 300 1002010', whatsapp: '+92 300 1002010', instagram: '@heritagedecorpindi', address: 'Saddar, Rawalpindi' },

  // Caterers (5)
  { businessName: 'Feast Masters Lahore', slug: 'feast-masters-lahore', category: 'caterers', city: 'Lahore', area: 'Johar Town', description: 'Premium catering with live counters. Desi, continental, BBQ, and dessert tables. 100-3000 guests.', shortDescription: 'Lahore premium catering with live counters', startingPrice: 750, priceMax: 2800, rating: 4.7, reviewCount: 62, bookingCount: 78, responseTime: '~1 hour', yearsActive: 9, verified: true, featured: false, premium: true, tags: ['Premium', 'Live counters', '3000 guests'], services: ['Main course', 'BBQ', 'Live counters', 'Dessert', 'Waitstaff'], teamSize: '40+ people', phone: '+92 300 1002011', whatsapp: '+92 300 1002011', instagram: '@feastmasterslhr', address: 'Johar Town, Lahore' },
  { businessName: 'Taste of Karachi Caterers', slug: 'taste-of-karachi-caterers', category: 'caterers', city: 'Karachi', area: 'North Nazimabad', description: 'Authentic Karachi biryani and BBQ. Live seekh kebab counter. 100-2000 guests capacity.', shortDescription: 'Karachi authentic biryani & BBQ caterers', startingPrice: 600, priceMax: 2200, rating: 4.6, reviewCount: 48, bookingCount: 61, responseTime: '~2 hours', yearsActive: 7, verified: true, featured: false, premium: false, tags: ['Biryani', 'BBQ', '2000 guests'], services: ['Main course', 'BBQ', 'Dessert', 'Waitstaff'], teamSize: '30+ people', phone: '+92 321 1002012', whatsapp: '+92 321 1002012', instagram: '@tasteofkarachi', address: 'North Nazimabad, Karachi' },
  { businessName: 'Capital Catering Islamabad', slug: 'capital-catering-islamabad', category: 'caterers', city: 'Islamabad', area: 'G-10', description: 'Continental and desi catering. Premium presentation, hygienic kitchen, trained staff.', shortDescription: 'Islamabad continental + desi catering', startingPrice: 800, priceMax: 3000, rating: 4.6, reviewCount: 35, bookingCount: 44, responseTime: '~2 hours', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['Continental', 'Desi', 'Premium'], services: ['Main course', 'BBQ', 'Dessert', 'Waitstaff'], teamSize: '25+ people', phone: '+92 333 1002013', whatsapp: '+92 333 1002013', instagram: '@capitalcateringisb', address: 'G-10, Islamabad' },
  { businessName: 'Traditional Taste FSD', slug: 'traditional-taste-fsd', category: 'caterers', city: 'Faisalabad', area: 'People Colony', description: 'Traditional Punjabi catering. Biryani, qorma, kebabs, and fresh desserts. Budget-friendly.', shortDescription: 'Faisalabad traditional Punjabi catering', startingPrice: 500, priceMax: 1600, rating: 4.4, reviewCount: 27, bookingCount: 35, responseTime: '~3 hours', yearsActive: 6, verified: false, featured: false, premium: false, tags: ['Traditional', 'Punjabi', 'Budget'], services: ['Main course', 'Dessert', 'Waitstaff'], teamSize: '18+ people', phone: '+92 300 1002014', whatsapp: '+92 300 1002014', instagram: '@traditionaltastefsd', address: 'People Colony, Faisalabad' },
  { businessName: 'Mughlai Caterers Multan', slug: 'mughlai-caterers-multan', category: 'caterers', city: 'Multan', area: 'Bosan Road', description: 'Mughlai cuisine specialists. Rich curries, kebabs, and traditional sweets. 100-1500 guests.', shortDescription: 'Multan Mughlai cuisine caterers', startingPrice: 550, priceMax: 2000, rating: 4.5, reviewCount: 23, bookingCount: 30, responseTime: '~2 hours', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['Mughlai', 'Kebabs', '1500 guests'], services: ['Main course', 'BBQ', 'Dessert', 'Waitstaff'], teamSize: '20+ people', phone: '+92 300 1002015', whatsapp: '+92 300 1002015', instagram: '@mughlaicaterers', address: 'Bosan Road, Multan' },

  // Makeup (5)
  { businessName: 'Flawless Bridal Studio', slug: 'flawless-bridal-studio', category: 'makeup', city: 'Lahore', area: 'DHA Phase 5', description: 'Premium bridal makeup with airbrush base. Trial sessions, on-location service, all-day touch-ups.', shortDescription: 'Lahore premium airbrush bridal makeup', startingPrice: 28000, priceMax: 140000, rating: 4.8, reviewCount: 56, bookingCount: 71, responseTime: '~1 hour', yearsActive: 7, verified: true, featured: false, premium: true, tags: ['Airbrush', 'Premium', 'Trial', 'On-location'], services: ['Bridal makeup', 'Trial', 'Hair', 'Draping', 'Touch-ups'], teamSize: '4 people', phone: '+92 300 1002016', whatsapp: '+92 300 1002016', instagram: '@flawlessbridallhr', address: 'DHA Phase 5, Lahore' },
  { businessName: 'Glam Avenue Karachi', slug: 'glam-avenue-karachi', category: 'makeup', city: 'Karachi', area: 'Bahadurabad', description: 'HD bridal glam, party makeup, and engagement looks. Premium products, hygienic brushes.', shortDescription: 'Karachi HD bridal glam & party makeup', startingPrice: 18000, priceMax: 90000, rating: 4.6, reviewCount: 42, bookingCount: 53, responseTime: '~2 hours', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['HD glam', 'Bridal', 'Party'], services: ['Bridal makeup', 'Party makeup', 'Hair', 'Draping'], teamSize: '2 people', phone: '+92 321 1002017', whatsapp: '+92 321 1002017', instagram: '@glamavenuekhi', address: 'Bahadurabad, Karachi' },
  { businessName: 'Bridal Touch Islamabad', slug: 'bridal-touch-islamabad', category: 'makeup', city: 'Islamabad', area: 'F-7', description: 'Natural to glam bridal makeup. Soft dewy looks, HD base. Trial included.', shortDescription: 'Islamabad natural to glam bridal makeup', startingPrice: 22000, priceMax: 100000, rating: 4.7, reviewCount: 31, bookingCount: 40, responseTime: '~2 hours', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['Natural', 'Glam', 'HD', 'Trial'], services: ['Bridal makeup', 'Party makeup', 'Trial', 'Hair'], teamSize: '2 people', phone: '+92 333 1002018', whatsapp: '+92 333 1002018', instagram: '@bridaltouchisb', address: 'F-7, Islamabad' },
  { businessName: 'Pretty Faces FSD', slug: 'pretty-faces-fsd', category: 'makeup', city: 'Faisalabad', area: 'Susan Road', description: 'Affordable bridal and party makeup. Natural looks, HD base. Home studio.', shortDescription: 'Faisalabad affordable bridal makeup', startingPrice: 10000, priceMax: 45000, rating: 4.3, reviewCount: 18, bookingCount: 24, responseTime: '~3 hours', yearsActive: 3, verified: false, featured: false, premium: false, tags: ['Budget', 'Natural', 'HD'], services: ['Bridal makeup', 'Party makeup', 'Hair'], teamSize: 'Solo', phone: '+92 300 1002019', whatsapp: '+92 300 1002019', instagram: '@prettyfacesfsd', address: 'Susan Road, Faisalabad' },
  { businessName: 'Elegance Makeup Pindi', slug: 'elegance-makeup-pindi', category: 'makeup', city: 'Rawalpindi', area: 'Commercial Market', description: 'Bridal and party makeup. Traditional and modern looks. On-location available.', shortDescription: 'Rawalpindi bridal & party makeup', startingPrice: 16000, priceMax: 75000, rating: 4.5, reviewCount: 22, bookingCount: 29, responseTime: '~2 hours', yearsActive: 4, verified: false, featured: false, premium: false, tags: ['Bridal', 'Party', 'On-location'], services: ['Bridal makeup', 'Party makeup', 'Hair', 'Draping'], teamSize: 'Solo + 1', phone: '+92 300 1002020', whatsapp: '+92 300 1002020', instagram: '@elegancemakeup', address: 'Commercial Market, Rawalpindi' },

  // Venues (3)
  { businessName: 'Pearl Hall Lahore', slug: 'pearl-hall-lahore', category: 'venues', city: 'Lahore', area: 'Main Boulevard', description: 'Elegant AC banquet hall with 600 capacity. In-house decor, catering tie-ups, valet parking.', shortDescription: 'Lahore elegant AC banquet — 600 capacity', startingPrice: 220000, priceMax: 1100000, rating: 4.6, reviewCount: 34, bookingCount: 43, responseTime: '~2 hours', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['AC', '600 capacity', 'Valet'], services: ['Hall rental', 'In-house decor', 'Catering tie-ups', 'Bridal room'], teamSize: '18+ staff', phone: '+92 300 1002021', whatsapp: '+92 300 1002021', instagram: '@pearlhalllhr', address: 'Main Boulevard, Lahore' },
  { businessName: 'Skyline Marquee Karachi', slug: 'skyline-marquee-karachi', category: 'venues', city: 'Karachi', area: 'Super Highway', description: 'Grand marquee with 1500 capacity. AC halls, ample parking, in-house decor team.', shortDescription: 'Karachi grand marquee — 1500 capacity', startingPrice: 280000, priceMax: 1400000, rating: 4.5, reviewCount: 28, bookingCount: 36, responseTime: '~3 hours', yearsActive: 4, verified: true, featured: false, premium: false, tags: ['AC', '1500 capacity', 'Parking'], services: ['Hall rental', 'In-house decor', 'Catering tie-ups', 'Parking'], teamSize: '25+ staff', phone: '+92 321 1002022', whatsapp: '+92 321 1002022', instagram: '@skylinemarqueekhi', address: 'Super Highway, Karachi' },
  { businessName: 'Hill View Farmhouse ISB', slug: 'hill-view-farmhouse-isb', category: 'venues', city: 'Islamabad', area: 'Bani Gala', description: 'Outdoor farmhouse with Margala view. Lush lawns, poolside, backup marquee. 800 capacity.', shortDescription: 'Islamabad farmhouse with Margala view', startingPrice: 250000, priceMax: 1200000, rating: 4.6, reviewCount: 22, bookingCount: 28, responseTime: '~4 hours', yearsActive: 4, verified: true, featured: false, premium: false, tags: ['Outdoor', 'Farmhouse', 'Margala view', '800 capacity'], services: ['Lawn rental', 'Marquee', 'Poolside', 'Parking'], teamSize: '15+ staff', phone: '+92 333 1002023', whatsapp: '+92 333 1002023', instagram: '@hillviewfarmhouse', address: 'Bani Gala, Islamabad' },

  // DJ (1)
  { businessName: 'Vibe DJs Lahore', slug: 'vibe-djs-lahore', category: 'dj', city: 'Lahore', area: 'Cantt', description: 'Professional wedding DJs with desi + Bollywood + EDM mix. Sound system, lighting, MC services.', shortDescription: 'Lahore professional wedding DJs', startingPrice: 32000, priceMax: 130000, rating: 4.6, reviewCount: 31, bookingCount: 40, responseTime: '~1 hour', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['Desi', 'Bollywood', 'EDM', 'MC'], services: ['DJ', 'Sound system', 'Lighting', 'MC'], teamSize: '2 people', phone: '+92 300 1002024', whatsapp: '+92 300 1002024', instagram: '@vibedjslhr', address: 'Cantt, Lahore' },

  // Mehndi (1)
  { businessName: 'Henna Studio Karachi', slug: 'henna-studio-karachi', category: 'mehndi', city: 'Karachi', area: 'Clifton', description: 'Intricate bridal and party mehndi. Arabic, Indian, and fusion styles. Organic henna.', shortDescription: 'Karachi intricate bridal mehndi', startingPrice: 6000, priceMax: 35000, rating: 4.7, reviewCount: 35, bookingCount: 44, responseTime: '~2 hours', yearsActive: 5, verified: true, featured: false, premium: false, tags: ['Bridal', 'Arabic', 'Indian', 'Organic'], services: ['Bridal henna', 'Party henna', 'Family henna', 'On-location'], teamSize: 'Solo + 1', phone: '+92 321 1002025', whatsapp: '+92 321 1002025', instagram: '@hennastudiokhi', address: 'Clifton, Karachi' },
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
  console.log('🌱 Adding 25 more vendors...')

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

  // Update counts
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
  console.log(`\n✅ Total vendors: ${await db.vendor.count()}`)
}

main()
  .catch((e) => { console.error('Error:', e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })
