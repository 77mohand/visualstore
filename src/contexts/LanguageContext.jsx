import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('ve-lang') || 'en';
    });

    useEffect(() => {
        i18n.changeLanguage(lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('ve-lang', lang);
    }, [lang, i18n]);

    const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

    return (
        <LanguageContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
