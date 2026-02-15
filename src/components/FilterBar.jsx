import { useTranslation } from 'react-i18next';

const CATEGORIES = [
    { key: 'all', tKey: 'products.allCategories' },
    { key: 'video-editing', tKey: 'products.videoEditing' },
    { key: 'graphic-design', tKey: 'products.graphicDesign' },
    { key: 'ai-tools', tKey: 'products.aiTools' },
    { key: 'templates', tKey: 'products.templates' },
    { key: 'bundles', tKey: 'products.bundlesCat' },
    { key: 'freebies', tKey: 'products.freebiesCat' },
];

const SORT_OPTIONS = [
    { key: 'newest', tKey: 'products.sortNewest' },
    { key: 'bestSellers', tKey: 'products.sortBestSellers' },
    { key: 'priceLow', tKey: 'products.sortPriceLow' },
    { key: 'priceHigh', tKey: 'products.sortPriceHigh' },
];

export default function FilterBar({ selectedCategory, onCategoryChange, sortBy, onSortChange }) {
    const { t } = useTranslation();

    return (
        <div className="filter-bar">
            <div className="filter-bar__categories">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.key}
                        className={`filter-bar__pill ${selectedCategory === cat.key ? 'filter-bar__pill--active' : ''}`}
                        onClick={() => onCategoryChange(cat.key)}
                    >
                        {t(cat.tKey)}
                    </button>
                ))}
            </div>

            <select
                className="glass-input filter-bar__sort"
                value={sortBy}
                onChange={e => onSortChange(e.target.value)}
                aria-label="Sort products"
            >
                {SORT_OPTIONS.map(opt => (
                    <option key={opt.key} value={opt.key}>{t(opt.tKey)}</option>
                ))}
            </select>

            <style>{`
        .filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .filter-bar__categories {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .filter-bar__pill {
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          border: 1px solid var(--card-border);
          background: var(--card-bg);
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .filter-bar__pill:hover,
        .filter-bar__pill--active {
          color: #000;
          background: var(--accent-gradient);
          border-color: var(--accent-gold);
        }
        .filter-bar__sort {
          width: auto;
          min-width: 160px;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          background: var(--input-bg);
          color: var(--text-primary);
        }
      `}</style>
        </div>
    );
}
