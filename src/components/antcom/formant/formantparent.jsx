import React, { useState } from "react";
import DynamicForm from "./formant";

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const formSchema1 = shuffleArray([
  {
    label: "Full Name",
    name: "fullName",
    type: "text",
    rules: [{ required: true, message: "Full Name is required" }],
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    rules: [{ required: true, message: "Email is required" }],
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    rules: [{ required: true, message: "Password is required" }],
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    rules: [
      { required: true, message: "Confirm your password" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Passwords do not match!"));
        },
      }),
    ],
  },
  { label: "Birthdate", name: "dob", type: "date" },
  { label: "Skills", name: "skills", type: "list" },
  {
    label: "Role",
    name: "role",
    type: "select",
    options: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Guest", value: "guest" },
      { label: "Guest", value: "guest1" },
      { label: "Guest", value: "guest2" },
      { label: "Guest", value: "guest" },
    ],
  },
]);

const formSchema = [
  // Personal Information
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    rules: [
      { required: true, message: "First Name is required" },
      {
        min: 2,
        max: 30,
        message: "First Name must be between 2 and 30 characters",
      },
    ],
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    rules: [
      { required: true, message: "Last Name is required" },
      {
        min: 2,
        max: 30,
        message: "Last Name must be between 2 and 30 characters",
      },
    ],
  },
  {
    label: "Date of Birth",
    name: "dob",
    type: "date",
    rules: [
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value)
            return Promise.reject(new Error("Date of Birth is required"));
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          return age >= 18
            ? Promise.resolve()
            : Promise.reject(new Error("You must be at least 18 years old"));
        },
      }),
    ],
  },
  {
    label: "Gender",
    name: "gender",
    type: "select",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
    rules: [{ required: true, message: "Gender is required" }],
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    rules: [{ required: true, message: "Password is required" }],
  },

  // Contact Information
  {
    label: "Email Address",
    name: "email",
    type: "email",
    rules: [
      { required: true, message: "Email is required" },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Enter a valid email address",
      },
    ],
  },
  {
    label: "Phone Number",
    name: "phone",
    type: "text",
    rules: [
      { required: true, message: "Phone number is required" },
      {
        pattern: /^[0-9]{10}$/,
        message: "Enter a valid 10-digit phone number",
      },
    ],
  },
  {
    label: "City",
    name: "city",
    type: "text",
    rules: [{ required: true, message: "City is required" }],
  },
  {
    label: "State",
    name: "state",
    type: "select",
    options: [
      { label: "California", value: "CA" },
      { label: "Texas", value: "TX" },
      { label: "Florida", value: "FL" },
      { label: "New York", value: "NY" },
    ],
    rules: [{ required: true, message: "State is required" }],
  },
  {
    label: "Zip Code",
    name: "zipCode",
    type: "text",
    rules: [
      { required: true, message: "Zip Code is required" },
      { pattern: /^[0-9]{5}$/, message: "Enter a valid 5-digit zip code" },
    ],
  },

  // Additional Information
  {
    label: "Employment Status",
    name: "employmentStatus",
    type: "select",
    options: [
      { label: "Employed", value: "employed" },
      { label: "Unemployed", value: "unemployed" },
      { label: "Self-Employed", value: "selfEmployed" },
      { label: "Student", value: "student" },
    ],
  },
  {
    label: "Skills",
    name: "skills",
    type: "list",
  },
  {
    label: "Preferred Contact Method",
    name: "contactMethod",
    type: "select",
    options: [
      { label: "Email", value: "email" },
      { label: "Phone", value: "phone" },
      { label: "Text Message", value: "text" },
    ],
    rules: [
      { required: true, message: "Preferred contact method is required" },
    ],
  },

  // Agreement
  {
    label: "Accept Terms",
    name: "terms",
    type: "checkbox",
    rules: [
      { required: true, message: "" },
      {
        validator: (_, value) =>
          value
            ? Promise.resolve()
            : Promise.reject(new Error("You must accept the terms!")),
      },
    ],
  },
];

console.log(formSchema1);
console.log(formSchema);

const initialData = {
  fullName: "John Doe",
  email: "johndoe@example.com",
  role: "user",
  skills: ["React", "Node.js"],
  //gender: none,
};

const FormAntParent = () => {
  const [openFormModal, setOpenFormModal] = useState(false);

  const ClassNameForInput =
    "border-orange-500 focus:border-green-500 focus:ring-green-500";
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dynamic Form Example</h2>
      <DynamicForm
        ClassNameFromParent="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        fieldsSchema={formSchema}
        openFormModal={openFormModal}
        setOpenFormModal={setOpenFormModal}
        initialValues={initialData}
        ClassNameForInput={ClassNameForInput}
      >
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-[0_4px_10px_rgba(0,0,255,0.5)] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,255,0.7)] focus:outline-none active:shadow-[0_0_1px_rgba(0,0,255,0.7)]"
          onClick={(e) => {
            e.preventDefault();
            console.log("Children button clicked!", e);
          }}
        >
          children
        </button>{" "}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-[0_4px_10px_rgba(0,0,255,0.5)] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,255,0.7)] focus:outline-none active:shadow-[0_0_1px_rgba(0,0,255,0.7)]"
          onClick={(e) => {
            e.preventDefault();
            console.log("Children button clicked!", e);
          }}
        >
          children
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-[0_4px_10px_rgba(0,0,255,0.5)] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,255,0.7)] focus:outline-none active:shadow-[0_0_1px_rgba(0,0,255,0.7)]"
          onClick={(e) => {
            e.preventDefault();
            console.log("Children button clicked!", e);
            setOpenFormModal(false);
          }}
        >
          children
        </button>{" "}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-[0_4px_10px_rgba(0,0,255,0.5)] transition-all duration-300 hover:shadow-[0_8px_20px_rgba(0,0,255,0.7)] focus:outline-none active:shadow-[0_0_1px_rgba(0,0,255,0.7)]"
          onClick={(e) => {
            e.preventDefault();
            console.log("Children button clicked!", e);
            setOpenFormModal(false);
          }}
        >
          children
        </button>
      </DynamicForm>
      <button className="bg-black " onClick={() => setOpenFormModal(true)}>
        {" "}
        open
      </button>
    </div>
  );
};

export default FormAntParent;
