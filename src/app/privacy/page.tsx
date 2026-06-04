import type { Metadata } from 'next';
import Legal from '@/components/Legal/Legal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How TARDIS collects, uses, and protects your data — waitlist emails, submitted product links and images, and usage logs.',
  alternates: { canonical: 'https://www.tardis-ai.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <Legal title="Privacy Policy" updated="June 4, 2026">
      <p>
        TARDIS (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) builds tools that help
        people visualize furniture in their homes before they buy. This Privacy Policy explains
        what data we collect when you use our website at tardis-ai.com or our web app at
        app.tardis-ai.com, how we use it, and what rights you have.
      </p>
      <p>
        We have written this in plain English because you deserve to understand exactly what
        happens with your information.
      </p>

      <h2>What we collect</h2>
      <p>
        <strong>Waitlist sign-ups.</strong> If you join our waitlist, we collect your email
        address along with referral and UTM parameters (e.g., which link brought you here). This
        helps us understand where our early users come from.
      </p>
      <p>
        <strong>Product URLs and uploaded images.</strong> When you use the web app, you can paste
        a furniture product URL or upload a product photo. We process this content to generate a
        3D model for you. These inputs are transmitted to our AI processing pipeline and may be
        temporarily held while the model is being generated.
      </p>
      <p>
        <strong>Room and environment data.</strong> When you use the AR viewing feature, your
        device&apos;s camera and AR system process your room environment. On iOS this is handled
        by AR Quick Look and on Android by Scene Viewer — both operate primarily on your device.
        We do not receive your room photos or spatial data from these AR sessions.
      </p>
      <p>
        <strong>Usage and server logs.</strong> Like any web service, we collect standard
        technical data: IP addresses, browser type, device information, pages visited, and
        timestamps. This data is generated automatically by our hosting infrastructure.
      </p>

      <h2>How we use your data</h2>
      <ul>
        <li>To operate and improve the TARDIS service</li>
        <li>To send you waitlist updates and product announcements (you can unsubscribe at any time)</li>
        <li>To process furniture URLs and images into 3D models</li>
        <li>To understand how the product is being used so we can make it better</li>
        <li>To maintain the security and reliability of our infrastructure</li>
      </ul>
      <p>
        We do not sell your personal data. We do not use your data for advertising on third-party
        platforms.
      </p>

      <h2>Third-party services and processors</h2>
      <p>We rely on a small number of trusted services to run TARDIS:</p>
      <ul>
        <li>
          <strong>Vercel</strong> — hosts our website and web app and processes server logs and
          request data on our behalf. See{' '}
          <a href="https://vercel.com/legal/privacy-policy" rel="noopener noreferrer" target="_blank">
            Vercel&apos;s privacy policy
          </a>.
        </li>
        <li>
          <strong>Notion</strong> — we use Notion&apos;s API to store waitlist email addresses and
          referral data. See{' '}
          <a href="https://www.notion.so/privacy" rel="noopener noreferrer" target="_blank">
            Notion&apos;s privacy policy
          </a>.
        </li>
        <li>
          <strong>AI model providers</strong> — product URLs and uploaded images are sent to AI
          service providers to generate 3D models. These providers process your submissions as
          data processors, limited to fulfilling the processing request.
        </li>
      </ul>
      <p>We share your data with these processors only to the extent necessary to provide the service.</p>

      <h2>Data retention</h2>
      <p>
        Waitlist emails are retained until you unsubscribe or request deletion. Product images and
        URLs submitted for processing are retained only as long as needed to complete the 3D
        generation and a reasonable period thereafter for quality assurance. Server logs are
        retained according to our hosting provider&apos;s standard practices, typically 30–90 days.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have rights regarding your personal data, including
        the right to access, correct, delete, or export it, and the right to object to or restrict
        certain processing — including under the EU General Data Protection Regulation (GDPR) and
        the California Consumer Privacy Act (CCPA).
      </p>
      <p>
        To exercise any of these rights, email us at{' '}
        <a href="mailto:founders@tardis-ai.com">founders@tardis-ai.com</a>. We respond within 30 days.
        We will not discriminate against you for exercising your rights.
      </p>
      <p>
        <strong>California residents:</strong> we do not sell personal information as defined
        under the CCPA.
      </p>
      <p>
        <strong>EU/EEA residents:</strong> we process your data on the basis of your consent
        (waitlist sign-up) and our legitimate interest in operating and improving the service
        (usage analytics). You have the right to lodge a complaint with your local data protection
        authority.
      </p>

      <h2>Children</h2>
      <p>
        TARDIS is not directed at children under 13. We do not knowingly collect personal data
        from children. If you believe a child has submitted data to us, contact us and we will
        delete it promptly.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        When we make material changes, we will update the &ldquo;Last updated&rdquo; date at the
        top of this page and, where appropriate, notify waitlist subscribers by email.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions: <a href="mailto:founders@tardis-ai.com">founders@tardis-ai.com</a>
      </p>
    </Legal>
  );
}
