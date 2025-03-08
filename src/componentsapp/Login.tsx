import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../apis/loginApi';
import { passwordApi } from '../apis/passwordApi';
import { endpoints } from '../constants';
import { sendOtpToAdminApi } from '../apis/sendOtpToAdminApi';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/slice';
import axiosInstance from '../apis/axios';
import TermsModal from './TermsModal';
import { HiEye, HiEyeSlash, HiOutlinePhone } from 'react-icons/hi2';
import { enqueueSnackbar } from 'notistack';
import { FaStethoscope, FaHeartbeat } from 'react-icons/fa';
import { GiMedicines } from 'react-icons/gi';
import { CiMedicalCase } from 'react-icons/ci';
import { IoBandageOutline } from 'react-icons/io5';
import { TfiLock } from 'react-icons/tfi';
import BackGroundImg from '../assets/images/LoginBG.png';
import LogImg from '../assets/images/LogIMg (3).png';
import Waves from '../assets/images/Topology-1.png';
import { Spin } from 'antd';
import 'antd/dist/reset.css';
import LabEmployeeForm from '../pages/manageLabEmployee/form';
import { businessModelObj, allUrlLink } from '../components/businessModel';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const [registered, setRegistered] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userInfoID, setUserInfoID] = useState(null);
  const [formData, setFormData] = useState({
    phone_no: '',
    otp: '',
    password: '',
  });
  const [loginMethod, setLoginMethod] = useState('otp');
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = () => {
    setRegistered(!registered);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // const trimmedPhoneNumber = formData.phone_no.replace(/\s+/g, '');

    // if (isNaN(formData.phone_no.length) || formData.phone_no.length < 10) {
    //   enqueueSnackbar("Invalid Phone Number.", { variant: "error" });
    //   setIsLoading(false);
    //   return;
    // }

    let trimmedPhoneNumber = formData.phone_no.replace(/\s+/g, '');
    if (!trimmedPhoneNumber.startsWith('+91 ')) {
      trimmedPhoneNumber = `+91 ${trimmedPhoneNumber}`;
    }

    try {
      if (loginMethod === 'otp') {
        if (isOtpSent) {
          // Login with OTP
          console.log('info', userInfoID);

          let payload = {
            username: trimmedPhoneNumber,
            otp: formData.otp,
          };

          if (userInfoID) {
            payload.data = {
              user_id: userInfoID,
              accepted: 1,
            };
          }

          // console.log("PAYLOAD",payload)
          const response = await loginApi(payload);
          localStorage.setItem('token', response?.data?.access_token);
          const profileResponse = await axiosInstance.get(endpoints.ProfileUrl);
          const {
            first_name,
            last_name,
            mid_name,
            dob,
            gender,
            role,
            profile_pic,
            phone_no,
            organization,
          } = profileResponse?.data;
          const organizationName = organization?.name;
          const business_model = organization?.business_model;

          const userData = {
            first_name,
            last_name,
            mid_name,
            gender,
            role,
            dob,
            profile_pic,
            phone_no,
            organizationName,
            business_model,
          };
          console.log('userData', userData);
          dispatch(setUserData(userData));
          let modelObj = businessModelObj[business_model - 1];
          let redirectedUrl = '';
          if (role === 'SuperAdmin') {
            redirectedUrl = allUrlLink.filter((val) => modelObj?.SuperAdmin?.includes(val));
            navigate(redirectedUrl[0]);
          } else if (role === 'LabAdmin') {
            redirectedUrl = allUrlLink.filter((val) => modelObj?.LabAdmin?.includes(val));
            navigate(redirectedUrl[0]);
          } else if (role === 'LabReceptionist') {
            redirectedUrl = allUrlLink.filter((val) => modelObj?.LabReceptionist?.includes(val));
            navigate(redirectedUrl[0]);
          } else if (role === 'LabEmployee') {
            redirectedUrl = allUrlLink.filter((val) => modelObj?.LabEmployee?.includes(val));
            navigate(redirectedUrl[0]);
          } else if (role === 'PharmacyAdmin') {
            redirectedUrl = allUrlLink.filter((val) => modelObj?.PharmacyAdmin?.includes(val));
            navigate(redirectedUrl[0]);
          } else if (role === 'HospitalAdmin') {
            redirectedUrl = allUrlLink.filter((val) => modelObj?.HospitalAdmin?.includes(val));
            navigate(redirectedUrl[0]);
          } else if (role === 'Doctor') {
            redirectedUrl = allUrlLink.filter((val) => modelObj?.Doctor?.includes(val));
            navigate(redirectedUrl[0]);
          } else if (role === 'Receptionist') {
            redirectedUrl = allUrlLink.filter((val) => modelObj?.Receptionist?.includes(val));
            navigate(redirectedUrl[0]);
          } else if (role === 'Nurse') {
            redirectedUrl = allUrlLink.filter((val) => modelObj?.Nurse?.includes(val));
            navigate(redirectedUrl[0]);
          } else if (role === 'Patient') {
            navigate('/patient-information');
          } else if (role === 'Nurse') {
            navigate('/patient-vitals');
          } else if (role === 'Receptionist') {
            navigate('/manage-appointment');
          } else {
            navigate('/dashboard');
          }
        } else {
          // Send OTP
          const otpSentResponse = await sendOtpToAdminApi(trimmedPhoneNumber);

          if (otpSentResponse) {
            const otp = otpSentResponse.data.data.otp;
            //console.log("OTP Sent:", otp);
            setIsOtpSent(true);

            if (otpSentResponse.data.data.user_info) {
              //console.log("user info:",otpSentResponse.data.data.user_info);
              setUserInfo(otpSentResponse.data.data.user_info);
              setUserInfoID(otpSentResponse.data.data.user_id);
            } else {
              setUserInfo(null);
              setUserInfoID(null);
            }
          } else {
            setIsOtpSent(false);
          }
        }
      } else {
        // Login with password if (otpSent?.user_info) {
        let payload = {
          phone_no: trimmedPhoneNumber,
          password: formData.password,
        };

        if (userInfo) {
          payload.user_id = userInfo.id;
          payload.accepted = 1;
        }

        const response = await passwordApi(payload);
        localStorage.setItem('token', response?.data?.access_token);
        const profileResponse = await axiosInstance.get(endpoints.ProfileUrl);
        const {
          first_name,
          last_name,
          gender,
          mid_name,
          role,
          dob,
          profile_pic,
          phone_no,
          organization,
        } = profileResponse?.data;
        const organizationName = organization?.name;
        const business_model = organization?.business_model;

        const userData = {
          first_name,
          mid_name,
          last_name,
          role,
          gender,
          phone_no,
          profile_pic,
          organizationName,
          business_model,
          dob,
        };

        dispatch(setUserData(userData));
        console.log('userData', userData);
        let modelObj = businessModelObj[business_model - 1];
        let redirectedUrl = '';
        if (role === 'SuperAdmin') {
          redirectedUrl = allUrlLink.filter((val) => modelObj?.SuperAdmin?.includes(val));
          navigate(redirectedUrl[0]);
        } else if (role === 'LabAdmin') {
          redirectedUrl = allUrlLink.filter((val) => modelObj?.LabAdmin?.includes(val));
          navigate(redirectedUrl[0]);
        } else if (role === 'LabReceptionist') {
          redirectedUrl = allUrlLink.filter((val) => modelObj?.LabReceptionist?.includes(val));
          navigate(redirectedUrl[0]);
        } else if (role === 'LabEmployee') {
          redirectedUrl = allUrlLink.filter((val) => modelObj?.LabEmployee?.includes(val));
          navigate(redirectedUrl[0]);
        } else if (role === 'PharmacyAdmin') {
          redirectedUrl = allUrlLink.filter((val) => modelObj?.PharmacyAdmin?.includes(val));
          navigate(redirectedUrl[0]);
        } else if (role === 'HospitalAdmin') {
          redirectedUrl = allUrlLink.filter((val) => modelObj?.HospitalAdmin?.includes(val));
          navigate(redirectedUrl[0]);
        } else if (role === 'Doctor') {
          redirectedUrl = allUrlLink.filter((val) => modelObj?.Doctor?.includes(val));
          navigate(redirectedUrl[0]);
        } else if (role === 'Receptionist') {
          redirectedUrl = allUrlLink.filter((val) => modelObj?.Receptionist?.includes(val));
          navigate(redirectedUrl[0]);
        } else if (role === 'Nurse') {
          redirectedUrl = allUrlLink.filter((val) => modelObj?.Nurse?.includes(val));
          navigate(redirectedUrl[0]);
        } else if (role === 'Patient') {
          navigate('/patient-information');
        } else if (role === 'Nurse') {
          navigate('/patient-vitals');
        } else if (role === 'Receptionist') {
          navigate('/manage-appointment');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
    setIsLoading(false);
  };

  const formInputHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'phone_no' || name === 'otp') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      const trimmedValue = value.trimStart().replace(/\s+/g, ' ').replace(/^\s+/, '');
      setFormData({
        ...formData,
        [name]: trimmedValue,
      });
    }
  };

  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
    setIsOtpSent(false);
    setFormData({ phone_no: '', otp: '', password: '' });
  };

  const handleReEnterPhoneNumber = () => {
    setIsOtpSent(false);
    setFormData((prevState) => ({ ...prevState, otp: '' }));
  };

  const handleCheckboxChange = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsTermsChecked(false);
  };

  const acceptTerms = () => {
    setIsTermsChecked(true);
    setIsModalOpen(false);
  };

  const handleImageError = () => {
    enqueueSnackbar('Failed to load image.', { variant: 'error' });
    setIsImageLoading(false);
  };

  return (
    <div
      className="relative flex items-center justify-center w-full min-h-screen"
      style={{
        backgroundImage: `url(${BackGroundImg})`,
        height: '100vh',
        width: '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 w-[90%] sm:w-[400px] xl:w-[600px]">
        <h2 className="text-[#3c00be] text-2xl font-semibold text-center text-gray-800 dark:text-[#3c00be]">
          Login
        </h2>

        <form className="space-y-4 mt-4" onSubmit={loginHandler}>
          {/* Phone Number Input */}
          <div>
            {/* <label htmlFor="phone_no" className="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-[#3e3e3e]">
                        Phone Number
                      </label> */}
            <InputField
              type="phone"
              label="Phone Number"
              name="phone_no"
              id="phone_no"
              icon={<HiOutlinePhone className="w-5 h-5 text-[#575757] font-bold" />}
              value={formData.phone_no}
              placeholder="Phone number"
              required
              onChange={formInputHandler}
            />
          </div>
          <div className="flex items-center space-x-4 dark:text-[#1d1d1d]">
            <label className="flex items-center">
              <input
                type="radio"
                name="loginMethod"
                value="otp"
                checked={loginMethod === 'otp'}
                onChange={() => handleLoginMethodChange('otp')}
                className="mr-2 custom-radio-log appearance-none w-3 h-3 border-2 rounded-full"
                style={{ accentColor: '#3c00be' }}
              />
              OTP
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="loginMethod"
                value="password"
                checked={loginMethod === 'password'}
                onChange={() => handleLoginMethodChange('password')}
                className="mr-2 custom-radio-log appearance-none w-3 h-3 border-2 rounded-full"
                style={{ accentColor: '#3c00be' }}
              />
              Password
            </label>
          </div>
          {loginMethod === 'otp' && isOtpSent && (
            <div className="dark:text-[#1a1a1a]">
              {/* <label htmlFor="otp" className="block mb-2 text-sm font-medium text-left text-gray-900">
                          OTP
                        </label> */}
              <InputField
                label="OTP"
                type="text"
                name="otp"
                required
                id="otp"
                value={formData.otp}
                placeholder="OTP"
                icon={<TfiLock className="w-5 h-5 text-[#4d4d4d] font-bold" />}
                onChange={formInputHandler}
              />
              {loginMethod === 'otp' && isOtpSent && userInfo && (
                <>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={isTermsChecked}
                      onChange={handleCheckboxChange}
                      className="custom-checkbox w-10 md:w-8 h-4"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-left ml-2"
                    >
                      I accept Terms and Conditions, User Agreement, Privacy policy and Cancellation
                      policy and data security
                    </label>
                  </div>
                </>
              )}
            </div>
          )}
          {loginMethod === 'password' && (
            <div className="dark:text-[#151515]">
              {/* <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-left text-gray-900"
                        >
                          Password
                        </label> */}
              <InputField
                type="password"
                name="password"
                label="Password"
                required
                id="password"
                value={formData.password}
                placeholder="Password"
                onChange={formInputHandler}
                icon={<TfiLock className="w-5 h-5 text-[#4d4d4d] font-bold" />}
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={isTermsChecked}
                  onChange={handleCheckboxChange}
                  className="custom-checkbox-log w-10 md:w-6 h-4"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 dark:text-gray-300 mt-4 text-left ml-2"
                >
                  I accept Terms and Conditions, User Agreement, Privacy policy and Cancellation
                  policy and data security
                </label>
              </div>
            </div>
          )}
          {isOtpSent && (
            <div className="ml-3 text-sm dark:text-[#000000]">
              <label
                htmlFor="remember"
                className="text-purple text-decoration-line: underline dark:text-blue"
                onClick={handleReEnterPhoneNumber}
              >
                Re-enter the phone number
              </label>
            </div>
          )}
          {loginMethod === 'otp' && (
            <button
              type="submit"
              disabled={isLoading}
              className={`w-1/2 text-white font-medium rounded-full text-base px-5 py-3 text-center capitalize ${
                isLoading ? 'bg-[#3c00be] opacity-50 cursor-not-allowed' : 'bg-[#3c00be]'
              }`}
              style={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              }}
            >
              {isOtpSent ? 'Login' : 'Send OTP'}
            </button>
          )}

          {loginMethod === 'password' && (
            <button
              type="submit"
              disabled={isLoading}
              className={`w-1/2 text-white font-medium text-base px-5 py-3 text-center capitalize rounded-full ${
                isLoading ? 'bg-[#6ab19d] cursor-not-allowed' : 'bg-[#3c00be]'
              }`}
              style={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              }}
            >
              Login
            </button>
          )}

          {/* <button
                      className="w-full text-black button-filled"
                      disabled={
                        loginMethod === "otp" && isOtpSent && !isTermsChecked
                      }
                    >
                      {loginMethod === "otp"
                        ? isOtpSent
                          ? "Login"
                          : "Send OTP"
                        : "Login"}
                    </button> */}

          {/* <div className="ml-3 text-sm r">
            <a
              href="/"
              className=" underline dark:text-[#3c00be] text-[#3c00be] hover:text-[#3c00be]"
            >
              Go to Home Page
            </a>
          </div> */}
        </form>
      </div>
      <TermsModal isOpen={isModalOpen} onClose={closeModal} onAccept={acceptTerms} />{' '}
    </div>
  );
};
export default LoginPage;

const InputField = (props) => {
  const { label, name, type = 'text', required = true, maxDate, icon, ...otherProps } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setIsEmpty(inputValue.trim() === '');
  };

  return (
    <div className="mb-6">
      {label && (
        <label
          htmlFor={`${name}-field`}
          className="flex text-sm leading-6 text-[#3a3a3a] font-display font-semibold"
        >
          {label}
        </label>
      )}

      <div className={`relative px-0.5 ${label ? 'mt-1' : ''}`}>
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          className={`${
            icon ? 'pl-12' : ''
          } block w-full rounded-full px-3 py-3 text-[#404040] dark:bg-[#ffffff] placeholder-[#7f7f7f] dark:placeholder-[#7f7f7f] focus:outline-none sm:text-sm font-inter transition duration-150 ease-in-out`}
          style={{ boxShadow: '#d6d6d6 5px 5px 10px 2px' }}
          name={name}
          id={name + '-field'}
          required={required}
          type={showPassword ? 'text' : type}
          onChange={handleInputChange}
          max={maxDate}
          {...otherProps}
        />

        {type === 'password' && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => {
              setShowPassword((prevState) => !prevState);
            }}
          >
            {showPassword ? (
              <HiEyeSlash className="w-5 h-5 text-[#3c00be] dark:text-[#3c00be]" />
            ) : (
              <HiEye className="w-5 h-5 text-[#3c00be] dark:text-[#3c00be]" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div role="status" className="flex justify-center w-full mx-auto">
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-gray-300 animate-spin dark:text-gray-600 fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
