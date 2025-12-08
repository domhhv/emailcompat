import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Quicksand, Montserrat, Electrolize } from 'next/font/google';

import './globals.css';
import type { PropsWithChildren } from 'react';

const serifFont = Quicksand({
  subsets: ['latin'],
  variable: '--font-serif',
});

const sansFont = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
});

const monoFont = Electrolize({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: '400',
});

export const metadata: Metadata = {
  keywords: ['email', 'preview', 'html email', 'email testing', 'email compatibility', 'caniemail'],
  title: 'Email Client Previewer',
  description:
    'Test your email HTML against major email clients. Check CSS compatibility across Gmail, Outlook, Apple Mail, and more.',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${serifFont.variable} ${sansFont.variable} ${monoFont.variable} antialiased`}>
        <ThemeProvider enableSystem attribute="class" defaultTheme="system" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
