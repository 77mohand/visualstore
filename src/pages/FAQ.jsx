import { useTranslation } from 'react-i18next';
import FAQAccordion from '../components/FAQAccordion';
import ScrollReveal from '../components/ScrollReveal';

export default function FAQ() {
    const { t } = useTranslation();

    const items = [
        { question: t('faq.q1'), answer: t('faq.a1') },
        { question: t('faq.q2'), answer: t('faq.a2') },
        { question: t('faq.q3'), answer: t('faq.a3') },
        { question: t('faq.q4'), answer: t('faq.a4') },
        { question: t('faq.q5'), answer: t('faq.a5') },
        { question: t('faq.q6'), answer: t('faq.a6') },
    ];

    return (
        <section className="section">
            <div className="container">
                <ScrollReveal>
                    <div className="section-header">
                        <h1 className="heading-display heading-lg">{t('faq.title')}</h1>
                        <div className="gold-line" />
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                    <FAQAccordion items={items} />
                </ScrollReveal>
            </div>
        </section>
    );
}
