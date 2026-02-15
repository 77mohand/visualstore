import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ParticlesBg from './ParticlesBg';
import { ArrowRight, Download } from 'lucide-react';

export default function HeroSection() {
    const { t } = useTranslation();

    return (
        <section className="hero">
            <ParticlesBg />
            <div className="hero__gradient" />

            <div className="container hero__content">
                <div className="hero__badge animate-fade-in-up">
                    <span className="text-gold">✦</span> VISUALEDITS
                </div>

                <h1 className="hero__title heading-display heading-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {t('hero.headline')}
                </h1>

                <p className="hero__subtitle text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {t('hero.subheadline')}
                </p>

                <div className="hero__actions animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <Link to="/products" className="btn btn-primary btn-lg">
                        {t('hero.browseProducts')} <ArrowRight size={18} />
                    </Link>
                    <Link to="/freebies" className="btn btn-secondary btn-lg">
                        <Download size={18} /> {t('hero.downloadFreebies')}
                    </Link>
                </div>

                <p className="hero__trust text-sm animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    {t('hero.trustLine')}
                </p>
            </div>

            <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 6rem 0 4rem;
        }
        .hero__gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(255, 215, 0, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(255, 165, 0, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(255, 215, 0, 0.04) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }
        .hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 800px;
        }
        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.2rem;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          border: 1px solid var(--card-border);
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          margin-bottom: 2rem;
        }
        .hero__title {
          margin-bottom: 1.5rem;
          max-width: 750px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero__subtitle {
          color: var(--text-muted);
          max-width: 650px;
          margin: 0 auto 2.5rem;
        }
        .hero__actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }
        .hero__trust {
          color: var(--text-faint);
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .hero {
            padding: 5rem 0 3rem;
          }
          .hero__actions {
            flex-direction: column;
          }
          .hero__actions .btn {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
        </section>
    );
}
