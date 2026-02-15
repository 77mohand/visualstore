import ScrollReveal from '../components/ScrollReveal';

export default function Terms() {
    return (
        <section className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <ScrollReveal>
                    <div className="section-header">
                        <h1 className="heading-display heading-lg">Terms & Conditions</h1>
                        <div className="gold-line" />
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                    <div className="glass-card" style={{ padding: '2.5rem' }}>
                        <div className="legal-content">
                            <h2>1. General Terms</h2>
                            <p>By accessing and using VISUALEDITS (the "Website"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.</p>

                            <h2>2. Digital Products</h2>
                            <p>All products sold through VISUALEDITS are digital goods. Upon purchase, you will receive instant access to download the product files. All sales are processed through our secure payment platform.</p>

                            <h2>3. License & Usage</h2>
                            <p>Each product comes with a specific license outlined on its product page. Unless otherwise stated, products are licensed for single-user use and may be used in unlimited personal and client projects.</p>

                            <h2>4. Refund Policy</h2>
                            <p>Due to the digital nature of our products, refunds are generally not available once the product has been downloaded. If you experience technical issues with a product, please contact our support team.</p>

                            <h2>5. Intellectual Property</h2>
                            <p>All products, designs, and content on this website are the intellectual property of VISUALEDITS. Redistribution, resale, or sharing of purchased products is strictly prohibited.</p>

                            <h2>6. Modifications</h2>
                            <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date.</p>

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
