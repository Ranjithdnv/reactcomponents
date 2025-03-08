import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import doctorImage from '../assets/images/searchdoctor.png';
import bgDeco from '../assets/images/Background Deco.png';
import InputField from './InputField';
import ChoiceField from './choiceField';
import { sendOtpToAdminApi } from '../apis/sendOtpToAdminApi';
import { loginApi } from '../apis/loginApi';
import leftZigZag from '../assets/images/leftZigZagPurple.png';
import rightZigZag from '../assets/images/rightZigZagGreen.png';
import { DatePicker } from 'antd';
import AboutUsHero from '../modules/AboutUs/AboutUsHero';
import CancelTermsModal from './CancelTerms';
import DrImage from '../assets/images/div.elementor-widget-wrap 1.png';
import NoImage from '../assets/images/noimage.png';
import thumbImg from '../assets/images/thumb.png';
import { getAvailableTimeslots } from '../apis/doctorTimeslots';
import { bookAppointmentApi } from '../apis/bookAppointment';
import TextField from '../components/textAreaField';
import DatePickerField from '../components/DatePickerField';
import axios from 'axios';
import { endpoints } from '../constants';
import { Card } from 'antd';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import SearchComponent from './SearchComponent';
import axiosInstance from '../apis/axios';
import decoLeft from '../assets/images/decoLeft.png';
import decoRight from '../assets/images/decoRight.png';
import { FaCheckCircle } from 'react-icons/fa';
import { enqueueSnackbar } from 'notistack';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAuth } from '../utils/authProvider';
import { getCityList } from '../apis/coreCityApi';
import { Pagination, Modal } from 'antd';
import moment from 'moment';
import { sendOtpApi } from '../apis/sendOtp';
import Checkbox from '../rancomponents/checkbox/checkbox';
// #04816A -Green
// #3c00be - purple
const SearchDoctor = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [fetchdataRelativeInfo, setfetchdataRelativeInfo] = [];
  const [memberdetailstoNonLoginDataState, setMemberdetailstoNonLoginDataState] = useState(false);
  const [familyOpen, setfamilyOpen] = useState(false);
  const [family, setFamily] = useState([]);
  const [memberExistedUseSecondBooking, setMemberExistedUseSecondBooking] = useState(false);
  const [existingUserCb, setExistingUserCb] = useState(false);
  const [otpforchange, setOtpForChange] = useState('');

  const [otpforVerify, setOtpForVerify] = useState('');
  //
  const [formDataInputForNewUser, setFormDataInputForNewUser] = useState({
    username: '',
    secondName: '',
    surname: '',
    gender: '',
    dateOfBirth: '',
    age: '',
    ageUnit: 'years', // Added ageUnit to state
    contact_number: '',
    contact_number2: '',
    email: '',
    password: '',
    confirmPassword: '',
    guardianRelation: '',
    guardianName: '',
    address: '',
  });

  const [dateCheckbox, setDdteCheckbox] = useState(true);

  const [errors, setErrors] = useState({});
  //

  const handleFormDataInputForNewUser = useCallback(
    async (event) => {
      const { name, value } = event.target;
      let error = '';
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (name === 'email' && value !== '' && !emailPattern.test(value)) {
        error = 'Invalid email';
      }

      const contactPattern = /^\+91 \d{10}$/;
      if (name === 'contact_number' && !contactPattern.test(value)) {
        error = 'Invalid contact number';
      }

      const namePattern = /^[a-zA-Z ]{2,}$/;
      if (name === 'username' && !namePattern.test(value)) {
        error = 'Invalid Name';
      }

      const lastnamePattern = /^[a-zA-Z ]{1,}$/;
      if (name === 'surname' && !lastnamePattern.test(value)) {
        error = 'Invalid Surname';
      }

      const lastnamePattern1 = /^[a-zA-Z ]{1,}$/;
      if (name === 'guardianName' && !lastnamePattern1.test(value)) {
        error = 'Invalid Guardian Name';
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));

      if (name === 'pincode') {
        const numericValue = value.replace(/[^0-9]/g, '').trim();
        setFormDataInputForNewUser((prevValues) => ({
          ...prevValues,
          [name]: numericValue,
        }));
      } else if (name === 'contact_number') {
        let cleanValue = value.replace(/[^0-9]/g, '').trim();

        if (cleanValue.startsWith('91')) {
          cleanValue = `+91 ${cleanValue.slice(2)}`;
        } else if (!cleanValue.startsWith('+91')) {
          cleanValue = `+91 ${cleanValue}`;
        }

        if (cleanValue.length <= 14) {
          setFormDataInputForNewUser((prevValues) => ({
            ...prevValues,
            [name]: cleanValue,
          }));
        }
      } else {
        setFormDataInputForNewUser((prevValues) => ({
          ...prevValues,
          [name]: value.replace(/^\s+/, '').replace(/\s+/g, ' '),
        }));
      }
    },
    [setErrors, setFormDataInputForNewUser]
  );
  // const handleFormDataInputForNewUser = useCallback(
  //   (e) => {
  //     const { name, value } = e.target;
  //     let error = '';

  //     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //     const contactPattern = /^\+91 \d{10}$/;
  //     const namePattern = /^[a-zA-Z ]{2,}$/;
  //     const lastnamePattern = /^[a-zA-Z ]{1,}$/;
  //     const simpleEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //     // Validation
  //     if (name === 'contact_number' || name === 'contact_number2') {
  //       let cleanValue = value.replace(/[^0-9]/g, '').trim();

  //       if (cleanValue.startsWith('91')) {
  //         cleanValue = `+91 ${cleanValue.slice(2)}`;
  //       } else if (!cleanValue.startsWith('+91')) {
  //         cleanValue = `+91 ${cleanValue}`;
  //       }

  //       if (!contactPattern.test(cleanValue)) {
  //         error = 'Invalid phone number ';
  //       }

  //       if (cleanValue.length <= 14) {
  //         setFormDataInputForNewUser((prevData) => ({
  //           ...prevData,
  //           [name]: cleanValue,
  //         }));
  //       }
  //     } else if (name === 'email' && !simpleEmailPattern.test(value)) {
  //       error = 'Invalid email format';
  //     } else if (name === 'username' && !namePattern.test(value)) {
  //       error = 'Invalid username';
  //     } else if (name === 'surname' && !lastnamePattern.test(value)) {
  //       error = 'Invalid surname';
  //     }

  //     // Update Errors
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       [name]: error,
  //     }));

  //     // Update Values if no error
  //     if (!error && name !== 'contact_number' && name !== 'contact_number2') {
  //       setFormDataInputForNewUser((prevData) => ({
  //         ...prevData,
  //         [name]: value.replace(/\s+/g, ' ').trim(),
  //       }));
  //     }
  //   },
  //   [setErrors, setFormDataInputForNewUser]
  // );

  const handleformDatatononLoginUserValue = (e) => {
    setNonLoginUserValue(formDataInputForNewUser);
    console.log(nonLoginUserValue, 'nonlogin');
    console.log(formDataInputForNewUser);
    //adding to loginuservalue
  };

  const memberdetailstoNonLoginData = (member) => {
    console.log('memtertononlogin');
    console.log(member);
    console.log(nonLoginUserValue);
    setMemberExistedUseSecondBooking(true);

    setNonLoginUserValue(member);
  };
  const changeapicallifmemberexisted = () => {
    console.log('confirmed');
    if (memberExistedUseSecondBooking) {
      console.log('changeapicallifmemberexisted ddddddddddddddddddddd');
      bookAppointmentHandler2();
    } else {
      bookAppointmentHandler();
    }
  };

  const [signupOpenCheckbox, setsignupOpenCheckbox] = useState(false);
  const [sendotpdata, setsendotpdata] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [reSendOtoBtn, setreSendOtoBtn] = useState(false);
  const [otpBtn, setOtpBtn] = useState(true);
  const [save, setsave] = useState(false);
  const [formData, setFormData] = useState({
    phone_no: '',
  });
  const [verifyOpenBtn, setverifyOpenBtn] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [dates, setDates] = useState([]);
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isNewConfirmed, setIsNewConfirmed] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  let auth = useAuth();
  const [values, setValues] = useState({
    amount: null,
    payment_mode: '',
  });
  useEffect(() => {
    console.log('auth', auth);
  }, [auth]);
  const [titleOptions, setTitleOptions] = useState([
    { label: 'Select Title', value: '' },
    { label: 'Baby', value: 'Baby' },
    { label: 'Baby Of', value: 'Baby Of' },
    { label: 'Mr.', value: 'Mr.' },
    { label: 'Ms.', value: 'Ms.' },
    { label: 'Mrs.', value: 'Mrs.' },
  ]);

  const [nonLoginUserValue, setNonLoginUserValue] = useState({});
  const [leadSourceOptions, setLeadSourceOptions] = useState([
    { label: 'Select lead source', value: '' },
    { label: 'Friends and Family', value: 'Friends and Family' },
    { label: 'Social Media', value: 'Social Media' },
    { label: 'News paper', value: 'News paper' },
    { label: 'Other', value: 'Other' },
  ]);
  const [valuesPatient, setValuesPatient] = useState({
    title: '',
    username: '',
    surname: '',
    guardian_name: '',
    guardian_relation: '',
    age: { value: '', unit: 'years' },
    dob: '',
    contact_number: '+91 ',
    address: '',
    // insurance_provider_id: '',
    // abha_number: '',
    // insuranace_provider_name: '',
    // pincode: '',
    gender: '',
    marital_status: '',
    referral: '',
    lead_source: '',
    // password: '',
    // confirm_password: '',
  });
  const [isDateOfBirth, setIsDateOfBirth] = useState(true);
  const getPatientAge = (nonLoginUser, authUser) => {
    console.log(nonLoginUser.age);
    // console.log('Non-login User DOB:', nonLoginUser?.dob);
    // console.log('Non-login User Age:', nonLoginUser?.age);
    // console.log('Auth User Age:', authUser?.age);

    if (nonLoginUser?.age && nonLoginUser?.age.unit) {
      // console.log('Using Non-login User Age:', nonLoginUser.age);
      console.log(`${nonLoginUser.age.value} ${nonLoginUser.age.unit}`);
      return `${nonLoginUser.age.value} ${nonLoginUser.age.unit}`;
    }

    // Case 2: If nonLoginUser has a DOB, calculate age
    if (nonLoginUser?.dob) {
      const age = calculateAge(nonLoginUser.dob);
      // console.log('Calculated Age from DOB:', age);
      return age;
    }

    if (authUser?.age) {
      return `${authUser.age} Years`;
    }
    return 'N/A';
  };

  const calculateAge = (dob) => {
    if (!dob) return 'N/A';

    const birthDate = moment(dob);
    const currentDate = moment();
    const age = currentDate.diff(birthDate, 'years');

    console.log(`Age calculation for DOB ${dob}: ${age} years`);
    return `${age} years`;
  };

  const handleAgeValueChange = (event) => {
    const { value } = event.target;

    setValuesPatient((prevValues) => ({
      ...prevValues,
      age: {
        ...prevValues.age,
        value: value,
      },
    }));
  };
  const handleAgeUnitChange = (event) => {
    const { value } = event.target;
    setFormDataInputForNewUser((prevValues) => ({
      ...prevValues,
      ageUnit: value, // Update age unit in state
    }));
  };
  const handleDobDateChange = (name, date) => {
    handlePatientInputChange({
      target: {
        name,
        value: moment(date).format('YYYY-MM-DD'),
      },
    });
  };
  const handlePatientInputChange = useCallback(
    async (event) => {
      const { name, value } = event.target;
      let error = '';

      const validateInsuranceProviderID = (id) => {
        const namePattern = /^.{5,}$/;
        return id !== '' && !namePattern.test(id) ? 'Invalid insurance provider ID' : '';
      };
      const IDPattern = /^.{10,}$/;
      if (name === 'identity_number' && !IDPattern.test(value)) {
        error = 'Invalid identity number';
      }

      if (name === 'insurance_provider_id') {
        error = validateInsuranceProviderID(value);
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));

      if (name === 'pincode') {
        const numericValue = value.replace(/[^0-9]/g, '').trim();
        setValuesPatient((prevValues) => ({
          ...prevValues,
          [name]: numericValue,
        }));
      } else if (name === 'contact_number') {
        let cleanValue = value.replace(/[^0-9]/g, '').trim();

        if (cleanValue.startsWith('91')) {
          cleanValue = `+91 ${cleanValue.slice(2)}`;
        } else if (!cleanValue.startsWith('+91')) {
          cleanValue = `+91 ${cleanValue}`;
        }

        if (cleanValue.length <= 14) {
          setValuesPatient((prevValues) => ({
            ...prevValues,
            [name]: cleanValue,
          }));
        }
      } else {
        setValuesPatient((prevValues) => ({
          ...prevValues,
          [name]: value.replace(/^\s+/, '').replace(/\s+/g, ' '),
        }));
      }
    },
    [setErrors, setValuesPatient]
  );
  const [paymentOptions, setPaymentOptions] = useState([
    { label: 'Select payment mode', value: '' },
    { label: 'UPI', value: 'UPI' },
    { label: 'Card', value: 'Card' },
  ]);

  useEffect(() => {
    console.log('auth', auth);
  }, [auth]);

  const genderOptions = [
    { label: 'Choose an option', value: '' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Prefer not to say', value: 'Prefer not to say' },
  ];

  const guardianRelation = [
    { label: 'Select guardian relation', value: '' },
    { label: 'Father', value: 'Father' },
    { label: 'Mother', value: 'Mother' },
    { label: 'Brother', value: 'Brother' },
    { label: 'Sister', value: 'Sister' },
    { label: 'Grandparents', value: 'Grandparents' },
    { label: 'Others', value: 'Others' },
  ];

  const handleInputChange = useCallback(
    (event) => {
      console.log(values, 'values');
      setValues({
        ...values,
        [event.target.name]: event.target.value.replace(/^\s+/, ''),
      });
    },
    [values]
  );

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const response = await getCityList();
        // Extract cities from the results array
        const cityData = response?.data?.results || [];
        setCities(cityData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);
  const baseRequiredFields = [
    { name: 'title', label: 'Title' },
    { name: 'username', label: 'Patient Name' },
    { name: 'surname', label: 'Surname' },
    { name: 'gender', label: 'Gender' },
    { name: 'contact_number', label: 'Contact Number' },
    // { name: 'password', label: 'Password' },
    // { name: 'confirm_password', label: 'Confirm Password' },
  ];

  const handleProceedToPay = (e) => {
    e.preventDefault();

    let requiredFields = [...baseRequiredFields];

    if (valuesPatient.title === 'Baby') {
      requiredFields.push(
        { name: 'guardian_name', label: 'Guardian Name' },
        { name: 'guardian_relation', label: 'Guardian Relation' }
      );
    } else if (valuesPatient.title === 'Baby Of') {
      requiredFields.push({ name: 'guardian_relation', label: 'Guardian Relation' });
    }

    let newErrors = {};

    requiredFields.forEach((field) => {
      if (!valuesPatient[field.name] || valuesPatient[field.name].trim() === '') {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (!valuesPatient.contact_number || valuesPatient.contact_number.length < 9) {
      newErrors.contact_number = 'Invalid Contact Number';
    }

    if (!valuesPatient.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (isDateOfBirth) {
      if (!valuesPatient.dob) {
        newErrors.dob = 'Date of Birth is required';
      }
    } else {
      if (!valuesPatient.age?.value || valuesPatient.age?.value === '') {
        newErrors.age = 'Age is required';
      }
    }

    if (valuesPatient.insurance_provider_id && !valuesPatient.insuranace_provider_name) {
      newErrors.insuranace_provider_name = 'Provider name is required when provider ID is provided';
    }

    // if (valuesPatient.password !== valuesPatient.confirm_password) {
    //   newErrors.confirm_password = 'Password is not matching';
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      enqueueSnackbar('Please fill all required fields correctly', { variant: 'error' });
      return;
    }

    setErrors({});
    setNonLoginUserValue(valuesPatient);
    setIsPatientModal(false);
    // setIsModalOpen1(true);
  };

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isPatientModal, setIsPatientModal] = useState(false);

  const handleTermsModalOpen = () => {
    setIsTermsModalOpen(true);
  };

  const handleTermsModalClose = () => {
    setIsTermsModalOpen(false);
  };

  const handleFaqClick = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleCardExpand = async (doctorId) => {
    if (expandedCard === doctorId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(doctorId);
      console.log('Selected doctorId:', doctorId);
      setSelectedSlotID(null);
      setSelectedDate(null);
      setTimeSlots({});
      setSelectedSlot({ token_number: '', time: '' });
      setExistingUserCb(false);
      setsignupOpenCheckbox(false);
      setNonLoginUserValue({});
      setMemberExistedUseSecondBooking(false);
      setsave(false);
      setOtpForChange('');
      setOtpForVerify('');
      setFormDataInputForNewUser({
        username: '',
        title: '',
        secondName: '',
        surname: '',
        gender: '',
        dateOfBirth: '',
        age: '',
        contact_number: '',
        contact_number2: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
      });
      setverifyOpenBtn(false);
    }
  };
  const [maritalOptions, setMaritalOptions] = useState([
    { label: 'Select Marital Status', value: '' },
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Prefer not to say', value: 'Other' },
  ]);
  const handleNextDates = () => {
    if (currentDateIndex < dates.length - 2) {
      setCurrentDateIndex(currentDateIndex + 1);
    }
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    console.log('Selected Date:', formattedDate);
  };

  const handleFormSubmit = async () => {
    const ageCalculation = () => {
      if (!valuesPatient.dob) return null;
      const age = moment().diff(moment(valuesPatient.dob), 'years');
      return `${age} years`;
    };

    let payload = {
      user: {
        first_name: valuesPatient.username,
        last_name: valuesPatient.surname,
        username: valuesPatient.username,
        surname: valuesPatient.surname,
        phone_no: valuesPatient.contact_number,
        address: valuesPatient.address,
        dob: valuesPatient.dob ? valuesPatient.dob : 'YYYY-MM-DD',
        gender: valuesPatient.gender,
      },
      title: valuesPatient.title,
      guardian_name: valuesPatient.guardian_name,
      guardian_relation: valuesPatient.guardian_relation || 'Self',
      age: valuesPatient.age?.value
        ? `${valuesPatient.age.value} ${valuesPatient.age.unit || 'years'}`
        : ageCalculation(),
      marital_status: valuesPatient.marital_status,
      lead_source: valuesPatient.lead_source,
      registered_as: 'Medfidelity',
      doctor_id: selectedDoctorId,
      doctor_slot: selectedSlotID,
      slot: selectedSlot.time,
      mode: mode,
      payment_type: values.payment_mode,
      payment_status: 'Successful',
      amount: values.amount,
      date: selectedDate,
      token_number: selectedSlot.token_number,
      hospital: doctors?.[0]?.hospital?.id || null,
    };
    console.log('payload', payload);

    axiosInstance
      .post(`/patient/patient-creation/`, payload)
      .then((response) => {
        enqueueSnackbar('New Patient Created Successfully', {
          variant: 'success',
        });
        setSelectedSlot({ token_number: '', time: '' });
        setSelectedSlotID(null);
        setSelectedDoctorId(null);
        setTimeSlots({});
        setValues({ payment_mode: '', amount: '' });
        setSelectedDate(null);
        setIsModalOpen(false);
        setIsModalOpen1(false);
        setExistingUserCb(false);
        setErrors({});
        setIsPatientModal(false);
        setIsConfirmed(false);
        setFamily([]);
        setfamilyOpen(false);
        setIsNewConfirmed(false);
        setValuesPatient({
          title: '',
          username: '',
          surname: '',
          guardian_name: '',
          guardian_relation: '',
          age: { value: '', unit: 'years' },
          dob: '',
          contact_number: '+91 ',
          address: '',
          // insurance_provider_id: '',
          // abha_number: '',
          // insuranace_provider_name: '',
          // pincode: '',
          gender: '',
          marital_status: '',
          referral: '',
          lead_source: '',
        });
        setFamily([]);
        setfamilyOpen(false);
      })
      .catch((error) => {
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
          enqueueSnackbar('Something went wrong, please try again.', {
            variant: 'error',
          });
        }
      });
  };

  const sendOtphandler = async () => {
    try {
      console.log(otpforchange);
      console.log(typeof otp); // Check the type

      // Replace with the actual phone number input state
      let trimmedPhoneNumber = otpforchange.trim(); // Remove unnecessary spaces

      // Ensure the number starts with "+91"
      if (!trimmedPhoneNumber.startsWith('+91')) {
        trimmedPhoneNumber = `+91 ${trimmedPhoneNumber}`;
      }

      console.log('sendotptry');
      // const trimmedPhoneNumber = `+91 ${otpforchange}`; // Example phone number
      // //let trimmedPhoneNumber = formData.phone_no.replace(/\s+/g, '');
      // if (!trimmedPhoneNumber.startsWith('+91 ')) {
      //   trimmedPhoneNumber = `+91 ${trimmedPhoneNumber}`;
      // }

      // Call the API function with the phone number
      const otpSentResponse = await sendOtpToAdminApi(trimmedPhoneNumber);

      console.log(otpSentResponse);
      console.log(otpSentResponse.data.data.otp);
      setsendotpdata(otpSentResponse.data.data.otp);
      console.log(sendotpdata);
      localStorage.setItem;
      //const response = await sendOtpApi({ phoneNumber });

      // enqueueSnackbar('OTP sent successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error sending OTP:', error);
      enqueueSnackbar('Failed to send OTP', { variant: 'error' });
    }
  };
  const verifyOtphandler = async () => {
    console.log(sendotpdata);
    console.log(otpforVerify, 'OTPVERIFY');

    console.log(otpforchange, 'OTPVERIFY');

    try {
      // Replace with the actual phone number input state

      console.log('verifyotptry');
      // const trimmedPhoneNumber = '+91 9390083894'; // Example phone number
      // //let trimmedPhoneNumber = formData.phone_no.replace(/\s+/g, '');
      // if (!trimmedPhoneNumber.startsWith('+91 ')) {
      //   trimmedPhoneNumber = `+91 ${trimmedPhoneNumber}`;
      // }

      // Call the API function with the phone number
      //   console.log('info', userInfoID);
      let trimmedPhoneNumber = otpforchange.trim(); // Remove unnecessary spaces

      // Ensure the number starts with "+91"
      if (!trimmedPhoneNumber.startsWith('+91')) {
        trimmedPhoneNumber = `+91 ${trimmedPhoneNumber}`;
      }
      let payload = {
        username: trimmedPhoneNumber,
        otp: otpforVerify,
      };

      // if (userInfoID) {
      //   payload.data = {
      //     user_id: userInfoID,
      //     accepted: 1,
      //   };
      // }

      // console.log("PAYLOAD",payload)
      const response = await loginApi(payload);
      console.log(response, 'Response from verify otp');
      const userId = response.data.user_data.id;
      console.log(userId, ' ID FROM OTP');
      console.log(response.data.user_data, ' ID FROM OTP_1');
      //  const response = await sendOtpApi({ phoneNumber });
      console.log('OTP sent successfully:', response.data);
      console.log('OTP sent successfully:', response.data.access_token);
      console.log(typeof response.status);
      if (response.status == 200) {
        console.log(response.status);
        setfamilyOpen(true);
        fetchData();
      }
      if (!verifyOpenBtn) {
        localStorage.setItem('token', response.data.access_token);
        console.log('Token set in local storage:', response.data.access_token);
      }

      // enqueueSnackbar('login successfully', { variant: 'success' });
    } catch (error) {
      console.error('Error sending OTP:', error);
      enqueueSnackbar('Failed to send OTP', { variant: 'error' });
    }
  };

  // const phoneNumber = '+91 9390083894';

  // ✅ Removed `familyOpen` and `family`, only necessary dependencies

  // ✅ UseEffect to trigger fetchData when `familyOpen` changes
  // const fetchData = useCallback(async () => {
  //   let trimmedPhoneNumber = otpforchange.trim();
  //   let phoneNumber = trimmedPhoneNumber;

  //   if (!trimmedPhoneNumber.startsWith('+91')) {
  //     phoneNumber = `+91 ${trimmedPhoneNumber}`;
  //   }

  //   try {
  //     const params = {
  //       contact_number: phoneNumber,
  //       page: pageIndex + 1,
  //     };

  //     const response = await axiosInstance.get(`${endpoints.AddPatientUrl}`, { params });
  //     console.log(response, 'Response Data');

  //     const patientRecords = response.data.results.data.patients_records;
  //     console.log(patientRecords, 'New Patient Records');

  //     // Use functional state update to prevent stale closures
  //     //setFamily((prevFamily) => [...prevFamily, ...patientRecords]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (familyOpen) {
  //     fetchData();
  //     console.log('familyopened');
  //   }
  // }, [familyOpen]); // ✅ Calls fetchData whenever `familyOpen` changes
  const fetchData = useCallback(async () => {
    let trimmedPhoneNumber = otpforchange.trim();
    let phoneNumber = trimmedPhoneNumber;

    if (!trimmedPhoneNumber.startsWith('+91')) {
      phoneNumber = `+91 ${trimmedPhoneNumber}`;
    }

    try {
      const params = {
        contact_number: phoneNumber,
        page: pageIndex + 1,
      };

      const response = await axiosInstance.get(`${endpoints.AddPatientUrl}`, { params });
      console.log(response, 'Response Data');

      const patientRecords = response.data.results.data.patients_records;
      console.log(patientRecords, 'New Patient Records');

      // Use functional state update to prevent stale closures
      setFamily((prevFamily) => [...prevFamily, ...patientRecords]);
    } catch (error) {
      console.error(error);
    }
  }, [otpforchange, pageIndex]);
  // ✅ Removed `familyOpen` and `family`, only necessary dependencies

  // ✅ UseEffect runs fetchData when `familyOpen` becomes `true`
  useEffect(() => {
    if (familyOpen) {
      console.log('familyOpen changed: Fetching data...');
      // fetchData();
    }
  }, [familyOpen]); // ✅ Triggers only when `familyOpen` changes

  const startCountdown = () => {
    setCountdown(10); // Start at 10 seconds

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval); // Stop when countdown reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formInputHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handlePrevDates = () => {
    if (currentDateIndex > 0) {
      setCurrentDateIndex(currentDateIndex - 1);
    }
  };

  const getDayName = (date) => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return dayNames[date.getDay()];
  };

  const getFormattedDay = (date) => {
    return date.getDate();
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Generate next 7 days starting from current date
    const generateDates = () => {
      const today = new Date();
      const nextDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return date;
      });
      setDates(nextDates);
    };
    generateDates();
  }, []);

  // const handleDateChange = (date, dateString) => {
  //   setSelectedDate(dateString);
  //   if (expandedCard) {
  //     fetchAvailableSlots(expandedCard, dateString);
  //   }
  // };
  useEffect(() => {
    const fetchAmountData = async () => {
      if (isModalOpen && selectedDoctorId && values.payment_mode) {
        try {
          const response = await axiosInstance.get(`${endpoints.GetAmountUrl}`, {
            params: { mode: 'Offline', doctor_id: selectedDoctorId },
          });

          const data = response.data;

          setValues((prevValues) => ({
            ...prevValues,
            amount: data.doctor_fee,
            // registration_amount: data.registration_fee,
          }));
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchAmountData();
  }, [isModalOpen, selectedDoctorId, values.payment_mode]);
  useEffect(() => {
    const fetchAmountData = async () => {
      if (isModalOpen1 && selectedDoctorId && values.payment_mode) {
        try {
          const response = await axiosInstance.get(`${endpoints.GetAmountUrl}`, {
            params: { mode: 'Offline', doctor_id: selectedDoctorId },
          });

          const data = response.data;

          setValues((prevValues) => ({
            ...prevValues,
            amount: data.doctor_fee,
            // registration_amount: data.registration_fee,
          }));
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchAmountData();
  }, [isModalOpen1, selectedDoctorId, values.payment_mode]);
  // useEffect(() => {
  //   console.log('doctors.hospital.name', doctors[0].hospital.name);
  // }, [doctors]);

  const [mode, setMode] = useState('Online Approach');
  const [selectedSlot, setSelectedSlot] = useState({
    token_number: '',
    time: '',
  });

  const [selectedSlotID, setSelectedSlotID] = useState(null);

  const fetchAvailableSlots = async (doctorId) => {
    setLoadingSlots(true);
    setSelectedDoctorId(doctorId);

    try {
      const response = await getAvailableTimeslots({
        bookingDate: selectedDate,
        doctorId: doctorId,
        mode: mode,
      });

      console.log('Response:', response?.data);

      if (response?.data?.data?.length > 0) {
        const slotData = response.data.data[0]?.slots_for_date || {};
        const doctorIdFromResponse = response.data.data[0]?.id;

        console.log('Slots Data:', slotData);
        console.log('Setting selected slot:', {
          id: doctorIdFromResponse,
        });

        // Correct state update for single value
        setSelectedSlotID(doctorIdFromResponse);

        setTimeSlots(slotData);
      } else {
        setTimeSlots({});
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      setTimeSlots({});
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (expandedCard && selectedDate && mode) {
      fetchAvailableSlots(expandedCard);
    }
  }, [selectedDate, mode]);

  //////////////
  const bookAppointmentHandler2 = async () => {
    if (!values.payment_mode) {
      enqueueSnackbar('Payment mode is required', { variant: 'error' });
      return;
    }

    // if (!auth.user.id) {
    //   enqueueSnackbar('No patient selected', { variant: 'error' });
    //   return;
    // }
    const ageCalculation = () => {
      if (!valuesPatient.dob) return null;
      const age = moment().diff(moment(valuesPatient.dob), 'years');
      return `${age} years`;
    };

    console.log('selectedSlotID:', selectedSlotID);

    let currentDate = moment().format('YYYY-MM-DD');

    let payload_A = {
      patient_id: nonLoginUserValue.id, //'a1ef5875-7053-435a-8259-90d99df18eb5',
      hospital: doctors[0].hospital.id,
      doctor_id: selectedDoctorId,
      doctor_slot: selectedSlotID,
      // hospital: '0cfbd4ac-5a69-4299-8c33-d105587681f4',
      // doctor_id: '1c0eef3f-7662-4476-a167-0f7ecbc57a48',
      // doctor_slot: 'f96a9b64-e131-49c8-87d8-8c127b989b8b',
      token_number: 'A15',
      slot: selectedSlot.time,
      mode: 'Direct Approach',
      payment_type: 'Card',
      amount: 1000,
      payment_status: 'Successful',
      date: selectedDate,
    };
    axiosInstance

      .post(`/patient/patient-creation/`, payload_A)
      .then((response) => {
        console.log('succes');
        enqueueSnackbar('Appointment booked successfully', { variant: 'success' });
        setSelectedSlot({ token_number: '', time: '' });
        setSelectedSlotID(null);
        setSelectedDoctorId(null);
        setFamily([]);
        setfamilyOpen(false);
        setErrors({});
        setExistingUserCb(false);
        setTimeSlots({});
        setValues({ payment_mode: '', amount: '' });
        setSelectedDate(null);
        setIsModalOpen(false);
        setIsModalOpen1(false);
        setIsPatientModal(false);
        setIsConfirmed(false);
        setIsNewConfirmed(false);
        setValuesPatient({
          title: '',
          username: '',
          surname: '',
          guardian_name: '',
          guardian_relation: '',
          age: { value: '', unit: 'years' },
          dob: '',
          contact_number: '+91 ',
          address: '',
          // insurance_provider_id: '',
          // abha_number: '',
          // insuranace_provider_name: '',
          // pincode: '',
          gender: '',
          marital_status: '',
          referral: '',
          lead_source: '',
        });
        setFormDataInputForNewUser({
          username: '',
          title: '',
          secondName: '',
          surname: '',
          gender: '',
          dateOfBirth: '',
          age: '',
          contact_number: '',
          contact_number2: '',
          email: '',
          password: '',
          confirmPassword: '',
          address: '',
        });
        setNonLoginUserValue({});
      })
      .catch((error) => {
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
          enqueueSnackbar('Something went wrong, please try again.', {
            variant: 'error',
          });
        }
      });
  };

  //////////////
  const bookAppointmentHandler = async () => {
    if (!values.payment_mode) {
      enqueueSnackbar('Payment mode is required', { variant: 'error' });
      return;
    }

    // if (!auth.user.id) {
    //   enqueueSnackbar('No patient selected', { variant: 'error' });
    //   return;
    // }
    // const ageCalculation = () => {
    //   if (!nonLoginUserValue.age) return null;
    //   const dob = moment().diff(moment(nonLoginUserValue.age), 'years');
    //   return `${ag} years`;
    // };
    let currentDate = moment().format('YYYY-MM-DD');
    if (!nonLoginUserValue.age) {
      console.log(0);
    }

    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - parseInt(nonLoginUserValue.age, 10); // Calculate birth year

    // Format the date as "yyyy-mm-dd"

    // let payload = {
    //   ...(ID && { patient_id: ID }),
    //   date: selectedDate,
    //   slot: selectedSlot.time,
    //   doctor_id: selectedDoctorId,
    //   hospital: doctors[0].hospital.id,
    //   mode: mode,
    //   payment_type: values.payment_mode,
    //   amount: values.amount,
    //   payment_status: 'Successful',
    //   doctor_slot: selectedSlotID,
    //   token_number: selectedSlot.token_number,
    //   phone_no: valuesPatient?.contact_number,
    // };
    const ID = auth.user.id || '';

    let authPayload = {
      ...(ID && { patient_id: ID }),
      date: selectedDate,
      slot: selectedSlot.time,
      doctor_id: selectedDoctorId,
      hospital: doctors[0].hospital.id,
      mode: mode,
      payment_type: values.payment_mode,
      amount: values.amount,
      payment_status: 'Successful',
      doctor_slot: selectedSlotID,
      token_number: selectedSlot.token_number,
      phone_no: valuesPatient?.contact_number,
    };

    const ageCalculation = () => {
      if (nonLoginUserValue.age) {
        const currentDate = moment().format('YYYY-MM-DD'); // Current date
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - parseInt(nonLoginUserValue.age, 10); // Calculate birth year
        const dob = `${birthYear}-01-01`; // Defaulting to January 1st

        //    console.log('selectedSlotID:', selectedSlotID); // Debug log for slot ID

        // You can use this ID as needed

        return dob;
      } else {
        return nonLoginUserValue.dateOfBirth; // Return dateOfBirth if age doesn't exist
      }
    };
    const ageCalculationNew = () => {
      if (!formDataInputForNewUser.dateOfBirth) return null;
      const age = moment().diff(moment(formDataInputForNewUser.dateOfBirth), 'years');
      return `${age} years`;
    };
    console.log({
      address: nonLoginUserValue.address,

      dob: ageCalculation(),
      age: nonLoginUserValue.age,
      confirmPassword: '',
      // contact_number: '+91 9399083895',
      contact_number2: nonLoginUserValue?.contact_number2,
      //dateOfBirth: '1999-02-15',
      email: nonLoginUserValue?.email,
      gender: nonLoginUserValue.gender, // Update to a valid choice if needed
      password: '',
      secondName: nonLoginUserValue.secondName,
      surname: nonLoginUserValue.surname,
      username: nonLoginUserValue.username,
      phone_no: nonLoginUserValue?.contact_number,
      guardian_name: formDataInputForNewUser.guardianName,
      guardian_relation: formDataInputForNewUser.guardianRelation || 'Self', // Added as required field
    });
    console.log(ageCalculationNew(), 'ageeeeeeeeeeeeeeeeeee');

    let payload = {
      user: {
        address: formDataInputForNewUser.address,
        dob: formDataInputForNewUser.dateOfBirth || currentDate,
        contact_number: formDataInputForNewUser.contact_number,
        ...(formDataInputForNewUser?.email && { email: formDataInputForNewUser.email }),
        gender: formDataInputForNewUser.gender,
        age: formDataInputForNewUser.age
          ? `${formDataInputForNewUser.age} ${formDataInputForNewUser.ageUnit || 'years'}`
          : ageCalculationNew(),
        guardian_name: formDataInputForNewUser?.guardianName,
        surname: formDataInputForNewUser.surname,
        username: formDataInputForNewUser.username,
        phone_no: formDataInputForNewUser?.contact_number,
        first_name: formDataInputForNewUser?.username || formDataInputForNewUser?.guardianName, //changed
        last_name: formDataInputForNewUser?.surname,
        role: 'Patient',
        is_phone_verified: 1,
        is_otp_verified: 1,
      },

      guardian_relation: formDataInputForNewUser.guardianRelation || 'Self',
      hospital: doctors[0].hospital.id,
      doctor_id: selectedDoctorId,
      doctor_slot: selectedSlotID,
      title: formDataInputForNewUser?.title,
      token_number: selectedSlot.token_number,
      slot: selectedSlot.time,
      mode: mode,
      payment_type: values.payment_mode,
      amount: values.amount,
      payment_status: 'Successful',
      date: selectedDate,
    };

    // let payload = {
    //   user: {
    //     ...(ID && { patient_id: ID }),
    //     title: valuesPatient?.title,
    //     username: valuesPatient?.username,
    //     surname: valuesPatient?.surname,
    //     age: valuesPatient.age?.value
    //       ? `${valuesPatient.age.value} ${valuesPatient.age.unit || 'years'}`
    //       : ageCalculation(),
    //     gender: valuesPatient?.gender,
    //     phone_no: valuesPatient?.contact_number,
    //     first_name: valuesPatient?.username,
    //     last_name: valuesPatient?.surname,
    //     dob: valuesPatient.dob ? valuesPatient.dob : currentDate,
    //     role: 'Patient',
    //     is_phone_verified: 1,
    //     is_otp_verified: 1,
    //   },
    //   guardian_relation: valuesPatient?.guardian_relation,
    //   age: valuesPatient.age?.value
    //     ? `${valuesPatient.age.value} ${valuesPatient.age.unit || 'years'}`
    //     : ageCalculation(),
    //   hospital: doctors[0].hospital.id,
    //   doctor_id: selectedDoctorId,
    //   doctor_slot: selectedSlotID,
    //   title: valuesPatient?.title,
    //   token_number: selectedSlot.token_number,
    //   slot: selectedSlot.time,
    //   mode: mode,
    //   payment_type: values.payment_mode,
    //   amount: values.amount,
    //   payment_status: 'Successful',
    //   date: selectedDate,
    // };

    console.log('payload', payload);

    axiosInstance
      .post(`/patient/patient-creation/`, ID ? authPayload : payload)
      .then((response) => {
        console.log(response);
        enqueueSnackbar('Appointment booked successfully', { variant: 'success' });
        setSelectedSlot({ token_number: '', time: '' });
        setSelectedSlotID(null);
        setSelectedDoctorId(null);
        setTimeSlots({});
        setErrors({});
        setValues({ payment_mode: '', amount: '' });
        setSelectedDate(null);
        setIsModalOpen(false);
        setIsModalOpen1(false);
        setIsPatientModal(false);
        setExistingUserCb(false);
        setIsConfirmed(false);
        setIsNewConfirmed(false);
        setFamily([]);
        setfamilyOpen(false);
        setValuesPatient({
          title: '',
          username: '',
          surname: '',
          guardian_name: '',
          guardian_relation: '',
          age: { value: '', unit: 'years' },
          dob: '',
          contact_number: '+91 ',
          address: '',
          // insurance_provider_id: '',
          // abha_number: '',
          // insuranace_provider_name: '',
          // pincode: '',
          gender: '',
          marital_status: '',
          referral: '',
          lead_source: '',
        });
        setFormDataInputForNewUser({
          username: '',
          title: '',
          secondName: '',
          surname: '',
          gender: '',
          dateOfBirth: '',
          age: '',
          contact_number: '',
          contact_number2: '',
          email: '',
          password: '',
          confirmPassword: '',
          address: '',
        });
        setNonLoginUserValue({});
      })
      .catch((error) => {
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
          enqueueSnackbar('Something went wrong, please try again.', {
            variant: 'error',
          });
        }
      });
  };

  const handleSearchResults = (results) => {
    console.log('Search Results:', results);
    setDoctors(results);
  };

  const [filteredSlots, setFilteredSlots] = useState({
    morningSlots: [],
    afternoonSlots: [],
    eveningSlots: [],
  });

  const categorizeSlots = (slotsData) => {
    if (!slotsData || Object.keys(slotsData).length === 0) {
      return {
        morningSlots: [],
        afternoonSlots: [],
        eveningSlots: [],
      };
    }

    const slotCategories = {
      morningSlots: [],
      afternoonSlots: [],
      eveningSlots: [],
    };

    Object.entries(slotsData).forEach(([schedule, slotData]) => {
      if (slotData?.slots) {
        Object.entries(slotData.slots).forEach(([time, slot]) => {
          const hour = parseInt(time.split(':')[0], 10);

          // console.log('Slot Data:', slot);

          if (hour >= 6 && hour < 12) {
            slotCategories.morningSlots.push({ time, ...slot });
          } else if (hour >= 12 && hour < 17) {
            slotCategories.afternoonSlots.push({ time, ...slot });
          } else {
            slotCategories.eveningSlots.push({ time, ...slot });
          }
        });
      }
    });

    return slotCategories;
  };

  useEffect(() => {
    const categorized = categorizeSlots(timeSlots);
    setFilteredSlots(categorized);
  }, [timeSlots]);

  const [slotIndex, setSlotIndex] = useState(0);
  const slotsPerPage = 4;

  const slotContainerRef = useRef(null);

  const handleSlotSelection = (slotTime, slotData) => {
    setSelectedSlot({
      time: slotTime,
      token_number: slotData?.token_number,
    });
    setIsNewConfirmed(true);
    setIsConfirmed(true);
    if (auth?.user?.is_authenticated) {
      setIsPatientModal(false);
    } else {
      setIsPatientModal(true);
    }

    console.log(' Slot:', {
      time: slotTime,
      token_number: slotData?.token_number,
    });
  };

  const slotContainerRefMorning = useRef(null);
  const slotContainerRefAfternoon = useRef(null);
  const slotContainerRefEvening = useRef(null);

  const handleSlotNavigation = (direction, slotType) => {
    let ref;
    if (slotType === 'morning') ref = slotContainerRefMorning;
    else if (slotType === 'afternoon') ref = slotContainerRefAfternoon;
    else if (slotType === 'evening') ref = slotContainerRefEvening;

    if (ref?.current) {
      ref.current.scrollBy({
        left: direction === 'next' ? 120 : -120,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    console.log('filteredSlots:', filteredSlots);
  }, [filteredSlots]);

  const sliderStyles = `
    .date-slider-container {
      position: relative;
      width: 216px;
      overflow: hidden;
    }
    .date-slider {
      display: flex;
      transition: transform 0.3s ease-in-out;
      gap: 8px;
    }
    .date-button {
      flex: 0 0 auto;
      width: 64px;
      border: none;
      outline: none;
      background: transparent;
      cursor: pointer;
      padding: 8px 4px;
      border-radius: 8px;
      transition: all 0.2s ease-in-out;
    }
    .date-button:hover {
      background-color: #f3f4f6;
    }
    .date-button.selected {
      background-color: #3c00be;
      color: white;
    }
    .date-button .day-name {
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 2px;
    }
    .date-button .day-number {
      font-size: 18px;
      font-weight: 600;
    }
    .slider-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #666;
    }
    .slider-arrow:hover:not(:disabled) {
      background-color: #f3f4f6;
      color: #3c00be;
    }
    .slider-arrow:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  return (
    <div className="w-full bg-white pt-20 overflow-hidden relative">
      {/* Background Decoration */}
      <img src={leftZigZag} className="absolute left-0 top-[10%] w-20 z-20" />
      <img src={rightZigZag} className="absolute right-3 top-[3%] z-20 w-28" />
      <div className="mb-6">
        <span className="font-bold text-6xl mb-6">Search for Doctors</span>
      </div>
      <img
        src={doctorImage}
        alt="Healthcare Professional"
        className="relative z-10 w-[100%] h-[100%] mx-auto"
        style={{
          filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.08))',
        }}
      />
      <div className="relative">
        <img
          src={bgDeco}
          alt="background"
          className="w-full h-full object-cover absolute top-0 left-0 -z-10"
        />
        <div className="relative z-10">
          <div className="flex flex-col items-center justify-center pt-16 pb-8">
            <h1 className="text-4xl font-bold text-center mb-4 text-[#3c00be]">Find & Book</h1>
            <p className="text-lg text-center mb-8 text-[#04816A]">
              Search for your medical needs and book appointments with ease
            </p>
            <SearchComponent cities={cities} onSearch={handleSearchResults} />
          </div>
        </div>
      </div>
      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-6 max-w-[1300px] mx-auto px-4 py-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            // className={`bg-white rounded-lg shadow-lg relative transition-all duration-300 ${
            //   expandedCard === doctor.id ? 'row-span-2 scale-90' : 'h-[320px]'
            // }`}
            // className={`bg-white rounded-lg shadow-lg relative transition-all duration-300 ${
            //   signupOpenCheckbox && expandedCard === doctor.id
            //     ? 'row-span-4 '
            //     : expandedCard === doctor.id
            //       ? 'row-span-2 '
            //       : 'h-[240px]'
            // }`}
            className={`bg-white rounded-lg shadow-lg relative transition-all duration-300 ${
              signupOpenCheckbox && expandedCard === doctor.id
                ? 'row-span-4 '
                : existingUserCb && expandedCard === doctor.id
                  ? 'row-span-3  '
                  : expandedCard === doctor.id
                    ? 'row-span-2 '
                    : 'h-[240px]'
            }`}
          >
            {/* Doctor Info Section */}
            <div className="p-5">
              <div className="flex items-start gap-5">
                <div className="relative">
                  <img
                    src={doctor?.user?.image || NoImage}
                    alt={doctor?.user?.first_name}
                    className="w-[72px] h-[72px] rounded-full object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-[1.5px] border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[18px] mb-1 text-left">
                    Dr. {doctor?.user?.first_name} {doctor?.user?.last_name}
                  </h3>
                  <p className="text-gray-800 text-[15px] mb-1 text-left">
                    {doctor?.specialization?.name}
                  </p>
                  <p className="text-gray-600 text-[13px] mb-0.5 text-left">
                    {doctor?.experience ? `${doctor.experience} years` : 'Experience not available'}
                  </p>
                  <p className="text-gray-600 text-[13px] mb-0.5 text-left">
                    {doctor?.hospital?.locality?.name || 'Location not available'}
                  </p>
                  <p className="text-gray-600 text-[13px] mb-1 text-left">
                    {doctor?.degree?.name || 'Degree not available'}
                  </p>
                  <p className="text-gray-600 text-[13px] mb-1 text-left">
                    {doctor.consultationType}
                  </p>
                  <div className="text-green-500 font-bold text-[14px] text-[#04816A] text-left">
                    FREE
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded">
                    <span className="text-green-600 font-semibold text-[15px]">
                      {doctor.rating}
                    </span>
                    <span className="text-gray-500 text-[13px]">{doctor.patients}</span>
                  </div>
                </div>
              </div>

              {/* Date Picker, Book Appointment Button, Radio Buttons for Mode */}
              <div className="absolute top-[170px] right-5 flex items-center gap-4">
                {/* Date Picker */}

                {/* Book Appointment Button */}

                <button className="px-4 py-1.5 rounded font-medium transition-all bg-[#278F8E]">
                  <div className="flex">
                    <img className="h-4" src={thumbImg}></img>
                    <span className="ml-2 text-[12px] text-white">99%</span>
                  </div>
                </button>
                <span className="font-medium mr-6 ">
                  <span className="underline">93</span> Patients
                </span>
                <button
                  onClick={() => handleCardExpand(doctor.id)}
                  className={`px-4 py-1.5 rounded text-[13px] font-medium transition-all ${
                    expandedCard === doctor.id
                      ? 'bg-[#278F8E] text-white'
                      : 'bg-[#3c00be] text-white hover:bg-[#6337C0]'
                  }`}
                >
                  {expandedCard === doctor.id ? 'BOOK AN APPOINTMENT' : 'BOOK AN APPOINTMENT'}
                </button>
              </div>
            </div>

            {expandedCard === doctor.id && (
              <div className="bg-[#F9FAFB] border-t border-gray-100 w-full mt-8">
                <div className="p-5">
                  {/* Date picker section */}
                  {/* Date picker section */}
                  {/* Date picker section */}
                  <div className="flex items-center justify-center mb-5 px-4 relative">
                    <div className="flex items-center rounded-lg p-4 w-full max-w-2xl relative">
                      <button
                        onClick={handlePrevDates}
                        className="absolute left-2 transition-all flex-shrink-0 w-16 h-8 flex items-center justify-center text-[#3c00be] disabled:text-gray-300 hover:bg-gray-50 rounded-full"
                        disabled={currentDateIndex === 0}
                      >
                        <MdKeyboardArrowLeft size={24} />
                      </button>
                      <div className="flex items-center justify-center gap-16 flex-1 px-12">
                        {dates.slice(currentDateIndex, currentDateIndex + 2).map((date, index) => (
                          <div
                            key={index}
                            className="text-center cursor-pointer relative"
                            style={{ minWidth: '140px' }}
                            onClick={() => {
                              const formattedDate = date.toISOString().split('T')[0];
                              setSelectedDate(formattedDate);
                              console.log('Selected Date:', formattedDate);
                            }}
                          >
                            <div
                              className={`mt-2 ${
                                selectedDate === date.toISOString().split('T')[0]
                                  ? 'text-[#04816A] font-semibold'
                                  : 'text-gray-600'
                              }`}
                            >
                              {String(date.getDate()).padStart(2, '0')}-
                              {String(date.getMonth() + 1).padStart(2, '0')}-{date.getFullYear()}
                            </div>
                            <div className="text-[13px] text-gray-600">
                              {date.toLocaleDateString('default', { weekday: 'long' })},{' '}
                              {date.toLocaleDateString('default', { month: 'short' })}
                            </div>

                            {/* Highlight selected date */}
                            {selectedDate === date.toISOString().split('T')[0] && (
                              <div className="absolute bottom-[-8px] left-0 w-full h-1 bg-[#04816A]"></div>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleNextDates}
                        className="absolute right-2 transition-all flex-shrink-0 w-16 h-8 flex items-center justify-center text-[#3c00be] disabled:text-gray-300 hover:bg-gray-50 rounded-full"
                        disabled={currentDateIndex >= dates.length - 2}
                      >
                        <MdKeyboardArrowRight size={24} />
                      </button>
                    </div>
                  </div>

                  {/* Consultation mode radio buttons */}
                  <div className="flex gap-8  mb-6 ml-36">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="mode"
                        value="Online"
                        checked={mode === 'Online Approach'}
                        onChange={() => setMode('Online Approach')}
                        className="text-[#3c00be] border-[#bfbfbf] focus:ring-[#3c00be] peer appoi-radio appearance-none w-3 h-3 border-2 rounded-full"
                        style={{ accentColor: '#04816A' }}
                      />
                      <span className="text-[#3c00be] text-sm peer-checked:text-[#04816A] peer-checked:font-semibold">
                        Online Approach
                      </span>
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="mode"
                        value="Offline"
                        checked={mode === 'Direct Approach'}
                        onChange={() => setMode('Direct Approach')}
                        className="text-[#3c00be] border-[#bfbfbf] focus:ring-[#3c00be] peer appoi-radio appearance-none w-3 h-3 border-2 rounded-full"
                        style={{ accentColor: '#04816A' }}
                      />
                      <span className="text-[#3c00be] text-sm peer-checked:text-[#04816A] peer-checked:font-semibold">
                        Direct Approach
                      </span>
                    </label>
                  </div>

                  {/* Original slots section */}
                  <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                      height: 0px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background-color: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background-color: transparent;
                    }
                  `}</style>

                  {filteredSlots.morningSlots.length > 0 && (
                    <>
                      <div className="flex items-center">
                        <div className="text-gray-800 font-medium text-[15px] w-[100px] text-left flex-shrink-0">
                          Morning
                        </div>

                        <div className="flex items-center overflow-hidden">
                          <div
                            onClick={() => handleSlotNavigation('prev', 'morning')}
                            className="outline-none cursor-pointer"
                          >
                            <MdKeyboardArrowLeft size={24} />
                          </div>

                          <div
                            ref={slotContainerRefMorning}
                            className="flex gap-2 overflow-x-auto custom-scrollbar w-[100%] items-center"
                          >
                            {filteredSlots.morningSlots.map((slot) => (
                              <button
                                key={slot.time}
                                onClick={() => handleSlotSelection(slot.time, slot)}
                                className={`px-6 py-2 rounded-md text-[13px] font-medium border-2 transition-all flex-shrink-0
                              ${
                                selectedSlot.time === slot.time
                                  ? 'bg-[#3c00be] text-white border-[#3c00be]'
                                  : 'text-[#3c00be] border-[#3c00be] hover:bg-[#3c00be] hover:text-white'
                              }`}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                          <div
                            onClick={() => handleSlotNavigation('next', 'morning')}
                            className="outline-none cursor-pointer"
                          >
                            <MdKeyboardArrowRight size={24} />
                          </div>
                        </div>
                      </div>
                      <hr className="my-6 border-[#E0E0E0]" />
                    </>
                  )}

                  {filteredSlots.afternoonSlots.length > 0 && (
                    <>
                      <div className="flex items-center">
                        <div className="text-gray-800 font-medium text-[15px] w-[100px] text-left flex-shrink-0">
                          Afternoon
                        </div>

                        <div className="flex items-center overflow-hidden">
                          <div
                            onClick={() => handleSlotNavigation('prev', 'afternoon')}
                            className="outline-none cursor-pointer"
                          >
                            <MdKeyboardArrowLeft size={24} />
                          </div>

                          <div
                            ref={slotContainerRefAfternoon}
                            className="flex gap-2 custom-scrollbar overflow-x-auto w-[100%] items-center"
                          >
                            {filteredSlots.afternoonSlots.map((slot) => (
                              <button
                                key={slot.time}
                                onClick={() => handleSlotSelection(slot.time, slot)}
                                className={`px-6 py-2 rounded-md text-[13px] font-medium border-2 transition-all flex-shrink-0
                              ${
                                selectedSlot.time === slot.time
                                  ? 'bg-[#3c00be] text-white border-[#3c00be]'
                                  : 'text-[#3c00be] border-[#3c00be] hover:bg-[#3c00be] hover:text-white'
                              }`}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>

                          <div
                            onClick={() => handleSlotNavigation('next', 'afternoon')}
                            className="outline-none cursor-pointer"
                          >
                            <MdKeyboardArrowRight size={24} />
                          </div>
                        </div>
                      </div>
                      <hr className="my-6 border-[#E0E0E0]" />
                    </>
                  )}

                  {filteredSlots.eveningSlots.length > 0 && (
                    <div className="flex items-center">
                      <div className="text-gray-800 font-medium text-[15px] w-[100px] text-left flex-shrink-0">
                        Evening
                      </div>

                      <div className="flex items-center overflow-hidden">
                        <div
                          onClick={() => handleSlotNavigation('prev', 'evening')}
                          className="outline-none cursor-pointer"
                        >
                          <MdKeyboardArrowLeft size={24} />
                        </div>

                        <div
                          ref={slotContainerRefEvening}
                          className="flex gap-2 custom-scrollbar overflow-x-auto w-[100%] items-center"
                        >
                          {filteredSlots.eveningSlots.map((slot) => (
                            <button
                              key={slot.time}
                              onClick={() => handleSlotSelection(slot.time, slot)}
                              className={`px-6 py-2 rounded-md text-[13px] font-medium border-2 transition-all flex-shrink-0
                              ${
                                selectedSlot.time === slot.time
                                  ? 'bg-[#3c00be] text-white border-[#3c00be]'
                                  : 'text-[#3c00be] border-[#3c00be] hover:bg-[#3c00be] hover:text-white'
                              }`}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>

                        <div
                          onClick={() => handleSlotNavigation('next', 'evening')}
                          className="outline-none cursor-pointer"
                        >
                          <MdKeyboardArrowRight size={24} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-center mb-2 items-center gap-10">
                  {/* <button
                    onClick={() => {
                      setsave(true);
                      console.log(isNewConfirmed);
                    }}
                    className="px-4 py-2   bg-brand  font-semibold rounded-lg shadow-md hover:bg-blue-600 "
                  >
                    new user
                  </button> */}
                  {console.log(selectedSlot, 'hhhhhhhhhhhhhhhhhhhhhhhh')}
                  {selectedSlot.time && (
                    <div>
                      {' '}
                      <div className="flex mb-2 m-2 w-full items-center justify-between gap-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            checked={signupOpenCheckbox}
                            type="checkbox"
                            onChange={() => {
                              setsignupOpenCheckbox(!signupOpenCheckbox);
                              setExistingUserCb(false);
                              setMemberExistedUseSecondBooking(false);
                              setNonLoginUserValue({});
                              setFormDataInputForNewUser({
                                username: '',
                                title: '',
                                secondName: '',
                                surname: '',
                                gender: '',
                                dateOfBirth: '',
                                age: '',
                                contact_number: '',
                                contact_number2: '',
                                email: '',
                                password: '',
                                confirmPassword: '',
                                address: '',
                              });
                              setOtpForChange('');
                              setOtpForVerify('');
                              setPhoneNumber('');
                              setsave(!save);

                              console.log('Switched to New Patient', signupOpenCheckbox);
                            }}
                          />
                        </label>
                        <div className="text-brand">New Patient</div>
                        <input
                          type="checkbox"
                          checked={existingUserCb}
                          onChange={() => {
                            setExistingUserCb(!existingUserCb);
                            setsignupOpenCheckbox(false);
                            setNonLoginUserValue({});
                            setOtpBtn(true);
                            setOtpForChange('');
                            setOtpForVerify('');

                            setFormDataInputForNewUser({
                              username: '',
                              title: '',
                              secondName: '',
                              surname: '',
                              gender: '',
                              dateOfBirth: '',
                              age: '',
                              contact_number: '',
                              contact_number2: '',
                              email: '',
                              password: '',
                              confirmPassword: '',
                              address: '',
                            });

                            console.log('Switched to Existing Patient');
                          }}
                          className="border-red h-fit flex"
                        />
                        <div className="text-brand">Existing Patient</div>
                      </div>
                    </div>
                  )}
                  {/* <button
                    onClick={() => {
                      setverifyOpenBtn(true);
                      console.log(verifyOpenBtn);
                    }}
                    className="ml-4 px-4 py-2 bg-brand  font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                  >
                    existing user
                  </button> */}
                </div>
                {signupOpenCheckbox && selectedSlot.time && (
                  <div>
                    <div>
                      {' '}
                      <form>
                        <div className="grid grid-cols-1 sm:grid-cols-2 font-medium capitalize gap-4 p-4">
                          {/* Name Field */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium pl-2">
                              Title <span className="text-[#E94A4A]">*</span>
                            </label>
                            <select
                              name="title"
                              value={formDataInputForNewUser.title}
                              onChange={handleFormDataInputForNewUser}
                              className="w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none border-brand bg-white text-gray-700"
                            >
                              <option value="">Select title</option>
                              <option value="Baby">Baby</option>
                              <option value="Baby Of">Baby Of</option>
                              <option value="Mr.">Mr.</option>
                              <option value="Ms.">Ms.</option>
                              <option value="Mrs.">Mrs.</option>
                            </select>

                            {/* Error Message for Title */}
                            {errors.title && (
                              <span className="text-[#E94A4A] text-sm">{errors.title}</span>
                            )}

                            {errors.title && (
                              <span className="text-red-500 text-sm">{errors.title}</span>
                            )}
                          </div>
                          {formDataInputForNewUser.title.trim() != 'Baby Of' && (
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-medium pl-2">
                                Name <span className="text-[#E94A4A]">*</span>
                              </label>
                              <input
                                type="text"
                                required
                                name="username"
                                value={formDataInputForNewUser.username}
                                onChange={handleFormDataInputForNewUser}
                                className={`w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none ${
                                  errors.username ? 'border-[#E94A4A]' : 'border-brand'
                                }`}
                                placeholder="Enter your name"
                              />
                              {errors.guardianName && (
                                <span className="text-[#E94A4A] text-sm">{errors.username}</span>
                              )}
                            </div>
                          )}
                          {(formDataInputForNewUser.title.trim() === 'Baby' ||
                            formDataInputForNewUser.title.trim() === 'Baby Of') && (
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-medium pl-2">
                                Gaudian Name <span className="text-[#E94A4A]">*</span>
                              </label>
                              <input
                                type="text"
                                name="guardianName"
                                required
                                value={formDataInputForNewUser.guardianName}
                                onChange={handleFormDataInputForNewUser}
                                className={`w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none ${
                                  errors.surname ? 'border-[#E94A4A]' : 'border-brand'
                                }`}
                                placeholder="Enter surname"
                              />
                              {errors.guardianName && (
                                <span className="text-[#E94A4A] text-sm">
                                  {errors.guardianName}
                                </span>
                              )}
                            </div>
                          )}{' '}
                          {(formDataInputForNewUser.title.trim() === 'Baby' ||
                            formDataInputForNewUser.title.trim() === 'Baby Of') && (
                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-medium pl-2">
                                Gaurdian Relation <span className="text-[#E94A4A]">*</span>
                              </label>
                              <select
                                name="guardianRelation"
                                value={formDataInputForNewUser.guardianRelation}
                                onChange={handleFormDataInputForNewUser}
                                className="w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none border-brand bg-white text-gray-700"
                              >
                                <option value={''}>Select guardian relation</option>
                                <option value={'Father'}>Father</option>
                                <option value={'Mother'}>Mother</option>
                                <option value={'Brother'}>Brother</option>
                                <option value={'Sister'}>Sister</option>
                                <option value={'Grand Parents'}>Grand Parents</option>
                                <option value={'Others'}>Others</option>
                              </select>

                              {/* Error Message for Title */}
                              {errors.title && (
                                <span className="text-[#E94A4A] text-sm">
                                  {errors.guardianRelation}
                                </span>
                              )}

                              {errors.title && (
                                <span className="text-red-500 text-sm">{errors.title}</span>
                              )}
                            </div>
                          )}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium pl-2">
                              Surame <span className="text-[#E94A4A]">*</span>
                            </label>
                            <input
                              type="text"
                              name="surname"
                              required
                              value={formDataInputForNewUser.surname}
                              onChange={handleFormDataInputForNewUser}
                              className={`w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none ${
                                errors.surname ? 'border-[#E94A4A]' : 'border-brand'
                              }`}
                              placeholder="Enter surname"
                            />
                            {errors.surname && (
                              <span className="text-[#E94A4A] text-sm">{errors.surname}</span>
                            )}
                          </div>
                          {/* Contact Number */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium pl-2">
                              Mobile Number <span className="text-[#E94A4A]">*</span>
                            </label>
                            <input
                              type="text"
                              name="contact_number"
                              required
                              value={formDataInputForNewUser.contact_number}
                              onChange={handleFormDataInputForNewUser}
                              className={`w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none ${
                                errors.contact_number ? 'border-[#E94A4A]' : 'border-brand'
                              }`}
                              placeholder="Enter phone number"
                            />
                            {errors.contact_number && (
                              <span className="text-[#E94A4A] text-sm">
                                {errors.contact_number}
                              </span>
                            )}
                          </div>
                          {/* Email Field */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium pl-2">
                              Email<span className="text-[#E94A4A]">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formDataInputForNewUser.email}
                              onChange={handleFormDataInputForNewUser}
                              className={`w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none ${
                                errors.email ? 'border-[#E94A4A]' : 'border-brand'
                              }`}
                              placeholder="Enter email"
                            />
                            {errors.email && (
                              <span className="text-[#E94A4A] text-sm">{errors.email}</span>
                            )}
                          </div>
                          {/* Last Name */}
                          <div className="flex flex-col gap-2 justify-start">
                            <label className="text-sm font-medium flex items-center mx-2  pl-2 !text-left  mb-">
                              age <span className="asterik_red m-x-2">*</span>
                              <span className=" flex justify-center mx-2 gap-2 items-center">
                                {' '}
                                <input
                                  checked={dateCheckbox}
                                  type="checkbox"
                                  id="ageCheckbox2"
                                  name="ageCheckbox2"
                                  className="hidden peer"
                                  onClick={() => {
                                    setDdteCheckbox(true);
                                  }}
                                />
                                <label
                                  htmlFor="ageCheckbox2"
                                  className="w-3 h-3  mx-2 border-2 border-green-500 rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-brand"
                                >
                                  <div className="w-2 h-2  rounded-full bg-transparent peer-checked:bg-white"></div>
                                </label>
                              </span>
                              <span className="mx-2">Date</span>
                              <span>
                                {' '}
                                <input
                                  checked={!dateCheckbox}
                                  type="checkbox"
                                  id="ageCheckbox"
                                  name="ageCheckbox"
                                  onClick={() => setDdteCheckbox(false)}
                                  className="hidden peer"
                                />
                                <label
                                  htmlFor="ageCheckbox"
                                  className="w-3 h-3  border-2 border-green-500 rounded-full flex items-center justify-center cursor-pointer peer-checked:bg-brand"
                                >
                                  <div className="w-2 h-2  rounded-full  bg-transparent peer-checked:bg-white"></div>
                                </label>
                              </span>
                            </label>

                            {dateCheckbox ? (
                              <>
                                <div className="mx-0.5 w-full flex items-center border border-brand rounded-full  focus-within:ring-[#04816A] focus-within:border-[#04816A]">
                                  {/* Age Input Field */}
                                  <input
                                    className="block border-0 w-full rounded-full px-3 ml-0.5 py-1.5 text-[#404040] dark:bg-[#ffffff] placeholder-[#bfbfbf] focus:outline-none focus:ring-0 focus:ring-[#04816A] focus:border-[#04816A] dark:focus:ring-[#00bfa5] dark:focus:border-[#00bfa5] sm:text-sm font-inter transition duration-150 ease-in-out"
                                    name="age"
                                    id="age-field"
                                    required
                                    type="number"
                                    value={formDataInputForNewUser.age || ''}
                                    onChange={handleFormDataInputForNewUser}
                                    placeholder="Enter your age"
                                  />

                                  {/* Age Unit Dropdown */}
                                  <select
                                    value={formDataInputForNewUser.ageUnit}
                                    onChange={handleAgeUnitChange}
                                    className="mr-2 focus:outline-none rounded-full focus:ring-2 focus:ring-[#ffffff] dark:focus:ring-[#ffffff] dark:focus:border-[#ffffff] sm:text-sm font-inter transition duration-150 ease-in-out bg-white dark:bg-white text-black dark:text-[#000000] border border-[#ffffff] dark:border-[#ffffff]"
                                  >
                                    <option value="years">Years</option>
                                    <option value="months">Months</option>
                                    <option value="days">Days</option>
                                  </select>
                                </div>

                                {/* Error Message */}
                                {errors.age && (
                                  <span className="text-[#E94A4A] text-sm">{errors.age}</span>
                                )}
                              </>
                            ) : (
                              <>
                                {/* Date of Birth Input */}
                                <input
                                  type="date"
                                  name="dateOfBirth"
                                  required
                                  value={formDataInputForNewUser?.dateOfBirth || ''}
                                  onChange={handleFormDataInputForNewUser}
                                  className={`w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none ${
                                    errors.dateOfBirth ? 'border-[#E94A4A]' : 'border-brand'
                                  }`}
                                  placeholder="Enter your Date of Birth"
                                />

                                {/* Error Message for Date of Birth */}
                                {errors.dateOfBirth && (
                                  <span className="text-[#E94A4A] text-sm">
                                    {errors.dateOfBirth}
                                  </span>
                                )}
                              </>
                            )}
                          </div>{' '}
                          {/* Gender */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium pl-2">
                              Gender <span className="text-[#E94A4A]">*</span>
                            </label>
                            <select
                              name="gender"
                              value={formDataInputForNewUser.gender}
                              onChange={handleFormDataInputForNewUser}
                              className="w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none border-brand bg-white text-gray-700"
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Prefer not to say</option>
                            </select>
                            {errors.gender && (
                              <span className="text-red-500 text-sm">{errors.gender}</span>
                            )}
                          </div>
                          {/* Alternative Contact Number */}
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium pl-2">
                              Alternative Mobile Number
                            </label>
                            <input
                              type="text"
                              name="contact_number2"
                              value={formDataInputForNewUser.contact_number2}
                              onChange={handleFormDataInputForNewUser}
                              className="w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none border-brand"
                              placeholder="Enter alternative number"
                            />
                            {errors.contact_number2 && (
                              <span className="text-red-500 text-sm">{errors.contact_number2}</span>
                            )}
                          </div>
                          {/* Address */}
                        </div>
                        <div className="flex flex-col gap-2 mx-4">
                          <label className="text-sm font-medium pl-2">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formDataInputForNewUser.address}
                            onChange={handleFormDataInputForNewUser}
                            className="w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none border-brand"
                            placeholder="Enter address"
                          />
                          {errors.address && (
                            <span className="text-red-500 text-sm">{errors.address}</span>
                          )}
                        </div>
                        {/* Submit Button */}
                        <div className="w-full flex justify-center items-center">
                          <button
                            type="button"
                            onClick={handleformDatatononLoginUserValue}
                            className="bg-brand text-white rounded-2xl shadow-md flex w-fit p-3 m-4"
                          >
                            Save and Next
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {existingUserCb && (
                  <div>
                    <div className=" font-extrabold mt-4">Verify it's you</div>
                    {otpBtn ? (
                      <div className="flex w-full items-center mt-6 justify-center flex-col gap-2">
                        <input
                          type="text"
                          name="otpforverify"
                          value={otpforchange}
                          onChange={(e) => setOtpForChange(e.target.value)}
                          placeholder="Enter number"
                          className="w-fit p-2 border text-center rounded mb-4"
                        />
                        <div
                          onClick={() => {
                            if (!otpforchange.trim()) return;
                            setOtpBtn(false);
                            sendOtphandler();
                            startCountdown();
                            console.log(formData.phone_no);
                          }}
                          className={`font-bold lg:mb-8 bg-brand p-2 text-center rounded text-gray-800 mb-2 ${
                            !otpforchange.trim() ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          Send OTP
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 items-center">
                        <div className="text-brand">Enter OTP</div>

                        <input
                          className="p-2 border rounded mb-4"
                          type="text"
                          value={otpforVerify}
                          onChange={(e) => setOtpForVerify(e.target.value)}
                          name="otpforverify"
                          placeholder="OTP"
                        />

                        <button
                          onClick={() => {
                            if (!otpforVerify.trim()) return;
                            setverifyOpenBtn(true);
                            verifyOtphandler();
                            setExistingUserCb(false);
                          }}
                          className={`font-bold text-white bg-brand p-1 rounded text-gray-800 mb-1 ${
                            !otpforVerify.trim() ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={!otpforVerify.trim()}
                        >
                          Get Details
                        </button>

                        <div className="flex items-center gap-8">
                          <div className="text-docProfileBG">
                            {countdown > 0
                              ? `Resend OTP in ${countdown} seconds`
                              : 'Resend OTP now'}
                          </div>
                          <div>
                            {countdown === 0 ? (
                              <button
                                onClick={() => {
                                  setOtpBtn(true);
                                  setOtpForChange('');
                                  setOtpForVerify('');
                                  console.log(otpBtn);
                                }}
                                className={`bg-brand  p-1 text-white ${
                                  !otpforVerify.trim() ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                disabled={!otpforVerify.trim()}
                              >
                                Resend
                              </button>
                            ) : (
                              <button className="bg-brand p-1 opacity-50 text-white mb-1">
                                Resend
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {console.log(
                  selectedSlot?.time,
                  'n onLoginUserValue',
                  auth?.user?.role === 'Patient',
                  nonLoginUserValue.length > 0
                )}
                {(Object.keys(nonLoginUserValue).length > 0 || auth?.user?.role === 'Patient') &&
                selectedSlot.time ? (
                  <div className="flex flex-col items-center justify-center">
                    {/* <div className="flex items-start text-start justify-start gap-2 mb-4">
                      <input
                        type="radio"
                        name="slotConfirmation"
                        id="slotConfirmation"
                        checked={isConfirmed}
                        onChange={() => setIsConfirmed(true)}
                        className="w-5 h-5 text-green-500 focus:ring-green-500 border-gray-300 cursor-pointer custom-radio appearance-none border-2 rounded-full"
                      />
                      <label
                        htmlFor="slotConfirmation"
                        className="text-base font-semibold text-[#04816A] cursor-pointer"
                      >
                        Confirm Slot Booking
                      </label>
                    </div> */}

                    {isConfirmed && (
                      <>
                        {console.log('kk')}
                        {
                          <Card className="relative shadow-lg capitalize font-medium rounded-2xl w-[350px] md:w-[400px] border border-gray-200">
                            <p className="text-[#3c00be] text-sm font-semibold text-center mb-3">
                              Patient info:
                            </p>

                            <div className="flex items-start text-start">
                              <div className="flex-1 space-y-1 text-gray-700">
                                <p>
                                  <span className="font-semibold">Name:</span>{' '}
                                  {nonLoginUserValue?.username ||
                                    auth?.user?.username ||
                                    formDataInputForNewUser?.username}{' '}
                                  <span className="mx-1">{nonLoginUserValue?.secondName}</span>
                                  {nonLoginUserValue?.surname ||
                                    auth?.user?.surname ||
                                    formDataInputForNewUser?.surname}
                                </p>
                                <p>
                                  <span className="font-semibold">Age:</span>{' '}
                                  {formDataInputForNewUser.dateOfBirth
                                    ? !dateCheckbox
                                      ? `${moment().diff(moment(formDataInputForNewUser.dateOfBirth, 'YYYY-MM-DD'), 'years')} years` // If dateOfBirth exists and dateCheckbox is false, calculate age
                                      : formDataInputForNewUser.age // If dateCheckbox is true, fallback to age
                                    : formDataInputForNewUser.age
                                      ? `${formDataInputForNewUser.age} ${formDataInputForNewUser.ageUnit || 'years'}` // If age exists and dateCheckbox is true, show the age
                                      : (nonLoginUserValue?.age ?? '')}
                                </p>

                                <p>
                                  <span className="font-semibold">Gender:</span>{' '}
                                  {nonLoginUserValue?.gender || auth?.user?.gender}
                                </p>
                                <p>
                                  <span className="font-semibold">Mobile Number:</span>{' '}
                                  {nonLoginUserValue?.contact_number || auth?.user?.phone_no}
                                </p>
                              </div>

                              <div className="relative w-16 h-16 flex items-center justify-center">
                                <img
                                  src={NoImage}
                                  alt="Patient"
                                  className="w-14 h-14 rounded-full border"
                                />
                              </div>
                            </div>
                          </Card>
                        }

                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="bg-[#04816A] mb-2 text-white font-medium py-2 px-6 mt-4 rounded-full hover:bg-[#006B5A] transition-all"
                        >
                          save
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  selectedSlot.time && (
                    <div className="flex flex-col items-center justify-center">
                      {console.log('jj')}
                      {/* <div className="flex items-start text-start justify-start gap-2 mb-4">
                        <input
                          type="radio"
                          name="slotConfirmation"
                          id="slotConfirmation"
                          checked={isNewConfirmed}
                          onChange={() => setIsNewConfirmed(true)}
                          className="w-5 h-5 text-green-500 focus:ring-green-500 border-gray-300 cursor-pointer custom-radio appearance-none border-2 rounded-full"
                        />
                        <label
                          htmlFor="slotConfirmation"
                          className="text-base font-semibold text-[#04816A] cursor-pointer"
                        >
                          Confirm Slot Booking
                        </label>
                      </div> */}
                      {/* {isNewConfirmed && (
                        <button
                          onClick={() => setIsPatientModal(true)}
                          className="bg-[#04816A] mb-2 text-white font-medium py-2 px-6 mt-4 rounded-full hover:bg-[#006B5A] transition-all"
                        >
                          New Patient
                        </button>
                      )} */}
                      {verifyOpenBtn}
                      {verifyOpenBtn && familyOpen && (
                        <Modal
                          visible={true}
                          onCancel={() => {
                            setverifyOpenBtn(false);
                            console.log(verifyOpenBtn);
                            setOtpBtn(true);
                            setFamily([]);
                            setfamilyOpen(false);
                          }}
                          maskClosable={false}
                          footer={null}
                          bodyStyle={{
                            maxHeight: 'calc(100vh - 100px)',
                            overflowY: 'auto',
                            maxWidth: '100%',
                            overflowX: 'hidden',
                          }}
                          style={{
                            top: 10,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                          }}
                          className="w-full sm:max-w-2xl md:max-w-4xl lg:max-w-4xl xl:max-w-4xl"
                        >
                          {/* <div className="font-bold text-greenHover bg-gray-300 text-center text-2xl mb-6 mt-6">
                            Registration Form
                          </div> */}

                          <div className="flex flex-col items-center w-full">
                            {fetchdataRelativeInfo}
                            <div className="text-center font-bold  text-xl mb-1">
                              Getting results for this contact : +91 {otpforchange}
                            </div>

                            <div className="flex justify-center w-full px-4">
                              <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md w-full max-w-5xl">
                                {/* ✅ Header Row */}
                                <div className="grid grid-cols-[120px,1fr,60px,1fr,100px,100px] blueformembers  text-white font-semibold py-2 px-4 gap-x-4 text-center">
                                  <div>Registered Id</div>
                                  <div>Patient Name</div>
                                  <div>Age</div>
                                  <div>Contact</div>
                                  <div>Gender</div>
                                  <div>Action</div>
                                </div>

                                {/* ✅ Data Rows */}
                                {family?.map((member, index) => (
                                  <div
                                    key={index}
                                    className="grid grid-cols-[120px,1fr,60px,1fr,100px,100px] py-2 even:bg-brand odd:bg-white even:bg-opacity-10 border-b border-gray-200 px-4 gap-x-4 hover:bg-gray-50 text-center"
                                  >
                                    <div className="flex items-center justify-center">
                                      {member.register_id}
                                    </div>
                                    <div className="flex items-center">{member.username}</div>
                                    <div className="flex items-center justify-center">
                                      {member.age}
                                    </div>
                                    <div className="flex items-center">{member.contact_number}</div>
                                    <div className="flex items-center justify-center">
                                      {member.gender}
                                    </div>
                                    <div className="flex items-center justify-center">
                                      <button
                                        onClick={() => {
                                          memberdetailstoNonLoginData(member);
                                          setverifyOpenBtn(false);
                                        }}
                                        className="bg-brand text-white px-3 py-1 rounded"
                                      >
                                        Book
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Modal>
                      )}
                      {!isNewConfirmed && (
                        <Modal
                          maskClosable={false}
                          style={{ top: 20 }}
                          bodyStyle={{
                            maxHeight: 'calc(100vh - 150px)',
                            overflowY: 'auto',

                            maxWidth: '100%',
                            overflowX: 'hidden',
                          }}
                          // title={'New Patient'}
                          visible={isPatientModal}
                          onCancel={() => {
                            console.log(save);
                            setIsPatientModal(false);
                            setsave(false);
                          }}
                          footer={null}
                          className="w-full sm:max-w-4xl md:max-w-6xl lg:max-w-6xl xl:max-w-7xl"
                        >
                          <div className="font-bold bg-[#D9D9D9] text-center text-2xl mb-6 mt-6 ">
                            Patient Sign Up
                          </div>
                          <form onSubmit={handleFormSubmit} className="">
                            <div className="md:grid grid-cols-3 gap-x-2 items-center">
                              <div className="col-span-1 mb-5 mx-0.5">
                                <ChoiceField
                                  newDesign={true}
                                  label="Title"
                                  name="title"
                                  options={titleOptions}
                                  value={valuesPatient?.title}
                                  onChange={handlePatientInputChange}
                                  error={errors.title}
                                />
                              </div>

                              <div className="col-span-1">
                                <InputField
                                  newDesign={true}
                                  label={`${valuesPatient?.title === 'Baby Of' ? 'Guardian Name' : 'Patient Name'}`}
                                  placeholder="Enter patient name"
                                  name="username"
                                  value={valuesPatient?.username}
                                  onChange={handlePatientInputChange}
                                  error={errors.username}
                                />
                              </div>

                              <div className="col-span-1">
                                <InputField
                                  newDesign={true}
                                  label="Surname"
                                  placeholder="Enter surname"
                                  name="surname"
                                  value={valuesPatient?.surname}
                                  onChange={handlePatientInputChange}
                                  error={errors.surname}
                                />
                              </div>

                              <div className="col-span-1 mb-5">
                                <ChoiceField
                                  newDesign={true}
                                  label="Gender"
                                  name="gender"
                                  options={genderOptions}
                                  error={errors.gender}
                                  value={valuesPatient?.gender}
                                  onChange={handlePatientInputChange}
                                />
                              </div>

                              {valuesPatient?.title === 'Baby' && (
                                <div className="col-span-1">
                                  <InputField
                                    newDesign={true}
                                    label="Guardian Name"
                                    placeholder="Enter guardian name"
                                    name="guardian_name"
                                    value={valuesPatient?.guardian_name}
                                    onChange={handlePatientInputChange}
                                    error={errors.guardian_name}
                                  />
                                </div>
                              )}

                              {(valuesPatient?.title === 'Baby' || values?.title === 'Baby Of') && (
                                <div className="col-span-1 mb-7">
                                  <ChoiceField
                                    newDesign={true}
                                    label="Guardian Relation"
                                    name="guardian_relation"
                                    options={guardianRelation}
                                    value={values?.guardian_relation}
                                    onChange={handlePatientInputChange}
                                    error={errors.guardian_relation}
                                  />
                                </div>
                              )}

                              <div className="flex items-center space-x-4 dark:text-[#1d1d1d] font-semibold">
                                <label className="flex items-center text-xl">
                                  <input
                                    type="radio"
                                    name="dobOrAge"
                                    value="dob"
                                    checked={isDateOfBirth}
                                    onChange={() => setIsDateOfBirth(true)}
                                    className="mr-2 custom-radio appearance-none w-3 h-3 border-2 rounded-full"
                                    style={{ accentColor: '#04816A' }}
                                  />
                                  Date of Birth
                                </label>

                                <label className="flex items-center text-xl">
                                  <input
                                    type="radio"
                                    name="dobOrAge"
                                    value="age"
                                    checked={!isDateOfBirth}
                                    onChange={() => setIsDateOfBirth(false)}
                                    className="mr-2 custom-radio appearance-none w-3 h-3 border-2 rounded-full"
                                    style={{ accentColor: '#04816A' }}
                                  />
                                  Age
                                </label>
                              </div>

                              {isDateOfBirth ? (
                                <div className="mb-6">
                                  <DatePickerField
                                    newDesign={true}
                                    label="Date of Birth"
                                    placeholder="Select date of birth"
                                    name="dob"
                                    value={valuesPatient?.dob}
                                    error={errors.dob}
                                    onChange={(date) => handleDobDateChange('dob', date)}
                                  />
                                </div>
                              ) : (
                                <InputAgeField
                                  label="Age"
                                  placeholder="Enter age"
                                  name="age"
                                  value={valuesPatient.age.value || ''}
                                  onChange={handleAgeValueChange}
                                  error={errors.age}
                                  ageUnit={valuesPatient.age.unit || 'years'}
                                  onAgeUnitChange={handleAgeUnitChange}
                                />
                              )}
                              <div className="col-span-1">
                                <InputField
                                  newDesign={true}
                                  label="Mobile Number"
                                  type="tel"
                                  placeholder="Enter contact"
                                  name="contact_number"
                                  error={errors.contact_number}
                                  value={valuesPatient?.contact_number}
                                  onChange={handlePatientInputChange}
                                />
                              </div>

                              <div className="col-span-1">
                                <InputField
                                  newDesign={true}
                                  label="Pincode"
                                  placeholder="Enter pincode"
                                  name="pincode"
                                  value={valuesPatient?.pincode}
                                  required={false}
                                  onChange={handlePatientInputChange}
                                />
                              </div>

                              {valuesPatient?.lead_source === 'Other' && (
                                <div className="col-span-1">
                                  <InputField
                                    newDesign={true}
                                    label="Referral"
                                    placeholder="Enter referral by"
                                    name="referral"
                                    required={false}
                                    value={valuesPatient?.referral}
                                    onChange={handlePatientInputChange}
                                  />
                                </div>
                              )}
                              {console.log(errors, '555')}
                              {/* </div>
          <div className="md:grid grid-cols-2 gap-x-2"> */}
                              {/* <InputField
                                newDesign={true}
                                label="Password"
                                placeholder="Enter password"
                                name="password"
                                type="password"
                                value={valuesPatient?.password}
                                onChange={handlePatientInputChange}
                                error={errors?.password}
                              />

                              <InputField
                                newDesign={true}
                                label="Confirm Password"
                                placeholder="Enter confirm password"
                                name="confirm_password"
                                type="password"
                                value={valuesPatient?.confirm_password}
                                onChange={handlePatientInputChange}
                                error={errors?.confirm_password}
                              /> */}
                            </div>
                            <div className="col-span-3">
                              <TextField
                                newDesign={true}
                                label="Address"
                                placeholder="Enter address"
                                name="address"
                                value={valuesPatient?.address}
                                onChange={handlePatientInputChange}
                                required={false}
                              />
                            </div>
                            {/* <div className="font-bold text-center text-sm mb-6 mt-6 ">
                              Already a Member? Click{' '}
                              <Link className="text-[#7348D0]" to="/login">
                                Here
                              </Link>{' '}
                              to Login
                            </div> */}
                            <div className="space-x-4 flex items-end justify-center py-2">
                              <button
                                onClick={handleProceedToPay}
                                className=" h-10 px-8 pt-1 py-2 text-lg font-semibold text-white bg-[#00856f] shadow-md rounded-3xl hover:bg-[#00453a] focus:outline-none focus:ring-2 focus:ring-[#00453a] focus:ring-opacity-75"
                              >
                                Register
                              </button>
                              {/* <button
                                type="button"
                                onClick={() => setIsPatientModal(false)}
                                className="w-24 h-10 px-4 py-2 text-sm font-semibold bg-[#d3d3d9] text-[#29294a] shadow-md rounded-lg hover:text-[#29294a] focus:outline-none focus:ring-0 focus:ring-[#29294a] focus:ring-opacity-75"
                              >
                                Cancel
                              </button> */}
                            </div>
                          </form>
                        </Modal>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <Modal
        maskClosable={false}
        bodyStyle={{
          maxHeight: 'calc(100vh - 150px)',
          overflowY: 'auto',
        }}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
      >
        <div>
          <ChoiceField
            newDesign={true}
            label="Payment Mode"
            name="payment_mode"
            options={paymentOptions}
            value={values?.payment_mode}
            onChange={handleInputChange}
            required={true}
          />
          <div className="mt-6">
            <InputField
              newDesign={true}
              label={'Doctor Fee'}
              type={'number'}
              placeholder={'Enter amount'}
              name={'amount'}
              value={values?.amount || ''}
              onChange={handleInputChange}
              disabled={true}
            />
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="terms"
              className="cancel-checkbox w-5 h-4 mt-3"
              checked={true}
              readOnly
              required
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-left ml-2 dark:text-[#1a1a1a] hover:underline cursor-pointer hover:text-primaryColor"
              onClick={handleTermsModalOpen} // Open terms modal
            >
              I accept terms and conditions
            </label>
          </div>
          <div className="space-x-4 flex items-end justify-end py-2">
            <button
              type="submit"
              onClick={changeapicallifmemberexisted} //ranjith removed  bookAppointmentHandler
              className="w-24 h-10 px-4 py-2 text-sm font-semibold text-white bg-[#04816A] shadow-md rounded-lg hover:bg-[#00453a] focus:outline-none focus:ring-2 focus:ring-[#00453a] focus:ring-opacity-75"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-24 h-10 px-4 py-2 text-sm font-semibold bg-[#d3d3d9] text-[#29294a] shadow-md rounded-lg hover:text-[#29294a] focus:outline-none focus:ring-0 focus:ring-[#29294a] focus:ring-opacity-75"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        maskClosable={false}
        bodyStyle={{
          maxHeight: 'calc(100vh - 150px)',
          overflowY: 'auto',
        }}
        visible={isModalOpen1}
        onCancel={() => setIsModalOpen1(false)}
        footer={null}
        className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
      >
        <div>
          <ChoiceField
            newDesign={true}
            label="Payment Mode"
            name="payment_mode"
            options={paymentOptions}
            value={values?.payment_mode}
            onChange={handleInputChange}
            required={true}
          />
          <div className="mt-6">
            <InputField
              newDesign={true}
              label={'Doctor Fee'}
              type={'number'}
              placeholder={'Enter amount'}
              name={'amount'}
              value={values?.amount || ''}
              onChange={handleInputChange}
              disabled={true}
            />
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="terms"
              className="cancel-checkbox w-5 h-4 mt-3"
              checked={true}
              readOnly
              required
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-left ml-2 dark:text-[#1a1a1a] hover:underline cursor-pointer hover:text-primaryColor"
              onClick={handleTermsModalOpen}
            >
              I accept terms and conditions
            </label>
          </div>
          <div className="space-x-4 flex items-end justify-end py-2">
            <button
              type="submit"
              onClick={handleFormSubmit}
              className="w-24 h-10 px-4 py-2 text-sm font-semibold text-white bg-[#04816A] shadow-md rounded-lg hover:bg-[#00453a] focus:outline-none focus:ring-2 focus:ring-[#00453a] focus:ring-opacity-75"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen1(false)}
              className="w-24 h-10 px-4 py-2 text-sm font-semibold bg-[#d3d3d9] text-[#29294a] shadow-md rounded-lg hover:text-[#29294a] focus:outline-none focus:ring-0 focus:ring-[#29294a] focus:ring-opacity-75"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        maskClosable={false}
        visible={isTermsModalOpen}
        onCancel={() => setIsTermsModalOpen(false)}
        footer={null}
        style={{ top: 20, height: '100vh' }}
        bodyStyle={{
          height: '100vh',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl"
      >
        <CancelTermsModal onClose={handleTermsModalClose} />
      </Modal>

      {/* <Pagination align="center" defaultCurrent={1} total={50} /> */}
      {/* FAQ Section */}
      <div className="mt-28 mb-8">
        <div className="text-center mb-2">
          <p className="text-[#7F56D9] font-semibold text-sm">Get Your Answer</p>
        </div>
        <h3 className="text-5xl font-bold text-[#1D2939] text-center mb-8">
          Frequently Asked Questions
        </h3>
        <img src={decoLeft} className="absolute left-0  w-36" />
        <img src={decoRight} className="absolute  right-0  w-32" />
        <div className="max-w-[80%] mx-auto grid  md:grid-cols-2  items-center">
          <div className="">
            <img src={DrImage} alt="Doctor with patient" className="w-fit  shadow-lg" />
          </div>

          <div className="space-y-4  ">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 cursor-pointer" onClick={() => handleFaqClick(1)}>
                <div className="flex items-center justify-between">
                  <span className="text-[#1D2939] font-medium">
                    Why choose our medical for your family?
                  </span>
                  <span className="text-[#7F56D9] text-2xl font-light">
                    {expandedFaq === 1 ? '−' : '+'}
                  </span>
                </div>
                {expandedFaq === 1 && (
                  <div className="mt-3 text-gray-600 text-sm">
                    We provide comprehensive family healthcare with experienced doctors,
                    state-of-the-art facilities, and personalized care plans. Our focus on
                    preventive care and holistic treatment ensures the best health outcomes for your
                    entire family.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 cursor-pointer" onClick={() => handleFaqClick(2)}>
                <div className="flex items-center justify-between">
                  <span className="text-[#1D2939] font-medium">
                    Why we are different from others?
                  </span>
                  <span className="text-[#7F56D9] text-2xl font-light">
                    {expandedFaq === 2 ? '−' : '+'}
                  </span>
                </div>
                {expandedFaq === 2 && (
                  <div className="mt-3 text-gray-600 text-sm">
                    Our unique approach combines cutting-edge technology with compassionate care. We
                    offer 24/7 support, shorter wait times, and integrated healthcare solutions that
                    set us apart from traditional medical services.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 cursor-pointer" onClick={() => handleFaqClick(3)}>
                <div className="flex items-center justify-between">
                  <span className="text-[#1D2939] font-medium">
                    Trusted & experience senior care & love
                  </span>
                  <span className="text-[#7F56D9] text-2xl font-light">
                    {expandedFaq === 3 ? '−' : '+'}
                  </span>
                </div>
                {expandedFaq === 3 && (
                  <div className="mt-3 text-gray-600 text-sm">
                    Our specialized senior care program is designed with expertise and compassion.
                    We have dedicated geriatric specialists and a support team that understands the
                    unique needs of elderly patients, providing both medical care and emotional
                    support.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 cursor-pointer" onClick={() => handleFaqClick(4)}>
                <div className="flex items-center justify-between">
                  <span className="text-[#1D2939] font-medium">
                    How to get appointment for emergency cases?
                  </span>
                  <span className="text-[#7F56D9] text-2xl font-light">
                    {expandedFaq === 4 ? '−' : '+'}
                  </span>
                </div>
                {expandedFaq === 4 && (
                  <div className="mt-3 text-gray-600 text-sm">
                    For emergencies, call our 24/7 hotline or use our urgent care booking system. We
                    prioritize emergency cases and ensure immediate attention with minimal wait
                    times. Our emergency response team is always ready to assist you.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src={leftZigZag} className="absolute left-0 top-[80%] w-20" />
      <AboutUsHero />
    </div>
  );
};

export default SearchDoctor;

const InputAgeField = (props) => {
  const {
    label,
    name,
    type = 'text',
    required = true,
    ageUnit,
    onAgeUnitChange, // Ensure correct handler name
    ...otherProps
  } = props;

  return (
    <div className="mb-6 mr-1">
      <label
        htmlFor={name + '-field'}
        className="flex text-sm leading-6 text-[#000000e0] dark:text-gray-300 font-display font-semibold"
      >
        {label} {required && <span className="text-[#e94a4a] ml-0.5 text-lg">*</span>}
      </label>

      <div className="mx-0.5 w-full py-0.5 flex items-center  border-[2px] border-[#ced4da] rounded-full focus-within:ring-1 focus-within:ring-[#04816A] focus-within:border-[#04816A]">
        <input
          className="block border-0 w-full rounded-full px-3 ml-0.5 py-2 text-[#404040] dark:bg-[#ffffff] placeholder-[#bfbfbf] focus:outline-none focus:ring-0 focus:ring-[#04816A] focus:border-[#04816A] dark:focus:ring-[#00bfa5] dark:focus:border-[#00bfa5] sm:text-sm font-inter transition duration-150 ease-in-out"
          name={name}
          id={name + '-field'}
          required={required}
          type={type}
          {...otherProps}
        />

        <select
          value={ageUnit}
          onChange={onAgeUnitChange}
          className="mr-2 p-2 focus:outline-none focus:ring-2 focus:ring-[#ffffff] dark:focus:ring-[#ffffff] dark:focus:border-[#ffffff] sm:text-sm font-inter transition duration-150 ease-in-out bg-white dark:bg-white text-black dark:text-[#000000] border border-[#ffffff] dark:border-[#ffffff] rounded"
        >
          <option value="years">Years</option>
          <option value="months">Months</option>
          <option value="days">Days</option>
        </select>
      </div>
    </div>
  );
};
