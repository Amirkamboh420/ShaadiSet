import { db } from '@/lib/db'

// Simple hash matching the signup/login routes (no crypto import)
function simpleHash(str: string): string {
  let hash = 0
  const salt = 'shaadiset2025'
  const input = salt + str
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36) + '_' + input.length.toString(36)
}

async function main() {
  console.log('👤 Seeding demo user...')

  // Check if demo user exists
  const existing = await db.user.findUnique({ where: { email: 'demo@shaadiset.pk' } })
  if (existing) {
    console.log('  ⏭  Demo user already exists')
  } else {
    await db.user.create({
      data: {
        name: 'Demo Customer',
        email: 'demo@shaadiset.pk',
        password: simpleHash('demo123'),
        phone: '+92 300 1234567',
        role: 'customer',
      },
    })
    console.log('  ✓ Demo user created: demo@shaadiset.pk / demo123')
  }

  // Also create a vendor user
  const vendorExisting = await db.user.findUnique({ where: { email: 'vendor@shaadiset.pk' } })
  if (vendorExisting) {
    console.log('  ⏭  Vendor user already exists')
  } else {
    await db.user.create({
      data: {
        name: 'Lens & Light Studios',
        email: 'vendor@shaadiset.pk',
        password: simpleHash('vendor123'),
        phone: '+92 300 1234567',
        role: 'vendor',
      },
    })
    console.log('  ✓ Vendor user created: vendor@shaadiset.pk / vendor123')
  }

  // Create an admin user
  const adminExisting = await db.user.findUnique({ where: { email: 'admin@shaadiset.pk' } })
  if (adminExisting) {
    console.log('  ⏭  Admin user already exists')
  } else {
    await db.user.create({
      data: {
        name: 'ShaadiSet Admin',
        email: 'admin@shaadiset.pk',
        password: simpleHash('admin123'),
        phone: '+92 300 0000000',
        role: 'admin',
      },
    })
    console.log('  ✓ Admin user created: admin@shaadiset.pk / admin123')
  }

  console.log('\n✅ Demo users ready!')
  console.log('  Customer: demo@shaadiset.pk / demo123')
  console.log('  Vendor:   vendor@shaadiset.pk / vendor123')
  console.log('  Admin:    admin@shaadiset.pk / admin123')
}

main()
  .catch((e) => { console.error('Seed error:', e); process.exit(1) })
  .finally(async () => { await db.$disconnect() })
