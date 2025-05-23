import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      password: passwordHash,
      address: 'Rua do Admin, 123',
      phone: '11999999999',
      rg: '123456789',
      birthDate: new Date('1990-01-01'),
      role: 'ADMIN',
    },
  })

  console.log('Admin user created.')
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
