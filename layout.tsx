import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'TRUTHLENS — Don\'t Just Believe It. Check It.',
  description: 'Evidence-first AI verification and source intelligence platform. See the evidence. Understand the truth.',
  keywords: ['AI verification', 'fact check', 'evidence search', 'source credibility', 'misinformation detection'],
  authors: [{ name: 'TRUTHLENS AI' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
