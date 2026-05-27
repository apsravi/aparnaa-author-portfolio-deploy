# Quick Start Guide - Aparnaa Ravi Portfolio

Get your portfolio live in 3 steps. Estimated time: 15 minutes.

## Step 1: Local Setup (5 minutes)

```bash
# Clone/navigate to project
cd aparnaa-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

You should see:
- ✅ Hero section with animated author image
- ✅ About section with timeline
- ✅ Books showcase with featured spotlight
- ✅ Testimonials carousel
- ✅ Contact form
- ✅ Newsletter signup
- ✅ Dark/light theme toggle

## Step 2: Customize Content (5 minutes)

Edit JSON files in `public/content/`:

### Edit Author Info
```bash
# public/content/author.json
nano public/content/author.json
```

Update:
- `name` → Your name
- `tagline` → Your tagline
- `bio` → Your biography
- `authorQuote` → Your quote
- `socialLinks` → Your social profiles
- `contact` → Your email

### Edit Books
```bash
# public/content/books.json
nano public/content/books.json
```

For each book, update:
- `title` → Book title
- `subtitle` → Subtitle
- `description` → Book description
- `coverImage` → Image path
- `rating` → Star rating (0-5)
- `links.kindle` → Amazon link
- `excerpt` → Sample text

### Edit Testimonials
```bash
# public/content/testimonials.json
nano public/content/testimonials.json
```

Add reader testimonials:
- `name` → Reader name
- `role` → Reader role
- `text` → Testimonial text
- `rating` → Rating (1-5)
- `bookTitle` → Which book

## Step 3: Deploy to Netlify (5 minutes)

### Option A: Via GitHub (Recommended - Automatic Updates)

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial Aparnaa Ravi portfolio"

# Create repo on GitHub.com
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/aparnaa-portfolio.git
git branch -M main
git push -u origin main
```

Then:
1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Select your GitHub repo
4. Click "Deploy"
5. Done! Your site is live

### Option B: Direct Deploy (One-off)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## Instant Features You Have

✅ **Dark/Light Theme**
- Click the sun/moon icon in header
- Preference saved automatically

✅ **Mobile Responsive**
- Fully responsive design
- Touch-friendly buttons
- Mobile hamburger menu

✅ **Smooth Animations**
- Scroll-triggered reveals
- Hover effects
- Smooth page transitions

✅ **SEO Ready**
- Meta tags configured
- Open Graph tags
- Mobile-friendly

✅ **Contact Form**
- Built-in validation
- Success feedback
- Error handling

✅ **Newsletter Signup**
- Email collection ready
- Success messages
- Client-side validation

## Next Steps (Optional)

### 1. Add Blog Posts
Create `public/content/blog.json` with articles (future feature)

### 2. Setup Newsletter Integration
Connect EmailJS for automated emails:
```bash
# Get free EmailJS account at https://www.emailjs.com
# Add credentials to .env.local

NEXT_PUBLIC_EMAILJS_SERVICE_ID=xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
```

### 3. Enable Netlify CMS
```bash
# In Netlify dashboard:
1. Go to Site Settings → Identity
2. Enable Identity
3. Enable Git Gateway
4. Visit yoursite.netlify.app/admin
```

### 4. Connect Custom Domain
```bash
# In Netlify dashboard:
1. Site Settings → Domain
2. Add custom domain
3. Follow DNS setup
```

### 5. Add Google Analytics
Edit `app/layout.tsx`:
```tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## File Structure Reference

```
aparnaa-portfolio/
├── app/
│   ├── components/          ← Reusable React components
│   ├── hooks/              ← Custom hooks (theme, scroll)
│   ├── utils/              ← Helper functions
│   ├── styles/             ← Global CSS
│   ├── layout.tsx          ← Root layout
│   └── page.tsx            ← Home page
├── public/
│   ├── content/            ← JSON content (EDIT THESE!)
│   │   ├── author.json
│   │   ├── books.json
│   │   └── testimonials.json
│   └── images/             ← Static images
├── README.md               ← Full documentation
├── DEPLOYMENT.md           ← Deploy guide
├── TESTING.md              ← QA checklist
└── PROJECT_SUMMARY.md      ← Architecture details
```

## Troubleshooting

### Local Server Won't Start
```bash
# Clear cache
rm -rf .next
npm install
npm run dev
```

### Changes Not Showing
```bash
# Restart dev server
Ctrl+C (kill process)
npm run dev
```

### Content Not Loading
```bash
# Verify JSON files are valid
# Check: public/content/author.json exists
cat public/content/author.json
```

### Build Fails
```bash
# Check for errors
npm run build

# See detailed error output
```

## Environment Checklist

Before pushing live:

- [ ] Content updated (author, books, testimonials)
- [ ] Images added to public/images/
- [ ] Social links updated
- [ ] Contact email set correctly
- [ ] All links working
- [ ] Mobile responsive verified
- [ ] Theme toggle working
- [ ] Forms submittable
- [ ] No console errors

## Essential Commands

```bash
# Development
npm run dev              # Start dev server on :3000

# Production
npm run build           # Create optimized build
npm run start           # Start production server

# Maintenance
npm install             # Install dependencies
npm update              # Update all packages
npm run lint            # Check for issues
```

## Support Resources

- **Next.js**: https://nextjs.org/docs
- **Tailwind**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion
- **Netlify**: https://docs.netlify.com
- **GitHub**: https://docs.github.com

## Support Contact

For issues specific to this portfolio:
- Email: hello@aparnaaravi.com
- GitHub Issues: [your-repo]/issues

---

**You're all set!** Your portfolio is ready to share with the world.

**Live Site**: https://your-domain.netlify.app

Happy sharing! 📚✨

