import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';
import { ExternalLink, Check, ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
    const { slug } = useParams();
    const { t } = useTranslation();
    const { lang } = useLanguage();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/data/products.json')
            .then(r => r.json())
            .then(data => {
                setProducts(data);
                setProduct(data.find(p => p.slug === slug) || null);
            })
            .catch(() => { });
    }, [slug]);

    if (!product) {
        return (
            <section className="section">
                <div className="container" style={{ textAlign: 'center', padding: '6rem 0' }}>
                    <div className="skeleton" style={{ width: '100%', height: '400px', marginBottom: '2rem' }} />
                    <div className="skeleton" style={{ width: '60%', height: '30px', margin: '0 auto 1rem' }} />
                    <div className="skeleton" style={{ width: '40%', height: '20px', margin: '0 auto' }} />
                </div>
            </section>
        );
    }

    const name = product.name[lang] || product.name.en;
    const desc = product.description[lang] || product.description.en;
    const buyUrl = `https://visualeditsstore.nzmly.com/products/${product.slug}`;
    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

    return (
        <section className="section">
            <div className="container">
                <Link to="/products" className="detail-back btn btn-ghost">
                    <ArrowLeft size={16} /> {t('nav.products')}
                </Link>

                <div className="detail-grid">
                    <ScrollReveal>
                        <div className="detail-image glass-card" style={{ overflow: 'hidden', padding: 0 }}>
                            <img src={product.image} alt={name} style={{ width: '100%', height: 'auto' }} />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={100}>
                        <div className="detail-info">
                            <span className="badge">{product.category.replace('-', ' ')}</span>
                            <h1 className="heading-display heading-md" style={{ margin: '0.75rem 0' }}>{name}</h1>

                            <div className="detail-price">
                                {product.isFree
                                    ? <span className="text-gold" style={{ fontSize: '2rem', fontWeight: 800 }}>{t('products.free')}</span>
                                    : <span className="text-gold" style={{ fontSize: '2rem', fontWeight: 800 }}>${product.price}</span>
                                }
                            </div>

                            <p className="text-lg text-muted" style={{ margin: '1.5rem 0', lineHeight: 1.8 }}>
                                {desc}
                            </p>

                            {product.features && (
                                <div className="detail-section">
                                    <h3 className="heading-sm">{t('products.features')}</h3>
                                    <ul className="detail-features">
                                        {product.features.map((f, i) => (
                                            <li key={i}><Check size={16} className="text-gold" /> {f}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="detail-meta">
                                {product.compatibility && (
                                    <div>
                                        <strong>{t('products.compatibility')}:</strong>
                                        <span className="text-muted"> {product.compatibility.join(', ')}</span>
                                    </div>
                                )}
                                {product.fileFormat && (
                                    <div>
                                        <strong>{t('products.fileFormat')}:</strong>
                                        <span className="text-muted"> {product.fileFormat}</span>
                                    </div>
                                )}
                                {product.license && (
                                    <div>
                                        <strong>{t('products.licenseInfo')}:</strong>
                                        <span className="text-muted"> {product.license}</span>
                                    </div>
                                )}
                            </div>

                            <a
                                href={buyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-lg"
                                style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}
                            >
                                {product.isFree ? t('hero.downloadFreebies') : t('products.buyNow')} <ExternalLink size={18} />
                            </a>
                        </div>
                    </ScrollReveal>
                </div>

                {related.length > 0 && (
                    <div style={{ marginTop: '5rem' }}>
                        <ScrollReveal>
                            <h2 className="heading-display heading-md" style={{ marginBottom: '2rem' }}>
                                {t('products.relatedProducts')}
                            </h2>
                        </ScrollReveal>
                        <div className="grid grid-3">
                            {related.map((p, i) => (
                                <ScrollReveal key={p.id} delay={i * 100}>
                                    <ProductCard product={p} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        .detail-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          font-size: 0.9rem;
        }
        .detail-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        .detail-section {
          margin-bottom: 1.5rem;
        }
        .detail-section h3 {
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }
        .detail-features {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .detail-features li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .detail-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.25rem;
          border-radius: 12px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          font-size: 0.9rem;
        }
        @media (max-width: 768px) {
          .detail-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
        </section>
    );
}
