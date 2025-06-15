import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to FolioX
          </Link>
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Privacy Policy
              </h1>
              <p className="text-gray-600 mt-1">
                Effective Date: June 14, 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 mb-8">
              FolioX ("we", "our", or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, and
              protect your information when you use{" "}
              <a
                href="https://foliox.app"
                className="text-blue-600 hover:text-blue-800"
              >
                https://foliox.app
              </a>
              .
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>

              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  a. Personal Information
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  When you create an account or upgrade to Pro, we collect:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Payment info (via Stripe or similar processor)</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  b. Usage Information
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We collect technical data like:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700">
                  <li>Browser/device type</li>
                  <li>IP address</li>
                  <li>Page views and interactions</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  c. Content
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Any content you upload (projects, images, bios) is stored to
                  provide your portfolio.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use the information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide and maintain the Service</li>
                <li>Process payments</li>
                <li>Communicate with you</li>
                <li>Improve our features and performance</li>
                <li>Prevent fraud and abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Sharing of Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We do not sell your data. We only share it with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Service providers (hosting, analytics, payment processing)
                </li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Cookies and Analytics
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar technologies to enhance your
                experience and collect usage data. You can disable cookies in
                your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Data Retention
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We keep your data only as long as necessary to provide the
                Service and comply with our legal obligations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We use industry-standard security measures to protect your data.
                However, no system is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Your Rights (EU Users - GDPR)
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If you're in the EU, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                <li>Access or correct your data</li>
                <li>Request deletion of your account</li>
                <li>Object to data processing</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, contact us at:{" "}
                <a
                  href="mailto:privacy@foliox.app"
                  className="text-blue-600 hover:text-blue-800"
                >
                  privacy@foliox.app
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Children's Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                FolioX is not intended for children under 13. We do not
                knowingly collect data from minors.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Changes to this Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy. We'll notify users of
                material changes. Continued use of FolioX means you accept the
                updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Contact
              </h2>
              <p className="text-gray-700 leading-relaxed">
                For questions or concerns about your data, email us at:{" "}
                <a
                  href="mailto:privacy@foliox.app"
                  className="text-blue-600 hover:text-blue-800"
                >
                  privacy@foliox.app
                </a>
              </p>
            </section>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <Link
            href="/legal/terms"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Terms of Service
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Back to FolioX
          </Link>
        </div>
      </div>
    </div>
  );
}
