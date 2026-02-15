import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';

export default function Bundles() {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/data/products.json')
            .then(r => r.json())
            .then(data => setProducts(data.filter(p => p.isBundle)))
            .catch(() => { });
    }, []);

    return (
        <section className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <h1 className="heading-display heading-lg">{t('nav.bundles')}</h1>
                        <div className="gold-line" />
                        <p className="text-lg text-muted">
                            {t('sections.bestSellersDesc')}
                        </p>
                    </div>
                </ScrollReveal>
                <div className="grid grid-3">
                    {products.map((p, i) => (
                        <ScrollReveal key={p.id} delay={i * 100}>
                            <ProductCard product={p} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
