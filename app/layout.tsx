import type { Metadata } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://appusr.netlify.app'),
  title: 'Appu S R | Devotional Fiction Author — SundaraKandam',
  description:
    "Appu S R is a Chennai-based devotional fiction author. Her debut Kindle book SundaraKandam: Hanuman's Divine Mission retells the Ramayana's most uplifting chapter for modern readers of all ages.",
  keywords:
    'Appu S R, Aparnaa Ravi, SundaraKandam, Hanuman, Ramayana, devotional fiction, Kindle, Indian mythology, spiritual fiction, Chennai author, children spiritual books',
  authors: [{ name: 'Appu S R' }],
  openGraph: {
    type: 'website',
    url: 'https://appusr.netlify.app',
    title: 'Appu S R | Devotional Fiction Author',
    description:
      "Bringing the Ramayana to modern readers — SundaraKandam: Hanuman's Divine Mission on Kindle.",
    images: [{ url: '/images/aparnaa-hero.jpg', width: 627, height: 1200, alt: 'Appu S R' }],
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
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23D4AF37'>A</text></svg>"
        />
      </head>
      <body className="bg-cream dark:bg-dark-bg text-charcoal dark:text-ivory">
        {children}
      </body>
    </html>
  );
}
