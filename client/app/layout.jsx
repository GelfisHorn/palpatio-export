
// Context
import { Providers } from './providers'
// Styles
import '../styles/globals.css'

export default function RootLayout({ children }) {
	return (
		<html lang="es">
			<head>
				<link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css" />
				<link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-light.css" />
			</head>
			<body>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	)
}