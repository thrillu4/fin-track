import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'BankDash',
	description: 'Manage your finance with bank dashboard tracker',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	)
}
