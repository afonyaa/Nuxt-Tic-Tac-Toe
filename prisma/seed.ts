import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.user.create({
    data: {
      id: '1',
      passwordHash: '1234',
      passwordSalt: '1234',
      login: 'afa1',
    }
  })
  await prisma.user.create({
    data: {
      id: '2',
      passwordHash: '123',
      passwordSalt: '123',
      login: 'afa2',
      games: {
        create: {
          creatorId: '2',
          field: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ]
        }
      }
    }
  })
  await prisma.user.create({
    data: {
      id: '3',
      passwordHash: '12345',
      passwordSalt: '12345',
      login: 'afa3',
      games: {
        create: {
          creatorId: '3',
          field: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
          ] as Prisma.JsonArray
        }
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })