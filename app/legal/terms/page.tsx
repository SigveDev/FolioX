import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
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
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 mt-2">Effective Date: June 14, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-700 mb-8">
              Welcome to FolioX. By accessing or using our website and services
              at{" "}
              <a
                href="https://foliox.app"
                className="text-blue-600 hover:text-blue-800"
              >
                https://foliox.app
              </a>{" "}
              ("Service"), you agree to the following terms and conditions
              ("Terms").
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By registering, accessing, or using FolioX, you agree to be
                bound by these Terms. If you do not agree, do not use the
                Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Eligibility
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You must be at least 13 years old (16 in the EU) to use FolioX.
                By using the Service, you confirm that you meet this
                requirement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Account Registration
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Use of the Service
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to use FolioX in compliance with all applicable laws.
                You must not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Violate or infringe on intellectual property rights</li>
                <li>Upload malware or harmful content</li>
                <li>Use the platform to harass or threaten others</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Pro Accounts and Payments
              </h2>
              <p className="text-gray-700 leading-relaxed">
                FolioX offers free and paid subscriptions. By subscribing to a
                paid plan, you authorize us to charge your payment method on a
                recurring basis until canceled.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Custom Domains
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you connect a custom domain, you confirm that you own the
                domain or have permission to use it. We may suspend domains that
                violate our policies or applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Content Ownership
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You retain all rights to the content you create and upload to
                your FolioX portfolio. By using our Service, you grant us a
                license to display your content as needed to operate the
                platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Termination
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may suspend or terminate accounts for violations of these
                Terms or misuse of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Disclaimer of Warranties
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The Service is provided "as is." We make no warranties regarding
                reliability, availability, or accuracy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To the extent permitted by law, FolioX is not liable for
                indirect, incidental, or consequential damages resulting from
                your use of the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to update these Terms. We'll notify users
                of material changes. Continued use of the Service means you
                accept the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                12. Contact
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Questions about these Terms? Email us at:{" "}
                <a
                  href="mailto:legal@foliox.app"
                  className="text-blue-600 hover:text-blue-800"
                >
                  legal@foliox.app
                </a>
              </p>
            </section>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <Link
            href="/legal/privacy"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Privacy Policy →
          </Link>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Back to FolioX
          </Link>
        </div>
      </div>
    </div>
  );
}
