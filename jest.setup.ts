import '@testing-library/jest-dom'

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/lib/actions/auth', () => ({
  register: jest.fn(),
}))
