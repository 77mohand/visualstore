import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

export default function Products() {
    const { t } = useTranslation();
    const { lang } = useLanguage();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        fetch('/data/products.json')
            .then(r => r.json())
            .then(setProducts)
            .catch(() => { });
    }, []);

    const filtered = useMemo(() => {
        let result = [...products];

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(p =>
                (p.name.en || '').toLowerCase().includes(q) ||
                (p.name.ar || '').includes(q) ||
                (p.description.en || '').toLowerCase().includes(q) ||
                (p.description.ar || '').includes(q)
            );
        }

        if (category !== 'all') {
            result = result.filter(p => p.category === category);
        }

        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
            case 'bestSellers':
                result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
                break;
            case 'priceLow':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'priceHigh':
                result.sort((a, b) => b.price - a.price);
                break;
        }

        return result;
    }, [products, search, category, sortBy]);

    return (
        <section className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <h1 className="heading-display heading-lg">{t('nav.products')}</h1>
                        <div className="gold-line" />
                    </div>
                </ScrollReveal>

                <div className="products-toolbar">
                    <SearchBar value={search} onChange={setSearch} />
                </div>

                <FilterBar
                    selectedCategory={category}
                    onCategoryChange={setCategory}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                />

                {filtered.length > 0 ? (
                    <div className="grid grid-3">
                        {filtered.map((p, i) => (
                            <ScrollReveal key={p.id} delay={i * 60}>
                                <ProductCard product={p} />
                            </ScrollReveal>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p className="text-lg text-muted">{t('products.noProducts')}</p>
                    </div>
                )}
            </div>

            <style>{`
        .products-toolbar {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
      `}</style>
        </section>
    );
}
