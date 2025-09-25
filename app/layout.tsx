import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Splitsync Agent',
  description: 'Seamless, automated, and provable stablecoin payouts for creators and DAOs.',
  keywords: ['Base', 'USDC', 'Payouts', 'DeFi', 'Automation'],
  authors: [{ name: 'Splitsync Team' }],
  openGraph: {
    title: 'Splitsync Agent',
    description: 'Seamless, automated, and provable stablecoin payouts for creators and DAOs.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
