import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { phone: '9999999999' },
    update: {},
    create: {
      phone: '9999999999',
      password: 'alice',
      name: 'alice',
      email:'alice@gmail.com',
      onRampTransaction: {
        create: {
          startTime: new Date(),
          // endTime:new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { phone: '9999999998' },
    update: {},
    create: {
      phone: '9999999998',
      password: 'bob',
      name: 'bob',
      email:'bob@gmail.com',
      onRampTransaction: {
        create: {
          startTime: new Date(),
          // endTime:new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const ram = await prisma.user.upsert({
    where: { phone: '8888888888' },
    update: {},
    create: {
      phone: '8888888888',
      password: 'ram',
      name: 'ram',
      email:'ram@gmail.com',
      onRampTransaction: {
        create: {
          startTime: new Date(),
          // endTime:new Date(),
          status: "Success",
          amount: 20000,
          token: "124",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob })
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