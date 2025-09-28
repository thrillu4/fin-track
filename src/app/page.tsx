import { auth } from '@/auth'
import SignInButton from '@/components/SignInButton'

export default async function Home() {
	const session = await auth()
	console.log(session)
	return (
		<div>
			<h1 className='mb-10'>Bank Dashboard</h1>
			<SignInButton />
		</div>
	)
}
