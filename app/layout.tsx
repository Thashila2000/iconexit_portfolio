import { Space_Grotesk, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import Navbar from '@/app/components/navbar';
import { LoadingProvider } from '@/app/components/LoadingContext';
import IconexFooter from '@/components/ui/footer';
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

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} ${jakarta.variable}`}>
      <body className="bg-[#ffebeb] font-display text-slate-900 min-h-screen relative">
        <LoadingProvider>
          <Navbar />
          {/* Changed pt-28 to pt-0 so child pages can layout completely full-screen */}
          <main className="pt-0">{children}</main>
          <IconexFooter />
        </LoadingProvider>
      </body>
    </html>
  );
}