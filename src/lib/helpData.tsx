import {
  BanknoteArrowDown,
  ChartLine,
  CreditCard,
  Settings,
  UserRound,
} from 'lucide-react'
import Link from 'next/link'
import { ROUTES } from './routes'

export const helpData = [
  {
    id: 1,
    icon: <UserRound />,

    title: 'Profile & Security',
    faqs: [
      {
        question: 'How do I update my profile information?',
        answer: (
          <div>
            Go to{' '}
            <Link
              className="text-primary font-bold underline"
              href={ROUTES.PROFILE}
            >
              PROFILE
            </Link>{' '}
            and edit your name, email or personal info.
          </div>
        ),
      },
      {
        question: 'How to change my password?',
        answer: (
          <div>
            In{' '}
            <Link
              className="text-primary font-bold underline"
              href={ROUTES.PROFILE}
            >
              PROFILE
            </Link>{' '}
            click <span className="text-primary">Change Password</span> and
            follow the steps.
          </div>
        ),
      },
      {
        question: 'Is my data secure?',
        answer:
          'All data is encrypted and securely stored. Only you have access to your account.',
      },
    ],
  },
  {
    id: 2,
    icon: <Settings />,

    title: 'Technical / General',
    faqs: [
      {
        question: 'The page is not loading, what to do?',
        answer: 'Try refreshing the page or check your internet connection.',
      },
      {
        question: 'Can I use the dashboard on mobile?',
        answer:
          'Yes, the dashboard is fully responsive and works on mobile devices.',
      },
      {
        question: 'I can’t find the answer I need.',
        answer: 'Use the contact support form and we’ll help you directly.',
      },
    ],
  },
  {
    id: 3,
    icon: <CreditCard />,
    title: 'Cards & Accounts',
    faqs: [
      {
        question: 'How do I add a new card?',
        answer: (
          <div>
            Go to the{' '}
            <Link
              className="text-primary font-bold underline"
              href={ROUTES.CREDIT_CARDS}
            >
              Credit Cards
            </Link>{' '}
            section fill in the required fields and click{' '}
            <span className="text-primary">Add Card</span> button,
          </div>
        ),
      },
      {
        question: 'Why is my card balance different?',
        answer:
          'Balance includes all transactions. If it looks incorrect, check pending or future transactions.',
      },
    ],
  },
  {
    id: 4,
    icon: <BanknoteArrowDown />,

    title: 'Transactions & Activity',
    faqs: [
      {
        question: 'How to add a transaction?',
        answer:
          "Transactions are added automatically with your bank's permission.",
      },
      {
        question: "Why I don't see my transaction?",
        answer:
          'Use filters or make sure the correct card, date range or category is selected.',
      },
      {
        question: 'How are analytics calculated?',
        answer:
          'Analytics are based on all completed transactions for the selected period.',
      },
    ],
  },
  {
    id: 5,
    icon: <ChartLine />,

    title: 'Investments & Loans',
    faqs: [
      {
        question: 'How to add an investment?',
        answer:
          "Investments are added automatically with your bank's permission.",
      },
      {
        question: 'Can I track profit or loss?',
        answer:
          'Yes, the dashboard calculates the difference between current and initial investment value.',
      },
      {
        question: 'How to manage loans?',
        answer: (
          <div>
            Go to{' '}
            <Link
              className="text-primary font-bold underline"
              href={ROUTES.LOANS}
            >
              LOANS
            </Link>{' '}
            section to track a loans, set filter rate and repayment schedule.
          </div>
        ),
      },
    ],
  },
]
