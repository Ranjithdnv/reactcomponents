import React, { useState, useRef, useCallback } from 'react';
import { SearchOutlined, UserOutlined, BankOutlined, TeamOutlined } from '@ant-design/icons';
import axiosInstance from '../apis/axios';
import { Link, useNavigate } from 'react-router-dom';
import DrImage from '../assets/images/div.elementor-widget-wrap 1.png';
import files from '../assets/images/files.png';
import call from '../assets/images/call.png';
import HospitalImg from '../assets/images/6513449 1.png';
import Why1 from '../assets/images/why1.png';
import Why2 from '../assets/images/why2.png';
import Why3 from '../assets/images/why3.png';
import Why4 from '../assets/images/why4.png';
import { message } from 'antd';
import Why5 from '../assets/images/why5.png';
import Why6 from '../assets/images/why6.png';
import moment from 'moment';
import AboutUsHero from '../modules/AboutUs/AboutUsHero';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import decoLeft from '../assets/images/decoLeft.png';
import decoRight from '../assets/images/decoRight.png';
import leftZigZag from '../assets/images/leftZigZagPurple.png';
import rightZigZag from '../assets/images/rightZigZagGreen.png';
import { enqueueSnackbar } from 'notistack';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const BookingNewScreen = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleFaqClick = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    country: '',
    business_name: '',
    business_type: '',
    url: '',
    email: '',
    demo_date: '',
    remarks: '',
    demo_status: 'Pending',
  });
  const datepickerRef = useRef(null);
  const [open, setOpen] = useState(false);
  // const handleClickOutside = (e) => {
  //   if (datepickerRef.current && !datepickerRef.current.contains(e.target)) {
  //     setOpen(false);
  //   }
  // };

  // React.useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => document.removeEventListener("click", handleClickOutside);
  // }, []);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name === 'email' && value !== '' && !emailPattern.test(value)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');

    setFormData((prev) => ({ ...prev, demo_date: formattedDate }));
    setErrors((prev) => ({ ...prev, demo_date: '' }));
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      let newErrors = {};

      if (!formData.name) newErrors.name = 'Name is required.';

      if (!formData.mobile || !/^\+\d{1,4} \d{8,}$/.test(formData.mobile)) {
        newErrors.mobile = 'Valid mobile number is required.';
      }

      if (!formData.city) newErrors.city = 'City is required.';
      if (!formData.country) newErrors.country = 'Country is required.';
      if (!formData.demo_date) newErrors.demo_date = 'Demo date is required.';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      axiosInstance
        .post(`/core/demo-registration/`, formData)
        .then((response) => {
          enqueueSnackbar('Demo Registration Successful!', { variant: 'success' });

          setFormData({
            name: '',
            mobile: '',
            city: '',
            country: '',
            business_name: '',
            business_type: '',
            url: '',
            email: '',
            demo_date: '',
            remarks: '',
          });
        })
        .catch((error) => {
          console.error('Submission error:', error);
          message.error('Something went wrong, please try again.');
        });
    },
    [formData, enqueueSnackbar]
  );

  return (
    <div className="min-h-screen">
      {/* Header Section with Background */}
      <div className=" mt-10 text-left bg-[#F8FAFC]">
        <div className="container mx-auto px-16 py-6">
          {/* <h1 className="text-[48px] font-bold text-center">
            Schedule Your <span className="text-[#8B5CF6]">Free</span>{' '}
            <span className="text-[#22C55E]">Demo</span> ...!
          </h1> */}
          {/* <span className="font-bold"> {'<'} Back</span> */}
        </div>
      </div>
      <div className="bg-[#F8FAFC]  mb-8">
        <div className="container mx-auto px-16 py-6">
          <h1 className="text-[48px] font-bold text-center">
            Schedule Your <span className="text-[#3c00be]">Free</span>{' '}
            <span className="text-[#04816A]">Demo</span> ...!
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-16">
        <div className="max-w-7xl mx-auto">
          {/* Explore MedFidelity Section */}
          <div className="mb-24">
            <div className="flex flex-col gap-2 text-left">
              <h2 className="text-[44px] font-bold leading-tight ">
                <span className="text-[#3c00be]">Explore MedFidelity</span>
                <span className="text-black">
                  {' '}
                  : Revolutionizing Healthcare with Innovation and Simplicity
                </span>
              </h2>
            </div>
            <p className="text-gray-600 text-2xl leading-relaxed mt-8">
              Experience the power of MedFidelity's all-in-one healthcare management solutions
              designed to elevate your practice. From hospitals and labs to clinics and pharmacies,
              our user-friendly software ensures streamlined operations and enhanced efficiency at
              every step.
            </p>
          </div>
          <img src={leftZigZag} className="absolute left-0 w-20" />
          <img src={decoRight} className="absolute  right-0 top-96 w-28" />
          {/* Form Section */}
          <div className="max-w-2xl mx-auto bg-white rounded-[55px] shadow-[4px_4px_30px_30px_rgba(139,92,246,0.1)] p-12 mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-[#1D2939]">Enter Your Details Here</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-6 text-left">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Name<span className="text-[#e94a4a]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Name"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none ${errors.name ? 'border-[#e94a4a]' : 'border-gray-300'}`}
                  />
                  {errors.name && <p className="text-[#e94a4a] text-sm">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Mobile<span className="text-[#e94a4a]">*</span>
                  </label>
                  <PhoneInput
                    country={'in'}
                    value={formData.mobile}
                    onChange={(phone, country, e) => {
                      const dialCode = `+${country.dialCode} `;
                      const numericPhone = phone.replace(/\D/g, '');

                      if (!numericPhone.startsWith(country.dialCode)) {
                        phone = formData.mobile.replace(/\D/g, '');
                      }
                      const formattedPhone = dialCode + numericPhone.slice(country.dialCode.length);

                      setFormData((prev) => ({ ...prev, mobile: formattedPhone }));

                      const minLength = country.format.replace(/\D/g, '').length;

                      if (numericPhone.length >= minLength) {
                        setErrors((prev) => ({ ...prev, mobile: '' }));
                      }
                    }}
                    onKeyDown={(e) => {
                      const input = e.target;
                      if (
                        input.selectionStart <= formData.mobile.indexOf(' ') + 1 &&
                        e.key === 'Backspace'
                      ) {
                        e.preventDefault();
                      }
                    }}
                    inputClass={`w-full pl-12 p-3 h-12 border rounded-lg focus:ring-2 focus:outline-none focus:ring-[#8B5CF6] ${
                      errors.mobile ? 'border-[#e94a4a]' : 'border-[#454545]'
                    }`}
                    buttonClass="flag-dropdown"
                  />
                  {errors.mobile && <p className="text-[#e94a4a] text-sm">{errors.mobile}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    City<span className="text-[#e94a4a]">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter Your City"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-[#8B5CF6] ${errors.city ? 'border-[#e94a4a]' : 'border-gray-300'}`}
                  />
                  {errors.city && <p className="text-[#e94a4a] text-sm">{errors.city}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Country<span className="text-[#e94a4a]">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter Your Country"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-[#8B5CF6] ${errors.country ? 'border-[#e94a4a]' : 'border-gray-300'}`}
                  />
                  {errors.country && <p className="text-[#e94a4a] text-sm">{errors.country}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    placeholder="Enter Hospital / Pharmacy / Lab Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <select
                    name="business_type"
                    value={formData.business_type}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-gray-500"
                  >
                    <option value="">Select Business Type</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Lab">Lab</option>
                    <option value="Hospital & Pharmacy">Hospital & Pharmacy</option>
                    <option value="Hospital & Lab">Hospital & Lab</option>
                    <option value="Pharmacy & Lab">Pharmacy & Lab</option>
                    <option value="Hospital & Pharmacy & Lab">Hospital & Pharmacy & Lab</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Website URL (if available)
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="Enter Your Website URL"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                      errors.email ? 'border-[#e94a4a]' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-[#e94a4a] text-sm">{errors.email}</p>}
                </div>

                <img src={decoLeft} className="absolute left-0  w-32" />
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Select a date<span className="text-[#e94a4a]">*</span>
                  </label>
                  <div className="relative">
                    <div
                      className={`relative border focus:outline-none px-0.5 w-full bg-[#ffffff] mt-1 rounded-md transition duration-150 ease-in-out ${
                        errors.demo_date ? 'border-[#e94a4a]' : 'border-gray-300'
                      } focus-within:ring-2 focus-within:ring-[#8B5CF6]`}
                      onClick={() => setOpen(true)}
                    >
                      <DatePicker
                        ref={datepickerRef}
                        className="block w-full rounded-md p-3 text-[#404040] bg-[#ffffff] border-none focus:outline-none"
                        selected={formData.demo_date}
                        onChange={handleDateChange}
                        open={open}
                        onCalendarClose={() => setOpen(false)}
                        onClickOutside={() => setOpen(false)}
                        popperPlacement="bottom-start"
                        popperClassName="custom-datepicker"
                        dateFormat="YYYY-MM-DD"
                        placeholderText="Select a date for demo"
                        showMonthDropdown
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={150}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.66667 1.66667V4.16667M13.3333 1.66667V4.16667M2.91667 7.575H17.0833M18.3333 7.08333V14.1667C18.3333 16.6667 17.0833 18.3333 14.1667 18.3333H5.83333C2.91667 18.3333 1.66667 16.6667 1.66667 14.1667V7.08333C1.66667 4.58333 2.91667 2.91667 5.83333 2.91667H14.1667C17.0833 2.91667 18.3333 4.58333 18.3333 7.08333Z"
                            stroke="#8B5CF6"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  {errors.demo_date && <p className="text-[#e94a4a] text-sm">{errors.demo_date}</p>}
                </div>

                <img src={rightZigZag} className="absolute right-0  w-32" />
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Remarks (Any Specific Requirement)
                  </label>
                  <textarea
                    placeholder="Enter Your Remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>

          <div className=" ">
            <p className="ml-64 text-sm max-w-[800px] text-gray-500 font-medium text-center mb-8">
              <span className="font-bold">MedFidelity</span> collects your contact details to share
              information about our products and services. You can opt out anytime. For more
              information on opting out and how we protect your data, please refer to our Privacy
              Policy .
            </p>
            <button
              onClick={handleSubmit}
              className="bg-[#04816A] mt-2 text-white px-8 py-3 mb-4 shadow-[5px_5px_15px_rgba(0,_0,_0,_0.35)] shadow-[#04816A] rounded-lg hover:bg-green-600 transition-colors text-lg font-bold"
            >
              REQUEST DEMO
            </button>
          </div>
          <img src={leftZigZag} className="absolute left-0 w-20" />
          <div className="mt-16 max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-[20px] border border-2px border-[#03A9F4] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
              <div>
                <h3 className="text-[24px] font-bold text-[#111827]">Ready to get started ?</h3>
                <p className="text-[#6B7280] text-[15px] mt-0.5">Your Health Our Priority....!</p>
              </div>
              <Link to="/doctors">
                <button className="bg-[#04816A] hover:bg-[#45a049] text-white px-10 py-4 rounded-[28px] text-[14px] tracking-wide font-medium transition-all duration-300 whitespace-nowrap ">
                  CREATE APPOINTMENT NOW!
                </button>
              </Link>
            </div>
          </div>
          {/* Why MedFidelity Section */}
          <div className="text-center mb-20 mt-8">
            <h3 className="text-5xl font-bold mb-12">Why MedFidelity?</h3>
            <div className="grid grid-cols-3 gap-8 items-center">
              {/* Left Features */}
              <div className="space-y-12">
                <div className="flex items-center gap-4 transform transition-all duration-300 hover:translate-x-2 hover:scale-105 cursor-pointer">
                  <div className="flex-shrink-0 transition-transform duration-300 hover:rotate-12">
                    <img src={Why1} alt="Efficiency" className="w-12 h-12" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-semibold mb-1">Efficiency</h4>
                    <p className="text-gray-600">Streamline operations and enhance care.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 transform transition-all duration-300 hover:translate-x-2 hover:scale-105 cursor-pointer">
                  <div className="flex-shrink-0 transition-transform duration-300 hover:rotate-12">
                    <img src={Why2} alt="Innovation" className="w-12 h-12" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-semibold mb-1">Innovation</h4>
                    <p className="text-gray-600">Stay ahead with advanced technology.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 transform transition-all duration-300 hover:translate-x-2 hover:scale-105 cursor-pointer">
                  <div className="flex-shrink-0 transition-transform duration-300 hover:rotate-12">
                    <img src={Why3} alt="User-Friendly" className="w-12 h-12" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-semibold mb-1">User-Friendly</h4>
                    <p className="text-gray-600">Intuitive design for easy use.</p>
                  </div>
                </div>
              </div>

              {/* Center Image */}
              <div className="flex justify-center items-center">
                <img src={HospitalImg} alt="Hospital Building" className="w-full max-w-md" />
              </div>

              {/* Right Features */}
              <div className="space-y-12 pl-12">
                <div className="flex items-center gap-4 transform transition-all duration-300 hover:-translate-x-2 hover:scale-105 cursor-pointer">
                  <div className="flex-shrink-0 transition-transform duration-300 hover:-rotate-12">
                    <img src={Why4} alt="Integration" className="w-12 h-12" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-semibold mb-1">Integration</h4>
                    <p className="text-gray-600">Unified system connectivity.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 transform transition-all duration-300 hover:-translate-x-2 hover:scale-105 cursor-pointer">
                  <div className="flex-shrink-0 transition-transform duration-300 hover:-rotate-12">
                    <img src={Why5} alt="Scalability" className="w-12 h-12" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-semibold mb-1">Scalability</h4>
                    <p className="text-gray-600">Fits clinics to hospitals.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 transform transition-all duration-300 hover:-translate-x-2 hover:scale-105 cursor-pointer">
                  <div className="flex-shrink-0 transition-transform duration-300 hover:-rotate-12">
                    <img src={Why6} alt="Security" className="w-12 h-12" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-semibold mb-1">Security</h4>
                    <p className="text-gray-600">Protects patient data.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* What to expect Section */}
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-8">What to expect ?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center group">
                <div className="bg-gray-100 p-8 rounded-full mb-6 transform transition-all duration-500 group-hover:rotate-[360deg]">
                  <img src={call} alt="Walkthrough" className="w-24 h-24" />
                </div>
                <p className="text-2xl font-bold">Walkthrough</p>
                <p className="text-lg text-gray-600">Customized demos for your needs</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="bg-gray-100 p-8 rounded-full mb-6 transform transition-all duration-500 group-hover:rotate-[360deg]">
                  <img src={files} alt="Features" className="w-24 h-24" />
                </div>
                <p className="text-2xl font-bold">Features</p>
                <p className="text-lg text-gray-600">Discover what makes MedFidelity unique.</p>
              </div>
              <div className="flex flex-col items-center group">
                <div className="bg-gray-100 p-8 rounded-full mb-6 transform transition-all duration-500 group-hover:rotate-[360deg]">
                  <img src={call} alt="Support" className="w-24 h-24" />
                </div>
                <p className="text-2xl font-bold">Support</p>
                <p className="text-lg text-gray-600">24/7 assistance always available.</p>
              </div>
            </div>
          </div>
          {/* FAQ Section */}
          {/* <div className="mb-16">
            <div className="text-center mb-2">
              <p className="text-[#7F56D9] font-semibold text-sm">Get Your Answer</p>
            </div>
            <h3 className="text-5xl font-bold text-[#1D2939] text-center mb-8">
              Frequently Asked Questions
            </h3>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              <div className="">
                <img src={DrImage} alt="Doctor with patient" className="w-fit  shadow-lg" />
              </div>

              
              <div className="space-y-4">
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
                        preventive care and holistic treatment ensures the best health outcomes for
                        your entire family.
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
                        Our unique approach combines cutting-edge technology with compassionate
                        care. We offer 24/7 support, shorter wait times, and integrated healthcare
                        solutions that set us apart from traditional medical services.
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
                        Our specialized senior care program is designed with expertise and
                        compassion. We have dedicated geriatric specialists and a support team that
                        understands the unique needs of elderly patients, providing both medical
                        care and emotional support.
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
                        For emergencies, call our 24/7 hotline or use our urgent care booking
                        system. We prioritize emergency cases and ensure immediate attention with
                        minimal wait times. Our emergency response team is always ready to assist
                        you.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <AboutUsHero />
    </div>
  );
};

export default BookingNewScreen;
