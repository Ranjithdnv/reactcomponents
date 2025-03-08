import React, { useState, useCallback, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStateChangesDetector } from "../../util/statedector";
const UserForm = ({ formConfig, onSubmit }) => {
  const { store, stateChangesDetector } = useStateChangesDetector();
  // const initialFormState = useMemo(
  //   () =>
  //     formConfig.reduce((acc, field) => {
  //       acc[field.name] = field.defaultValue || "";
  //       return acc;
  //     }, {}),
  //   [formConfig]
  // );
  const initialFormState = useMemo(
    () =>
      formConfig.reduce((acc, field) => {
        acc[field.name] =
          field.type === "ageordate"
            ? { type: "date", value: "" } // Default to date for ageordate fields
            : field.defaultValue || "";
        return acc;
      }, {}),
    [formConfig]
  );

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Validation patterns (memoized for performance)
  const validationPatterns = useMemo(
    () => ({
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      contact_number: /^\+91 \d{10}$/,
      username: /^[a-zA-Z ]{2,}$/,
      pincode: /^[0-9]{6}$/,
    }),
    []
  );

  // Validate field based on pattern
  const validateField = (name, value) => {
    if (name === "ageordate") {
      if (!value?.value) return "Date, Age, or Months is required";
    }
    if (!value) return `${name.replace("_", " ")} is required`;

    if (validationPatterns[name] && !validationPatterns[name].test(value)) {
      return `Invalid ${name.replace("_", " ")}`;
    }

    stateChangesDetector("test", 1, 2);
    return "";
  };

  // Format input before setting state
  const formatField = (name, value) => {
    if (name === "pincode") return value.replace(/[^0-9]/g, "").trim();
    if (name === "contact_number") {
      let cleanValue = value.replace(/[^0-9]/g, "").trim();
      if (cleanValue.startsWith("91")) return `+91 ${cleanValue.slice(2)}`;
      return `+91 ${cleanValue}`;
    }
    return value.trim();
  };
  const trace = (message, data = null) => {
    // console.trace(`[TRACE] ${message}`, data);
  };
  // Handle input changes with validation
  useEffect(() => {
    console.log("Component Mounted, Store:", store);
  }, [store]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    const formattedValue = formatField(name, value);

    setFormData((prev) => {
      return stateChangesDetector("formData", prev, {
        ...prev,
        [name]: formattedValue,
      });
    });

    // trace("Handling input change", { name, value: formattedValue });
    // Revalidate the field

    console.log(name);
    const feildByName = formConfig.filter((field) => {
      if (field.name === name) {
        return field;
      }
    });
    console.log(feildByName);
    if (feildByName[0].required) {
      console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, formattedValue),
      }));
    }
  }, []);

  // Handle date change for date fields
  const handleDateChange = (date, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date ? date.toISOString().split("T")[0] : "", // Store as YYYY-MM-DD
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: date ? "" : "Date is required",
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    // trace("Handling input change");

    console.trace(`[submit`);
    console.log("uuuuuuuuuuuuuuuuuuu");
    event.preventDefault();
    setSuccessMessage(""); // Reset success message

    const newErrors = {};

    // Validate all required fields
    formConfig.forEach((field) => {
      if (field.required) {
        newErrors[field.name] = validateField(field.name, formData[field.name]);
      }
      if (field.required2) {
        if (!formConfig.newsletter) {
          newErrors["newsletter"] = "needed";
        }
      }
    });

    setErrors(newErrors);

    // If there are errors, prevent submission
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    onSubmit(formData);
    setSuccessMessage("Form submitted successfully! ✅");
    setFormData(initialFormState); // Reset form after successful submission
    console.log(formData);
    console.log(initialFormState);
  };
  const handleCheckboxChange = (name, required, label) => (e) => {
    const isChecked = e.target.checked;

    setFormData(
      (prev) => ({ ...prev, [name]: isChecked }),
      console.log(formData)
    );

    if (required) {
      setErrors((prev) => ({
        ...prev,
        [name]: isChecked ? "" : `${label} is required`,
      }));
    }
  };

  const renderInputField = (field) => {
    const commonClasses =
      "w-full px-4  rounded-2xl shadow-md hover:shadow-md py-2 hover:border-none outline-none hover:outline-none focus:outline-none focus:ring-0 ";
    if (field.type === "ageordate") {
      return (
        <div className="flex flex-col gap-2">
          {/* Radio Buttons for Selection */}
          <div
            className={`flex gap-4 text-sm  justify-around ${field.classNameLabel}`}
          >
            <label>
              <input
                type="radio"
                name={`${field.name}_toggle`}
                value="date"
                checked={formData[field.name]?.type === "date"}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.name]: { type: "date", value: "" },
                  }))
                }
              />{" "}
              DOB
            </label>
            <label>
              <input
                type="radio"
                name={`${field.name}_toggle`}
                value="age"
                checked={formData[field.name]?.type === "age"}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.name]: { type: "age", value: "" },
                  }))
                }
              />{" "}
              Age
            </label>
            <label>
              <input
                type="radio"
                name={`${field.name}_toggle`}
                value="month"
                checked={formData[field.name]?.type === "month"}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.name]: { type: "month", value: "" },
                  }))
                }
              />{" "}
              Months
            </label>
          </div>

          {/* Input Fields Based on Selection */}
          {formData[field.name]?.type === "date" ? (
            <DatePicker
              selected={
                formData[field.name]?.value
                  ? new Date(formData[field.name].value)
                  : null
              }
              onChange={(date) => {
                const updatedValue = {
                  type: "date",
                  value: date ? date.toISOString().split("T")[0] : "",
                };
                console.log(0);
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: updatedValue,
                }));

                setErrors((prev) => ({
                  ...prev,
                  [field.name]: validateField(field.name, updatedValue),
                }));
              }}
              // onChange={(date) =>
              //   setFormData((prev) => ({
              //     ...prev,
              //     [field.name]: {
              //       type: "date",
              //       value: date ? date.toISOString().split("T")[0] : "",
              //     },
              //   }))
              // }
              className={`${commonClasses} ${field.className}`}
              placeholderText="Select a date"
              dateFormat="yyyy-MM-dd"
            />
          ) : (
            <input
              type="number"
              value={formData[field.name]?.value || ""}
              onChange={
                //  handleChange
                (e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.name]: {
                      type: formData[field.name]?.type, // Keep current type (age/month)
                      value: e.target.value.replace(/[^0-9]/g, ""),
                    },
                  }))
              }
              className={`${commonClasses} ${field.className}`}
              placeholder={
                formData[field.name]?.type === "age"
                  ? "Enter your age (Years)"
                  : "Enter your age (Months)"
              }
              min="0"
            />
          )}
        </div>
      );
    }

    // Default rendering for other fields
    if (field.type === "date") {
      return (
        <DatePicker
          selected={
            formData[field.name] ? new Date(formData[field.name]) : null
          }
          onChange={(date) => {
            handleDateChange(date, field.name);
            // setFormData((prev) => ({
            //   ...prev,
            //   [field.name]: date ? date.toISOString().split("T")[0] : "",
            // }));
          }}
          className={`${commonClasses} ${field.className}`}
          placeholderText={field.placeholder || "Select a date"}
          dateFormat="yyyy-MM-dd"
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className={`${commonClasses} bg-white text-gray-700 ${field.className}`}
        >
          <option value="">{field.placeholder || "Select an option"}</option>
          {field.options.map((option, i) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }
    //also add for radio button and checkbox also
    if (field.type === "radio") {
      return (
        <div className="flex gap-4  w-fit">
          {field.options.map((option) => (
            <label
              key={option.value}
              // className="flex flex-col  w-fit text-xs items-center gap-2"
              className={`flex flex-col  w-fit text-xs items-center gap-2 ${field.className}`}
            >
              <input
                type="radio"
                name={field.name}
                value={option.value}
                checked={formData[field.name] === option.value}
                onChange={handleChange}
              />
              <div>{option.label}</div>
            </label>
          ))}
        </div>
      );
    }

    // Checkbox
    if (field.type === "checkbox") {
      return (
        <label className="flex  items-center h-full gap-2">
          <span className=" font-semibold text-sm"> {field.label2}</span>{" "}
          {field.required2 && <span className="text-red-500">*</span>}
          <input
            type="checkbox"
            name={field.name}
            checked={!!formData[field.name]}
            onChange={handleCheckboxChange(
              field.name,
              field.required2,
              field.label
            )}
          />
        </label>
      );
    }

    // Color Picker
    if (field.type === "color") {
      return (
        <input
          type="color"
          name={field.name}
          value={formData[field.name] || "#000000"}
          onChange={handleChange}
          className="w-16 h-10 rounded-md border border-gray-300"
        />
      );
    }
    return (
      <input
        type={field.type}
        name={field.name}
        value={formData[field.name] || ""}
        onChange={handleChange}
        className={`${commonClasses} ${field.className}`}
        placeholder={field.placeholder || ""}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4  ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  lg:grid-cols-3 ">
        {formConfig.map((field, index) => (
          <>
            <div key={index} className="flex flex-col gap-2 ">
              {field.type !== "ageordate" && (
                <label className="text-sm font-medium pl-2">
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
              )}
              {renderInputField(field)}
              {errors[field.name] && (
                <>
                  {" "}
                  <span className="text-red-500 text-sm">
                    {errors[field.name]}
                  </span>
                </>
              )}
            </div>
          </>
        ))}
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center items-center">
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-2xl shadow-md p-3"
        >
          Submit
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <p className="text-green-600 text-center">{successMessage}</p>
      )}
    </form>
  );
};

export default UserForm;
