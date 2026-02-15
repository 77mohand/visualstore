import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';

export default function ProductCard({ product }) {
    const { t } = useTranslation();
    const { lang } = useLanguage();

    const name = product.name[lang] || product.name.en;
    const desc = product.description[lang] || product.description.en;
    const categoryLabels = {
        'video-editing': t('products.videoEditing'),
        'graphic-design': t('products.graphicDesign'),
        'ai-tools': t('products.aiTools'),
        'templates': t('products.templates'),
        'bundles': t('products.bundlesCat'),
        'freebies': t('products.freebiesCat')
    };

    return (
        <div className="product-card glass-card">
            <div className="product-card__image-wrap">
                <img
                    src={product.image}
                    alt={name}
                    className="product-card__image"
                    loading="lazy"
                />
                <span className={`badge product-card__badge ${product.isFree ? 'badge-free' : ''}`}>
                    {product.isFree ? t('products.free') : (categoryLabels[product.category] || product.category)}
                </span>
            </div>

            <div className="product-card__body">
                <h3 className="product-card__title">{name}</h3>
                <p className="product-card__desc text-muted">{desc}</p>

                <div className="product-card__footer">
                    <span className="product-card__price">
                        {product.isFree
                            ? <span className="text-gold">{t('products.free')}</span>
                            : <span className="text-gold">${product.price}</span>
                        }
                    </span>

                    <div className="product-card__actions">
                        <Link to={`/product/${product.slug}`} className="btn btn-sm btn-secondary">
                            {t('products.viewDetails')}
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
        .product-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .product-card__image-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 3/2;
        }
        .product-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .product-card:hover .product-card__image {
          transform: scale(1.08);
        }
        .product-card__badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
        }
        [dir="rtl"] .product-card__badge {
          left: auto;
          right: 0.75rem;
        }
        .product-card__body {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .product-card__title {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .product-card__desc {
          font-size: 0.85rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 1rem;
          flex: 1;
        }
        .product-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        .product-card__price {
          font-size: 1.15rem;
          font-weight: 800;
        }
      `}</style>
        </div>
    );
}
