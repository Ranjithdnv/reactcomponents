import React from 'react';

const TextAreaField = (props) => {
  const { label, icon, name, error, required = true, newDesign, ...otherProps } = props;

  return (
    <div>
      <label
        htmlFor={name + '-field'}
        className={`flex ${newDesign ? 'text-xl ml-5' : 'text-sm'} text-sm leading-6 text-[#565555] font-display font-bold`}
      >
        {label} {required && <span className="text-[#e94a4a] ml-0.5 text-lg">*</span>}
      </label>

      <div className="relative mt-2 rounded-md shadow-sm px-0.5">
        <textarea
          type="text"
          className={`block w-full ${newDesign ? 'rounded-full border border-[2px] border-[#ced4da] shadow-lg' : 'rounded-md border border-[#ced4da]'}  dark:border-[#4a4a4a] px-3 py-2 text-[#404040] dark:bg-[#ffffff] placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#00856f] focus:border-[#00856f] dark:focus:ring-[#00856f] dark:focus:border-[#00856f] sm:text-sm font-inter transition duration-150 ease-in-out ${
            icon ? 'pl-10' : ''
          }`}
          name={name}
          id={name + '-field'}
          required={required}
          {...otherProps}
        />
      </div>
    </div>
  );
};

export default TextAreaField;
