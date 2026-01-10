import './globals.css'

import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        {/* Analytics removed for Vite compatibility */}
      </body>
    </html>
  )
}
