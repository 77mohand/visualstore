import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';
import { Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Message sent! We will get back to you soon.');
    };

    return (
        <section className="section">
            <div className="container" style={{ maxWidth: '700px' }}>
                <ScrollReveal>
                    <div className="section-header">
                        <h1 className="heading-display heading-lg">{t('contact.title')}</h1>
                        <div className="gold-line" />
                        <p className="text-lg text-muted">{t('contact.subtitle')}</p>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <form className="contact-form glass-card" onSubmit={handleSubmit} style={{ padding: '2.5rem' }}>
                        <div className="contact-field">
                            <label className="contact-label">{t('contact.name')}</label>
                            <input type="text" className="glass-input" required />
                        </div>
                        <div className="contact-field">
                            <label className="contact-label">{t('contact.email')}</label>
                            <input type="email" className="glass-input" required />
                        </div>
                        <div className="contact-field">
                            <label className="contact-label">{t('contact.message')}</label>
                            <textarea className="glass-input" rows="5" required style={{ resize: 'vertical' }} />
                        </div>
                        <p className="text-sm text-muted" style={{ marginBottom: '1rem' }}>
                            <Mail size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.3rem' }} />
                            {t('contact.info')}
                        </p>
                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                            <MessageSquare size={18} /> {t('contact.send')}
                        </button>
                    </form>
                </ScrollReveal>
            </div>

            <style>{`
        .contact-field {
          margin-bottom: 1.25rem;
        }
        .contact-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
          color: var(--text-secondary);
        }
      `}</style>
        </section>
    );
}
