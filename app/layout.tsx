import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Josefin_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans'
});
const josefinSans = Josefin_Sans({ 
  subsets: ['latin'],
  variable: '--font-josefin-sans'
});

export const metadata: Metadata = {
  title: 'CSS Pattern Designer - Create Beautiful Background Patterns',
  description: 'Design and preview custom CSS background patterns with live preview. Create beautiful, customizable patterns for your web projects.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakartaSans.variable} ${josefinSans.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}