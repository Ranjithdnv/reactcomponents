//@ts-nocheck

import React, { useState } from 'react';
import Select from 'react-select';
import Button from './Button';
import { SearchOutlined } from '@ant-design/icons';
import { getDoctorsList } from '../apis/doctorsApi';

const SearchComponent = ({ cities, onSearch }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [locationInputValue, setLocationInputValue] = useState('');
  const [hospitalInputValue, setHospitalInputValue] = useState('');
  const doctorCards = [
    {
      id: 1,
      name: 'Dr. Daiva',
      specialty: 'Cardiology',
      experience: '14 years experience overall',
      location: 'Visakhapatnam',
      consultationType: 'Consultation fee at clinic',
      rating: '99%',
      patients: '93 Patients',
      timeSlots: {
        Morning: ['11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM'],
        Afternoon: [
          '12:00 PM',
          '12:30 PM',
          '01:30 PM',
          '02:00 PM',
          '02:30 PM',
          '03:00 PM',
          '03:30 PM',
          '04:00 PM',
        ],
        Evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'],
      },
    },
    {
      id: 2,
      name: 'Dr. Daiva',
      specialty: 'Cardiology',
      experience: '14 years experience overall',
      location: 'Visakhapatnam',
      consultationType: 'Consultation fee at clinic',
      rating: '99%',
      patients: '93 Patients',
      timeSlots: {
        Morning: ['11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM'],
        Afternoon: [
          '12:00 PM',
          '12:30 PM',
          '01:30 PM',
          '02:00 PM',
          '02:30 PM',
          '03:00 PM',
          '03:30 PM',
          '04:00 PM',
        ],
        Evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'],
      },
    },
    {
      id: 3,
      name: 'Dr. Daiva',
      specialty: 'Cardiology',
      experience: '14 years experience overall',
      location: 'Visakhapatnam',
      consultationType: 'Consultation fee at clinic',
      rating: '99%',
      patients: '93 Patients',
      timeSlots: {
        Morning: ['11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM'],
        Afternoon: [
          '12:00 PM',
          '12:30 PM',
          '01:30 PM',
          '02:00 PM',
          '02:30 PM',
          '03:00 PM',
          '03:30 PM',
          '04:00 PM',
        ],
        Evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'],
      },
    },
    {
      id: 4,
      name: 'Dr. Daiva',
      specialty: 'Cardiology',
      experience: '14 years experience overall',
      location: 'Visakhapatnam',
      consultationType: 'Consultation fee at clinic',
      rating: '99%',
      patients: '93 Patients',
      timeSlots: {
        Morning: ['11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM'],
        Afternoon: [
          '12:00 PM',
          '12:30 PM',
          '01:30 PM',
          '02:00 PM',
          '02:30 PM',
          '03:00 PM',
          '03:30 PM',
          '04:00 PM',
        ],
        Evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'],
      },
    },
    {
      id: 5,
      name: 'Dr. Daiva',
      specialty: 'Cardiology',
      experience: '14 years experience overall',
      location: 'Visakhapatnam',
      consultationType: 'Consultation fee at clinic',
      rating: '99%',
      patients: '93 Patients',
      timeSlots: {
        Morning: ['11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM'],
        Afternoon: [
          '12:00 PM',
          '12:30 PM',
          '01:30 PM',
          '02:00 PM',
          '02:30 PM',
          '03:00 PM',
          '03:30 PM',
          '04:00 PM',
        ],
        Evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'],
      },
    },
    {
      id: 6,
      name: 'Dr. Daiva',
      specialty: 'Cardiology',
      experience: '14 years experience overall',
      location: 'Visakhapatnam',
      consultationType: 'Consultation fee at clinic',
      rating: '99%',
      patients: '93 Patients',
      timeSlots: {
        Morning: ['11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM'],
        Afternoon: [
          '12:00 PM',
          '12:30 PM',
          '01:30 PM',
          '02:00 PM',
          '02:30 PM',
          '03:00 PM',
          '03:30 PM',
          '04:00 PM',
        ],
        Evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'],
      },
    },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '1px solid #E5E7EB',
      borderRadius: '6px',
      minHeight: '42px',
      boxShadow: 'none',
      cursor: 'text',
      '&:hover': {
        border: '1px solid #3c00be',
      },
    }),
    dropdownIndicator: () => ({
      display: 'none',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3c00be' : state.isFocused ? '#EDE9FE' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#3c00be',
        color: 'white',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: '#374151',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9CA3AF',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#374151',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '6px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      zIndex: 9999,
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const cityOptions = Array.isArray(cities)
    ? cities.map((city) => ({
        value: city.id,
        label: `${city.name}`,
        locations: city.locations || [],
      }))
    : [];

  const locationOptions = selectedCity
    ? selectedCity.locations.map((location) => ({
        value: location.id,
        label: location.name,
        pincode: location.pincode,
        hospitals: location.hospitals || [],
      }))
    : [];

  const hospitalOptions = selectedLocation
    ? selectedLocation.hospitals.map((hospital) => ({
        value: hospital.id,
        label: hospital.name,
        email: hospital.email,
        contact: hospital.contact,
      }))
    : [];

  const handleCityInputChange = (newValue, { action }) => {
    if (action === 'input-change') {
      setInputValue(newValue || '');
    }
  };

  const handleLocationInputChange = (newValue, { action }) => {
    if (action === 'input-change') {
      setLocationInputValue(newValue || '');
    }
  };

  const handleHospitalInputChange = (newValue, { action }) => {
    if (action === 'input-change') {
      setHospitalInputValue(newValue || '');
    }
  };

  const handleCityChange = (selectedOption, { action }) => {
    if (action === 'clear') {
      setSelectedCity(null);
      setSelectedLocation(null);
      setSelectedHospital(null);
      setInputValue('');
    } else if (action === 'select-option') {
      setSelectedCity(selectedOption);
      setSelectedLocation(null);
      setSelectedHospital(null);
    }
  };

  const handleLocationChange = (selectedOption, { action }) => {
    if (action === 'clear') {
      setSelectedLocation(null);
      setSelectedHospital(null);
      setLocationInputValue('');
    } else if (action === 'select-option') {
      setSelectedLocation(selectedOption);
      setSelectedHospital(null);
    }
  };

  const handleHospitalChange = (selectedOption, { action }) => {
    if (action === 'clear') {
      setSelectedHospital(null);
      setHospitalInputValue('');
    } else if (action === 'select-option') {
      setSelectedHospital(selectedOption);
    }
  };

  const filterOption = (option, input) => {
    if (!input) return false;
    return option.label.toLowerCase().includes(input.toLowerCase());
  };

  const handleSearch = async () => {
    if (selectedHospital) {
      try {
        const response = await getDoctorsList({ hospitalId: selectedHospital.value });
        console.log('Doctors List Response:', response);
        if (onSearch) {
          onSearch(response);
          //onSearch(doctorCards);
          console.log(doctorCards);
          console.log(111111111110);
        }
      } catch (error) {
        console.log(111111111110);
        console.error('Error fetching doctors:', error);
      }
    }
  };

  return (
    <div className="w-full px-16  py-8 bg-[#efefef] shadow-md">
      <div className="container mx-auto">
        <div className="ml-36 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="w-full">
            <Select
              value={selectedCity}
              onChange={handleCityChange}
              onInputChange={handleCityInputChange}
              options={cityOptions}
              styles={customStyles}
              placeholder="search cities"
              isClearable
              isSearchable
              filterOption={filterOption}
              noOptionsMessage={({ inputValue }) =>
                inputValue?.trim().length > 0
                  ? 'No matches found'
                  : 'Start typing to search cities...'
              }
              loadingMessage={() => 'Loading cities...'}
              className="w-full"
              menuPortalTarget={document.body}
              menuPosition="fixed"
              blurInputOnSelect={true}
              minMenuHeight={50}
              maxMenuHeight={200}
              openMenuOnClick={false}
              openMenuOnFocus={false}
            />
          </div>
          <div className="w-full">
            <Select
              value={selectedLocation}
              onChange={handleLocationChange}
              onInputChange={handleLocationInputChange}
              options={locationOptions}
              styles={customStyles}
              placeholder="search locations"
              isClearable
              isSearchable
              filterOption={filterOption}
              isDisabled={!selectedCity}
              noOptionsMessage={({ inputValue }) => {
                if (!selectedCity) return 'Please select a city first';
                return inputValue?.trim().length > 0
                  ? 'No matches found'
                  : 'Start typing to search locations...';
              }}
              loadingMessage={() => 'Loading locations...'}
              className="w-full"
              menuPortalTarget={document.body}
              menuPosition="fixed"
              blurInputOnSelect={true}
              minMenuHeight={50}
              maxMenuHeight={200}
              openMenuOnClick={false}
              openMenuOnFocus={false}
            />
          </div>
          <div className="w-full">
            <Select
              value={selectedHospital}
              onChange={handleHospitalChange}
              onInputChange={handleHospitalInputChange}
              options={hospitalOptions}
              styles={customStyles}
              placeholder="search hospitals"
              isClearable
              isSearchable
              filterOption={filterOption}
              isDisabled={!selectedLocation}
              noOptionsMessage={({ inputValue }) => {
                if (!selectedLocation) return 'Please select a location first';
                return inputValue?.trim().length > 0
                  ? 'No matches found'
                  : 'Start typing to search hospitals...';
              }}
              loadingMessage={() => 'Loading hospitals...'}
              className="w-full"
              menuPortalTarget={document.body}
              menuPosition="fixed"
              blurInputOnSelect={true}
              minMenuHeight={50}
              maxMenuHeight={200}
              openMenuOnClick={false}
              openMenuOnFocus={false}
            />
          </div>
          <div className="w-full flex justify-start">
            <Button
              label={
                <span className="flex items-center gap-1">
                  <SearchOutlined /> Search
                </span>
              }
              className="bg-[#04816A] text-white rounded-xl px-6 py-2 flex items-center whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              // disabled={!selectedCity || !selectedLocation || !selectedHospital}
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
