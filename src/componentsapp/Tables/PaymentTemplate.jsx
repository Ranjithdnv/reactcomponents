import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import MedLogo from "../../assets/images/MedfidelityLogo.png";

const PaymentTemplate = React.forwardRef((props, ref) => {
  const {
    DATA
  } = props;

  useEffect(() => {
    console.log("LOG", DATA );
  }, [DATA]);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getMonth() + 1}/${
    currentDate.getDate()
  }/${currentDate.getFullYear()} ${String(currentDate.getHours()).padStart(2, '0')}:${String(
    currentDate.getMinutes()
  ).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;

  return (
    <div ref={ref} className="max-w-4xl mx-auto p-5 shadow-md rounded-lg bg-white border border-[#E0E0E0]">
      {/* Hospital Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primaryColor">
          {DATA?.hospital?.name || "Hospital Name"}
        </h1>
        <p className="text-sm text-[#757575] leading-tight">
          {DATA?.hospital?.address || "Hospital Address"}
        </p>
      </div>

      {/* Divider */}
      <hr className="my-4 border-[#E0E0E0]" />

      {/* Patient Details & Invoice */}
      <div className="mb-8 p-4 bg-[#F9FAFB] rounded-lg shadow-sm flex justify-between text-sm">
        {/* Left side - Patient Details */}
        <div className="w-1/2 dark:text-[#616161]">
          <h3 className="text-lg font-semibold mb-2 text-[#616161]">Patient Details:</h3>
          <p>
            <span className="font-medium">Name: </span>{" "}
            {DATA?.patient_data?.username || DATA?.med_patient?.username || ""} {DATA?.patient_data?.surname ||DATA?.med_patient?.surname || ""}
          </p>
          <p>
            <span className="font-medium">Contact: </span>
            {DATA?.patient_data?.contact_number || DATA?.med_patient?.contact_number ||""}
          </p>
          <p>
            <span className="font-medium">Register ID: </span>
            {DATA?.patient_data?.register_id || DATA?.med_patient?.register_id ||""}
          </p>
          <p>
          <span className="font-medium">Age / Gender: </span>
          {DATA?.patient_data?.age || DATA?.med_patient?.age ||""} / {DATA?.patient_data?.gender || DATA?.med_patient?.gender ||""} 
          </p>
        </div>

        {/* Right side  */}
        <div className="w-1/2 text-right dark:text-[#616161]">
          <h3 className="text-lg font-semibold mb-2 text-[#616161]">Doctor: </h3>
          <p>
            <span className="font-medium">Date:</span> {DATA?.appointment_date}{" "}
          </p>
          <p>
            <span className="font-medium">Slot:</span> {DATA?.slot}{" "}
          </p>
          <p>
            <span className="font-medium">Doctor: </span>
            {DATA?.doctor_data?.first_name || ""} {DATA?.doctor_data?.last_name || ""}
          </p>
          <p>
            <span className="font-medium">Specialization: </span>
            {DATA?.doctor_data?.specialization || ""}
          </p>
          {/* <p>
            <span className="font-medium">Payment Mode: </span>{DATA.payment_mode}
          </p>
          {DATA?.payment_mode === "UPI" && (
            <p>
              <span className="font-medium">Transaction ID: </span>{DATA.Transition_id}
            </p>
          )} */}
        </div>
      </div>

      <div className=" mb-6">
        <table className="min-w-full bg-white rounded-lg shadow-lg text-center">
          <thead className="text-[#424242]">
            <tr>
              <th className="py-2 px-4 border-r border-t border-l border-b border-[#000000] uppercase tracking-wide text-sm pb-3">Doctor Fee</th>
              <th className="py-2 px-4 border-r border-t border-b border-[#000000] uppercase tracking-wide text-sm pb-3">Registration Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 text-[#232323] font-medium border-r border-l border-b border-[#000000]">
                ₹{DATA?.payment_data?.amount ?? 0}
              </td>
              <td className="py-2 px-4 text-[#232323] font-medium border-r border-b border-[#000000]">
                ₹{DATA?.payment_data?.registration_amount ?? 0}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold text-[#424242]">Total Amount: ₹{DATA?.payment_data?.registration_amount + DATA?.payment_data?.amount}</h2>
      </div>
      {/* <div className="mt-8">
        <h3 className="font-bold">PAYMENT INSTRUCTIONS</h3>
        <p>Blocks design studio</p>
        <p>Bank name: ABC Bank limited</p>
        <p>SWIFT/IBAN: NZ0210230102</p>
        <p>Account number: 12-1234-123456-12</p>
        <p>Please use INV-0002 as a reference number</p>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <div>
          <p>For any questions please contact us at hi@blocksdesign.co</p>
        </div>
        <div>
          <a href="https://buy.stripe.com" className="text-blue-600">
            Pay online
          </a>
          <img src="/path-to-your-qr-code.png" alt="QR Code" className="h-16" />
        </div>
      </div> */} 

      {/* Powered by Medfidelity.com */}
      <hr className="my-6 border-[#E0E0E0]" />
      <div className="text-center">
        <p className="text-xs text-[#9E9E9E]">
          Powered by <a href="https://medfidelity.com" className="text-teal-600 font-semibold">Medfidelity.com</a>
        </p>
      </div>
    </div>
  );
});

export default PaymentTemplate;
