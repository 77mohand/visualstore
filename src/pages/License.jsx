import ScrollReveal from '../components/ScrollReveal';

export default function License() {
    return (
        <section className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <ScrollReveal>
                    <div className="section-header">
                        <h1 className="heading-display heading-lg">License & Usage Rights</h1>
                        <div className="gold-line" />
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                    <div className="glass-card" style={{ padding: '2.5rem' }}>
                        <div className="legal-content">
                            <h2>Standard License</h2>
                            <p>All products from VISUALEDITS come with a Standard License unless otherwise specified on the product page.</p>

                            <h2>What You CAN Do</h2>
                            <p>✅ Use in unlimited personal projects<br />
                                ✅ Use in client projects (freelance work)<br />
                                ✅ Modify and customize templates<br />
                                ✅ Use in commercial projects<br />
                                ✅ Use across multiple projects</p>

                            <h2>What You CANNOT Do</h2>
                            <p>❌ Resell, redistribute, or share the original files<br />
                                ❌ Include in competing product bundles<br />
                                ❌ Claim the templates as your own creation<br />
                                ❌ Use as part of an automated service or tool<br />
                                ❌ Sub-license to others</p>

                            <h2>Free Products</h2>
                            <p>Free products follow the same license terms unless specifically noted otherwise on the product page. Free products are for personal and commercial use.</p>

                            <h2>Bundle License</h2>
                            <p>Bundle purchases include all individual product licenses within the bundle. Each product within the bundle follows the standard license terms.</p>

                            <h2>Questions?</h2>
                            <p>If you have questions about licensing, please contact us through our contact page before making a purchase.</p>

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
