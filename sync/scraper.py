"""
VISUALEDITS Product Sync Script
================================
Scrapes products from https://visualeditsstore.nzmly.com and updates products.json.

Usage:
    python scraper.py              # Run sync now
    python scraper.py --schedule   # Run every 6 hours

Requirements:
    pip install -r requirements.txt
"""

import json
import os
import sys
import time
import logging
from datetime import datetime
from pathlib import Path

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Missing dependencies. Run: pip install -r requirements.txt")
    sys.exit(1)

# ── Config ──────────────────────────────────────
STORE_URL = "https://visualeditsstore.nzmly.com"
PRODUCTS_URL = f"{STORE_URL}/products"
OUTPUT_PATH = Path(__file__).parent.parent / "public" / "data" / "products.json"
LOG_PATH = Path(__file__).parent / "sync.log"
SYNC_INTERVAL = 6 * 60 * 60  # 6 hours in seconds

# ── Logging ─────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_PATH, encoding="utf-8"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("visualedits-sync")

# ── Category mapping ────────────────────────────
CATEGORY_KEYWORDS = {
    "video": "video-editing",
    "edit": "video-editing",
    "premiere": "video-editing",
    "transition": "video-editing",
    "lut": "video-editing",
    "design": "graphic-design",
    "template": "templates",
    "canva": "graphic-design",
    "photoshop": "graphic-design",
    "thumbnail": "graphic-design",
    "social media": "graphic-design",
    "ai": "ai-tools",
    "automation": "ai-tools",
    "bundle": "bundles",
    "pack": "bundles",
    "free": "freebies",
    "motion": "templates",
    "after effects": "templates",
    "sound": "video-editing",
}


def guess_category(name: str, description: str = "") -> str:
    """Guess product category from name and description."""
    text = f"{name} {description}".lower()
    for keyword, category in CATEGORY_KEYWORDS.items():
        if keyword in text:
            return category
    return "templates"


def slugify(text: str) -> str:
    """Convert text to URL-safe slug."""
    import re
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text.strip('-')


def fetch_products() -> list:
    """Fetch and parse products from the store."""
    logger.info(f"Fetching products from {PRODUCTS_URL}")
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    try:
        response = requests.get(PRODUCTS_URL, headers=headers, timeout=30)
        response.raise_for_status()
    except requests.RequestException as e:
        logger.error(f"Failed to fetch store page: {e}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    products = []
    
    # Common selectors for e-commerce platforms (Nzmly/Salla/Shopify-like)
    # These selectors may need adjustment based on the actual store HTML structure
    product_selectors = [
        ".product-card",
        ".product-item",
        "[data-product]",
        ".grid-product",
        ".product",
        ".card",
    ]
    
    product_elements = []
    for selector in product_selectors:
        product_elements = soup.select(selector)
        if product_elements:
            logger.info(f"Found {len(product_elements)} products with selector: {selector}")
            break
    
    if not product_elements:
        logger.warning("No products found with known selectors. Store HTML may have changed.")
        # Try to find products by looking for links with /products/ in href
        links = soup.find_all("a", href=lambda h: h and "/products/" in h if h else False)
        logger.info(f"Found {len(links)} product links by URL pattern")
        
        seen_slugs = set()
        for link in links:
            href = link.get("href", "")
            slug = href.rstrip("/").split("/")[-1]
            if slug and slug not in seen_slugs:
                seen_slugs.add(slug)
                name = link.get_text(strip=True) or slug.replace("-", " ").title()
                products.append({
                    "slug": slug,
                    "name": {"en": name, "ar": name},
                    "description": {"en": "", "ar": ""},
                    "price": 0,
                    "category": guess_category(name),
                    "isFree": False,
                    "isBestSeller": False,
                    "isBundle": "bundle" in name.lower(),
                    "image": "",
                    "features": [],
                    "compatibility": [],
                    "fileFormat": "",
                    "license": "Standard License",
                    "dateAdded": datetime.now().strftime("%Y-%m-%d"),
                })
        return products

    for el in product_elements:
        try:
            # Extract product data — adjust selectors as needed
            name_el = el.select_one("h2, h3, .product-title, .product-name, .card-title")
            name = name_el.get_text(strip=True) if name_el else ""
            
            link_el = el.select_one("a[href*='/products/']") or el.find("a")
            href = link_el.get("href", "") if link_el else ""
            slug = href.rstrip("/").split("/")[-1] if href else slugify(name)
            
            price_el = el.select_one(".price, .product-price, .amount, [data-price]")
            price_text = price_el.get_text(strip=True) if price_el else "0"
            price = float(''.join(c for c in price_text if c.isdigit() or c == '.') or '0')
            
            img_el = el.select_one("img")
            image = ""
            if img_el:
                image = img_el.get("src") or img_el.get("data-src") or ""
                if image and image.startswith("/"):
                    image = f"{STORE_URL}{image}"
            
            desc_el = el.select_one(".description, .product-desc, p")
            description = desc_el.get_text(strip=True) if desc_el else ""
            
            if name and slug:
                products.append({
                    "slug": slug,
                    "name": {"en": name, "ar": name},
                    "description": {"en": description, "ar": description},
                    "price": price,
                    "category": guess_category(name, description),
                    "isFree": price == 0,
                    "isBestSeller": False,
                    "isBundle": "bundle" in name.lower() or "pack" in name.lower(),
                    "image": image,
                    "features": [],
                    "compatibility": [],
                    "fileFormat": "",
                    "license": "Standard License",
                    "dateAdded": datetime.now().strftime("%Y-%m-%d"),
                })
        except Exception as e:
            logger.warning(f"Failed to parse product element: {e}")
            continue

    logger.info(f"Parsed {len(products)} products")
    return products


def load_existing() -> list:
    """Load existing products from JSON file."""
    if OUTPUT_PATH.exists():
        try:
            with open(OUTPUT_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return []
    return []


def merge_products(existing: list, fetched: list) -> list:
    """Merge fetched products with existing, preserving manual edits."""
    existing_map = {p["slug"]: p for p in existing}
    
    for product in fetched:
        slug = product["slug"]
        if slug in existing_map:
            # Update price and image, keep manually-edited fields
            old = existing_map[slug]
            old["price"] = product["price"]
            old["isFree"] = product["isFree"]
            if product["image"]:
                old["image"] = product["image"]
            if product["description"]["en"]:
                old["description"] = product["description"]
        else:
            # New product — assign next ID
            max_id = max((p.get("id", 0) for p in existing), default=0)
            product["id"] = max_id + 1
            existing.append(product)
    
    return existing


def save_products(products: list):
    """Save products to JSON file."""
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    logger.info(f"Saved {len(products)} products to {OUTPUT_PATH}")


def sync():
    """Run a single sync cycle."""
    logger.info("=" * 50)
    logger.info("Starting product sync...")
    
    fetched = fetch_products()
    if not fetched:
        logger.warning("No products fetched. Keeping existing data.")
        return
    
    existing = load_existing()
    merged = merge_products(existing, fetched)
    save_products(merged)
    
    logger.info(f"Sync complete. Total products: {len(merged)}")
    logger.info("=" * 50)


def main():
    if "--schedule" in sys.argv:
        logger.info(f"Starting scheduled sync (every {SYNC_INTERVAL // 3600} hours)")
        while True:
            sync()
            logger.info(f"Next sync in {SYNC_INTERVAL // 3600} hours...")
            time.sleep(SYNC_INTERVAL)
    else:
        sync()


if __name__ == "__main__":
    main()
