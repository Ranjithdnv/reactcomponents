import React, { useEffect } from 'react';
import moment from 'moment';

const ReportStatusAll = React.forwardRef((props, ref) => {
  const { dataObj } = props;
  const { age, gender, patient_name, contact, ref_doctor, tests, created_at, lab_payment } =
    dataObj[0] || {};

  useEffect(() => {
    console.log('Tests data:', tests);
  }, [tests]);

  return (
    <div ref={ref} className="mb-16">
      {tests && Object.keys(tests).length > 0 ? (
        Object.values(tests).map((testData, index) => {
          const {
            test_name,
            department_name,
            test_parameters,
            sample_type,
            collected_on,
            completed_on,
            test_status,
          } = testData;

          return (
            <div key={index} className="max-w-4xl mx-auto p-5">
              {/* Lab Name */}
              <div className="text-center text-3xl mb-4 font-bold text-[#04816A]">
                {lab_payment?.lab_name || 'Lab Name'}
              </div>

              {/* Patient and Test Details */}
              <div className="mb-8 p-4 flex justify-between text-sm">
                <div className="w-1/2">
                  <p>
                    Patient Name: <span className="font-medium">{patient_name || 'N/A'}</span>
                  </p>
                  <p>
                    Age / Gender:{' '}
                    <span className="font-medium">{`${age || '--'} / ${gender || 'N/A'}`}</span>
                  </p>
                  <p>
                    Phone: <span className="font-medium">{contact || 'N/A'}</span>
                  </p>
                  <p>
                    Ref. Dr.: <span className="font-medium">{ref_doctor || 'N/A'}</span>
                  </p>
                  <p>
                    Report Status: <span className="font-medium">{test_status || 'Pending'}</span>
                  </p>
                </div>
                <div className="w-1/3">
                  <p>
                    Sample Type: <span className="font-medium">{sample_type || 'N/A'}</span>
                  </p>
                  <p>
                    Registered On:{' '}
                    <span className="font-medium">
                      {moment(created_at).format('DD-MM-YYYY') || 'N/A'}
                    </span>
                  </p>
                  <p>
                    Collected On:{' '}
                    <span className="font-medium">
                      {moment(collected_on).format('DD-MM-YYYY') || 'N/A'}
                    </span>
                  </p>
                  <p>
                    Completed On:{' '}
                    <span className="font-medium">
                      {moment(completed_on).format('DD-MM-YYYY') || 'N/A'}
                    </span>
                  </p>
                </div>
              </div>

              <hr className="my-4 border-2 mb-20" />

              <div className="text-center text-lg mt-6">{department_name || 'Department'}</div>
              <div className="text-center text-base font-bold mt-1 mb-16">
                {test_name || 'Test Name'}
              </div>

              {/* Test Parameters Table */}
              <table className="custome-table mb-16">
                <thead>
                  <tr>
                    <th>Test</th>
                    <th>Result</th>
                    <th>Units</th>
                    <th>Biological Reference Interval</th>
                  </tr>
                </thead>
                <tbody>
                  {test_parameters &&
                    Object.values(test_parameters).map((param, paramIndex) => {
                      const {
                        parameter_name,
                        method,
                        result,
                        result_status,
                        test_units,
                        bio_range,
                      } = param;
                      return (
                        <tr key={paramIndex}>
                          <td>
                            <span className="font-bold">{parameter_name}</span>
                            <br />
                            <p className="text-xs italic">{`Method: ${method}`}</p>
                          </td>
                          <td
                            className={result_status === 'Abnormal' ? 'font-bold text-red-600' : ''}
                          >
                            {result || 'N/A'}
                          </td>
                          <td>{test_units || 'N/A'}</td>
                          <td>
                            {typeof bio_range !== 'string'
                              ? Object.entries(bio_range || {}).map(([key, values], ind) => (
                                  <p key={ind}>
                                    {key}: {values?.join('-') || 'N/A'}
                                  </p>
                                ))
                              : bio_range || 'N/A'}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <hr className="my-4 border-1" />
              <div className="w-1/2 mt-8 mb-16">
                <p>
                  <span className="font-bold text-base">Note:</span>
                  <span> Suggested Clinical Correlation *</span>
                </p>
              </div>

              <div className="text-center mt-4">
                <p className="text-base">** End Of Report **</p>
              </div>

              <hr className="my-6 border-2" />
              <div className="text-center mb-28">
                <p className="text-xs text-[#9E9E9E]">
                  Powered by{' '}
                  <a href="https://medfidelity.com" className="text-teal-600 font-semibold">
                    Medfidelity.com
                  </a>
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-lg text-gray-500">No Tests Allocated.</div>
      )}
    </div>
  );
});

export default ReportStatusAll;
