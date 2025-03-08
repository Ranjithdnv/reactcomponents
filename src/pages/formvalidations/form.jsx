import React, { useState, useCallback } from "react";

const UserForm = ({ search }) => {
  const [formDataInputForNewUser, setFormDataInputForNewUser] = useState({
    title: "",
    username: "",
    surname: "",
    contact_number: "",
    email: "",
    age: "",
    ageUnit: "years",
    dateOfBirth: "",
    gender: "",
    contact_number2: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [dateCheckbox, setDateCheckbox] = useState(true);

  const handleFormDataInputForNewUser = useCallback(
    (event) => {
      const { name, value } = event.target;
      let error = "";
      let updatedValue = value; // Default to the raw input value

      // Email validation
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (name === "email" && !emailPattern.test(value))
        error = "Invalid email";

      // Contact number validation
      if (name === "contact_number") {
        let cleanValue = value.replace(/[^0-9]/g, "").trim();

        if (cleanValue.startsWith("91")) {
          cleanValue = `+91 ${cleanValue.slice(2)}`;
        } else if (!cleanValue.startsWith("+91")) {
          cleanValue = `+91 ${cleanValue}`;
        }

        if (cleanValue.length > 14) {
          error = "Invalid contact number";
        } else {
          updatedValue = cleanValue; // Only update if the contact is valid
        }
      }

      // Name validation: Only allows alphabets and spaces, minimum 2 characters
      const namePattern = /^[a-zA-Z ]{2,}$/;
      if (name === "username" && !namePattern.test(value)) {
        error = "Name must only contain letters and spaces (min. 2 characters)";
      }

      // Surname validation: Only allows alphabets and spaces, minimum 1 character
      const surnamePattern = /^[a-zA-Z ]{1,}$/;
      if (name === "surname" && !surnamePattern.test(value)) {
        error =
          "Surname must only contain letters and spaces (min. 1 character)";
      }

      // Update the errors state
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

      // Update form data with the validated or formatted value
      setFormDataInputForNewUser((prevValues) => ({
        ...prevValues,
        [name]: updatedValue,
      }));
    },
    [setErrors, setFormDataInputForNewUser]
  );

  const handleAgeUnitChange = (event) => {
    setFormDataInputForNewUser((prevValues) => ({
      ...prevValues,
      ageUnit: event.target.value,
    }));
  };

  const handleFormSubmit = () => {
    search(formDataInputForNewUser);

    // Form validation and submission logic
    console.log(errors);

    // Check if there are any errors
    if (Object.values(errors).some((error) => error !== "")) {
      // Construct a list of errors to display
      const errorMessages = Object.entries(errors)
        .filter(([key, error]) => error !== "")
        .map(([key, error]) => `${key}: ${error}`);

      // Join the error messages into a single string
      const errorMessage = errorMessages.join("\n");

      // Show the error messages in the alert
      alert(`Please fix the errors before submitting:\n${errorMessage}`);
      return;
    }
  };
  return (
    <form>
      <div className="grid grid-cols-1 gap-0 p-0 sm:grid-cols-2 lg:grid-cols-3  auto-rows-fr  font-medium capitalize md:gap-4 md:p-4">
        {/* Title Field */}
        <div className="flex flex-col gap-2">
          <label className="text-sm self-start   font-medium pl-2">
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
          {errors.title && (
            <span className="text-[#E94A4A] text-sm">{errors.title}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm self-start   font-medium pl-2">
            Name <span className="text-[#E94A4A]">*</span>
          </label>
          <input
            type="text"
            name="username"
            value={formDataInputForNewUser.username}
            onChange={handleFormDataInputForNewUser}
            className={`w-full px-4 border-none rounded-2xl  py-1 hover:outline-none  shadow-md hover:shadow-md  outline-none
              ${errors.email ? "border-[#E94A4A]" : "border-brand"}`}
            placeholder="Enter your name"
            required
          />
          {errors.username && (
            <span className="text-[#E94A4A] w-64 text-sm">
              {errors.username}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm self-start   font-medium pl-2">
            Surame <span className="text-[#E94A4A]">*</span>
          </label>
          <input
            type="text"
            name="surname"
            value={formDataInputForNewUser.surname}
            onChange={handleFormDataInputForNewUser}
            className={`w-full px-4 border-none rounded-2xl  py-1 hover:outline-none  shadow-md hover:shadow-md  outline-none
              ${errors.email ? "border-[#E94A4A]" : "border-brand"}`}
            placeholder="Enter surname"
            required
          />
          {errors.surname && (
            <span className="text-[#E94A4A] w-64  text-sm">
              {errors.surname}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm self-start   font-medium pl-2">
            Mobile Number <span className="text-[#E94A4A]">*</span>
          </label>
          <input
            type="text"
            name="contact_number"
            value={formDataInputForNewUser.contact_number}
            onChange={handleFormDataInputForNewUser}
            className={`w-full px-4 border-none rounded-2xl  py-1 hover:outline-none  shadow-md hover:shadow-md  outline-none
              ${errors.email ? "border-[#E94A4A]" : "border-brand"}`}
            placeholder=" eg : 7569381997"
            required
          />
          {errors.contact_number && (
            <span className="text-[#E94A4A] text-sm">
              {errors.contact_number}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm self-start   font-medium pl-2">
            Email <span className="text-[#E94A4A]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formDataInputForNewUser.email}
            onChange={handleFormDataInputForNewUser}
            className={`w-full px-4 border-none rounded-2xl  py-1 hover:outline-none  shadow-md hover:shadow-md  outline-none 
              ${errors.email ? "border-[#E94A4A]" : "border-brand"}`}
            placeholder="Enter email"
            required
          />
          {errors.email && (
            <span className="text-[#E94A4A] text-sm">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm self-start   font-medium pl-2">
            Age <span className="text-[#E94A4A]">*</span>
          </label>
          <input
            type="number"
            name="age"
            value={formDataInputForNewUser.age}
            onChange={handleFormDataInputForNewUser}
            className={`w-full px-4 border-none rounded-2xl  py-1 hover:outline-none  shadow-md hover:shadow-md  outline-none
              ${errors.email ? "border-[#E94A4A]" : "border-brand"}`}
            placeholder="Enter address"
          />
          {errors.age && (
            <span className="text-[#E94A4A] text-sm">{errors.age}</span>
          )}
          {/* <select
            name="ageUnit"
            value={formDataInputForNewUser.ageUnit}
            onChange={handleAgeUnitChange}
            className="mt-2 w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none border-brand bg-white text-gray-700"
          >
            <option value="years">Years</option>
            <option value="months">Months</option>
            <option value="days">Days</option>
          </select> */}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm self-start   font-medium pl-2">
            Date of Birth <span className="text-[#E94A4A]">*</span>
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formDataInputForNewUser.dateOfBirth}
            onChange={handleFormDataInputForNewUser}
            className={`w-full px-4 border-none rounded-2xl  py-1 hover:outline-none  shadow-md hover:shadow-md  outline-none
              ${errors.email ? "border-[#E94A4A]" : "border-brand"}`}
            required
          />
          {errors.dateOfBirth && (
            <span className="text-[#E94A4A] text-sm">{errors.dateOfBirth}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm self-start   font-medium pl-2">
            Gender <span className="text-[#E94A4A]">*</span>
          </label>
          <select
            name="gender"
            value={formDataInputForNewUser.gender}
            onChange={handleFormDataInputForNewUser}
            className="w-full px-4 border rounded-2xl shadow-md py-1 focus:outline-none border-brand bg-white text-gray-700"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <span className="text-[#E94A4A] text-sm">{errors.gender}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm self-start   font-medium pl-2">
            Address
          </label>
          {/* <input
            type="text"
            name="address"
            value={formDataInputForNewUser.address}
            s
            onChange={handleFormDataInputForNewUser}
            className={`w-full px-4 border-none rounded-2xl   py-1 outline-none  shadow-none  focus:!outline-none ${
              errors.address ? "border-[#E94A4A]" : ""
            }`}
            placeholder="Enter address"
          /> */}
          <input
            type="text"
            name="address"
            value={formDataInputForNewUser.address}
            onChange={handleFormDataInputForNewUser}
            className={`w-full px-4 border-none rounded-2xl  py-1 hover:outline-none  shadow-md hover:shadow-md  outline-none
              ${errors.email ? "border-[#E94A4A]" : "border-brand"}`}
            placeholder="Enter address"
          />

          {errors.address && (
            <span className="text-[#E94A4A] text-sm">{errors.address}</span>
          )}
        </div>

        {/* Other fields remain the same */}

        <div className="w-full flex justify-center items-center">
          <button
            type="button"
            onClick={handleFormSubmit}
            className="bg-brand text-black rounded-2xl shadow-md flex w-fit p-3 m-4"
          >
            Save and Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
