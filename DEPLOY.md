# Deployment Instructions

## First Time Setup (Manual - Only Once)

1. Create a new GitHub repository named: `visualedits-store`
   - Go to: https://github.com/new
   - Repository name: `visualedits-store`
   - Make it **Public**
   - **Important**: Do NOT check "Initialize this repository with a README"

## Connect Local Project to GitHub

Run these commands in your terminal (replace `USERNAME` with your GitHub username):

```bash
git init
git add .
git commit -m "Initial commit - VISUALEDITS Store"
git remote add origin https://github.com/USERNAME/visualedits-store.git
git branch -M main
git push -u origin main
```

## Deploy to GitHub Pages

After pushing to GitHub, run:

```bash
npm run deploy
```

Your site will be live at:
`https://USERNAME.github.io/visualedits-store/`

## Update Deployment

Whenever you make changes:

```bash
git add .
git commit -m "Update: description of changes"
git push
npm run deploy
```

## Enable GitHub Pages (One-Time Setup)

1. Go to your repo: `https://github.com/USERNAME/visualedits-store`
2. Click **Settings** tab
3. Click **Pages** in left sidebar
4. Under "Source", select: `gh-pages` branch
5. Click **Save**
6. Wait 1-2 minutes, then visit your site!
