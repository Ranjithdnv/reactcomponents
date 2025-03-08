import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Table, Button, Tag, Input, message, Spin, Modal, Tabs, Tooltip } from 'antd';
import PaymentTemplate from './PaymentTemplate';
import MultiSelectField from '../../components/AppiontmentMultiSelect';
import {
  FileTextOutlined,
  DownloadOutlined,
  ScheduleOutlined,
  CloseOutlined,
  PauseCircleOutlined,
} from '@ant-design/icons';
import { LuTestTube } from 'react-icons/lu';
import { CgPlayPauseO } from 'react-icons/cg';
import { IoMdClose } from 'react-icons/io';
import axiosInstance from '../../apis/axios';
import getPaymentTemplate from '../../pages/manageBooking/payment';
// import Modal from "../../pages/modal";
import { endpoints } from '../../constants';
import InputField from '../../components/InputField';
import ReportStatusAll from './printReport';
import DatePickerField from '../../components/DatePickerField';
import { enqueueSnackbar } from 'notistack';
import moment from 'moment';
import PatientPrescription from './PatientPrescription';
import html2pdf from 'html2pdf.js';

const { Search } = Input;
const { TabPane } = Tabs;

const transformData = (apiData) => {
  //console.log("DATA",apiData)
  return apiData?.map((item) => ({
    key: item.id,
    patientName: `${item.patient_data.title} ${item.patient_data.username} ${item.patient_data.surname}`,
    date: new Date(item.appointment_date).toLocaleDateString(),
    mode: item.mode,
    registered_as: `${item.patient_data.registered_as}`,
    slot: item.slot,
    doctor: {
      name:
        item.doctor_data?.first_name && item.doctor_data?.last_name
          ? `${item.doctor_data.first_name} ${item.doctor_data.last_name}`
          : '--',
    },
    status: item.status,
    action: item,
  }));
};

const ReusableTable = ({
  apiData,
  fetchPatientData,
  pageIndex,
  pageCount,
  setPageIndex,
  loading,
  search,
  setSearch,
  totalRecords,
}) => {
  const [searchKey, setSearchKey] = useState('');
  const PatientPayment = useRef(null);
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const [data, setData] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPayment, setIsModalPayment] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [object, setObject] = useState({});
  const [objectID, setObjectID] = useState('');
  const [doctorID, setDoctorID] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDocSlot, setSelectedDocSlot] = useState(null);
  const ReportStatusRef = useRef(null);
  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const [values, setValues] = useState({
    date: '',
    extra_charges: '',
    doctor_id: '',
    mode: '',
    default_time: '',
  });

  useEffect(() => {
    if (openModal) {
      axiosInstance
        .get(`${endpoints.SpecializationUrl}`)
        .then((response) => {
          const { results } = response.data;
          let options = results.map((result) => ({
            label: result.name,
            value: result.id,
          }));
          setSpecializationOptions(options);
        })
        .catch((error) => {
          // //console.log(error);
        });
    }
  }, [openModal]);

  const handleDateChange = (name, date) => {
    handleInputChange1({
      target: {
        name,
        value: moment(date).format('YYYY-MM-DD'),
      },
    });
  };

  const downloadPDF = () => {
    if (PatientPrescription.current) {
      const element = PatientPrescription.current;
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'patientprescription.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      html2pdf().from(element).set(options).save();
    }
  };

  const paymentDownloadPDF = () => {
    if (PatientPayment.current) {
      const element = PatientPayment.current;
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'PatientPayment.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      html2pdf().from(element).set(options).save();
    }
  };

  useEffect(() => {
    if (objectID) {
      setOpenModal(true);
    }
  }, [objectID]);

  const [values1, setValues1] = useState({
    doctor: [],
    specialization: '',
    appointment_date: '',
    extra_charges: '',
    mode: '',
    slot: '',
  });
  useEffect(() => {
    if (!openModal) {
      setObjectID('');
      setDoctorID('');
      setDoctorOptions([]);
      setValues1({
        doctor: [],
        specialization: '',
        appointment_date: '',
        extra_charges: '',
        mode: '',
        slot: '',
      });
      setSelectedSlot(null);
      setValues({
        date: '',
        extra_charges: '',
        doctor_id: '',
        mode: '',
        default_time: '',
      });
      setTimeSlots([]);
    }
  }, [openModal]);

  useEffect(() => {
    const fetchSlotsData = async () => {
      if (openModal && values1.doctor && values1.appointment_date) {
        try {
          const response = await axiosInstance.get(
            `${endpoints.DoctorSlots}${values1.doctor.value}/`,
            {
              params: {
                mode: values1.mode,
                date: values1.appointment_date,
              },
            }
          );

          const data = response.data;
          setTimeSlots(data);
          setSelectedSlot(null);
        } catch (error) {
          console.error('Failed to fetch slot data:', error);
        }
      }
    };

    fetchSlotsData();
  }, [openModal, values1.doctor, values1.appointment_date, setTimeSlots]);
  const [doctorOptions, setDoctorOptions] = useState([]);

  useEffect(() => {
    if (openModal) {
      axiosInstance
        .get(`${endpoints.DoctorList}`)
        .then((response) => {
          const { Doctors_List } = response.data;
          let options = Doctors_List.map((result) => ({
            label: `${result.user.first_name} ${result.user.last_name}`,
            value: result.id,
          }));
          // //console.log("Doctor Options", options);
          setDoctorOptions(options);
        })
        .catch((error) => {
          console.error('Error fetching doctor data:', error);
        });
    }
  }, [openModal]);

  useEffect(() => {
    if (!values1?.doctor) {
      handleMultiSelect('doctor', []);
    }
  }, [values1?.doctor]);

  const handleInputChange1 = useCallback((event) => {
    const { name, value } = event.target;
    setValues1((prevValues) => ({
      ...prevValues,
      [name]: value.replace(/^\s+/, '').replace(/\s+/g, ' '),
    }));
  }, []);

  const handleMultiSelect = useCallback((name, result) => {
    setValues1((prevValues) => {
      let updatedValues = { ...prevValues, [name]: result };

      if (name === 'specialization') {
        updatedValues['doctor'] = null;
        updatedValues['appointment_date'] = null;
      }

      return updatedValues;
    });
  }, []);

  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    [values]
  );

  const buttonClickHandler1 = (DATA) => {
    //console.log("hello",DATA)
    setObject(DATA);
    setIsModalVisible(true);
  };

  const buttonClickHandler = (DATA) => {
    //console.log("hello",DATA)
    setObject(DATA);
    setIsModalPayment(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setActiveTab('1');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(values.date)) {
      enqueueSnackbar('Invalid date.', { variant: 'error' });
      return;
    }
    let payload = {
      // mode: values?.mode,
      appointment_date: values.date,
      // doctor_slot: selectedSlot.slotId,
      doctor_id: doctorID,
      extra_charges: values?.extra_charges,
      slot: selectedSlot.id,
    };

    // if (values.mode === "Online Approach") {
    //   payload = {
    //     mode: values?.mode,
    //     appointment_date: values.date,
    //     doctor_slot: selectedSlot.slotId,
    //     slot: selectedSlot ? selectedSlot.id : "",
    //   };
    // } else if (values.mode === "Direct Approach") {
    //   payload = {
    //     mode: values?.mode,
    //     appointment_date: values.date,
    //     slot: values.default_time,
    //   };
    // }

    try {
      if (objectID) {
        await axiosInstance.put(`${endpoints.patientList}${objectID}/?flag=0`, payload);
        enqueueSnackbar('Rescheduled Successfully', {
          variant: 'success',
        });
        setOpenModal(false);
        fetchPatientData(pageIndex);
      }
    } catch (error) {
      if (error?.response?.data?.hasOwnProperty('error')) {
        enqueueSnackbar(error?.response?.data?.error, {
          variant: 'error',
        });
      } else if (error?.response?.data?.hasOwnProperty('message')) {
        const identityError = error.response.data.message;
        enqueueSnackbar(identityError, {
          variant: 'error',
        });
      } else {
        enqueueSnackbar('Failed to reschedule appointment', {
          variant: 'error',
        });
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    // if (!datePattern.test(values.date)) {
    //   enqueueSnackbar("Invalid date.", { variant: "error" });
    //   return;
    // }
    let payload = {
      // mode: values?.mode,
      appointment_date: values1.appointment_date,
      doctor_id: values1.doctor.value,
      // doctor_slot: selectedDocSlot.slotId,
      extra_charges: values1?.extra_charges,
      slot: selectedDocSlot.id,
    };

    // if (values.mode === "Online Approach") {
    //   payload = {
    //     mode: values?.mode,
    //     appointment_date: values.date,
    //     doctor_slot: selectedSlot.slotId,
    //     slot: selectedSlot ? selectedSlot.id : "",
    //   };
    // } else if (values.mode === "Direct Approach") {
    //   payload = {
    //     mode: values?.mode,
    //     appointment_date: values.date,
    //     slot: values.default_time,
    //   };
    // }

    try {
      if (objectID) {
        await axiosInstance.put(`${endpoints.patientList}${objectID}/?flag=0`, payload);
        enqueueSnackbar('Rescheduled Successfully', {
          variant: 'success',
        });
        setOpenModal(false);
        fetchPatientData(pageIndex);
      }
    } catch (error) {
      if (error?.response?.data?.hasOwnProperty('error')) {
        enqueueSnackbar(error?.response?.data?.error, {
          variant: 'error',
        });
      } else if (error?.response?.data?.hasOwnProperty('message')) {
        const identityError = error.response.data.message;
        enqueueSnackbar(identityError, {
          variant: 'error',
        });
      } else {
        enqueueSnackbar('Failed to reschedule appointment', {
          variant: 'error',
        });
      }
    }
  };

  const downloadLabPDF = () => {
    if (ReportStatusRef.current) {
      const element = ReportStatusRef.current;
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'Report-status.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      html2pdf().from(element).set(options).save();
    }
  };
  const [reportPrintModal, setReportPrintModal] = useState(false);
  const [selectedTestReportObj, setSelectedTestReportObj] = useState({});
  const [selectedTestReport, setSelectedTestReport] = useState({});
  // const buttonClickHandler = async (data, button) => {
  //   setSelectedPatientData(data);
  //   setButtonClicked(button);
  //   if (button === "print-payment" || button === "print-diagnosis") {
  //     download(data, button);
  //   }
  // };

  const setEditData = useCallback((data) => {
    //console.log("valu",data.mode)
    setValues1({
      mode: data?.mode,
    });
    setValues({
      date: '',
      mode: data?.mode,
      doctor_id: data?.doctor_data.id,
    });
    setObjectID(data?.id);
    setDoctorID(data.doctor_data.id);
    setOpenModal(true);
  }, []);

  const slotSelectHandler = (scheduleId, slot, slotId) => {
    setSelectedSlot({ ...slot, scheduleId, slotId });
  };

  const slotSelectDocHandler = (scheduleId, slot, slotId) => {
    setSelectedDocSlot({ ...slot, scheduleId, slotId });
  };

  useEffect(() => {
    if (
      openModal &&
      values.doctor_id &&
      values.date
      // &&
      // values.mode === "Online Approach"
    ) {
      axiosInstance
        .get(`${endpoints.DoctorSlots}${values.doctor_id}/`, {
          params: {
            date: values.date,
            mode: values.mode,
          },
        })
        .then((response) => {
          const { data } = response.data;
          setTimeSlots(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [values, openModal]);
  useEffect(() => {
    if (reportPrintModal) {
      axiosInstance
        .get(`${endpoints.PatientLabReports}${selectedTestReportObj}`)
        .then((response) => {
          const Response = response.data;

          setSelectedTestReport(Response);
        })
        .catch((error) => {
          console.error('Error fetching doctor data:', error);
        });
    }
  }, [reportPrintModal, selectedTestReportObj]);

  useEffect(() => {
    console.log('selectedTestReport', selectedTestReport);
  }, [selectedTestReport]);
  const handleViewTestsButtonClick = (booking) => {
    console.log('booking', booking.key);
    setSelectedTestReportObj(booking.key);
    setReportPrintModal(true);
  };
  function download(data, button) {
    let pri = document.getElementById('ifmcontentstoprint');
    if (!pri) {
      console.error("Element with id 'ifmcontentstoprint' not found.");
      return;
    }

    let priWindow = pri.contentWindow;
    if (!priWindow) {
      console.error('Content window not found.');
      return;
    }

    priWindow.document.open();
    priWindow.document.write(getPaymentTemplate(data, button));
    priWindow.document.close();
    priWindow.focus();
    setTimeout(() => {
      priWindow.print();
    }, 500);
  }

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'patientName',
      render: (text) => <a className="text-[#000000] cursor-default">{text}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Mode',
      dataIndex: 'mode',
      key: 'mode',
    },
    {
      title: 'Slot',
      dataIndex: 'slot',
      key: 'slot',
    },
    {
      title: 'Doctor',
      dataIndex: 'doctor',
      key: 'doctor',
      render: (doctor) => <div className="flex items-center">{doctor.name}</div>,
    },
    {
      title: 'Booking Type',
      dataIndex: 'registered_as',
      key: 'registered_as',
      render: (text) => <a className="text-[#000000] cursor-default">{text}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Confirmed' ? 'green' : 'red'}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, DATA) => (
        <div className="space-x-4 flex">
          {/* Lab Reports Icon */}
          <Tooltip
            title={
              DATA.status === 'Confirmed' ||
              DATA.status === 'On Hold' ||
              DATA.status === 'Cancelled' ||
              DATA.status === 'Reschedule'
                ? null
                : 'Lab Reports'
            }
          >
            <LuTestTube
              className={`text-[#04816A] cursor-pointer text-xl ${
                DATA.status === 'Confirmed' ||
                DATA.status === 'On Hold' ||
                DATA.status === 'Cancelled' ||
                DATA.status === 'Reschedule'
                  ? 'text-[#BDBDBD] cursor-not-allowed'
                  : 'text-brand cursor-pointer'
              }`}
              onClick={() => {
                if (
                  DATA.status !== 'Confirmed' &&
                  DATA.status !== 'Cancelled' &&
                  DATA.status !== 'On Hold' &&
                  DATA.status === 'Reschedule'
                )
                  handleViewTestsButtonClick(DATA);
              }}
            />
          </Tooltip>

          {/* Prescription Icon */}
          <Tooltip
            title={
              DATA.status === 'Confirmed' ||
              DATA.status === 'On Hold' ||
              DATA.status === 'Cancelled' ||
              DATA.status === 'Reschedule'
                ? null
                : 'Prescription'
            }
          >
            <FileTextOutlined
              className={`text-lg ${
                DATA.status === 'Confirmed' ||
                DATA.status === 'On Hold' ||
                DATA.status === 'Cancelled' ||
                DATA.status === 'Reschedule'
                  ? 'text-[#BDBDBD] cursor-not-allowed'
                  : 'text-brand cursor-pointer'
              }`}
              onClick={() => {
                if (
                  DATA.status !== 'Confirmed' &&
                  DATA.status !== 'Cancelled' &&
                  DATA.status !== 'On Hold' &&
                  DATA.status !== 'Reschedule'
                )
                  buttonClickHandler1(DATA.action, DATA);
              }}
            />
          </Tooltip>

          {/* Download Icon */}
          <Tooltip
            title={
              DATA.status === 'On Hold' ||
              DATA.status === 'Cancelled' ||
              DATA.status === 'Reschedule'
                ? null
                : 'View Details'
            }
          >
            <DownloadOutlined
              className={`text-lg ${
                DATA.status === 'On Hold' ||
                DATA.status === 'Cancelled' ||
                DATA.status === 'Reschedule'
                  ? 'text-[#BDBDBD] cursor-not-allowed'
                  : 'text-brand cursor-pointer'
              }`}
              onClick={() => {
                if (
                  DATA.status !== 'Cancelled' &&
                  DATA.status !== 'On Hold' &&
                  DATA.status !== 'Reschedule'
                )
                  buttonClickHandler(DATA.action, DATA);
              }}
            />
          </Tooltip>

          {/* Schedule Icon */}
          <Tooltip
            title={
              DATA.status === 'Fulfilled' ||
              DATA.status === 'On Hold' ||
              DATA.status === 'Cancelled' ||
              DATA.status === 'Reschedule'
                ? null
                : 'Schedule'
            }
          >
            <ScheduleOutlined
              className={`text-lg ${
                DATA.status === 'Fulfilled' ||
                DATA.status === 'On Hold' ||
                DATA.status === 'Cancelled'
                  ? 'text-[#BDBDBD] cursor-not-allowed'
                  : 'text-brand cursor-pointer'
              }`}
              onClick={() => {
                if (
                  DATA.status !== 'Fulfilled' &&
                  DATA.status !== 'Cancelled' &&
                  DATA.status !== 'On Hold'
                )
                  setEditData(DATA.action);
              }}
            />
          </Tooltip>

          {/* Cancel Slot Icon */}
          <Tooltip
            title={
              DATA.status === 'Fulfilled' || DATA.status === 'Cancelled' ? null : 'Cancel Slot'
            }
          >
            <CloseOutlined
              className={`text-lg ${DATA.status === 'Fulfilled' || DATA.status === 'Cancelled' ? 'text-[#BDBDBD] cursor-not-allowed' : 'text-brand cursor-pointer'}`}
              onClick={() => {
                if (DATA.status !== 'Fulfilled' && DATA.status !== 'Cancelled') {
                  cancelSlotHandler(DATA.action);
                }
              }}
            />
          </Tooltip>

          {/* On Hold Slot Icon */}
          <Tooltip
            title={
              DATA.status === 'Fulfilled' || DATA.status === 'Cancelled' ? null : 'Cancel Slot'
            }
          />

          <PauseCircleOutlined
            className={`text-lg ${DATA.status === 'Fulfilled' || DATA.status === 'On Hold' || DATA.status === 'Cancelled' ? 'text-[#BDBDBD] cursor-not-allowed' : 'text-brand cursor-pointer'}`}
            onClick={() => {
              if (
                DATA.status !== 'Fulfilled' &&
                DATA.status !== 'On Hold' &&
                DATA.status !== 'Cancelled'
              ) {
                onholdSlotHandler(DATA.action);
              }
            }}
            title={DATA.status === 'Fulfilled' || DATA.status === 'On Hold' ? null : 'On Hold Slot'}
          />
        </div>
      ),
    },
  ];

  const onholdSlotHandler = useCallback(
    (formValues) => {
      const data = {
        // mode:formValues.mode,
        appointment_date: formValues.appointment_date,
        // doctor_slot:formValues.doctor_slot,
        doctor_id: formValues.doctor_data.id,
        slot: formValues.slot,
      };

      //console.log("Data to Submit:", objectID);

      axiosInstance
        .put(`${endpoints.patientList}${formValues.id}/?flag=2`, data)
        .then((response) => {
          //console.log("Submission response:", response);
          enqueueSnackbar('Onhold Successfully', { variant: 'success' });
          setOpenModal(false);
          fetchPatientData();
        })
        .catch((error) => {
          console.error('Submission error:', error);
          if (error?.response?.data?.hasOwnProperty('error')) {
            enqueueSnackbar(error?.response?.data?.error, {
              variant: 'error',
            });
          } else if (error?.response?.data?.hasOwnProperty('message')) {
            const identityError = error.response.data.message;
            enqueueSnackbar(identityError, {
              variant: 'error',
            });
          } else {
            enqueueSnackbar('Failed to onhold appointment', {
              variant: 'error',
            });
          }
        });
    },
    [enqueueSnackbar, pageIndex, search]
  );
  useEffect(() => {
    if (!reportPrintModal) {
      setSelectedTestReport({});
      setSelectedTestReportObj({});
    }
  }, [reportPrintModal]);
  const cancelSlotHandler = useCallback(
    (formValues) => {
      const data = {
        // mode:formValues.mode,
        appointment_date: formValues.appointment_date,
        // doctor_slot:formValues.doctor_slot,
        doctor_id: formValues.doctor_data.id,
        slot: formValues.slot,
      };

      //console.log("Data to Submit:", objectID);

      axiosInstance
        .put(`${endpoints.patientList}${formValues.id}/?flag=1`, data)
        .then((response) => {
          //console.log("Submission response:", response);
          enqueueSnackbar('Cancelled Successfully', { variant: 'success' });
          setOpenModal(false);
          fetchPatientData();
          console.log(search);
        })
        .catch((error) => {
          console.error('Submission error:', error);
          if (error?.response?.data?.hasOwnProperty('error')) {
            enqueueSnackbar(error?.response?.data?.error, {
              variant: 'error',
            });
          } else if (error?.response?.data?.hasOwnProperty('message')) {
            const identityError = error.response.data.message;
            enqueueSnackbar(identityError, {
              variant: 'error',
            });
          } else {
            enqueueSnackbar('Failed to Cancel appointment', {
              variant: 'error',
            });
          }
        });
    },
    [enqueueSnackbar, search, pageIndex]
  );

  useEffect(() => {
    setData(transformData(apiData));
  }, [apiData]);

  const filteredData = data.filter((item) =>
    item?.patientName?.toLowerCase().includes(searchKey?.toLowerCase())
  );

  useEffect(() => {
    if (!values1?.extra_charges) {
      setValues1((prev) => ({ ...prev, extra_charges: '' }));
    }
  }, [values1?.extra_charges]);

  const handleTableChange = (pagination) => {
    setPageIndex(pagination.current);
  };

  const handleDocDateChange = (name, date) => {
    handleInputChange({
      target: {
        name,
        value: moment(date).format('YYYY-MM-DD'),
      },
    });
  };

  const resetForm = () => {
    setValues({ extra_charges: '', date: '' }); // Adjust according to your initial state structure
    setValues1({ extra_charges: '', doctor: [], appointment_date: '' }); // Adjust accordingly
    setSelectedSlot(null); // Clear any selected slots if needed
    setSelectedDocSlot(null); // Clear selected doctor slots if applicable
  };

  return (
    <div className="mx-auto p-4">
      <iframe id="ifmcontentstoprint" style={{ display: 'none' }}></iframe>
      <div className="flex !flex-col justify-between gap-2 pb-6 md:flex-row">
        <Modal
          maskClosable={false}
          title="Reschedule"
          visible={openModal}
          onCancel={() => {
            resetForm(); // Reset the form
            setOpenModal(false); // Close the modal
          }}
          footer={null}
          className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl"
        >
          <Tabs
            activeKey={activeTab} // Controlled by state
            onChange={handleTabChange}
            className="mb-4"
          >
            {/* Tab for "Same Doctor" */}
            <TabPane tab="Same Doctor" key="1">
              <form onSubmit={handleSubmit}>
                <div className="mx-0.5 mb-2">
                  <InputField
                    label={'Extra Charges'}
                    placeholder={'Enter extra charges'}
                    name={'extra_charges'}
                    value={values?.extra_charges}
                    required={false}
                    onChange={handleInputChange}
                  />
                  <DatePickerField
                    label={'Date'}
                    // placeholder="DATE"
                    name={'date'}
                    min={moment().format('YYYY-MM-DD')}
                    value={values.date}
                    onChange={(date) => handleDocDateChange('date', date)}
                  />
                </div>
                {values.date && (
                  <div className=" overflow-auto max-h-60">
                    {(values.mode === 'Online Approach' ||
                      values.mode === 'Video Consultation' ||
                      values.mode === 'Direct Approach') && (
                      <div className="overflow-x-auto flex-wrap w-full item-start justify-start text-start">
                        {timeSlots?.length > 0 ? (
                          timeSlots.map((slot, slotIndex) => (
                            <div key={slotIndex}>
                              {slot.slots_for_date &&
                                Object.keys(slot.slots_for_date).map(
                                  (scheduleId, scheduleIndex) => (
                                    <div key={scheduleIndex}>
                                      <div className="space-x-2">
                                        {slot.slots_for_date[scheduleId].slots &&
                                          Object.keys(slot.slots_for_date[scheduleId].slots).map(
                                            (time, timeIndex) => (
                                              <Button
                                                key={timeIndex}
                                                onClick={() =>
                                                  slotSelectHandler(
                                                    scheduleId,
                                                    {
                                                      ...slot.slots_for_date[scheduleId].slots[
                                                        time
                                                      ],
                                                      id: time,
                                                    },
                                                    slot.id
                                                  )
                                                }
                                                className={`${
                                                  selectedSlot &&
                                                  selectedSlot.id === time &&
                                                  selectedSlot.scheduleId === scheduleId
                                                    ? 'bg-primaryColor text-white'
                                                    : 'bg-white text-black'
                                                } hover:bg-primaryColor my-3 hover:text-white focus:bg-primaryColor focus:text-white text-black font-medium py-5 px-6 rounded-xl`}
                                              >
                                                {time}
                                              </Button>
                                            )
                                          )}
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>
                          ))
                        ) : (
                          <p className="dark:text-[#000000]">
                            No available slots for the selected date.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
                <div className="space-x-4 flex items-end justify-end p-2">
                  <button
                    type="submit"
                    className="w-24 h-10 px-4 py-2 text-sm font-semibold text-white bg-[#04816A] shadow-md rounded-lg hover:bg-[#00453a] focus:outline-none focus:ring-2 focus:ring-[#00453a] focus:ring-opacity-75"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="w-24 h-10 px-4 py-2 text-sm font-semibold bg-[#d3d3d9] text-[#29294a] shadow-md rounded-lg hover:text-[#29294a] focus:outline-none focus:ring-0 focus:ring-[#29294a] focus:ring-opacity-75"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </TabPane>

            <TabPane tab="Suggest another Doctor" key="2">
              <form onSubmit={handleFormSubmit} className="">
                <div className="md:grid grid-cols-2 gap-x-5 gap-y-2">
                  {/* <div className="">
                  <MultiSelectField
                      label={"Specialization"}
                      name={"specialization"}
                      options={specializationOptions}
                      value={values1?.specialization}
                      isSearchable
                      mode="default"
                      placeholder={"Select a specialization"}
                      showSelectAll={false}
                      onChange={(result) => {
                        handleMultiSelect("specialization", result);
                      }}
                      required={true}
                    />
                  </div> */}

                  <InputField
                    label={'Extra Charges'}
                    placeholder={'Enter extra charges'}
                    name={'extra_charges'}
                    value={values1?.extra_charges ?? ''}
                    required={false}
                    onChange={handleInputChange1}
                  />

                  <MultiSelectField
                    label={'Doctor'}
                    name={'doctor'}
                    mode="default"
                    options={doctorOptions}
                    placeholder={'Select a doctor'}
                    value={values1?.doctor || []} // Ensure it is an empty array when values1.doctor is empty
                    isSearchable
                    showSelectAll={false}
                    onChange={(result) => {
                      handleMultiSelect('doctor', result);
                    }}
                  />

                  <DatePickerField
                    label={'Appointment Date'}
                    // disabledDate={(current) => {
                    //   let customDate = moment().format("YYYY-MM-DD");
                    //   return current && current < moment(customDate, "YYYY-MM-DD");
                    // }}
                    min={moment().format('YYYY-MM-DD')}
                    placeholder={'Select date'}
                    name={'appointment_date'}
                    value={values1?.appointment_date}
                    onChange={(date) => handleDateChange('appointment_date', date)}
                    required={true}
                  />

                  {/* <InputField
                    label={"Appointment Time"}
                    type={"time"}
                    placeholder={"Select time"}
                    name={"slot"}
                    value={values1?.slot}
                    onChange={handleInputChange1}
                    required={true}
                  /> */}
                </div>
                {values1?.doctor && values1?.appointment_date && (
                  <div className=" overflow-auto max-h-64">
                    <div className="container slot-btns flex-wrap mt-5 item-start justify-start text-start">
                      {timeSlots?.data &&
                      Array.isArray(timeSlots.data) &&
                      timeSlots.data.length > 0 ? (
                        timeSlots.data.map((slot, slotIndex) => (
                          <div key={slotIndex}>
                            {slot.slots_for_date &&
                              Object.entries(slot.slots_for_date).map(
                                ([scheduleId, schedule], scheduleIndex) => (
                                  <div key={scheduleIndex}>
                                    <div>
                                      {schedule.slots &&
                                        Object.entries(schedule.slots).map(
                                          ([time, slotDetails], timeIndex) => {
                                            const isSelected =
                                              selectedDocSlot &&
                                              selectedDocSlot.id === time &&
                                              selectedDocSlot.scheduleId === scheduleId;
                                            return (
                                              <Button
                                                key={timeIndex}
                                                onClick={() => {
                                                  const slotDetails =
                                                    slot.slots_for_date[scheduleId].slots[time];
                                                  ////console.log('Selected Slot:', slotDetails.token_number);
                                                  setSelectedDocSlot({ id: time, scheduleId });
                                                  slotSelectDocHandler(
                                                    scheduleId,
                                                    { ...slotDetails, id: time },
                                                    slotDetails.token_number,
                                                    slot.id
                                                  );
                                                }}
                                                className={`
                                  ${
                                    isSelected
                                      ? 'bg-primaryColor text-white dark:bg-primaryColor dark:text-white'
                                      : 'bg-white text-black dark:bg-gray-800 dark:text-black'
                                  }
                                  hover:bg-primaryColor hover:text-white dark:hover:bg-primaryColor dark:hover:text-white
                                  mx-1 my-0.5 focus:bg-primaryColor focus:text-white
                                  py-4 rounded-lg font-medium
                                `}
                                              >
                                                {time}
                                              </Button>
                                            );
                                          }
                                        )}
                                    </div>
                                  </div>
                                )
                              )}
                          </div>
                        ))
                      ) : (
                        <p className="dark:text-[#000000]">
                          No available slots for the selected date.
                        </p>
                      )}
                    </div>
                  </div>
                )}{' '}
                <div className="space-x-4 flex items-end justify-end">
                  <button
                    type="submit"
                    className="w-24 h-10 px-4 py-2 text-sm font-semibold text-white bg-[#04816A] shadow-md rounded-lg hover:bg-[#00453a] focus:outline-none focus:ring-2 focus:ring-[#00453a] focus:ring-opacity-75"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="w-24 h-10 px-4 py-2 text-sm font-semibold bg-[#d3d3d9] text-[#29294a] shadow-md rounded-lg hover:text-[#29294a] focus:outline-none focus:ring-0 focus:ring-[#29294a] focus:ring-opacity-75"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </TabPane>
          </Tabs>
        </Modal>
        <Modal
          maskClosable={false}
          style={{ top: 20 }}
          bodyStyle={{
            maxHeight: 'calc(100vh - 150px)',
            overflowY: 'auto',
          }}
          title="Lab Report"
          visible={reportPrintModal}
          onCancel={() => setReportPrintModal(false)}
          className="w-full max-w-screen-lg"
          footer={[
            <Button key="download" onClick={downloadLabPDF} className="text-white bg-brand">
              Download PDF
            </Button>,
          ]}
        >
          <ReportStatusAll ref={ReportStatusRef} dataObj={selectedTestReport} />
        </Modal>
        {/* <div className="flex flex-col gap-2">
          <Search
            className="w-full md:w-[300px]"
            placeholder="Search patient name"
            allowClear
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div> */}
        <Modal
          maskClosable={false}
          style={{ top: 20 }}
          bodyStyle={{
            maxHeight: 'calc(100vh - 150px)',
            overflowY: 'auto',
          }}
          title={null}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="close" onClick={handleCancel}>
              Close
            </Button>,
            <Button key="download" onClick={downloadPDF} className="text-white bg-brand">
              Download PDF
            </Button>,
          ]}
          width={800}
        >
          <PatientPrescription DATA={object} ref={PatientPrescription} />
        </Modal>
      </div>

      <Modal
        maskClosable={false}
        style={{ top: 20 }}
        bodyStyle={{
          maxHeight: 'calc(100vh - 150px)',
          overflowY: 'auto',
        }}
        title={null}
        visible={isModalPayment}
        onCancel={() => setIsModalPayment(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalPayment(false)}>
            Close
          </Button>,
          <Button key="download" onClick={paymentDownloadPDF} className="text-white bg-brand">
            Download PDF
          </Button>,
        ]}
        width={800}
      >
        <PaymentTemplate DATA={object} ref={PatientPayment} />
      </Modal>
      <div className="relative">
        <Spin
          spinning={loading}
          tip="Loading..."
          className="absolute inset-0 flex items-center justify-center"
        >
          <Table
            bordered
            columns={columns}
            dataSource={data}
            pagination={{
              current: pageIndex,
              pageSize: 10,
              total: totalRecords,
              showSizeChanger: false,
              showTotal: (total) => `Showing ${total} entries`,
            }}
            onChange={handleTableChange}
            scroll={{ x: '100%' }}
            className="w-full"
          />
        </Spin>
      </div>
    </div>
  );
};

export default ReusableTable;
