import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://appusr.netlify.app';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/#about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/#books`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/#published-books`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/#reviews`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/#contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];
}
