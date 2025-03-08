import React from 'react';

const CancelTerms = ({ isOpen, onClose, onAccept }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-600 dark:text-white">
        MedFidelity Terms and Conditions
      </h2>

      <div className="space-y-4 text-gray-800 dark:text-gray-200 text-justify">
        <p className="text-sm sm:text-base">
          Vectority Technologies Private Limited (referred to as "MedFidelity," "we," "us," or
          "our") is a company registered under the Companies Act, 1956, with its registered office
          at Taraka Rama Layout, Rushikonda, Visakhapatnam, 530045, Andhra Pradesh, India. We own
          and operate the website
          <a href="http://www.medfidelity.com" className="text-blue-500 hover:underline">
            {' '}
            www.medfidelity.com
          </a>{' '}
          (collectively referred to as the "Platform"). Through the Platform, users ("User,"
          "Users," or "you") can place orders for Products and/or Services offered by us.
        </p>

        <h3 className="text-lg sm:text-xl font-semibold mt-4">Cancellation Policy</h3>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
          <li>
            <strong>Lab/Diagnostics Tests:</strong> You may cancel a Lab/Diagnostics Test until the
            status of the test changes to “sample collected” on the Platform.
          </li>
          <li>
            <strong>Medicines and OTC:</strong> Orders for medicines and over-the-counter (OTC)
            products cannot be cancelled once accepted by our pharmacy partner.
          </li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold mt-4">Refund Policy</h3>
        <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
          <li>
            <strong>Lab/Diagnostics Tests:</strong> Refunds will be processed within 2-7 working
            days.
          </li>
          <li>
            <strong>Online Payments:</strong> Refunds will be processed within 7-10 business days.
          </li>
          <li>
            <strong>Medicines and OTC:</strong> If your order is cancelled, the refund will be
            credited back within 5-7 working days.
          </li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold mt-4">Covered Specialties</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
          <li>General Medicine</li>
          <li>Cold and Fever</li>
          <li>Dermatology</li>
          <li>Paediatrics</li>
          <li>Weight Management</li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold mt-4">Excluded Specialties</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base">
          <li>Oncology</li>
          <li>Cardiology</li>
          <li>Neurology</li>
        </ul>

        <h3 className="text-lg sm:text-xl font-semibold mt-4">Fair Usage Policy</h3>
        <p className="text-sm sm:text-base">
          The Company reserves the right to monitor Member activity and take appropriate action to
          prevent abuse of the Program.
        </p>
        <div className="flex justify-end mt-4 sm:mt-6">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white border-1 border-[#000000]"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default CancelTerms;
