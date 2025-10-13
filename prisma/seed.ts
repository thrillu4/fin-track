import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const users = await Promise.all(
    Array.from({ length: 2 }).map(async (_, i) => {
      const name = faker.person.fullName()
      const email = `demo${i + 1}@demo.com`
      const password = '123321123'
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: await bcrypt.hash(password, 10),
          profile: {
            create: {
              fullName: name,
              location: faker.location.city(),
              phone: faker.phone.number(),
              bio: faker.lorem.sentence(),
              currency: 'USD',
            },
          },
        },
      })

      console.log(`👤 Created user: ${email}`)
      return user
    }),
  )

  for (const user of users) {
    for (let i = 0; i < 1; i++) {
      const account = await prisma.userAccount.create({
        data: {
          userId: user.id,
          bankName: faker.company.name(),
          accountType: i === 0 ? 'Checking' : 'Savings',
          accountNumber: faker.finance.accountNumber(),
          balance: faker.number.float({
            min: 1000,
            max: 10000,
            fractionDigits: 2,
          }),
          currency: 'USD',
        },
      })

      // --- 3. CARDS ---
      for (let j = 0; j < 5; j++) {
        await prisma.card.create({
          data: {
            userId: user.id,
            accountId: account.id,
            cardNumber: faker.finance.creditCardNumber(),
            cardType: j === 0 ? 'Debit' : 'Credit',
            cardBrand: faker.helpers.arrayElement(['Visa', 'Mastercard']),
            expiryMonth: faker.number.int({ min: 1, max: 12 }),
            expiryYear: faker.number.int({ min: 2026, max: 2030 }),
            cvv: faker.string.numeric(3),
            balance: faker.number.float({
              min: 200,
              max: 5000,
              fractionDigits: 2,
            }),
          },
        })
      }

      // --- 4. TRANSACTIONS ---
      const totalTransactions = 400
      const cards = await prisma.card.findMany({
        where: { accountId: account.id },
      })
      const cardDistribution = [0.4, 0.3, 0.2, 0.1]

      function randomDate(from: Date, to: Date) {
        return new Date(
          from.getTime() + Math.random() * (to.getTime() - from.getTime()),
        )
      }

      async function createTransaction(
        userId: string,
        accountId: string,
        cardId: string,
        date: Date,
      ) {
        await prisma.transaction.create({
          data: {
            userId,
            accountId,
            cardId,
            type: faker.helpers.arrayElement(['income', 'expense', 'transfer']),
            category: faker.helpers.arrayElement([
              'Food',
              'Transport',
              'Entertainment',
              'Salary',
              'Investment',
              'Shopping',
            ]),
            amount: faker.number.float({
              min: 5,
              max: 1000,
              fractionDigits: 2,
            }),
            description: faker.commerce.productName(),
            date,
            currency: 'USD',
          },
        })
      }

      const transactionPromises = []

      for (let i = 0; i < totalTransactions; i++) {
        const rand = Math.random()
        let cumulative = 0
        let cardIndex = 0
        for (let j = 0; j < cardDistribution.length; j++) {
          cumulative += cardDistribution[j]
          if (rand <= cumulative) {
            cardIndex = j
            break
          }
        }
        const card = cards[cardIndex]

        let date: Date
        if (i < 200) {
          date = randomDate(new Date(2021, 0, 1), new Date())
        } else if (i < 300) {
          const threeMonthsAgo = new Date()
          threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
          date = randomDate(threeMonthsAgo, new Date())
        } else if (i < 360) {
          const oneMonthAgo = new Date()
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
          date = randomDate(oneMonthAgo, new Date())
        } else {
          const oneWeekAgo = new Date()
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
          date = randomDate(oneWeekAgo, new Date())
        }

        transactionPromises.push(
          createTransaction(user.id, account.id, card.id, date),
        )
      }

      await Promise.all(transactionPromises)
      console.log('💸 400 Transactions created successfully!')

      // --- 5. INVOICES ---
      for (let inv = 0; inv < 10; inv++) {
        await prisma.invoice.create({
          data: {
            userId: user.id,
            receiver: faker.person.fullName(),
            amount: faker.number.float({
              min: 50,
              max: 1500,
              fractionDigits: 2,
            }),
            currency: 'USD',
            status: faker.helpers.arrayElement(['paid', 'pending', 'overdue']),
            dueDate: faker.date.soon({ days: 10 }),
            issuedAt: faker.date.past({ years: 1 }),
            description: faker.commerce.productDescription(),
          },
        })
      }

      // --- 6. INVESTMENTS ---
      for (let inv = 0; inv < 50; inv++) {
        const invested = faker.number.float({
          min: 500,
          max: 10000,
          fractionDigits: 2,
        })
        const current =
          invested *
          faker.number.float({ min: 0.8, max: 1.2, fractionDigits: 2 })
        await prisma.investment.create({
          data: {
            userId: user.id,
            name: faker.company.name(),
            type: faker.helpers.arrayElement([
              'Stock',
              'Crypto',
              'Fund',
              'Bond',
            ]),
            amountInvested: invested,
            currentValue: current,
            profitLoss: current - invested,
            currency: 'USD',
            createdAt: randomDate(new Date(2021, 0, 1), new Date()),
          },
        })
      }

      // --- 7. LOANS ---
      for (let l = 0; l < 8; l++) {
        const amount = faker.number.float({
          min: 1000,
          max: 20000,
          fractionDigits: 2,
        })
        const balance =
          amount * faker.number.float({ min: 0.2, max: 1, fractionDigits: 2 })
        await prisma.loan.create({
          data: {
            userId: user.id,
            loanType: faker.helpers.arrayElement([
              'Personal',
              'Mortgage',
              'Car',
              'Education',
            ]),
            amount,
            interestRate: faker.number.float({
              min: 2,
              max: 10,
              fractionDigits: 2,
            }),
            balance,
            startDate: faker.date.past({ years: 1 }),
            dueDate: faker.date.future({ years: 2 }),
            status: faker.helpers.arrayElement(['active', 'paid', 'overdue']),
          },
        })
      }
    }
  }

  console.log('✅ Seeding completed successfully!')
}

main()
  .catch(e => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
