import React, { useEffect } from 'react';

const PatientPrescription = React.forwardRef((props, ref) => {
  const { DATA } = props;

  useEffect(() => {
    //console.log("Data:", DATA);
  }, [DATA]);

  const currentDate = new Date();
  const formattedDate = `${
    currentDate.getMonth() + 1
  } / ${currentDate.getDate()} / ${currentDate.getFullYear()}`;

  return (
    <div
      ref={ref}
      className="max-w-4xl mx-auto p-5 shadow-md rounded-lg bg-white border border-[#E0E0E0]"
    >
      {/* Hospital Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primaryColor">
          {DATA?.hospital?.name || 'Hospital Name'}
        </h1>
        <p className="text-sm text-[#757575] leading-tight">
          {DATA?.hospital?.address || 'Hospital Address'}
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
            <span className="font-medium">Name: </span>{' '}
            {DATA?.patient_data?.username || DATA?.med_patient?.username || ''}{' '}
            {DATA?.patient_data?.surname || DATA?.med_patient?.surname || ''}
          </p>
          <p>
            <span className="font-medium">Contact: </span>
            {DATA?.patient_data?.contact_number || DATA?.med_patient?.contact_number || ''}
          </p>
          <p>
            <span className="font-medium">Gender / Age: </span>
            {DATA?.patient_data?.gender || DATA?.med_patient?.gender || ''} /{' '}
            {DATA?.patient_data?.age || DATA?.med_patient?.age || ''}
          </p>
        </div>

        {/* Right side - Doctor Details */}
        <div className="w-1/2 text-right dark:text-[#616161]">
          <h3 className="text-lg font-semibold mb-2 text-[#616161]">Doctor:</h3>
          <p>
            <span className="font-medium">Date:</span> {DATA?.appointment_date || formattedDate}
          </p>
          <p>
            <span className="font-medium">Doctor: </span>
            {DATA?.doctor_data?.first_name || ''} {DATA?.doctor_data?.last_name || ''}
          </p>
          <p>
            <span className="font-medium">Specialization: </span>
            {DATA?.doctor_data?.specialization || ''}
          </p>
        </div>
      </div>

      {/* Test Details */}
      <div style={{ marginTop: '10px', fontSize: '14px', lineHeight: '1.5', color: '#333' }}>
        <p>
          <strong>BP:</strong> {DATA?.diagnosis_data?.diagnosis?.[0]?.bp || ''}{' '}
          mmHg,&nbsp;&nbsp;&nbsp;
          <strong>Weight (kg):</strong> {DATA?.diagnosis_data?.diagnosis?.[0]?.weight || ''}
          ,&nbsp;&nbsp;&nbsp;
          <strong>Pulse Rate:</strong> {DATA?.diagnosis_data?.diagnosis?.[0]?.pulse_rate || ''}{' '}
          bpm,&nbsp;&nbsp;&nbsp;
          <strong>Temperature (°C):</strong>{' '}
          {DATA?.diagnosis_data?.diagnosis?.[0]?.temperature || ''}
        </p>
      </div>

      {/* Remarks and Symptoms */}
      <div
        className="mb-6 flex border rounded-lg mt-4"
        style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}
      >
        <div
          className="description-container flex-1 p-4 border-r"
          style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}
        >
          <p className="font-bold">Remarks:</p>
          <div className="p-2 w-full" style={{ whiteSpace: 'pre-wrap' }}>
            {DATA?.diagnosis_data?.diagnosis?.[0]?.remarks || ''}
          </div>
        </div>
        <div
          className="symptoms-container flex-1 p-4"
          style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}
        >
          <p className="font-bold">Symptoms:</p>
          <div className="p-2 w-full" style={{ whiteSpace: 'pre-wrap' }}>
            {DATA?.diagnosis_data?.diagnosis?.[0]?.symptoms || ''}
          </div>
        </div>
      </div>

      <div style={{ margin: '20px 0' }} />

      {/* Tests Table */}
      <div className="input-group">
        <label className="font-bold">Tests:</label>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                S.No
              </th>
              <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                Test Name
              </th>
            </tr>
          </thead>
          <tbody>
            {DATA?.diagnosis_data?.tests?.length > 0 ? (
              DATA?.diagnosis_data?.tests.map((test, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                    {index + 1}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                    {test.test_name || 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}
                >
                  No tests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ margin: '20px 0' }} />

      {/* Drug Information Table */}
      <div className="font-bold">Drug Information:</div>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #ccc',
          marginBottom: '8px',
          marginTop: '8px',
        }}
      >
        <thead style={{ backgroundColor: '#f0f0f0' }}>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>Drug</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
              Quantity
            </th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
              Frequency
            </th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          {DATA?.diagnosis_data?.medicines?.length > 0 ? (
            DATA?.diagnosis_data?.medicines?.map((medicine, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                  <span>{medicine.medicine_name || ''}</span>
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                  {medicine.quantity || ''}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                  {medicine.frequency || ''}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
                  {medicine.remarks || ''}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}
              >
                No medicines available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Powered by Medfidelity.com */}
      <div style={{ textAlign: 'center', marginTop: '4px' }}>
        <p style={{ fontSize: '12px', color: '#9E9E9E' }}>
          Powered by{' '}
          <a href="https://medfidelity.com" style={{ color: '#009688', fontWeight: 'bold' }}>
            Medfidelity.com
          </a>
        </p>
      </div>
    </div>
  );
});

export default PatientPrescription;
