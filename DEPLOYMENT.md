# Deployment Guide - Aparnaa Ravi Portfolio

This guide covers deploying the Aparnaa Ravi author portfolio to production using Netlify (free).

## Prerequisites

- GitHub account
- Netlify account (free)
- Git installed locally
- Node.js 18+

## Step-by-Step Deployment

### 1. Initialize Git Repository

```bash
cd aparnaa-portfolio

# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Aparnaa Ravi portfolio website"
```

### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Create repository named `aparnaa-portfolio`
3. Do NOT initialize with README (we already have one)
4. Click "Create repository"

### 3. Push to GitHub

```bash
# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/aparnaa-portfolio.git

# Rename branch to main if needed
git branch -M main

# Push code
git push -u origin main
```

### 4. Deploy to Netlify

#### Option A: Via Netlify UI (Recommended)

1. Go to https://app.netlify.com
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Select "GitHub" as provider
5. Authorize GitHub access
6. Select `aparnaa-portfolio` repository
7. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
8. Keep other defaults
9. Click "Deploy site"

Netlify will automatically deploy whenever you push to main.

#### Option B: Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow prompts and select your site

# For future deployments
netlify deploy --prod
```

### 5. Post-Deployment Setup

#### Enable Git Gateway (for CMS)

1. Go to Netlify dashboard → your site
2. Navigate to "Site settings" → "Identity"
3. Click "Enable Identity"
4. Under "Services", enable "Git Gateway"
5. Invite yourself as a user:
   - Go to Identity tab
   - Click "Invite users"
   - Enter your email
6. Accept invite email and set password

#### Access CMS

Visit `https://your-domain.netlify.app/admin` to access Netlify CMS

### 6. Configure Custom Domain (Optional)

1. In Netlify dashboard → "Domain settings"
2. Add custom domain (e.g., aparnaaravi.com)
3. Configure DNS with your domain registrar
4. Follow Netlify's DNS setup instructions

### 7. Update Content

#### Via CMS Interface

1. Navigate to `https://your-domain/admin`
2. Login with your credentials
3. Edit author info, books, testimonials
4. Click "Publish" to save

#### Via Git (Direct JSON editing)

1. Edit JSON files in `public/content/`
2. Commit and push:
   ```bash
   git add public/content/
   git commit -m "Update content"
   git push
   ```
3. Netlify auto-deploys with new content

#### Via Command Line

```bash
# Pull latest changes
git pull origin main

# Edit content files
# Edit public/content/author.json, books.json, etc.

# Commit changes
git add .
git commit -m "Update portfolio content"

# Push to deploy
git push origin main
```

## Environment Variables (Optional)

For future integrations, add to Netlify:

1. Site settings → "Build & deploy" → "Environment"
2. Add variables:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID = your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = your_public_key
```

## SSL/HTTPS

Netlify automatically provides free SSL. Your site is HTTPS by default.

## Analytics

Add Netlify Analytics:

1. Site settings → "Analytics"
2. Enable "Netlify Analytics"
3. View stats in Analytics tab

## Performance Monitoring

- **Netlify Lighthouse**: Built-in performance reports
- **Web Vitals**: Monitor Core Web Vitals in Analytics

## Troubleshooting

### Build fails

```bash
# Check build locally
npm run build

# Check dependencies
npm install

# Clear cache and rebuild
rm -rf .next
npm run build
```

### Content not updating

```bash
# Verify JSON files are in public/content/
ls public/content/

# Check git status
git status

# Push changes
git push origin main
```

### CMS not loading

1. Verify Git Gateway is enabled
2. Check browser console for errors
3. Verify you're logged in via Identity widget

## Update Process

### Code Updates

```bash
# Make changes locally
# ...files edited...

# Test locally
npm run dev

# Deploy
git add .
git commit -m "Description of changes"
git push origin main

# Netlify auto-deploys (takes 1-2 minutes)
```

### Content Updates

**Option 1: Via CMS** (Recommended for non-technical users)
- Visit `/admin`
- Edit content
- Publish changes
- Auto-deployed in seconds

**Option 2: Direct JSON edit**
- Edit `public/content/*.json`
- Git push
- Auto-deployed in 1-2 minutes

## Monitoring & Maintenance

### Weekly
- Check Netlify analytics for traffic
- Review browser console for errors
- Test form submissions

### Monthly
- Update book covers/links if needed
- Add new testimonials
- Monitor performance metrics

### Quarterly
- Review and update author bio
- Update achievement timeline
- Add new blog posts (future feature)

## Rollback (if needed)

```bash
# View deployment history in Netlify UI
# Click "Deploys" tab
# Select previous deployment
# Click "Restore this deploy"
```

## Custom Domain SSL

Automatic with Netlify. Once domain is connected:
1. Automatic SSL provisioning
2. Auto-renewal every 90 days
3. Accessible via https://yourdomain.com

## Support & Help

- **Netlify Docs**: https://docs.netlify.com
- **Next.js Docs**: https://nextjs.org/docs
- **Git Help**: https://git-scm.com/doc

## Security Best Practices

1. Keep dependencies updated: `npm update`
2. Use strong passwords for Identity/CMS
3. Enable two-factor authentication on GitHub
4. Regularly review git commits
5. Use branch protection rules

## Performance Tips

1. **Images**: Use next/image for automatic optimization
2. **Fonts**: Google Fonts (already optimized)
3. **Code**: Built-in code splitting by Next.js
4. **Caching**: Netlify CDN with automatic caching

## Going Live Checklist

- [ ] Domain configured
- [ ] SSL/HTTPS enabled (automatic)
- [ ] Content updated (author, books, testimonials)
- [ ] Images uploaded
- [ ] Social links verified
- [ ] Contact email configured
- [ ] Analytics enabled
- [ ] CMS access tested
- [ ] Mobile responsiveness checked
- [ ] Form submissions tested

---

**Deployed!** Your portfolio is now live and accessible 24/7.

For questions: hello@aparnaaravi.com
