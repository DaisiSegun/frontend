// TermsAndConditionsPage.js

import React, { useEffect } from 'react';
import './TermsAndConditionsPage.scss';

const TermsAndConditionsPage = () => {
  useEffect(() => {
    document.title = 'Terms and Conditions';
  }, []);

  return (
    <div className="terms-page">
      <h1>Root Marketplace Terms and Conditions</h1>
      <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}>
      The following terms and conditions apply to any request, use and or usage of our platform. In these terms “we”, “us” or “our” refers to Root Marketplace and its successors, agents and assigns, while “you”, “yours” refers to a customer or service provider who intends to use or has used our platform. and “sellers” refers to manufacturing industries, music and entertainment industries, self-service shops, shop windows, supermarkets and malls, sporting industries, tourism providers, arts and exhibitions, professionals, technicians, artisans  and so on except Root Marketplace.

        </p>

      {/* Section 1: Acceptance of Terms */}
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Root Marketplace ("the Platform"), you agree
          to comply with and be bound by these Terms and Conditions. If you do
          not agree with these terms, please do not use our services.
        </p>
      </section>

      {/* Section 2: Service Overview */}
      <section>
        <h2>2. Marketplace Overview</h2>
        <p>
        Root is an online marketplace that connects sellers of services & african made products with customers. We facilitate this connection by offering a platform for users to list, discover, and book for services/products of their choice. Root does not provide any service/product directly other than the provision of platform to connect customers with other sellers.
        </p>
      </section>

      {/* Section 3: Liability and Risk */}
      <section>
        <h2>3. Liability and Risk</h2>

        <p>
          <strong>3.1. Customer and Seller Responsibility:</strong>
          <br />
          All users (sellers and customers) acknowledge that they are solely responsible for the services they offer or receive through the Root platform.
          <br />
          Users understand and agree that all rights, interests, profits, benefits, risks, detriments, forbearances, loss, or responsibilities associated with the services of these other sellers are assumed by the parties thereto and not us.
        </p>

        <p>
          <strong>3.2. Damages and Risks:</strong>
          <br />
          In the event of damages or risks arising from a service, the seller is solely responsible for addressing and resolving the
          issue.
          <br />
          Root is not liable for any damages, losses, or disputes that may occur between users and sellers
        </p>

        <p>
          <strong>3.3. Seller Removal:</strong>
          <br />
          If a seller receives consecutive 1-star to 2-star reviews two times (back-to-back), Root reserves the right to remove them from the platform.
          <br />
          (Note: A bad review is considered to be a rating between 1 and 2 stars, inclusive).
        </p>
      </section>

      {/* Section 4: Fee Structure */}
      <section>
        <h2>4. Fee Structure</h2>

        <p>
  <strong>4.1. Transaction Fee:</strong>
  <br />
  Root is pleased to announce that our services are currently free of charge. We are committed to helping you connect with customers without any fees at this time. Please note that we may introduce a transaction fee in the future once we have finalized our monetization strategy for the marketplace. Any fees will be deducted from the seller's earnings, and we will provide advance notice before implementing any changes.
</p>


        <p>
          <strong>4.2. Payment Processing:</strong>
          <br />
          Root may utilize third-party payment processors, and additional fees
          may apply as per their terms.
        </p>
      </section>

      {/* Section 5: Value in Connection */}
      <section>
        <h2>5. Value in Connection</h2>
        <p>
        Both sellers and customers acknowledge the value Root provides in connecting them. Root does not endorse or guarantee the quality of services/proucts provided by the sellers but aims to facilitate connections between customers and the sellers through our platform.
        </p>
      </section>

      {/* Section 6: Dispute Resolution */}
      <section>
        <h2>6. Dispute Resolution</h2>
        <p>
        Users agree to resolve any disputes directly with one another. Root shall not be responsible for mediating disputes, and users release Root from any liability related to disputes or damages.
        </p>
      </section>

      {/* Section 7: Platform Changes and Termination */}
      <section>
        <h2>7. Platform Changes and Termination</h2>
        <p>
        Root reserves the right to modify, suspend, or terminate the platform or any part of it at any time without notice to any person or group of persons. Root shall not be liable for any consequences resulting from such actions.
        </p>
      </section>

      {/* Section 8: Governing Law */}
      <section>
        <h2>8. Governing Law</h2>
        <p>
          These Terms and Conditions are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from the use of the platform
          shall be subject to the exclusive jurisdiction of the courts of the Federal Republic of Nigeria.
        </p>
      </section>

      <p>
    

Root may review update these terms periodically, and continued use of the platform constitutes acceptance of any changes.

By signing up, ticking the box on sign up page & using Root, you acknowledge that you have read, understood, and agree to these Terms and Conditions here above mentioned.
      </p>
    </div>
  );
};

export default TermsAndConditionsPage;
