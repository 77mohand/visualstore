# VISUALEDITS — Premium Digital Products Store

A premium showcase website for digital products targeting freelance video editors and graphic designers. Built with React + Vite, featuring a luxury black & gold glassmorphism design, bilingual AR/EN support, and dark/light mode.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Features

- 🌙 **Dark / Light Mode** — persisted in localStorage
- 🌐 **Bilingual (AR / EN)** — full RTL support for Arabic
- ✨ **Glassmorphism Design** — frosted glass cards, golden glow effects
- 🎯 **12 Pages** — Home, Products, Bundles, Freebies, Start Here, About, FAQ, Contact, Terms, Privacy, License, Product Detail
- 🔍 **Search & Filters** — instant search, category pills, sort options
- 🛒 **Buy Now → External Store** — all purchases redirect to `visualeditsstore.nzmly.com`
- 🤖 **Python Auto-Sync** — scrape products from external store automatically

## Tech Stack

- **Frontend**: React 19, Vite, React Router (HashRouter)
- **Styling**: CSS Custom Properties, Glassmorphism
- **Translations**: i18next + react-i18next
- **Icons**: Lucide React
- **Animations**: CSS + IntersectionObserver + Canvas particles
- **Sync**: Python (requests + BeautifulSoup)

## Project Structure

```
store/
├── public/data/products.json   # Product data (auto-synced)
├── src/
│   ├── components/             # Shared UI components
│   ├── contexts/               # Theme + Language providers
│   ├── i18n/                   # EN + AR translations
│   ├── pages/                  # All page components
│   ├── App.jsx                 # Routes + layout
│   ├── main.jsx                # Entry point
│   └── index.css               # Design system
├── sync/
│   ├── scraper.py              # Product sync script
│   └── requirements.txt        # Python dependencies
└── index.html                  # HTML shell + fonts
```

## Product Sync

```bash
cd sync
pip install -r requirements.txt

# One-time sync
python scraper.py

# Scheduled sync (every 6 hours)
python scraper.py --schedule
```

## Deployment

1. Build: `npm run build`
2. Deploy the `dist/` folder to Vercel, Netlify, or any static host
3. For Vercel: `npx vercel --prod`
