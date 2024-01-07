// TermsAndConditionsPage.js

import React, {useEffect} from 'react';
import './TermsAndConditionsPage.scss'
const TermsAndConditionsPage = () => {
  useEffect(() => {
    document.title = 'Terms and Conditions';
  }, []);
  return (
    <div className="terms-page">
      <h1>Root Marketplace Terms and Conditions</h1>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Root Marketplace ("the Platform"), you agree
          to comply with and be bound by these Terms and Conditions. If you do
          not agree with these terms, please do not use our services.
        </p>
      </section>

      <section>
        <h2>2. Service Overview</h2>
        <p>
          Root is a service marketplace that connects service providers with
          customers. We facilitate this connection by offering a platform for
          users to list, discover, and book services. Root does not provide any
          services directly.
        </p>
      </section>

      <section>
        <h2>3. Liability and Risk</h2>

        <p>
          <strong>3.1. Customer and Service Provider Responsibility:</strong>
          <br />
          All users (customers and service providers) acknowledge that they are
          solely responsible for the services they offer or receive through the
          Root platform.
          <br />
          Users understand and agree that any risks associated with the
          services are assumed by the parties involved.
        </p>

        <p>
          <strong>3.2. Damages and Risks:</strong>
          <br />
          In the event of damages or risks arising from a service, the service
          provider is solely responsible for addressing and resolving the
          issue.
          <br />
          Root is not liable for any damages, losses, or disputes that may occur
          between users.
        </p>
      </section>

      <section>
        <h2>4. Fee Structure</h2>

        <p>
          <strong>4.1. Transaction Fee:</strong>
          <br />
          Root charges a 10% transaction fee to service providers for
          successfully connecting them with customers through the platform.
          <br />
          This fee is automatically deducted from the service provider's
          earnings.
        </p>

        <p>
          <strong>4.2. Payment Processing:</strong>
          <br />
          Root may utilize third-party payment processors, and additional fees
          may apply as per their terms.
        </p>
      </section>

      <section>
        <h2>5. Value in Connection</h2>
        <p>
          Both service providers and customers acknowledge the value Root
          provides in connecting them. Root does not endorse or guarantee the
          quality of services provided but aims to facilitate mutually
          beneficial connections.
        </p>
      </section>

      <section>
        <h2>6. Dispute Resolution</h2>
        <p>
          Users agree to resolve any disputes directly with the other party
          involved. Root is not responsible for mediating disputes, and users
          release Root from any liability related to disputes or damages.
        </p>
      </section>

      <section>
        <h2>7. Platform Changes and Termination</h2>
        <p>
          Root reserves the right to modify, suspend, or terminate the platform
          or any part of it at any time without notice. Root is not liable for
          any consequences resulting from such actions.
        </p>
      </section>

      <section>
        <h2>8. Governing Law</h2>
        <p>
          These Terms and Conditions are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from the use of the platform
          shall be subject to the exclusive jurisdiction of the courts of the Federal Republic of Nigeria.
        </p>
      </section>

      <p>
        By using Root, you acknowledge that you have read, understood, and
        agree to these Terms and Conditions. Root may update these terms
        periodically, and continued use of the platform constitutes acceptance
        of any changes.
      </p>
    </div>
  );
};

export default TermsAndConditionsPage;
