import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';
import { Zap, DollarSign, Rocket, Star, ArrowRight } from 'lucide-react';

export default function Home() {
    const { t } = useTranslation();
    const { lang } = useLanguage();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/data/products.json')
            .then(r => r.json())
            .then(setProducts)
            .catch(() => { });
    }, []);

    const bestSellers = products.filter(p => p.isBestSeller);
    const freebies = products.filter(p => p.isFree);

    const whyUsItems = [
        { icon: <Zap size={28} />, text: t('whyUs.speed') },
        { icon: <DollarSign size={28} />, text: t('whyUs.quality') },
        { icon: <Rocket size={28} />, text: t('whyUs.efficiency') },
        { icon: <Star size={28} />, text: t('whyUs.impress') },
    ];

    const categoriesList = [
        { key: 'videoEditing', emoji: '🎬', color: '#FF6B6B' },
        { key: 'graphicDesign', emoji: '🎨', color: '#4ECDC4' },
        { key: 'aiTools', emoji: '🤖', color: '#A78BFA' },
        { key: 'motionGraphics', emoji: '✨', color: '#F59E0B' },
        { key: 'soundEffects', emoji: '🔊', color: '#10B981' },
    ];

    const testimonials = [
        { name: lang === 'ar' ? 'أحمد محمد' : 'Ahmed M.', role: lang === 'ar' ? 'فيديو إيديتور' : 'Video Editor', stars: 5, text: lang === 'ar' ? 'المنتجات وفرت عليا ساعات من الشغل كل أسبوع. أنصح بيها أي فريلانسر.' : 'These products save me hours every week. Highly recommend for any freelancer.' },
        { name: lang === 'ar' ? 'سارة أحمد' : 'Sarah A.', role: lang === 'ar' ? 'مصممة جرافيك' : 'Graphic Designer', stars: 5, text: lang === 'ar' ? 'الجودة ممتازة والقوالب سهلة التعديل. أفضل استثمار عملته.' : 'Excellent quality and easy to customize templates. Best investment I made.' },
        { name: lang === 'ar' ? 'محمد علي' : 'Mohamed A.', role: lang === 'ar' ? 'موشن جرافيكس' : 'Motion Designer', stars: 5, text: lang === 'ar' ? 'الباقة الشاملة غيرت طريقة شغلي تماماً. الآن بسلّم مشاريع بسرعة مضاعفة.' : 'The ultimate bundle completely changed my workflow. I deliver projects twice as fast now.' },
    ];

    return (
        <>
            <HeroSection />

            {/* Best Sellers */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <h2 className="heading-display heading-lg">{t('sections.bestSellers')}</h2>
                            <div className="gold-line" />
                            <p className="text-lg">{t('sections.bestSellersDesc')}</p>
                        </div>
                    </ScrollReveal>
                    <div className="grid grid-3">
                        {bestSellers.slice(0, 6).map((p, i) => (
                            <ScrollReveal key={p.id} delay={i * 100}>
                                <ProductCard product={p} />
                            </ScrollReveal>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                        <Link to="/products" className="btn btn-secondary">
                            {t('nav.products')} <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <h2 className="heading-display heading-lg">{t('sections.whyChooseUs')}</h2>
                            <div className="gold-line" />
                        </div>
                    </ScrollReveal>
                    <div className="grid grid-4">
                        {whyUsItems.map((item, i) => (
                            <ScrollReveal key={i} delay={i * 100}>
                                <div className="why-card glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                                    <div className="why-card__icon">{item.icon}</div>
                                    <p className="why-card__text">{item.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Freebies */}
            {freebies.length > 0 && (
                <section className="section">
                    <div className="container">
                        <ScrollReveal>
                            <div className="section-header">
                                <h2 className="heading-display heading-lg">{t('sections.freeDownloads')}</h2>
                                <div className="gold-line" />
                                <p className="text-lg">{t('sections.freeDownloadsDesc')}</p>
                            </div>
                        </ScrollReveal>
                        <div className="grid grid-3">
                            {freebies.slice(0, 3).map((p, i) => (
                                <ScrollReveal key={p.id} delay={i * 100}>
                                    <ProductCard product={p} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Categories */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <h2 className="heading-display heading-lg">{t('sections.categories')}</h2>
                            <div className="gold-line" />
                            <p className="text-lg">{t('sections.categoriesDesc')}</p>
                        </div>
                    </ScrollReveal>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {categoriesList.map((cat, i) => (
                            <ScrollReveal key={cat.key} delay={i * 80}>
                                <Link to="/products" className="cat-card glass-card" style={{ padding: '1.5rem', textAlign: 'center', display: 'block' }}>
                                    <div className="cat-card__emoji">{cat.emoji}</div>
                                    <h3 className="cat-card__name">{t(`categories.${cat.key}`)}</h3>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section">
                <div className="container">
                    <ScrollReveal>
                        <div className="section-header">
                            <h2 className="heading-display heading-lg">{t('sections.testimonials')}</h2>
                            <div className="gold-line" />
                            <p className="text-lg">{t('sections.testimonialsDesc')}</p>
                        </div>
                    </ScrollReveal>
                    <div className="grid grid-3">
                        {testimonials.map((tm, i) => (
                            <ScrollReveal key={i} delay={i * 100}>
                                <div className="testimonial-card glass-card" style={{ padding: '2rem' }}>
                                    <div className="testimonial-card__stars">
                                        {'★'.repeat(tm.stars)}
                                    </div>
                                    <p className="testimonial-card__text">"{tm.text}"</p>
                                    <div className="testimonial-card__author">
                                        <strong>{tm.name}</strong>
                                        <span className="text-muted"> · {tm.role}</span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section cta-section">
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <ScrollReveal>
                        <h2 className="heading-display heading-lg" style={{ marginBottom: '1rem' }}>
                            {t('sections.ctaHeadline')}
                        </h2>
                        <p className="text-lg text-muted" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                            {t('sections.ctaSubheadline')}
                        </p>
                        <Link to="/products" className="btn btn-primary btn-lg">
                            {t('sections.startNow')} <ArrowRight size={18} />
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            <style>{`
        .why-card__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: rgba(255, 215, 0, 0.1);
          color: var(--accent-gold);
          margin-bottom: 1rem;
        }
        .why-card__text {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .cat-card__emoji {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
        }
        .cat-card__name {
          font-size: 0.95rem;
          font-weight: 600;
        }
        .testimonial-card__stars {
          color: var(--accent-gold);
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          letter-spacing: 2px;
        }
        .testimonial-card__text {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          font-style: italic;
        }
        .testimonial-card__author {
          font-size: 0.85rem;
        }
        .cta-section {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 50% 50%, rgba(255, 215, 0, 0.08) 0%, transparent 70%);
        }
      `}</style>
        </>
    );
}
