import GitHubProviderButton from '@/components/Auth/GitHubProviderButton'
import LoginForm from '@/components/Auth/LoginForm'
import DemoUserButton from '@/components/Landing/DemoUserButton'
import { ROUTES } from '@/lib/routes'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

describe('LoginForm', () => {
  const mockPush = jest.fn()
  const mockSignIn = signIn as jest.MockedFunction<typeof signIn>

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  describe('Component rendering', () => {
    it('should render form title', () => {
      render(<LoginForm />)
      expect(screen.getByText(/Login To Your/i)).toBeInTheDocument()
      expect(screen.getByText(/FinTracker/i)).toBeInTheDocument()
    })

    it('should render all input fields', () => {
      render(<LoginForm />)
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })

    it('should render submit button', () => {
      render(<LoginForm />)
      expect(
        screen.getByRole('button', { name: /submit/i }),
      ).toBeInTheDocument()
    })

    it('should render GitHub login button', () => {
      render(<LoginForm />)
      expect(screen.getByText(/Login with GitHub/i)).toBeInTheDocument()
    })

    it('should render Demo User button', () => {
      render(<LoginForm />)
      expect(screen.getByText(/Try Demo/i)).toBeInTheDocument()
    })

    it('should render sign up link', () => {
      render(<LoginForm />)
      const signUpLink = screen.getByRole('link', { name: /sign up/i })
      expect(signUpLink).toBeInTheDocument()
      expect(signUpLink).toHaveAttribute('href', ROUTES.SIGN_UP)
    })
  })

  describe('Form validation', () => {
    it('should show error for invalid email', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)

      const emailInput = screen.getByLabelText(/Email/i)
      const submitButton = screen.getByRole('button', { name: /submit/i })

      await user.type(emailInput, '123@dsa')
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/Enter valid email/i)).toBeInTheDocument()
      })
    })

    it('should show error for empty email', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/Enter valid email/i)).toBeInTheDocument()
      })
    })

    it('should show error for empty password', async () => {
      const user = userEvent.setup()
      render(<LoginForm />)

      const emailInput = screen.getByLabelText(/email/i)
      const submitButton = screen.getByRole('button', { name: /submit/i })

      await user.type(emailInput, 'test@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(/Password must be more than 8 characters/i),
        ).toBeInTheDocument()
      })
    })
  })

  describe('Form submission', () => {
    it('should successfully login user with valid credentials', async () => {
      const user = userEvent.setup()
      mockSignIn.mockResolvedValue({
        error: undefined,
        ok: true,
        status: 200,
        url: null,
        code: '',
      })

      render(<LoginForm />)

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /submit/i })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith('credentials', {
          email: 'test@example.com',
          password: 'password123',
          redirect: false,
        })
      })

      expect(mockPush).toHaveBeenCalledWith(ROUTES.DASHBOARD)
    })

    it('should show error for invalid credentials', async () => {
      const user = userEvent.setup()
      mockSignIn.mockResolvedValue({
        error: 'Invalid credentials',
        ok: false,
        status: 401,
        url: null,
        code: undefined,
      })

      render(<LoginForm />)

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /submit/i })

      await user.type(emailInput, 'wrong@example.com')
      await user.type(passwordInput, 'wrongpassword')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(/Invalid email or password/i),
        ).toBeInTheDocument()
      })

      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should show loading state during submission', async () => {
      const user = userEvent.setup()
      mockSignIn.mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(
              () =>
                resolve({
                  error: undefined,
                  ok: true,
                  status: 200,
                  url: null,
                  code: '',
                }),
              100,
            ),
          ),
      )

      render(<LoginForm />)

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /submit/i })

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123')
      await user.click(submitButton)

      expect(screen.getByText(/Submitting.../i)).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getByText(/Submit/i)).toBeInTheDocument()
      })
    })

    it('should clear server error on resubmission', async () => {
      const user = userEvent.setup()

      mockSignIn.mockResolvedValueOnce({
        error: 'Invalid credentials',
        ok: false,
        status: 401,
        url: null,
        code: undefined,
      })

      render(<LoginForm />)

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const submitButton = screen.getByRole('button', { name: /submit/i })

      await user.type(emailInput, 'wrong@example.com')
      await user.type(passwordInput, 'wrongpassword')
      await user.click(submitButton)

      await waitFor(() => {
        expect(
          screen.getByText(/Invalid email or password/i),
        ).toBeInTheDocument()
      })

      // Second attempt - success
      mockSignIn.mockResolvedValueOnce({
        error: undefined,
        ok: true,
        status: 200,
        url: null,
        code: undefined,
      })

      await user.clear(emailInput)
      await user.clear(passwordInput)
      await user.type(emailInput, 'correct@example.com')
      await user.type(passwordInput, 'correctpassword')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith(ROUTES.DASHBOARD)
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper labels for input fields', () => {
      render(<LoginForm />)

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)

      expect(emailInput).toHaveAttribute('type', 'email')
      expect(passwordInput).toHaveAttribute('type', 'password')
    })

    it('should have password field with type="password"', () => {
      render(<LoginForm />)
      const passwordInput = screen.getByLabelText(/password/i)
      expect(passwordInput).toHaveAttribute('type', 'password')
    })

    describe('GitHub Button', () => {
      it('render button with correct text', () => {
        render(<GitHubProviderButton>Login With GitHub</GitHubProviderButton>)

        expect(screen.getByText('Login With GitHub')).toBeInTheDocument()
      })

      it('calls signIn with github provider', async () => {
        const user = userEvent.setup()
        render(
          <GitHubProviderButton>Continue with GitHub</GitHubProviderButton>,
        )
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

    it('should submit form on Enter key', async () => {
      const user = userEvent.setup()
      mockSignIn.mockResolvedValue({
        error: undefined,
        ok: true,
        status: 200,

        url: null,
        code: undefined,
      })

      render(<LoginForm />)

      const emailInput = screen.getByLabelText(/email/i)
      const passwordInput = screen.getByLabelText(/password/i)

      await user.type(emailInput, 'test@example.com')
      await user.type(passwordInput, 'password123{Enter}')

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalled()
      })
    })
  })
})
