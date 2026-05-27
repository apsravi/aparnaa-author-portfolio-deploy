# GitHub Setup & Deployment Instructions

**Everything is ready. Follow these steps to push to your GitHub account.**

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Enter repository name: `aparnaa-author-portfolio`
3. Description: `Premium Author Portfolio for Aparnaa Ravi`
4. Choose: **Public** (for portfolio visibility)
5. Do NOT initialize with README (we already have one)
6. Click "Create repository"

## Step 2: Add GitHub Remote & Push Code

Run these commands in your terminal:

```bash
cd D:/aparnaa-author-portfolio

# Add remote origin
git remote add origin https://github.com/apsravi/aparnaa-author-portfolio.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**When prompted for authentication:**
- Username: `apsravi`
- Password: Use a Personal Access Token (PAT) or GitHub password

## Step 3: Verify on GitHub

1. Go to https://github.com/apsravi/aparnaa-author-portfolio
2. Confirm all files are present
3. You should see 30+ files uploaded

## Step 4: Deploy to Netlify

### Option A: Netlify Auto-Deploy (Recommended)

1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Select GitHub
4. Authorize GitHub access
5. Select `aparnaa-author-portfolio` repository
6. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Click "Deploy site"
8. Wait ~2 minutes for deployment

**Your site will be live at:** `https://[random-id].netlify.app`

### Option B: Local Testing First

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

**Then deploy to Netlify as Option A above.**

## Step 5: Custom Domain (Optional)

1. In Netlify dashboard → Domain settings
2. Add custom domain (e.g., aparnaaravi.com)
3. Configure DNS with domain registrar
4. Follow Netlify's DNS setup

## Step 6: Enable CMS (Optional)

1. In Netlify dashboard → Identity
2. Enable Identity
3. Enable Git Gateway
4. Visit `https://yoursite.netlify.app/admin`

## What You Now Have

✅ **GitHub Repository** - Version controlled code
✅ **Netlify Hosting** - Free, auto-deploying site
✅ **Production Build** - Tested and optimized
✅ **CMS Ready** - Optional content management
✅ **Documentation** - 7 comprehensive guides
✅ **Zero Cost** - Everything is free

## Complete File Structure

```
aparnaa-author-portfolio/
├── Documentation (7 guides)
├── Components (8 React components)
├── Styles (Tailwind + global CSS)
├── Content (JSON models)
├── Configuration (Next.js, Netlify)
├── Public (images, CMS admin)
└── .git (version control)
```

## Command Reference

```bash
# Development
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server locally

# Deployment
git add .
git commit -m "your message"
git push origin main # Push to GitHub (auto-deploys to Netlify)
```

## Troubleshooting

**Git push fails?**
```bash
git remote -v  # Check remote is correct
git status     # Check pending changes
```

**npm install fails?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build fails locally?**
```bash
npm run build
```

## Next Steps

1. **Create GitHub repo** (Step 1 above)
2. **Push code to GitHub** (Step 2)
3. **Deploy to Netlify** (Step 4)
4. **Customize content** (Edit JSON files)
5. **Go live!** ✨

---

**Status:** ✅ Ready to deploy  
**Cost:** $0/month  
**Time to live:** ~5 minutes

Start with Step 1!
