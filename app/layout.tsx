import type { Metadata } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Aparnaa Ravi | Devotional Fiction Author — SundaraKandam',
  description:
    'Aparnaa Ravi (pen name Appu S R) is a Chennai-based devotional fiction author. Her debut Kindle book SundaraKandam: Hanuman\'s Divine Mission retells the Ramayana for modern readers.',
  keywords:
    'Aparnaa Ravi, Appu S R, SundaraKandam, Hanuman, Ramayana, devotional fiction, Kindle, Indian mythology, spiritual fiction, Chennai author',
  authors: [{ name: 'Aparnaa Ravi' }],
  openGraph: {
    type: 'website',
    url: 'https://aparnaaravi.com',
    title: 'Aparnaa Ravi | Devotional Fiction Author',
    description: 'Bringing the Ramayana to modern readers — SundaraKandam: Hanuman\'s Divine Mission on Kindle.',
    images: [{ url: '/images/aparnaa-hero.jpg', width: 627, height: 1200, alt: 'Aparnaa Ravi' }],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D4AF37',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23D4AF37'>A</text></svg>" />
      </head>
      <body className="bg-cream dark:bg-dark-bg text-charcoal dark:text-ivory transition-colors">
        {children}
      </body>
    </html>
  );
}
