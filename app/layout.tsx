import type { Metadata } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Aparnaa Ravi | Author • Storyteller • Devotional Fiction',
  description:
    'Discover devotional fiction that weaves ancient mythology with modern consciousness. Explore Aparnaa Ravi\'s published Kindle books and spiritual stories.',
  keywords:
    'author, devotional fiction, mythology, spiritual storytelling, Kindle books, Aparnaa Ravi',
  authors: [{ name: 'Aparnaa Ravi' }],
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    type: 'website',
    url: 'https://aparnaaravi.com',
    title: 'Aparnaa Ravi | Author • Storyteller',
    description: 'Devotional fiction author crafting stories of transformation and spiritual awakening.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Aparnaa Ravi',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#D4AF37" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23D4AF37'>A</text></svg>" />
      </head>
      <body className="bg-cream dark:bg-dark-bg text-charcoal dark:text-ivory transition-colors">
        {children}
      </body>
    </html>
  );
}
