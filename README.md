# Aparnaa Ravi - Premium Author Portfolio

A luxurious, modern, and highly interactive author portfolio website for Aparnaa Ravi, built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- **Premium Design System**: Elegant color palette with gold accents, serif typography, and smooth animations
- **Dark/Light Theme**: Fully dynamic theme toggle with local storage persistence
- **Responsive Design**: Mobile-first approach, fully responsive across all devices
- **Smooth Animations**: Scroll-triggered animations, parallax effects, and interactive elements
- **Content Management**: JSON-based content structure (future-ready for Netlify CMS)
- **SEO Optimized**: Meta tags, Open Graph support, structured data
- **Performance**: Static generation, lazy loading, optimized images

## Project Structure

```
aparnaa-portfolio/
├── app/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutAuthor.tsx
│   │   ├── BooksShowcase.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Newsletter.tsx
│   │   └── Footer.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useTheme.ts
│   │   └── useInView.ts
│   ├── utils/              # Utility functions
│   │   ├── theme.ts
│   │   └── animations.ts
│   ├── styles/             # CSS
│   │   └── globals.css
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── public/
│   ├── content/            # JSON content files
│   │   ├── author.json
│   │   ├── books.json
│   │   └── testimonials.json
│   └── images/             # Images directory
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Content Structure

### Author (`public/content/author.json`)
Contains author profile information, social links, achievements, and writing areas.

### Books (`public/content/books.json`)
Book catalog with cover images, descriptions, links, ratings, and metadata.

### Testimonials (`public/content/testimonials.json`)
Reader testimonials with ratings and book references.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repo-url>
cd aparnaa-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## Development

### Adding Content

Edit JSON files in `public/content/`:
- `author.json` - Author profile and achievements
- `books.json` - Add/edit books
- `testimonials.json` - Reader reviews

### Customizing Design

1. **Colors**: Edit `tailwind.config.js` theme section
2. **Typography**: Fonts are imported in `app/styles/globals.css`
3. **Animations**: Modify `app/utils/animations.ts`

### Theme Toggle

Theme is automatically managed by the `useTheme` hook. Preference is stored in localStorage.

## Deployment

### Netlify (Recommended)

```bash
# Build for production
npm run build

# Push to GitHub
git push origin main

# Connect GitHub repo to Netlify for auto-deployment
```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

None required for basic deployment. For future integrations:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
```

## CMS Integration (Future)

This project is structured to integrate with Netlify CMS:

1. Create `admin/config.yml` for CMS configuration
2. Content remains in JSON format
3. CMS provides UI for editing without code

## Performance Optimizations

- Static generation for all pages
- Automatic image optimization
- CSS-in-JS minimization
- Code splitting
- Lazy loading for images and components

## Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus states on all buttons

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Crimson Text, Lora, Inter)

## License

© 2024 Aparnaa Ravi. All rights reserved.

## Support

For issues or questions about the website, contact: hello@aparnaaravi.com
