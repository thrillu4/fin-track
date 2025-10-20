import DemoUserButton from '@/components/Landing/DemoUserButton'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { signIn } from 'next-auth/react'

describe('Demo User Button', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('renders button with correct text', () => {
    render(<DemoUserButton classname="">Live Demo</DemoUserButton>)
    expect(screen.getByText('Live Demo')).toBeInTheDocument()
  })

  it('calls signIn with correct credentials when clicked', async () => {
    render(<DemoUserButton classname="">Live Demo</DemoUserButton>)
    const btn = screen.getByText('Live Demo')
    await userEvent.click(btn)

    expect(signIn).toHaveBeenCalledTimes(1)
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'demo1@demo.com',
      password: '123321123',
      redirect: true,
      callbackUrl: '/dashboard',
    })
  })

  it('applies custom className to button', () => {
    render(<DemoUserButton classname="text-lg">Try Demo</DemoUserButton>)
    expect(screen.getByText('Try Demo')).toHaveClass('text-lg')
  })
})
