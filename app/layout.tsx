import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';

const manrope = Manrope({
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RentalCar',
  description:
    'RentalCar is a car rental service: browse the catalog, filter cars and book a ride.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Toaster position="top-center" />
        </TanStackProvider>
      </body>
    </html>
  );
}
