import React, { useState } from "react";
import UserForm from "./childform";

const ParentForm2 = () => {
  const [formConfig, setFormConfig] = useState([
    {
      name: "firstname",
      label: "Firstname",
      type: "text",
      placeholder: "Enter your firstname",
      required: true,
      className: "",
    },
    {
      name: "secondname",
      label: "Secondname",
      type: "text",
      placeholder: "Enter your Secondname",
      required: true,
      className: "",
    },
    {
      name: "surname",
      label: "Surname",
      type: "text",
      placeholder: "Enter your surname",
      required: true,
      className: "",
    },

    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      className: "",
    },
    {
      name: "ageordate",
      label: "",
      type: "ageordate",
      placeholder: "Enter your date",
      required: true,
      className: "",
      classNameLabel: "font-semibold",
    },

    {
      name: "contact_number",
      label: "Contact Number",
      type: "text",
      placeholder: "+91 XXXXXXXXXX",
      required: true,
      className: "",
    },

    {
      name: "preference",
      label: "Preference",
      type: "radio",
      required: true,
      options: [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ],
      className: " font-bold ",
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      placeholder: "Select gender",
      required: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ],
      className: "",
    },

    {
      name: "newsletter",
      label2: "Subscribe to Newsletter",
      label: "",
      type: "checkbox",
      required: false, //always false
      required2: false,
      className: "",
    },
    {
      name: "pincode",
      label: "Pincode",
      type: "text",
      placeholder: "Enter your pincode",
      required: true,
      className: "",
    },
  ]);

  const handleFormSubmit = (formData) => {
    console.trace("handleFormSubmit");
    console.log("Form Submitted:", formData);
    // Add API call or processing logic here
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-full bg-gray-100 p-6">
      {/* line 99 use w-fit to stop extending div boxes */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg md:max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-4">User Form</h2>
        <UserForm formConfig={formConfig} onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
};

export default ParentForm2;
