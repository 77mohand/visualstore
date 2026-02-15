import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';

export default function About() {
    const { t } = useTranslation();
    const content = t('about.content');
    const paragraphs = content.split('\n\n');

    return (
        <section className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <ScrollReveal>
                    <div className="section-header">
                        <h1 className="heading-display heading-lg">{t('about.title')}</h1>
                        <div className="gold-line" />
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={100}>
                    <div className="about-content glass-card" style={{ padding: '2.5rem' }}>
                        {paragraphs.map((p, i) => (
                            <div key={i} style={{ marginBottom: i < paragraphs.length - 1 ? '1.5rem' : 0 }}>
                                {p.split('\n').map((line, j) => {
                                    if (line.startsWith('•')) {
                                        return (
                                            <p key={j} style={{ paddingLeft: '1rem', marginBottom: '0.3rem', color: 'var(--text-secondary)' }}>
                                                <span className="text-gold">✦</span> {line.slice(1).trim()}
                                            </p>
                                        );
                                    }
                                    return (
                                        <p key={j} style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                                            {line}
                                        </p>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
