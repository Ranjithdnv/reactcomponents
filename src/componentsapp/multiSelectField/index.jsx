import React from 'react';
import ReactSelect from 'react-select';
import CheckBoxField from '../checkbox';

const MultiSelectField = (props) => {
  const {
    label,
    options,
    name,
    showSelectAll = false,
    required = true,
    onSelectAll,
    selectAllChecked,
    ...otherProps
  } = props;

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: 250, // Max height for the dropdown menu
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: 250, // Max height for the options inside the dropdown
      overflowY: 'auto', // Adds scroll bar when content exceeds max height
    }),
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={name + '-field'}
          className="flex text-sm leading-6 text-[#000000e0] font-display font-bold"
        >
          {label} {required && <span className="text-[#e94a4a] ml-1">*</span>}
        </label>

        {showSelectAll && (
          <CheckBoxField
            label="Select All"
            name={`${name}-select-all`}
            onChange={onSelectAll}
            selectAllChecked={selectAllChecked}
          />
        )}
      </div>
      <div className="relative mt-2 rounded-md shadow-sm px-0.5 dark:text-[#303030]">
        <ReactSelect
          name={name}
          options={options}
          styles={customStyles}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: '#d0f0eb',
              primary: '#04816A',
            },
          })}
          required={required}
          {...otherProps}
        />
      </div>
    </div>
  );
};

export default MultiSelectField;
