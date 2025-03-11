import React, { useState } from "react";
import DynamicForm from "./formant";
import DynamicForm2 from "../2dform";
const formSchema2 = [
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
    label: "Date of Birth",
    name: "dob",
    type: "date",
    rules: [
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value) {
            return Promise.reject(new Error("Date of Birth is required"));
          }
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
    label: "Industry",
    name: "industry",
    type: "select",
    options: [
      { label: "Technology", value: "technology" },
      { label: "Finance", value: "finance" },
      { label: "Healthcare", value: "healthcare" },
      { label: "Education", value: "education" },
    ],
    rules: [{ required: true, message: "Industry is required" }],
  },
  {
    label: "Company Size",
    name: "companySize",
    type: "select",
    options: [
      { label: "1-10", value: "1-10" },
      { label: "11-50", value: "11-50" },
      { label: "51-200", value: "51-200" },
      { label: "201-500", value: "201-500" },
      { label: "500+", value: "500+" },
    ],
  },
  {
    label: "Employment Type",
    name: "employmentType",
    type: "radio",
    options: [
      { label: "Full-time", value: "full-time" },
      { label: "Part-time", value: "part-time" },
      { label: "Contract", value: "contract" },
    ],
  },
  {
    label: "Remote Work",
    name: "remoteWork",
    type: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    label: "Preferred Work Location",
    name: "workLocation",
    type: "select",
    options: [
      { label: "On-site", value: "on-site" },
      { label: "Remote", value: "remote" },
      { label: "Hybrid", value: "hybrid" },
    ],
  },
  {
    label: "Job Level",
    name: "jobLevel",
    type: "select",
    options: [
      { label: "Entry Level", value: "entry" },
      { label: "Mid Level", value: "mid" },
      { label: "Senior Level", value: "senior" },
      { label: "Executive", value: "executive" },
    ],
  },
  {
    label: "Skills Required",
    name: "skills",
    type: "checkbox",
    options: [
      { label: "JavaScript", value: "javascript" },
      { label: "Python", value: "python" },
      { label: "React", value: "react" },
      { label: "Node.js", value: "nodejs" },
    ],
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
  {
    label: "Benefits",
    name: "benefits",
    type: "checkbox",
    options: [
      { label: "Health Insurance", value: "health" },
      { label: "401(k)", value: "401k" },
      { label: "Remote Work", value: "remote" },
      { label: "Flexible Hours", value: "flexible" },
    ],
    rules: [
      {
        validator: (_, value) =>
          value
            ? Promise.resolve()
            : Promise.reject(new Error("You must accept the terms!")),
      },
    ],
  },
  {
    label: "Languages Required",
    name: "languages",
    type: "checkbox",
    options: [
      { label: "English", value: "english" },
      { label: "Spanish", value: "spanish" },
      { label: "French", value: "french" },
      { label: "German", value: "german" },
    ],
    rules: [
      {
        validator: (_, value) =>
          value
            ? Promise.resolve()
            : Promise.reject(new Error("You must accept the terms!")),
      },
    ],
  },
  {
    label: "Certifications Required",
    name: "certifications",
    type: "checkbox",
    options: [
      { label: "PMP", value: "pmp" },
      { label: "AWS Certified", value: "aws" },
      { label: "Scrum Master", value: "scrum" },
    ],
    rules: [
      {
        validator: (_, value) =>
          value
            ? Promise.resolve()
            : Promise.reject(new Error("You must accept the terms!")),
      },
    ],
  },
  {
    label: "Job Start Date",
    name: "startDate",
    type: "date",
    rules: [{ required: true, message: "Start Date is required" }],
  },
  {
    label: "Application Deadline",
    name: "applicationDeadline",
    type: "date",
  },
  {
    label: "Company Founded Date",
    name: "foundedDate",
    type: "date",
  },
  {
    label: "Training Start Date",
    name: "trainingStartDate",
    type: "date",
  },
  {
    label: "Training Completion Date",
    name: "trainingCompletionDate",
    type: "date",
  },
  // New list input example for multiple projects:
  {
    label: "Projects",
    name: "projects",
    type: "list",
    rules: [
      {
        validator(_, value) {
          if (Array.isArray(value) && value.length > 0) {
            const valid = value.every(
              (project) =>
                project && project.title && project.title.trim() !== ""
            );
            return valid
              ? Promise.resolve()
              : Promise.reject(new Error("Each project must have a title"));
          }
          return Promise.reject(new Error("At least one project is required"));
        },
      },
    ],
    // Optionally, include a default value structure if needed
    defaultValue: [{ title: "", description: "" }],
  },
];

const initialData = {
  companyName: "OpenAI",
  jobTitle: "Software Engineer",
  workEmail: "developer@openai.com",
  phone: "1234567890",
  industry: "technology",
  companySize: "51-200",
};

const FormAntParentV2 = () => {
  const [openFormModal, setOpenFormModal] = useState(false);
  const ClassNameForInput =
    "border-orange-500 focus:border-green-500 focus:ring-green-500";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Business Information Form</h2>
      <DynamicForm2
        ClassNameFromParent="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        fieldsSchema={formSchema2}
        openFormModal={openFormModal}
        setOpenFormModal={setOpenFormModal}
        initialValues={initialData}
        ClassNameForInput={ClassNameForInput}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded-md mt-4"
        onClick={() => setOpenFormModal(true)}
      >
        Open Form
      </button>
    </div>
  );
};

export default FormAntParentV2;
