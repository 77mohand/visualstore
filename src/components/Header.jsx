import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Header() {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { lang, toggleLang } = useLanguage();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [location.pathname]);

    const navLinks = [
        { to: '/', label: t('nav.home') },
        { to: '/products', label: t('nav.products') },
        { to: '/bundles', label: t('nav.bundles') },
        { to: '/freebies', label: t('nav.freebies') },
        { to: '/start', label: t('nav.startHere') },
        { to: '/about', label: t('nav.about') },
        { to: '/faq', label: t('nav.faq') },
    ];

    return (
        <header className={`header glass-nav ${scrolled ? 'header--scrolled' : ''}`}>
            <div className="container flex-between">
                <Link to="/" className="header__logo">
                    <span className="header__logo-text">VISUAL</span>
                    <span className="header__logo-accent text-gold">EDITS</span>
                </Link>

                <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`header__link ${location.pathname === link.to ? 'header__link--active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="header__actions">
                    <button
                        className="header__toggle"
                        onClick={toggleLang}
                        aria-label="Toggle language"
                    >
                        <span className={lang === 'en' ? 'header__lang-active' : ''}>EN</span>
                        <span className="header__lang-divider">|</span>
                        <span className={lang === 'ar' ? 'header__lang-active' : ''}>AR</span>
                    </button>

                    <button
                        className="header__toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        className="header__hamburger"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {menuOpen && <div className="header__overlay" onClick={() => setMenuOpen(false)} />}

            <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 0.8rem 0;
          transition: all 0.3s ease;
        }
        .header--scrolled {
          padding: 0.5rem 0;
          box-shadow: var(--shadow-md);
        }
        .header__logo {
          display: flex;
          align-items: center;
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: 1px;
          z-index: 1001;
        }
        .header__logo-text {
          color: var(--text-primary);
        }
        .header__nav {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .header__link {
          padding: 0.5rem 0.8rem;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-muted);
          border-radius: 8px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .header__link:hover,
        .header__link--active {
          color: var(--accent-gold);
          background: rgba(255, 215, 0, 0.06);
        }
        .header__actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 1001;
        }
        .header__toggle {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.45rem 0.7rem;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          transition: all 0.3s ease;
          border: 1px solid var(--card-border);
          background: var(--card-bg);
        }
        .header__toggle:hover {
          border-color: var(--accent-gold);
          color: var(--accent-gold);
        }
        .header__lang-divider {
          opacity: 0.3;
        }
        .header__lang-active {
          color: var(--accent-gold);
        }
        .header__hamburger {
          display: none;
          padding: 0.4rem;
          color: var(--text-primary);
        }
        .header__overlay {
          display: none;
        }

        @media (max-width: 1024px) {
          .header__nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 280px;
            height: 100vh;
            flex-direction: column;
            align-items: flex-start;
            padding: 5rem 1.5rem 2rem;
            background: var(--bg-primary);
            border-left: 1px solid var(--card-border);
            transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            gap: 0.2rem;
            z-index: 1000;
          }
          [dir="rtl"] .header__nav {
            right: auto;
            left: -100%;
            border-left: none;
            border-right: 1px solid var(--card-border);
          }
          .header__nav--open {
            right: 0;
          }
          [dir="rtl"] .header__nav--open {
            left: 0;
          }
          .header__link {
            width: 100%;
            padding: 0.75rem 1rem;
            font-size: 1rem;
          }
          .header__hamburger {
            display: flex;
          }
          .header__overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--overlay);
            z-index: 999;
          }
        }
      `}</style>
        </header>
    );
}
