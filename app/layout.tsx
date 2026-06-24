import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/app/components/navbar';
import LoadingProvider from '@/app/components/LoadingProvider';
import './globals.css';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="bg-white font-display text-slate-900 min-h-screen relative">
        <LoadingProvider>
          <Navbar />
          <main className="pt-28">{children}</main>
        </LoadingProvider>
      </body>
    </html>
  );
}