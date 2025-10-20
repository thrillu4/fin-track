import GitHubProviderButton from '@/components/Auth/GitHubProviderButton'
import RegisterForm from '@/components/Auth/RegisterForm'
import DemoUserButton from '@/components/Landing/DemoUserButton'
import { register } from '@/lib/actions/auth'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { signIn } from 'next-auth/react'

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows error when username contains less than 2 letters', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)

    const usernameInput = screen.getByLabelText('Username')
    const submitButton = screen.getByRole('button', { name: /submit/i })

    await user.type(usernameInput, 'u')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/At least 2 characters/i)).toBeInTheDocument()
    })
  })

  it('shows error when email is invalid', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)

    await user.type(screen.getByLabelText('Username'), 'John')
    await user.type(screen.getByLabelText('Email'), 'invalid-email')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(screen.getByText(/Enter valid email/i)).toBeInTheDocument()
    })
  })

  it('shows error when password is too short', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)

    await user.type(screen.getByLabelText('Username'), 'John')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.type(screen.getByLabelText('Password'), '123')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/Password must be more than 8 characters/i),
      ).toBeInTheDocument()
    })
  })

  it('shows error when fields are empty', async () => {
    const user = userEvent.setup()
    render(<RegisterForm />)

    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(screen.getByText(/At least 2 characters/i)).toBeInTheDocument()
    })
  })

  it('calls register with correct data on valid submission', async () => {
    const user = userEvent.setup()
    const mockRegister = register as jest.MockedFunction<typeof register>
    mockRegister.mockResolvedValue({ success: true })

    render(<RegisterForm />)

    await user.type(screen.getByLabelText('Username'), 'John Doe')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledTimes(1)
    })

    const formData = mockRegister.mock.calls[0][0]
    expect(formData.get('name')).toBe('John Doe')
    expect(formData.get('email')).toBe('john@example.com')
    expect(formData.get('password')).toBe('password123')
  })

  it('shows server error when registration fails', async () => {
    const user = userEvent.setup()
    const mockRegister = register as jest.MockedFunction<typeof register>
    mockRegister.mockResolvedValue({ error: 'User already exists' })

    render(<RegisterForm />)

    await user.type(screen.getByLabelText('Username'), 'John Doe')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(screen.getByText('User already exists')).toBeInTheDocument()
    })
  })

  it('calls signIn after successful registration', async () => {
    const user = userEvent.setup()
    const mockRegister = register as jest.MockedFunction<typeof register>
    const mockSignIn = signIn as jest.MockedFunction<typeof signIn>

    mockRegister.mockResolvedValue({ success: true })

    render(<RegisterForm />)

    await user.type(screen.getByLabelText('Username'), 'John Doe')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'john@example.com',
        password: 'password123',
      })
    })
  })

  it('shows loading state during submission', async () => {
    const user = userEvent.setup()
    const mockRegister = register as jest.MockedFunction<typeof register>

    mockRegister.mockImplementation(() => new Promise(() => {}))

    render(<RegisterForm />)

    await user.type(screen.getByLabelText('Username'), 'John Doe')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(screen.getByText('Submitting...')).toBeInTheDocument()
    })
  })

  it('renders all form fields', () => {
    render(<RegisterForm />)

    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  describe('GitHub Button', () => {
    it('render button with correct text', () => {
      render(<GitHubProviderButton>Login With GitHub</GitHubProviderButton>)

      expect(screen.getByText('Login With GitHub')).toBeInTheDocument()
    })

    it('calls signIn with github provider', async () => {
      const user = userEvent.setup()
      render(<GitHubProviderButton>Continue with GitHub</GitHubProviderButton>)
      const btn = screen.getByText('Continue with GitHub')
      await user.click(btn)

      expect(signIn).toHaveBeenCalledTimes(1)
      expect(signIn).toHaveBeenCalledWith('github', {
        callbackUrl: '/dashboard',
      })
    })
  })

  describe('Demo User Button', () => {
    it('renders button with correct text', () => {
      render(<DemoUserButton classname="">Try Demo</DemoUserButton>)

      expect(screen.getByText('Try Demo')).toBeInTheDocument()
    })

    it('applies custom className to button', () => {
      render(<DemoUserButton classname="flex gap-2">Try Demo</DemoUserButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('flex', 'gap-2')
    })

    it('calls signIn with correct credentials when clicked', async () => {
      const user = userEvent.setup()
      render(<DemoUserButton classname="">Try Demo</DemoUserButton>)

      await user.click(screen.getByText('Try Demo'))

      expect(signIn).toHaveBeenCalledTimes(1)
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'demo1@demo.com',
        password: '123321123',
        redirect: true,
        callbackUrl: '/dashboard',
      })
    })
  })

  it('renders sign in link', () => {
    render(<RegisterForm />)

    const link = screen.getByText('Sign in')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/sign-in')
  })
})
