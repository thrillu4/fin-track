import EditProfileForm from '@/components/Dashboard/Profile/EditProfileForm'
import { editUserData } from '@/lib/actions/editUserData'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'

describe('EditProfileForm', () => {
  const mockEditUserData = editUserData as jest.MockedFunction<
    typeof editUserData
  >
  const mockToastSuccess = toast.success as jest.MockedFunction<
    typeof toast.success
  >

  const mockUserWithProfile = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    emailVerified: null,
    image: null,
    password: 'hashedpassword',
    createdAt: new Date(),
    updatedAt: new Date(),
    profile: {
      fullName: 'Fred',
      id: '1',
      userId: '1',
      bio: 'Test bio',
      phone: '+1234567890',
      location: 'New York, USA',
      currency: 'USD',
    },
  }

  const mockUserWithoutProfile = {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    emailVerified: null,
    image: null,
    password: 'hashedpassword',
    createdAt: new Date(),
    updatedAt: new Date(),
    profile: null,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockEditUserData.mockResolvedValue(undefined)
  })

  describe('Component rendering', () => {
    it('should render all form fields', () => {
      render(<EditProfileForm user={mockUserWithProfile} />)

      expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Currency/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Your Location/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/About Yourself/i)).toBeInTheDocument()
    })

    it('should render submit button', () => {
      render(<EditProfileForm user={mockUserWithProfile} />)
      expect(
        screen.getByRole('button', { name: /Save Changes/i }),
      ).toBeInTheDocument()
    })

    it('should populate fields with user data', () => {
      render(<EditProfileForm user={mockUserWithProfile} />)

      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
      expect(screen.getByDisplayValue('+1234567890')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Test bio')).toBeInTheDocument()
      expect(screen.getByDisplayValue('New York, USA')).toBeInTheDocument()
      expect(screen.getByDisplayValue('USD')).toBeInTheDocument()
    })

    it('should render empty fields when profile is null', () => {
      render(<EditProfileForm user={mockUserWithoutProfile} />)

      expect(screen.getByDisplayValue('Jane Smith')).toBeInTheDocument()
      expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument()

      const phoneInput = screen.getByLabelText(/Phone Number/i)
      const bioInput = screen.getByLabelText(/About Yourself/i)
      const locationInput = screen.getByLabelText(/Your Location/i)

      expect(phoneInput).toHaveValue('')
      expect(bioInput).toHaveValue('')
      expect(locationInput).toHaveValue('')
    })

    it('should disable currency field', () => {
      render(<EditProfileForm user={mockUserWithProfile} />)
      const currencyInput = screen.getByLabelText(/Currency/i)
      expect(currencyInput).toBeDisabled()
    })

    it('should disable email field', () => {
      render(<EditProfileForm user={mockUserWithProfile} />)
      const emailInput = screen.getByLabelText(/email/i)
      expect(emailInput).toBeDisabled()
    })

    it('should show currency limitation message', () => {
      render(<EditProfileForm user={mockUserWithProfile} />)
      expect(
        screen.getByText(/The tracker currently only supports USD/i),
      ).toBeInTheDocument()
    })
  })

  describe('Form validation', () => {
    it('should disable submit button initially when form is not dirty', () => {
      render(<EditProfileForm user={mockUserWithProfile} />)
      const submitButton = screen.getByRole('button', { name: /Save Changes/i })
      expect(submitButton).toBeDisabled()
    })

    it('should enable submit button when form is modified', async () => {
      const user = userEvent.setup()
      render(<EditProfileForm user={mockUserWithProfile} />)

      const nameInput = screen.getByLabelText(/Your Name/i)
      const submitButton = screen.getByRole('button', { name: /Save Changes/i })

      expect(submitButton).toBeDisabled()

      await user.clear(nameInput)
      await user.type(nameInput, 'John Updated')

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })
    })

    it('should show validation error for empty required name', async () => {
      const user = userEvent.setup()
      render(<EditProfileForm user={mockUserWithProfile} />)

      const nameInput = screen.getByLabelText(/Your Name/i)

      await user.clear(nameInput)
      await user.tab()

      await waitFor(() => {
        expect(screen.getByText(/Minimum 3 characters/i)).toBeInTheDocument()
      })
    })
  })

  describe('Form submission', () => {
    it('should successfully submit form with updated data', async () => {
      const user = userEvent.setup()
      render(<EditProfileForm user={mockUserWithProfile} />)

      const nameInput = screen.getByLabelText(/Your Name/i)
      const phoneInput = screen.getByLabelText(/Phone Number/i)
      const submitButton = screen.getByRole('button', { name: /Save Changes/i })

      await user.clear(nameInput)
      await user.type(nameInput, 'John Updated')

      await user.clear(phoneInput)
      await user.type(phoneInput, '+9876543210')

      await user.click(submitButton)

      await waitFor(() => {
        expect(mockEditUserData).toHaveBeenCalledWith({
          bio: 'Test bio',
          location: 'New York, USA',
          name: 'John Updated',
          phone: '+9876543210',
        })
      })

      expect(mockToastSuccess).toHaveBeenCalledWith(
        'Profile updated successfully!',
      )
    })

    it('should show loading state during submission', async () => {
      const user = userEvent.setup()
      mockEditUserData.mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(undefined), 100)),
      )

      render(<EditProfileForm user={mockUserWithProfile} />)

      const nameInput = screen.getByLabelText(/Your Name/i)
      const submitButton = screen.getByRole('button', { name: /Save Changes/i })

      await user.clear(nameInput)
      await user.type(nameInput, 'John Updated')

      await user.click(submitButton)

      expect(screen.getByText(/Changing.../i)).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getByText(/Save Changes/i)).toBeInTheDocument()
      })
    })

    it('should handle all field updates', async () => {
      const user = userEvent.setup()
      render(<EditProfileForm user={mockUserWithProfile} />)

      const nameInput = screen.getByLabelText(/Your Name/i)
      const phoneInput = screen.getByLabelText(/Phone Number/i)
      const locationInput = screen.getByLabelText(/Your Location/i)
      const bioInput = screen.getByLabelText(/About Yourself/i)
      const submitButton = screen.getByRole('button', { name: /Save Changes/i })

      await user.clear(nameInput)
      await user.type(nameInput, 'Updated Name')

      await user.clear(phoneInput)
      await user.type(phoneInput, '+1111111111')

      await user.clear(locationInput)
      await user.type(locationInput, 'San Francisco, USA')

      await user.clear(bioInput)
      await user.type(bioInput, 'Updated bio text')

      await user.click(submitButton)

      await waitFor(() => {
        expect(mockEditUserData).toHaveBeenCalledWith({
          bio: 'Updated bio text',
          location: 'San Francisco, USA',
          name: 'Updated Name',
          phone: '+1111111111',
        })
      })
    })
  })

  describe('Form descriptions', () => {
    it('should display correct field descriptions', () => {
      render(<EditProfileForm user={mockUserWithProfile} />)

      expect(screen.getByText(/This is your public name/i)).toBeInTheDocument()
      expect(
        screen.getByText(/Your phone number is confidential/i),
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(/This is your public display name/i),
      ).toHaveLength(2)
    })
  })

  describe('Accessibility', () => {
    it('should have proper labels for all form fields', () => {
      render(<EditProfileForm user={mockUserWithProfile} />)

      expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Currency/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Your Location/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/About Yourself/i)).toBeInTheDocument()
    })

    it('should have correct placeholder texts', () => {
      render(<EditProfileForm user={mockUserWithProfile} />)

      expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText(/example@email.com/i),
      ).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText(/\+23 137815 6720/i),
      ).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/USD/i)).toBeInTheDocument()
    })

    it('should submit form on Enter key in input fields', async () => {
      const user = userEvent.setup()
      render(<EditProfileForm user={mockUserWithProfile} />)

      const nameInput = screen.getByLabelText(/Your Name/i)

      await user.clear(nameInput)
      await user.type(nameInput, 'Updated Name{Enter}')

      await waitFor(() => {
        expect(mockEditUserData).toHaveBeenCalled()
      })
    })
  })
})
