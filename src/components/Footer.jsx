import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    const quickLinks = [
        { to: '/products', label: t('nav.products') },
        { to: '/bundles', label: t('nav.bundles') },
        { to: '/freebies', label: t('nav.freebies') },
        { to: '/start', label: t('nav.startHere') },
        { to: '/about', label: t('nav.about') },
        { to: '/faq', label: t('nav.faq') },
    ];

    const legalLinks = [
        { to: '/terms', label: t('nav.terms') },
        { to: '/privacy', label: t('nav.privacy') },
        { to: '/license', label: t('nav.license') },
        { to: '/contact', label: t('nav.contact') },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    <div className="footer__brand">
                        <h3 className="footer__logo">
                            <span>VISUAL</span><span className="text-gold">EDITS</span>
                        </h3>
                        <p className="footer__tagline text-muted">{t('footer.tagline')}</p>
                        <div className="gold-line" style={{ margin: '1rem 0' }} />
                        <p className="text-sm text-muted">{t('footer.madeWith')}</p>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__heading">{t('footer.quickLinks')}</h4>
                        {quickLinks.map(link => (
                            <Link key={link.to} to={link.to} className="footer__link">{link.label}</Link>
                        ))}
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__heading">{t('footer.legal')}</h4>
                        {legalLinks.map(link => (
                            <Link key={link.to} to={link.to} className="footer__link">{link.label}</Link>
                        ))}
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__heading">{t('footer.stayConnected')}</h4>
                        <a href="https://visualeditsstore.nzmly.com" target="_blank" rel="noopener noreferrer" className="footer__link">
                            Store ↗
                        </a>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="text-sm text-muted">
                        © {year} VISUALEDITS. {t('footer.rights')}
                    </p>
                </div>
            </div>

            <style>{`
        .footer {
          border-top: 1px solid var(--divider);
          padding: 4rem 0 2rem;
          background: var(--bg-secondary);
        }
        .footer__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        .footer__logo {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: 1px;
          margin-bottom: 0.75rem;
        }
        .footer__tagline {
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .footer__heading {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-primary);
          margin-bottom: 1.2rem;
        }
        .footer__col {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer__link {
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: color 0.3s ease;
        }
        .footer__link:hover {
          color: var(--accent-gold);
        }
        .footer__bottom {
          border-top: 1px solid var(--divider);
          padding-top: 2rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .footer__grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .footer__brand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 480px) {
          .footer__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </footer>
    );
}
