import React, { useState } from 'react';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

const InputField = (props) => {
  const {
    label,
    icon,
    name,
    type = 'text',
    error,
    required = true,
    maxDate,
    disable,
    newDesign,
    ...otherProps
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (props.onChange) props.onChange(event); // Ensure external change handler is called
  };

  return (
    <div className="mb-6">
      {/* Label */}
      <label
        htmlFor={name + '-field'}
        className={`flex ${newDesign ? 'text-xl ml-4' : 'text-sm'} leading-6 text-[#000000e0] dark:text-gray-300 font-display font-semibold`}
      >
        {label} {required && <span className="text-[#e94a4a] ml-0.5 text-lg">*</span>}
      </label>

      {/* Input Container */}
      <div className={`relative px-0.5 ${label ? 'mt-1' : ''}`}>
        {/* Icon */}
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          className={`block w-full ${newDesign ? 'rounded-full border border-[2px]  shadow-lg border-[#04816A] px-3 py-2.5 ' : ' rounded-md border'}  ${
            error
              ? 'border-[#ff4d4f] focus:border-[#ff4d4f] focus:ring-[#ff4d4f]'
              : 'border-[#ced4da] hover:border-[#04816A] focus:ring-[#04816A] focus:border-[#04816A] dark:focus:ring-[#00bfa5] dark:focus:border-[#00bfa5]'
          } dark:border-[#ced4da] px-3 py-2 text-[#404040] dark:bg-[#ffffff] placeholder-[#bfbfbf] dark:placeholder-[#bfbfbf] focus:outline-none sm:text-sm font-inter transition duration-150 ease-in-out ${
            icon ? 'pl-10' : ''
          }`}
          name={name}
          id={name + '-field'}
          required={required}
          type={showPassword ? 'text' : type}
          onChange={handleInputChange}
          max={maxDate}
          disabled={disable}
          {...otherProps}
        />

        {/* Show/Hide Password Toggle */}
        {type === 'password' && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {showPassword ? (
              <HiEyeSlash className="w-5 h-5 text-[#04816A] dark:text-[#04816A]" />
            ) : (
              <HiEye className="w-5 h-5 text-[#04816A] dark:text-[#04816A]" />
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-[#ff4d4f] dark:text-[#ff4c4c] font-inter">{error}</p>
      )}
    </div>
  );
};

export default InputField;
