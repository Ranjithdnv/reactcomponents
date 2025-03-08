import React from "react";

const TermsModal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:text-[#1e1e1e]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-[#1e1e1e]">
          MedFidelity Terms and Conditions
        </h2>

        <div className="space-y-4 text-gray-800 text-justify">
          <h3 className="text-xl font-semibold">Terms of Use</h3>
          <p><strong>1. Definitions</strong></p>
          <ul className="list-disc pl-6">
            <li><strong>Application/Website:</strong> Refers to the mobile, tablet, or web-based software product owned and developed by Vectority Technologies Private Limited.</li>
            <li><strong>Code of Ethics:</strong> The ethical guidelines prescribed by the Central/State Regulatory Authority of the respective systems of medicine.</li>
            <li><strong>Health Care Professional (HCP):</strong> Any medical practitioner registered with the Union or State regulatory body of the respective system of medicine, using the services of the Application.</li>
            <li><strong>Usage Rights:</strong> Rights granted to the User to use the Application, based on subscription and acceptance of these Terms of Use.</li>
            <li><strong>Parties:</strong> Refers to the Users, HCPs, and the Application.</li>
            <li><strong>Terms of Use:</strong> The Agreement governing the use of the Application.</li>
            <li><strong>Third-Party:</strong> Any person not a party to these Terms of Use.</li>
            <li><strong>User:</strong> Any natural or legal person competent to enter into a contract under Indian law, using the Application to avail the services offered.</li>
          </ul>

          <p><strong>2. Code of Conduct</strong></p>
          <p>Users must comply with all applicable laws, including but not limited to:</p>
          <ul className="list-disc pl-6">
            <li>The Information Technology Act, 2000</li>
            <li>The Indian Penal Code, 1860</li>
            <li>The Indecent Representation of Women Act, 1986</li>
            <li>The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013</li>
            <li>Telemedicine Practice Guidelines</li>
          </ul>

          <p><strong>3. Enforcement</strong></p>
          <p>These Terms of Use are legally binding and enforceable on all Parties. The Application reserves the right to modify or change the Terms of Use at any time.</p>

          <p><strong>4. Nature of Service & Limitations</strong></p>
          <ul className="list-disc pl-6">
            <li><strong>No Doctor-Patient Relationship:</strong> The Application provides a platform for users to connect with medical practitioners but does not provide medical consultations. The medical practitioner is solely responsible for the medical services provided.</li>
            <li><strong>Not for Medical Emergencies:</strong> The Application is not intended for medical emergencies or to replace a primary care physician.</li>
            <li><strong>Limitations of Online Consultation:</strong> Users acknowledge the risks and limitations of online consultations, including the inability to perform physical examinations.</li>
            <li><strong>No Sale of Drugs/Medicines:</strong> The Application does not sell drugs or medicinal preparations; it merely facilitates transactions between users and third-party pharmacies.</li>
          </ul>

          {/* Add other sections similarly */}
          
          <p><strong>25. Force Majeure</strong></p>
          <p>The Application shall not be liable for any failure to perform its obligations due to events beyond its control.</p>

          <p><strong>26. Responsibility Disclaimer</strong></p>
          <p>Medfidelity does not assume responsibility that medicines are within their expiry dates, and any harm or loss due to expired medicines is solely the responsibility of the hospital and issuing pharmacy, which must ensure the safety and validity of dispensed medicines.</p>
          
          {/* Add disclaimers */}
          
          <h3 className="text-xl font-semibold mt-6">Disclaimers</h3>
          <p><strong>Website Disclaimer</strong></p>
          <p>The information provided by Vectority Technologies Private Limited ("we," “MedFidelity,” "us," or "our") on [http://www.medfidelity.com] and our application (together referred to as "Website/Application") is for general informational purposes only. All information on the Website is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Website. Under no circumstances shall we have any liability to you for any loss or damage of any kind incurred because of the use of the Website or reliance on any information provided on the Website and our mobile application. Your use of the Website and your reliance on any information on the Website is solely at your own risk.</p>

          <p><strong>External Links Disclaimer</strong></p>
           The Website may contain (or you may be sent through the Website or our mobile application) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the Website or any feature linked in any banner or other advertising. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services.


          <p><strong>Professional Disclaimer</strong></p>
          MedFidelity respects your right to choose the hospital that meets your needs. Information contained about the partner hospitals and other healthcare professionals on the Website, including but not limited to the overview of the hospital, the facilities it provides, and its location, is provided by those partner hospitals. We have taken reasonable care and steps to ensure that any information regarding each healthcare provider is correct; however, we do not make any representation or warranty as to the accuracy of the information about the partner hospitals.

          MedFidelity does not practice medicine or any other licensed profession and does not interfere with the practice of medicine or any other licensed profession by partner hospitals or other healthcare professionals, each of whom is responsible for the services and compliance with the applicable requirements.

          MedFidelity does not endorse any medical practice, other healthcare professionals, or partner hospitals available on our application. Any statements, programs, opinions, or other information that may be provided to you by a healthcare professional or partner hospital are solely attributable to that healthcare professional or partner hospital and not to us. Reliance on any information provided through Services and/or on our application is solely at your own risk. MedFidelity makes no representations or warranties as to the conduct, ability, efficacy, accuracy, completeness, timeliness, or relevance of the information provided by any healthcare professional, partner hospital, and/or the services provided by the healthcare professional or partner hospital featured through the Services and/or on our application.

<p><strong>Testimonial Disclaimers</strong></p>
The Website may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences. Your individual results may vary.

The testimonials on the Website are submitted in various forms such as text, audio, and/or video, and are reviewed by us before being posted. They appear on the Website verbatim as given by the users, except for the correction of grammar or typing errors.

The views and opinions contained in the testimonials belong solely to the individual user and do not reflect our views and opinions, and the individual providing testimonials should not be held liable for the content of their testimonies.

The testimonials on the Website are not intended, nor should they be construed, as claims that our products and/or services can be used to diagnose, treat, mitigate, cure, prevent, or otherwise be used for any disease or medical condition. By reading or relying on the testimonials, you acknowledge and agree that they are not a substitute for professional advice or evaluation, and you use the information at your own risk.

<p><strong>Legal Compliance</strong></p>
The Parties shall comply with all relevant laws, bylaws, rules, regulations, orders, notifications, judgments, and decrees in force, applicable to it and its business operations enforced either by the Union Government and/or by the respective State Governments, in their respective jurisdictions.

<p><strong>Grievance Redressal</strong></p>
If you have any concern or grievance with respect to the Service, please e-mail us at [admin@medfidelity.com] and we will study the matter and take such action as we deem appropriate under the circumstances.

        </div>
        <div className="flex justify-end mt-6">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2 dark:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-brand text-white px-4 py-2 rounded"
            onClick={onAccept}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
