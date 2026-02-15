# Vercel Deployment (Recommended - Easier!)

## Option 1: Vercel CLI (Fastest)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login and deploy:
```bash
vercel login
vercel
```

3. Follow the prompts, and you're done!

## Option 2: Vercel Dashboard

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repo
5. Vercel auto-detects Vite
6. Click "Deploy"
7. Done! You get a live URL instantly

## Important Note for Vercel

If you deploy to Vercel, you should change `base: '/visualedits-store/'` in `vite.config.js` back to `base: '/'` or remove it entirely, as Vercel deploys to the root of the domain.
