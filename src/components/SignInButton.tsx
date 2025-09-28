'use client'
import { login } from '@/lib/actions/auth'
import { Button } from './ui/button'

const SignInButton = () => {
	return (
		<Button className='ml-10' onClick={() => login()}>
			Sing In
		</Button>
	)
}

export default SignInButton
