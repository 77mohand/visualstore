import ScrollReveal from '../components/ScrollReveal';

export default function Privacy() {
    return (
        <section className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <ScrollReveal>
                    <div className="section-header">
                        <h1 className="heading-display heading-lg">Privacy Policy</h1>
                        <div className="gold-line" />
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                    <div className="glass-card" style={{ padding: '2.5rem' }}>
                        <div className="legal-content">
                            <h2>1. Information We Collect</h2>
                            <p>We may collect personal information when you browse our website, make a purchase, or contact us. This may include your name, email address, and payment information (processed securely by our payment provider).</p>

                            <h2>2. How We Use Your Information</h2>
                            <p>Your information is used to process purchases, provide customer support, and improve our products and services. We do not sell or share your personal data with third parties for marketing purposes.</p>

                            <h2>3. Cookies</h2>
                            <p>We use cookies to remember your preferences (such as language and theme settings) and to analyze website traffic. You can disable cookies in your browser settings.</p>

                            <h2>4. Data Security</h2>
                            <p>We implement appropriate security measures to protect your personal information. All payment transactions are encrypted and processed through secure third-party payment processors.</p>

                            <h2>5. Your Rights</h2>
                            <p>You have the right to access, correct, or delete your personal information. Contact us if you wish to exercise these rights.</p>

                            <h2>6. Contact</h2>
                            <p>For privacy-related inquiries, please reach out through our contact page.</p>

                            <p className="text-muted" style={{ marginTop: '2rem', fontSize: '0.85rem' }}>Last updated: February 2026</p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            <style>{`
        .legal-content h2 {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 1.5rem 0 0.5rem;
          color: var(--text-primary);
        }
        .legal-content h2:first-child {
          margin-top: 0;
        }
        .legal-content p {
          font-size: 0.95rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }
      `}</style>
        </section>
    );
}
