import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter, Poppins, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Best Live 1:1 Online Classes for Kids | Codeyoung',
  description:
    'Live 1:1 online Coding, Math, Science & English classes for kids ages 5-18. Proven advantage of 1:1 learning with expert mentors and personalized curriculum.',
  icons: {
    icon: '/images/primary_logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${satoshi.variable} ${inter.variable} ${poppins.variable} ${plusJakartaSans.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/images/primary_logo.png" />
      </head>
      <body className="min-h-screen bg-[#FFFDF7] text-[#2F4F4F] antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
