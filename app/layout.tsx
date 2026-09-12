import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import { Header, TanStackProvider } from '@/components';
import { OG_IMAGE, SITE_NAME, SITE_URL, TOAST_DURATION } from '@/lib/constants';

const manrope = Manrope({
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description:
    'RentalCar is a car rental service: browse the catalog, filter cars and book a ride.',
  openGraph: {
    title: SITE_NAME,
    description:
      'RentalCar is a car rental service: browse the catalog, filter cars and book a ride.',
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html className={manrope.variable} data-scroll-behavior="smooth" lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Toaster position="top-right" toastOptions={{ duration: TOAST_DURATION }} />
        </TanStackProvider>
      </body>
    </html>
  );
}
