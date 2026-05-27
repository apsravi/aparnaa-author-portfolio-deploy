# Testing & Quality Assurance Guide

## Phase 1: Local Development Testing

### 1.1 Setup & Installation

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

### 1.2 Component Rendering Tests

- [ ] **Header**
  - Logo displays correctly
  - Navigation links work
  - Theme toggle button functional
  - Mobile menu opens/closes
  - Active nav link highlighting

- [ ] **Hero Section**
  - Author image loads
  - Name and tagline display
  - CTA buttons functional
  - Animated particles visible
  - Scroll indicator animates
  - Parallax effect on scroll

- [ ] **About Author**
  - Author bio displays
  - Profile image loads
  - Achievement timeline renders
  - Quote section styled correctly
  - Writing areas badges show
  - Scroll animations trigger

- [ ] **Books Showcase**
  - All books display in grid
  - Book covers load
  - Category filters work
  - Featured book spotlight displays
  - Ratings and reviews show
  - Purchase links functional
  - Hover animations work

- [ ] **Testimonials**
  - Carousel displays
  - Auto-scroll works (6 second interval)
  - Navigation arrows functional
  - Indicators show current position
  - Star ratings display
  - Profile avatars show

- [ ] **Contact Form**
  - Form fields render
  - Input validation works
  - Error messages display
  - Success message shows
  - Form resets after submit

- [ ] **Newsletter**
  - Email input functional
  - Subscribe button works
  - Success/error messages display
  - Form clears on success

- [ ] **Footer**
  - All sections display
  - Social links present
  - Copyright year updates
  - Links functional

### 1.3 Responsive Design Tests

**Mobile (375px)**
```bash
# Use browser DevTools to test
# Check:
- [ ] Header collapses to hamburger menu
- [ ] All text readable
- [ ] Images scale properly
- [ ] Forms single column
- [ ] Touch targets ≥44px
- [ ] No horizontal scroll
```

**Tablet (768px)**
```
- [ ] Grid layouts adjust (2 columns)
- [ ] Spacing appropriate
- [ ] Images scale correctly
```

**Desktop (1920px)**
```
- [ ] Max-width containers centered
- [ ] Grid layouts 3-4 columns
- [ ] Whitespace balanced
```

### 1.4 Theme Testing

**Light Mode**
- [ ] Background is cream/ivory
- [ ] Text is readable
- [ ] Buttons have good contrast
- [ ] Shadows visible
- [ ] Images clear

**Dark Mode**
- [ ] Background is dark
- [ ] Text is readable (cream/ivory)
- [ ] Gold accents visible
- [ ] Shadows subtle but visible
- [ ] Images clear

**Theme Persistence**
- [ ] Set theme to dark
- [ ] Refresh page
- [ ] Dark mode persists
- [ ] Toggle and refresh
- [ ] Light mode persists

### 1.5 Animation Tests

```
- [ ] Fade-up animations on scroll
- [ ] Particles float smoothly
- [ ] Hover effects responsive
- [ ] Page transitions smooth
- [ ] Loading spinner visible
- [ ] No jank or stuttering
- [ ] 60fps performance
```

Check with Chrome DevTools:
1. Open DevTools → Performance
2. Record while scrolling
3. Check for frame drops

### 1.6 Navigation Tests

- [ ] All nav links work
- [ ] Hash navigation (#about, #books, etc.)
- [ ] Smooth scroll behavior
- [ ] Mobile menu closes on link click
- [ ] Back/forward browser buttons work

### 1.7 Content Loading Tests

```bash
# Check network requests
1. Open DevTools → Network
2. Refresh page
3. Verify:
   - [ ] All images load
   - [ ] No 404 errors
   - [ ] Content JSON loads
   - [ ] Fonts load
   - [ ] Total size reasonable
```

### 1.8 Form Validation Tests

**Contact Form**
- [ ] Empty name shows error
- [ ] Invalid email shows error
- [ ] Missing message shows error
- [ ] Valid submission shows success
- [ ] Form data clears

**Newsletter**
- [ ] Empty email shows error
- [ ] Valid email shows success
- [ ] Button disabled during submit
- [ ] Input cleared after success

### 1.9 Accessibility Tests

```bash
# Use Lighthouse in Chrome DevTools
1. DevTools → Lighthouse
2. Run accessibility audit
3. Fix issues:
   - [ ] Color contrast ≥4.5:1
   - [ ] Alt text on images
   - [ ] ARIA labels on buttons
   - [ ] Keyboard navigation works
   - [ ] Focus visible on all interactive elements
```

**Keyboard Navigation**
- [ ] Tab through all interactive elements
- [ ] Focus visible on each element
- [ ] Buttons activate with Enter/Space
- [ ] Forms submittable via keyboard
- [ ] Mobile menu closable via Escape

### 1.10 Browser Compatibility

Test in:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Phase 2: Build & Production Testing

### 2.1 Production Build

```bash
npm run build

# Check:
- [ ] No build errors
- [ ] No warnings
- [ ] .next folder generated
- [ ] Build time < 60 seconds
```

### 2.2 Start Production Server

```bash
npm run start

# Visit http://localhost:3000
# Verify all pages load
```

### 2.3 Performance Audit

**Lighthouse Score**
```
Target: 90+ on all metrics
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 90+
- [ ] SEO: 95+
```

Run: DevTools → Lighthouse → Generate Report

**Core Web Vitals**
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] First Input Delay (FID): < 100ms
- [ ] Cumulative Layout Shift (CLS): < 0.1

### 2.4 SEO Tests

**Meta Tags**
- [ ] Title tag present and unique
- [ ] Description meta present
- [ ] Viewport meta set
- [ ] Open Graph tags present
- [ ] Twitter card tags (optional)

**Structure**
- [ ] H1 present and unique
- [ ] Heading hierarchy correct
- [ ] No duplicate headings
- [ ] Schema markup valid

**Robot Tests**
```bash
# Check robots.txt
curl http://localhost:3000/robots.txt

# Check sitemap (optional for future)
```

## Phase 3: Deployment Testing

### 3.1 Pre-Deployment Checklist

- [ ] All content updated and correct
- [ ] Images compressed and optimized
- [ ] All links verified
- [ ] Forms tested
- [ ] Social links correct
- [ ] Contact email valid
- [ ] Analytics code ready (optional)

### 3.2 GitHub Repository

```bash
git status          # Clean working directory
git log             # Commits present
git branch -a       # On main branch
```

### 3.3 Netlify Deployment

1. Push to GitHub
2. Verify Netlify build succeeds
3. Check build logs for errors
4. Verify deploy preview
5. Test live site

### 3.4 Live Site Testing

**Functional Tests**
- [ ] All pages load
- [ ] Navigation works
- [ ] Forms submit
- [ ] Images load
- [ ] Animations smooth

**Performance**
- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] No console errors
- [ ] Lighthouse score 90+

**Responsiveness**
- [ ] Mobile: 375px and up
- [ ] Tablet: 768px viewport
- [ ] Desktop: 1920px+

**Content**
- [ ] All text correct
- [ ] Images display correctly
- [ ] Links functional
- [ ] No broken images

### 3.5 Cross-Browser Testing

On live site, test in:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari
- [ ] Chrome Mobile

## Phase 4: Post-Launch Monitoring

### 4.1 Daily Checks

- [ ] Site loads successfully
- [ ] No 500 errors in logs
- [ ] Forms processing correctly
- [ ] Analytics tracking (if enabled)

### 4.2 Weekly Checks

- [ ] Page load times stable
- [ ] No new console errors
- [ ] Mobile traffic renders correctly
- [ ] All forms functional

### 4.3 Monthly Reviews

- [ ] Performance trends
- [ ] User engagement metrics
- [ ] Form submission rates
- [ ] Error logs analysis

## Test Cases Summary

| Feature | Test | Expected Result |
|---------|------|-----------------|
| Header | Navigation link click | Page scrolls to section |
| Hero | CTA button click | Scrolls to books section |
| Books | Filter by category | Only books in category display |
| Books | Filter click | 3-4 books in category show |
| Testimonials | Next arrow click | Displays next testimonial |
| Form | Submit empty | Shows validation error |
| Form | Submit valid | Shows success message |
| Newsletter | Subscribe valid | Success message shows |
| Theme | Toggle theme | Dark mode activates, persists |
| Mobile Menu | Click hamburger | Menu opens |
| Mobile Menu | Click link | Menu closes, navigates |

## Performance Benchmarks

Target metrics:
- **Page Load**: < 2.5 seconds
- **First Contentful Paint**: < 1.2 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Time to Interactive**: < 3.8 seconds
- **Cumulative Layout Shift**: < 0.1

## Bug Tracking

For any issues found:

1. Create a GitHub issue
2. Title: Clear description
3. Description: Steps to reproduce
4. Expected vs actual result
5. Environment: Browser, OS, resolution
6. Severity: Critical/High/Medium/Low

## Sign-Off Checklist

Before considering launch complete:

- [ ] All test phases completed
- [ ] No critical issues remaining
- [ ] Performance metrics met
- [ ] Accessibility score 95+
- [ ] Mobile responsive confirmed
- [ ] Cross-browser tested
- [ ] Content verified
- [ ] Forms working
- [ ] Analytics configured
- [ ] Domain configured
- [ ] SSL/HTTPS active
- [ ] Monitoring enabled

---

**Testing Complete!** Ready for public access.

