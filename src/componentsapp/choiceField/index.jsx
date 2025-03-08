import React from 'react';

const ChoiceField = (props) => {
  const { label, name, options, required = true, error, newDesign, ...otherProps } = props;

  return (
    <div>
      <label
        htmlFor={name + '-field'}
        className={`flex ${newDesign ? 'text-xl ml-4' : 'text-sm'} leading-6 text-[#000000e0] font-display font-semibold dark:text-gray-300`}
      >
        {label} {required && <span className="text-[#e94a4a] ml-0.5 text-lg">*</span>}
      </label>
      <select
        id={name + '-field'}
        name={name}
        className={`block w-full ${newDesign ? 'rounded-full border border-[2px]  shadow-lg border-[#04816A]' : 'rounded-md border  '} px-3 py-2.5  
                    text-black bg-white dark:text-black dark:bg-white placeholder-[#bfbfbf] 
                    focus:outline-none focus:ring-1 sm:text-sm font-inter transition duration-150 ease-in-out 
                    ${error ? 'border-[#ff4d4f] focus:ring-[#ff4d4f]' : 'border-[#ced4da] hover:border-[#04816A] focus:ring-[#04816A]'}`}
        required={required}
        {...otherProps}
      >
        {options &&
          options.map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
      </select>

      {error && <span className="text-[#ff4d4f] text-xs mt-1">{error}</span>}
    </div>
  );
};

export default ChoiceField;
