import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative text-white" style={{ background: 'radial-gradient(ellipse at bottom, #00d4ff 0%, #0099ff 25%, #6600ff 50%, #330066 75%, #001a33 100%)' }}>
       <div className="fixed inset-0 -z-20" style={{ background: 'radial-gradient(ellipse at bottom, #00d4ff 0%, #0099ff 25%, #6600ff 50%, #330066 75%, #001a33 100%)' }} />
      
      {/* Header */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="bg-black/20 backdrop-blur-xl rounded-full px-6 py-3 flex items-center justify-between w-[95%] max-w-[1800px] pointer-events-auto">
            <Link to="/" className="flex items-center gap-3 pl-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-lg font-bold text-white tracking-tight">ClubConnect</h1>
            </Link>
          </div>
      </header>

      <main className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto bg-black/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Privacy Statement
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Your privacy is important to us. This privacy statement explains the personal data ClubConnect processes, how ClubConnect processes it, and for what purposes.
            </p>
            
            <div className="prose prose-invert prose-lg max-w-none text-white/90">
            <h3 className="text-xl font-bold text-white mt-6 mb-3">INTRODUCTION</h3>
            <p className="mb-4">
                [Applied Optimal Inc.] (the “Company”) respects your (“You” and “Your”) privacy. This “Privacy Policy” describes how the Company collects, uses, maintains, discloses, and protects Personal Information (defined below), as well as the rights and choices You have regarding Your Personal Information, including how You can access and update Your Personal Information. This Privacy Policy was last amended [Dec. 31, 2025].
            </p>
            <p className="mb-4">
                “Personal Information” is information that identifies You or could be combined by the Company or the Company’s services providers or affiliates with other information to identify You. By accessing or using the Company’s website located at [square.rabbithop.ca] (the “Website”) or any content on or through the Website, You signify Your consent to the terms of this Privacy Policy and Your intent to be legally bound by them. If You do not agree with any terms of this Privacy Policy, please do not access or use the Website or any content on or through the Website, or otherwise submit any Personal Information to the Company.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">TYPES OF PERSONAL INFORMATION COLLECTED</h3>
            <p className="mb-4">
                The Personal Information the Company collects about You will depend on the manner in which You access or use the Website or any content on or through the Website and may include:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>Your name, or contact information, such as Your mailing address, telephone number, or email address, or other similar information associated with You;</li>
                <li>Your location, time-zone setting, network information, device type, browser type and version, browser plug-in types and version, operating system and platform, language, standard web log data, and IP address used to connect Your computer to the Internet or other similar identifier, or the equipment You use to access or use the Website and usage details;</li>
                <li>data on the pages, services, or content You access or use on or through the Website, including the amount of time You spend on certain pages, products or services You viewed or searched for, clickstreams to, through, and from the Website, page response times, downloads and download errors, page interactions, or methods used to browse away from the Website;</li>
                <li>billing or account information, if applicable; and</li>
                <li>any other Personal Information that You choose to submit to us.</li>
            </ul>
            <p className="mb-4">
                The Website and any content provided on or through the Website is not directed to any person who is not the legal age of majority under applicable law. The Company will not knowingly collect Personal Information from any person who is not the legal age of majority under applicable law.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">METHODS FOR COLLECTING PERSONAL INFORMATION</h3>
            <p className="mb-4">
                The Company takes steps to ensure that any Personal Information we collect about You is adequate for, relevant to, and not excessive for the uses of such Personal Information, as described by this Privacy Policy.
            </p>
            
            <h4 className="text-lg font-semibold text-white mt-4 mb-2">Information Provided to the Company by You</h4>
            <p className="mb-4">
                Personal Information the Company collects from You on or through the Website and as a result of Your access to or use of the Website or any content on or through the Website may include Personal Information You provide the Company directly, for example by:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>submitting, posting, publishing, displaying, or otherwise transmitting user generated content;</li>
                <li>filling in forms, making search queries, or corresponding with the Company on or through the Website, or otherwise communicating with the Company by any means including by phone, email, or other electronic messaging; or</li>
                <li>if applicable or available through or on the Website: creating or registering for an account; subscribing, purchasing, or requesting information on a service or product; entering a contest or promotion; or otherwise engaging with the Company through interaction points that might exist from time-to-time between You and the Company.</li>
            </ul>

            <h4 className="text-lg font-semibold text-white mt-4 mb-2">Information Collected by the Company Through Technological Means</h4>
            <p className="mb-4">
                The Company may also use cookies or other technological collection methods to collect information, some of which may be Personal Information, about:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>the device or equipment You use, including information about Your computer or mobile device, internet connection, IP address, operating system, and browser type; or</li>
                <li>Your browsing activities and patterns, including information about Your visits to the Website such as traffic data, location data, logs, and other similar communication data.</li>
            </ul>
            <p className="mb-4">
                This information helps the Company improve the Website and the content available on or through the Website and otherwise improve the services of the Company by:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>helping the Company understand audience sizes and usage patterns on the Website;</li>
                <li>allowing the Company to tailor the Website to Your preferences and interests; and</li>
                <li>recognizing You when You visit the Website multiple times.</li>
            </ul>
            <p className="mb-4">
                The technologies used by the Company to automatically collect the information described above may include cookies, which are small files placed on the hard drive of Your computer. You can turn off cookies using Your internet browser but doing so may limit or remove certain parts of the Website, certain content on the Website, or the functionality of the Website.
            </p>

            <h4 className="text-lg font-semibold text-white mt-4 mb-2">Third-Party Features</h4>
            <p className="mb-4">
                The Website may include, integrate, or rely on links, plug-ins, services, social networks, content, or applications of third parties. Your access or use of such links, plug-ins, services, social networks, content, or applications may allow the third-party provider to collect or share information about You, some of which may be Personal Information. The Company does not control such third parties’ use of cookies or similar technologies – if You would like to know more about how these third parties use such technologies, You should contact the responsible provider directly. The Company does not accept any responsibility or liability for the privacy policies of any such third parties or their compliance or non-compliance with such privacy policies.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">USING AND DISCLOSING PERSONAL INFORMATION</h3>
            <h4 className="text-lg font-semibold text-white mt-4 mb-2">Use of Personal Information by the Company</h4>
            <p className="mb-4">
                The Company collects Personal Information to provide You with a secure, smooth, efficient, and customized experience through or on the Website or any content on the Website. The Company may use Your Personal Information to:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>provide You with content, services, or products on or though the Website;</li>
                <li>customize, measure, and improve the Website or content provided on or through the Website, or otherwise analyze or manage the Company’s business operations or Website performance;</li>
                <li>prevent prohibited or illegal activities, loss, or fraud, enforce the Company’s Terms of Use, or otherwise protect the security or integrity of the Website or the Company’s business;</li>
                <li>deliver targeted marketing, service update notices, or promotional offers based on Your communication preferences;</li>
                <li>send You things in the mail or through other channels, such as products or services that You have requested;</li>
                <li>register You for, or authenticate You when You sign into, an account or online services or when You purchase a product or service, or to provide You with notices about such accounts, subscriptions, or purchases;</li>
                <li>provide You notice about changes to the Website, this Privacy Policy, or the Company’s Terms of Use;</li>
                <li>otherwise fulfill the purposes for which You have provided Personal Information or that were described when such Personal Information was collected; or</li>
                <li>carry out other purposes that are disclosed to You and to which You consent, or which are otherwise permitted or required by law.</li>
            </ul>
            <p className="mb-4">
                The Company may combine all the Personal Information the Company collects, including Yours, in order to analyze and understand aggregate trends.
            </p>

            <h4 className="text-lg font-semibold text-white mt-4 mb-2">Other Disclosures of Personal Information</h4>
            <p className="mb-4">
                The Company may disclose Your Personal Information if necessary to collect a debt from You or where the Company has reason to believe that such Personal Information is relevant to the investigation or decision to investigate a breach of the laws of Canada, a province or territory of Canada, or a foreign jurisdiction, and the Company is legally permitted or required to do so, or to otherwise comply with any court order, law, or legal process, including in response to any government or regulatory request or process, in accordance with applicable law. The Company may also disclose Your Personal Information, if necessary, to enforce this Privacy Policy or the Company’s Terms of Use, or if the disclosure is necessary to protect the rights, property, or safety of the Company, the Website, users of the Website, or third parties. The Company may transfer information about You, including Personal Information, in connection with a merger or sale (including any transfers made as part of an insolvency of bankruptcy proceedings) involving all or part of the Company’s business or as part of a corporate reorganization or stock sale or other changes in corporate control.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">DATA SECURITY</h3>
            <p className="mb-4">
                The security of Your Personal Information is important to the Company. The Company protects Your Personal Information by maintaining physical, organizational, and technological safeguards against unauthorized access, unauthorized disclosure, theft, or misuse appropriate to the sensitivity of such Personal Information. Personal Information collected by the Company may only be accessed by persons within the Company who require access to provide You with access to, use of, or content, services, or products provided on or through the Website. The Personal Information the Company collects is maintained at [AWS/Supabase/Stripe]
            </p>
            <p className="mb-4">
                Although the Company takes measures to protect against data breaches and unauthorized access to Your Personal Information, no company can completely mitigate the risks of such breaches or unauthorized access and no website is fully secure. The Company cannot guarantee that hacking, data loss, breaches, or other unsanctioned access of the Company’s security systems will never occur. Accordingly, You should not submit or otherwise provide Personal Information to the Company by any means if You consider that Personal Information to be sensitive.
            </p>
            <p className="mb-4">
                Except as otherwise permitted or required by applicable law or regulation, the Company retains Personal Information only for as long as necessary for the purposes for which such Personal Information was collected. The Company reserves the right to use anonymous and deidentified information, including anonymized or otherwise de-identified Personal Information, for any legitimate business purpose without further notice to You and without Your Consent.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">CHANGES TO THE PRIVACY POLICY</h3>
            <p className="mb-4">
                The Company reserves the right to amend this Privacy Policy for any or no reason, at any time, and from time to time in accordance with the terms of this Privacy Policy. The Company will reflect any such amendments on the Website. Your continued access to or use of the Website or any content on or though the Website after any such amendment constitutes Your acceptance of the Privacy Policy as then amended. The Company includes the date this Privacy Policy was last amended at the top of this page.
            </p>
          </div>
          </div>
        </div>
      </main>
    </div>
  )
}
