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
    for (let i = 0; i < 2; i++) {
      const account = await prisma.account.create({
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
      for (let j = 0; j < 2; j++) {
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
      for (let t = 0; t < 15; t++) {
        await prisma.transaction.create({
          data: {
            userId: user.id,
            accountId: account.id,
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
            date: faker.date.recent({ days: 30 }),
          },
        })
      }

      // --- 5. INVOICES ---
      for (let inv = 0; inv < 5; inv++) {
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
      for (let inv = 0; inv < 5; inv++) {
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
          },
        })
      }

      // --- 7. LOANS ---
      for (let l = 0; l < 3; l++) {
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
