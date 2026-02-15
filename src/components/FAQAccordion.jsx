import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items }) {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="faq-accordion">
            {items.map((item, i) => (
                <div
                    key={i}
                    className={`faq-item glass-card ${openIndex === i ? 'faq-item--open' : ''}`}
                >
                    <button
                        className="faq-item__header"
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        aria-expanded={openIndex === i}
                    >
                        <span className="faq-item__icon text-gold">✦</span>
                        <span className="faq-item__question">{item.question}</span>
                        <ChevronDown
                            size={18}
                            className={`faq-item__chevron ${openIndex === i ? 'faq-item__chevron--open' : ''}`}
                        />
                    </button>
                    <div className={`faq-item__body ${openIndex === i ? 'faq-item__body--open' : ''}`}>
                        <p className="faq-item__answer">{item.answer}</p>
                    </div>
                </div>
            ))}

            <style>{`
        .faq-accordion {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-item {
          padding: 0;
          overflow: hidden;
        }
        .faq-item:hover {
          transform: none;
        }
        .faq-item__header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 1.2rem 1.5rem;
          text-align: left;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          transition: color 0.3s ease;
        }
        [dir="rtl"] .faq-item__header {
          text-align: right;
        }
        .faq-item--open .faq-item__header {
          color: var(--accent-gold);
        }
        .faq-item__icon {
          flex-shrink: 0;
          font-size: 0.8rem;
        }
        .faq-item__question {
          flex: 1;
        }
        .faq-item__chevron {
          flex-shrink: 0;
          color: var(--text-faint);
          transition: transform 0.3s ease;
        }
        .faq-item__chevron--open {
          transform: rotate(180deg);
        }
        .faq-item__body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .faq-item__body--open {
          max-height: 300px;
        }
        .faq-item__answer {
          padding: 0 1.5rem 1.2rem 2.8rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.7;
        }
        [dir="rtl"] .faq-item__answer {
          padding: 0 2.8rem 1.2rem 1.5rem;
        }
      `}</style>
        </div>
    );
}
