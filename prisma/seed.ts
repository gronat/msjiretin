import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@jiretin.cz' },
    update: {},
    create: {
      email: 'admin@jiretin.cz',
      name: 'Administrátor',
      password: hashedPassword,
      role: 'admin',
    },
  })

  console.log('✅ Admin user created:', admin.email)
  console.log('📧 Email: admin@jiretin.cz')
  console.log('🔑 Password: admin123')
  console.log('⚠️  Please change the password after first login!')

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

