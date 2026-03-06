"use client";

const PrivacyPolicyPage = () => {
  const lastUpdated = "March 7, 2026";

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-5 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Legal
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Last updated: {lastUpdated}
          </p>

          <div className="mt-8 sm:mt-10 space-y-8 text-sm sm:text-base leading-relaxed text-foreground/90">
            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-2">
                1. Introduction
              </h2>
              <p>
                Engazium ("we", "our", or "us") values your privacy. This Privacy Policy explains
                how we collect, use, store, and protect your information when you use our platform.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-2">
                2. Information We Collect
              </h2>
              <p>We may collect the following categories of information:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Account details (such as username, email address, profile information).</li>
                <li>Platform and growth data you submit to use product features.</li>
                <li>Usage data (such as pages visited, actions taken, and engagement activity).</li>
                <li>Technical data (such as IP address, browser type, and device information).</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-2">
                3. How We Use Your Information
              </h2>
              <p>We use your information to:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Provide and improve Engazium services and features.</li>
                <li>Operate squads, engagement tracking, and analytics features.</li>
                <li>Maintain safety, prevent abuse, and enforce platform rules.</li>
                <li>Communicate important updates related to your account.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-2">
                4. Sharing of Information
              </h2>
              <p>
                We do not sell your personal information. We may share information with trusted
                service providers who help us operate the platform, or when required by law.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-2">
                5. Data Retention
              </h2>
              <p>
                We retain information for as long as needed to provide the service, meet legal
                obligations, resolve disputes, and enforce our agreements.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-2">
                6. Security
              </h2>
              <p>
                We implement reasonable technical and organizational measures to protect your data.
                However, no method of transmission or storage is completely secure.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-2">
                7. Your Choices
              </h2>
              <p>You may request to review, update, or delete your account data by contacting us.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-2">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Continued use of Engazium after
                updates means you accept the revised policy.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-2">
                9. Contact Us
              </h2>
              <p>
                For questions about this Privacy Policy, please contact us via{" "}
                <a href="/contact-us" className="text-primary hover:underline">
                  Contact Us
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;

