import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';
import { Search, Download, Package, TrendingUp, ArrowRight } from 'lucide-react';

export default function StartHere() {
    const { t } = useTranslation();

    const steps = [
        { icon: <Search size={28} />, title: t('startHere.step1Title'), desc: t('startHere.step1Desc'), link: '/products' },
        { icon: <Download size={28} />, title: t('startHere.step2Title'), desc: t('startHere.step2Desc'), link: '/freebies' },
        { icon: <Package size={28} />, title: t('startHere.step3Title'), desc: t('startHere.step3Desc'), link: '/bundles' },
        { icon: <TrendingUp size={28} />, title: t('startHere.step4Title'), desc: t('startHere.step4Desc'), link: '/products' },
    ];

    return (
        <section className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <h1 className="heading-display heading-lg">{t('startHere.title')}</h1>
                        <div className="gold-line" />
                        <p className="text-lg text-muted">{t('startHere.subtitle')}</p>
                    </div>
                </ScrollReveal>

                <div className="start-steps">
                    {steps.map((step, i) => (
                        <ScrollReveal key={i} delay={i * 120}>
                            <Link to={step.link} className="start-step glass-card">
                                <div className="start-step__number text-gold">{String(i + 1).padStart(2, '0')}</div>
                                <div className="start-step__icon">{step.icon}</div>
                                <h3 className="start-step__title">{step.title}</h3>
                                <p className="start-step__desc text-muted">{step.desc}</p>
                                <span className="start-step__arrow text-gold"><ArrowRight size={18} /></span>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            <style>{`
        .start-steps {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .start-step {
          display: flex;
          flex-direction: column;
          padding: 2rem;
          position: relative;
        }
        .start-step__number {
          font-size: 2rem;
          font-weight: 800;
          opacity: 0.3;
          margin-bottom: 0.5rem;
        }
        .start-step__icon {
          color: var(--accent-gold);
          margin-bottom: 1rem;
        }
        .start-step__title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .start-step__desc {
          font-size: 0.9rem;
          line-height: 1.6;
          flex: 1;
        }
        .start-step__arrow {
          margin-top: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .start-step:hover .start-step__arrow {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .start-steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </section>
    );
}
