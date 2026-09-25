import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './globals.css';

import Footer from '@/components/footer/Footer';
import NavbarWrapper from '@/components/navbar/NavbarWrapper';
import { FitLogProvider } from '@/context/FitLogContext';

export const metadata: Metadata = {
  title: 'FitLog | Workout Library',
  description:
    'Discover workouts, build your plan, and track every set with FitLog.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <FitLogProvider>
          <NavbarWrapper />

          {children}

          <Footer />

          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
          />
        </FitLogProvider>
      </body>
    </html>
  );
}
