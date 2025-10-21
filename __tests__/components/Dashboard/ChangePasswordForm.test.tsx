import ChangePasswordForm from '@/components/Dashboard/Profile/ChangePasswordForm'
import { changePassword } from '@/lib/actions/changePassword'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('ChangePasswordForm', () => {
  const mockChangePassword = changePassword as jest.MockedFunction<
    typeof changePassword
  >

  beforeEach(() => {
    jest.clearAllMocks()
    mockChangePassword.mockResolvedValue({ success: true })
  })

  it('renders all input fields and submit button', () => {
    render(<ChangePasswordForm />)

    expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument()
    expect(screen.getByLabelText('New Password')).toBeInTheDocument()
    expect(screen.getByLabelText(/Confirm New Password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Change Password/i }),
    ).toBeInTheDocument()
  })

  it('disables submit button when form is not dirty', () => {
    render(<ChangePasswordForm />)
    const submitButton = screen.getByRole('button', {
      name: /Change Password/i,
    })
    expect(submitButton).toBeDisabled()
  })

  it('enables submit button when form is modified', async () => {
    render(<ChangePasswordForm />)
    const user = userEvent.setup()

    const currentInput = screen.getByLabelText(/Current Password/i)
    await user.type(currentInput, 'oldpassword')

    const submitButton = screen.getByRole('button', {
      name: /Change Password/i,
    })
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  it('shows validation error when passwords do not match', async () => {
    render(<ChangePasswordForm />)
    const user = userEvent.setup()

    const newInput = screen.getByLabelText('New Password')
    const confirmInput = screen.getByLabelText(/Confirm New Password/i)

    await user.type(newInput, 'newpassword')
    await user.type(confirmInput, 'differentpassword')

    const submitButton = screen.getByRole('button', {
      name: /Change Password/i,
    })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument()
    })
  })

  it('submits form successfully', async () => {
    render(<ChangePasswordForm />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/Current Password/i), 'oldpassword')
    await user.type(screen.getByLabelText('New Password'), 'newpassword123')
    await user.type(
      screen.getByLabelText(/Confirm New Password/i),
      'newpassword123',
    )

    const submitButton = screen.getByRole('button', {
      name: /Change Password/i,
    })
    expect(submitButton).not.toBeDisabled()
    await user.click(submitButton)

    console.log(
      'mockChangePassword called:',
      mockChangePassword.mock.calls.length,
    )

    await waitFor(() => {
      expect(mockChangePassword).toHaveBeenCalledTimes(1)
      expect(mockChangePassword).toHaveBeenCalledWith({
        currentPassword: 'oldpassword',
        newPassword: 'newpassword123',
        confirmNewPassword: 'newpassword123',
      })
    })
  })
})
