import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user only if it doesn't exist
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@jiretin.cz' }
  })

  if (!existingAdmin) {
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123'
    const hashedPassword = await bcrypt.hash(defaultPassword, 10)
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@jiretin.cz',
        name: 'Administrátor',
        password: hashedPassword,
        role: 'admin',
      },
    })

    console.log('✅ Admin user created:', admin.email)
    console.log('📧 Email: admin@jiretin.cz')
    console.log('🔑 Default Password:', defaultPassword)
    console.log('⚠️  CRITICAL: Change the password immediately after first login!')
  } else {
    console.log('ℹ️  Admin user already exists, skipping creation')
  }

  // Create sample pages
  const pages = [
    {
      title: 'O nás',
      slug: 'o-nas',
      content: 'Obsah stránky O nás',
      published: true,
      order: 1,
    },
    {
      title: 'Pro rodiče',
      slug: 'pro-rodice',
      content: 'Obsah stránky Pro rodiče',
      published: true,
      order: 2,
    },
  ]

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    })
  }

  console.log('✅ Sample pages created')

  // Create sample category
  const category = await prisma.category.upsert({
    where: { slug: 'aktuality' },
    update: {},
    create: {
      name: 'Aktuality',
      slug: 'aktuality',
    },
  })

  console.log('✅ Sample category created')

  // Create sample post
  await prisma.post.upsert({
    where: { slug: 'vitejte-na-nastence' },
    update: {},
    create: {
      title: 'Vítejte na nástěnce',
      slug: 'vitejte-na-nastence',
      excerpt: 'Zde najdete aktuální informace, oznámení a důležité termíny.',
      content:
        'Zde najdete aktuální informace, oznámení a důležité termíny. ' +
        'Aktuality budeme pravidelně doplňovat. Pokud máte dotazy, neváhejte nás kontaktovat.',
      published: true,
      publishedAt: new Date(),
      authorId: admin.id,
      categoryId: category.id,
    },
  })

  console.log('✅ Sample post created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

