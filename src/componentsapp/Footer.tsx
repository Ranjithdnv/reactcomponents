import React from 'react';
import logo from '../assets/images/medLogo.png';
import { Link } from 'react-router-dom';
import facebook from '../assets/images/facebook.jpg';
import instagram from '../assets/images/instagram.jpg';
import twitter from '../assets/images/twitter.jpg';
import linkedin from '../assets/images/linkedin.jpg';
import Select from 'react-select';

function Footer() {
  const languageOptions = [
    { value: 'en', label: 'English - En' },
    { value: 'es', label: 'Spanish - Es' },
    { value: 'fr', label: 'French - Fr' },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '9999px',
      border: '1px solid #e5e7eb',
      // minHeight: '35px',
      boxShadow: 'none',
      paddingLeft: '8px',
      '&:hover': {
        border: '1px solid #3c00be',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3c00be' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      '&:hover': {
        backgroundColor: state.isSelected ? '#7C3AED' : '#f3f4f6',
      },
      '&:active': {
        backgroundColor: '#3c00be',
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '15px',
      overflow: 'hidden',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#374151',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#374151',
      '&:hover': {
        color: '#3c00be',
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    valueContainer: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '2px 8px',
    }),
  };

  const formatOptionLabel = ({ label }) => (
    <div className="flex items-center gap-2">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#374151]"
      >
        <path
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 12H21"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 3C14.5013 5.73835 15.9228 9.29203 16 12C15.9228 15.708 14.5013 19.2616 12 21C9.49872 19.2616 8.07725 15.708 8 12C8.07725 9.29203 9.49872 5.73835 12 3Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[#374151]">{label}</span>
    </div>
  );

  return (
    <div className="flex-col flex-wrap shadow-2xl grid grid-cols-4  px-4 p-8 py-8 md:py-14 sm:px-8 md:px-10 lg:px-24  md:flex-row">
      <div className="flex flex-col items-center justify-start md:items-start ">
        <img src={logo} alt="Logo" className="w-44 h-auto" />
        <span className="mt-4 text-xs font-light text-[#000000] font-normal ">
          Visakapatnam , Andhra Pradesh
        </span>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">-530045</span>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">+91- XXXXXXX632</span>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">
          info@medfidelity.com
        </span>
      </div>

      <div className="flex flex-col  justify-left md:items-start ">
        <h2 className="text-[#3c00be]">Quick Links</h2>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">
          <Link href="#">{'>'} About Us</Link>
        </span>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">
          <Link href="#">{'>'} Our Pricing</Link>
        </span>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">
          <Link href="#">{'>'} Our Gallery</Link>
        </span>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">
          <Link href="#"> {'>'} Appointment</Link>
        </span>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">
          <Link href="#"> {'>'} Privacy Policy</Link>
        </span>
      </div>

      <div className="flex flex-col  justify-left md:items-start ">
        <h2 className="text-[#3c00be]">Depatment</h2>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">
          <Link href="#"> {'>'} Orthology</Link>
        </span>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">
          <Link href="#"> {'>'} Neurology</Link>
        </span>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">
          <Link href="#"> {'>'} Neurology</Link>
        </span>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">
          <Link href="#">{'>'} Opthalmology</Link>
        </span>
        <span className="mt-1 text-xs font-light text-[#000000] font-normal ">
          <Link href="#"> {'>'} Cardiology</Link>
        </span>
      </div>
      <div className="flex flex-col  justify-left md:items-start ">
        <div className="flex gap-2 mt-2 w-12">
          <img src={facebook} alt="Facebook" />
          <img src={instagram} alt="Instagram" />
          <img src={twitter} alt="Twitter" />
          <img src={linkedin} alt="LinkedIn" />
        </div>
        <div className="mt-4" style={{ width: '180px' }}>
          <Select
            options={languageOptions}
            defaultValue={languageOptions[0]}
            styles={customStyles}
            isSearchable={false}
            formatOptionLabel={formatOptionLabel}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
