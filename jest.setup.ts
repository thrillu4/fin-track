import '@testing-library/jest-dom'

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

jest.mock('@/lib/actions/changePassword', () => ({
  changePassword: jest.fn(),
}))

jest.mock('@/lib/actions/editUserData', () => ({
  editUserData: jest.fn().mockResolvedValue(undefined),
}))

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/lib/actions/auth', () => ({
  register: jest.fn(),
}))
