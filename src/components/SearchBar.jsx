import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SearchBar({ value, onChange }) {
    const { t } = useTranslation();

    return (
        <div className="search-bar">
            <Search size={18} className="search-bar__icon" />
            <input
                type="text"
                className="glass-input search-bar__input"
                placeholder={t('products.searchPlaceholder')}
                value={value}
                onChange={e => onChange(e.target.value)}
                aria-label="Search products"
            />

            <style>{`
        .search-bar {
          position: relative;
          flex: 1;
          max-width: 400px;
        }
        .search-bar__icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-faint);
          pointer-events: none;
        }
        [dir="rtl"] .search-bar__icon {
          left: auto;
          right: 1rem;
        }
        .search-bar__input {
          padding-left: 2.8rem;
        }
        [dir="rtl"] .search-bar__input {
          padding-left: 1rem;
          padding-right: 2.8rem;
        }
      `}</style>
        </div>
    );
}
