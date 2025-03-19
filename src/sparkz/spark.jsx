// import { useState } from "react";
// import { RadioGroup } from "@headlessui/react";
// import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
// import airport from "../assets/airport.jpg";

// const options = ["Mobile OTP", "Email OTP", "Password"];

// export default function Loginsplax() {
//   const [selected, setSelected] = useState(options[0]);
//   const [singIn, setsingIn] = useState(true);
//   const [singUp, setsingUp] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   return (
//     <div className="relative min-h-screen flex items-center justify-center white">
//       {/* Background Image */}
//       <div
//         className="absolute  inset-0 bg-cover bg-center"
//         // style={{
//         //   backgroundImage:
//         //     "url('https://source.unsplash.com/1600x900/?airport,travel')",
//         //   filter: "brightness(0.5)",
//         // }}
//       >
//         <img
//           src={airport}
//           alt="Background"
//           className="w-full h-full object-cover brightness-50"
//         />
//       </div>

//       {/* Login Card */}
//       <div className=" flex justify-center w-full">
//         {" "}
//         <div className="relative z-10 right-10 bg-white bg-opacity-0  rounded-2xl p-8 shadow-lg w-full   max-w-2xl">
//           <h3 className=" py-2 text-center">INTIMATE GLOBAL</h3>
//           <h2 className=" py-2 text-white text-2xl font-bold text-center">
//             Start Your Journey Today
//           </h2>

//           {/* Sign In / Sign Up Toggle */}
//           <div className="flex py-2 justify-center mt-4">
//             <button
//               onClick={() => {
//                 setsingUp(true), setsingUp(false);
//               }}
//               className="text-yellow-400 font-semibold border-b-2 border-yellow-400 px-4"
//             >
//               Sign In
//             </button>
//             <span className="text-white mx-2">Or</span>
//             <button
//               onClick={() => {
//                 setsingIn(false), setsingUp(true);
//               }}
//               className="text-white px-4"
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Input Fields */}
//           {singIn && (
//             <>
//               <div className="mt-6 py-2">
//                 <div className="flex items-center border-b border-gray-300 pb-2">
//                   <FaUser className="text-white mr-2" />
//                   <input
//                     type="text"
//                     placeholder="User Name / Mobile number / Email Id"
//                     className="w-full bg-transparent outline-none text-white placeholder-gray-300"
//                   />
//                 </div>
//               </div>

//               {/* OTP / Password Selection */}
//               <RadioGroup
//                 value={selected}
//                 onChange={setSelected}
//                 className="mt-4"
//               >
//                 <div className="flex space-x-4">
//                   {options.map((option) => (
//                     <RadioGroup.Option
//                       key={option}
//                       value={option}
//                       className="flex items-center space-x-2 cursor-pointer"
//                     >
//                       {({ checked }) => (
//                         <>
//                           <div
//                             className={`w-4 h-4 rounded-full border ${
//                               checked ? "bg-yellow-400" : "border-gray-300"
//                             }`}
//                           />
//                           <span className="text-white text-sm">{option}</span>
//                         </>
//                       )}
//                     </RadioGroup.Option>
//                   ))}
//                 </div>
//               </RadioGroup>

//               {/* OTP Input */}
//               <div className=" py-2 mt-4">
//                 <input
//                   type="text"
//                   placeholder="Enter 6 digit OTP Shared to your Registered Number"
//                   className="w-full bg-transparent border-b border-gray-300 outline-none text-white placeholder-gray-300 py-2"
//                 />
//               </div>
//             </>
//           )}
//           {singUp && (
//             <>
//               <div className="mt-6 py-2">
//                 <div className="flex items-center border-b border-gray-300 pb-2">
//                   <FaUser className="text-white mr-2" />
//                   <input
//                     type="text"
//                     placeholder="User Name / Mobile number / Email Id"
//                     className="w-full bg-transparent outline-none text-white placeholder-gray-300"
//                   />
//                 </div>
//               </div>

//               {/* First Name & Last Name */}
//               <div className="flex space-x-4">
//                 <div className="flex items-center border-b border-gray-300 pb-2 w-1/2">
//                   <FaUser className="text-gray-600 mr-2" />
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="First Name"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
//                   />
//                 </div>
//                 <div className="flex items-center border-b border-gray-300 pb-2 w-1/2">
//                   <FaUser className="text-gray-600 mr-2" />
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Last Name"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
//                   />
//                 </div>
//               </div>

//               {/* Email Input */}
//               <div className="mt-4">
//                 <div className="flex items-center border-b border-gray-300 pb-2">
//                   <FaEnvelope className="text-gray-600 mr-2" />
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
//                   />
//                 </div>
//               </div>

//               {/* Phone Number Input */}
//               <div className="mt-4">
//                 <div className="flex items-center border-b border-gray-300 pb-2">
//                   <FaPhone className="text-gray-600 mr-2" />
//                   <input
//                     type="text"
//                     name="phone"
//                     placeholder="Phone Number"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
//                   />
//                 </div>
//               </div>
//             </>
//           )}
//           {/* Submit Button */}
//           <button className="w-full mb-24 mt-6 bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg hover:bg-yellow-400">
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import airport from "../assets/airport.jpg";
import { DatePicker } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
const options = ["Mobile OTP", "Email OTP", "Password"];

export default function Loginsplax() {
  const [selected, setSelected] = useState(options[0]);
  const [isSignIn, setIsSignIn] = useState(true);
  const [emailOrMobile, setemailOrMobile] = useState(true);
  const [selectedGender, setSelectedGender] = useState("Male");
  const genderOptions = ["Male", "Female", "Other"];

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    setFormData({ ...formData, gender: gender });
  };
  const [formDataInitial, setFormDataInitial] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    gender: "",
    otp: "",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    username: "",
    password: "",
    otp: "",
  });
  const [errors, setErrors] = useState({});

  // Regex patterns for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const otpRegex = /^[0-9]{6}$/;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation
    let errorMsg = "";

    if (name === "email" && !emailRegex.test(value)) {
      errorMsg = "Invalid email format";
    } else if (name === "phone" && !phoneRegex.test(value)) {
      errorMsg = "Phone number must be 10 digits";
    } else if (
      (name === "firstName" || name === "lastName" || name === "username") &&
      value.trim().length < 3
    )
      errorMsg = "Must be at least 3 characters long";
    else if (name === "otp" && !otpRegex.test(value)) {
      errorMsg = "OTP must be 6 digits";
    } else if (name === "password" && value.length < 6) {
      errorMsg = "Password must be at least 6 characters";
    }

    setErrors({ ...errors, [name]: errorMsg });
    console.log({ ...errors, [name]: errorMsg });
  };

  useEffect(() => {
    if (selected === options[2]) {
      setemailOrMobile(false);
      return;
    }
    setemailOrMobile(true);
  }, [selected]);
  // Handle input change
  useEffect(() => {
    console.log("Errors updated:", errors);
  }, [errors]);
  const formDataSubmit = (type) => {
    // Define required fields based on sign-in or sign-up
    const requiredFields =
      type === "signin"
        ? ["username", "otp"]
        : ["firstName", "lastName", "email", "phone", "password"];
    let noValue;
    if (type === "signin") {
      if (formData.username === "" || formData.otp === "") {
        noValue = true;
        return;
      }
    } else {
      if (
        formData.firstName === "" ||
        formData.lastName === "" ||
        formData.email === "" ||
        formData.phone === ""
      ) {
        noValue = true;
        return;
      }
    }
    // Check for errors in required fields
    const hasErrors = requiredFields.some((field) => errors[field]);

    if (hasErrors) {
      console.log("Errors exist:", errors);
      alert("Please fix the errors before submitting!");
      return;
    }

    console.log(`${type} form submitted successfully:`, formData);
    setFormData(formDataInitial);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={airport}
          alt="Background"
          className="w-full h-full object-cover brightness-50"
        />
      </div>

      {/* Login / Signup Card */}
      <div className="relative z-10 bg-white bg-opacity-5 p-8 rounded-2xl shadow-lg w-full max-w-2xl ">
        <h3 className="py-2 text-center text-yellow-400 font-bold text-lg">
          INTIMATE GLOBAL
        </h3>
        <h2 className="py-2 text-white text-2xl font-bold text-center">
          Start Your Journey Today
        </h2>

        {/* Sign In / Sign Up Toggle */}
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={() => setIsSignIn(true)}
            className={`px-4 py-1 font-semibold border-b-2 ${
              isSignIn
                ? "text-yellow-400 border-yellow-400"
                : "text-white border-transparent"
            }`}
          >
            Sign In
          </button>
          <span className="text-white">Or</span>
          <button
            onClick={() => setIsSignIn(false)}
            className={`px-4 py-1 font-semibold border-b-2 ${
              !isSignIn
                ? "text-yellow-400 border-yellow-400"
                : "text-white border-transparent"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Input Fields */}
        {isSignIn ? (
          <>
            {/* Username / Mobile / Email */}
            <div className="mt-6 py-2">
              <div className="flex items-center border-b border-gray-300 pb-2">
                <FaUser className="text-white mr-2" />
                <input
                  type="text"
                  name="username"
                  placeholder="User Name / Mobile / Email"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none hover:bg-transparent focus:outline-none focus-visible:none focus:ring-0 hover:shadow-none  text-white placeholder-gray-300"
                />
              </div>
            </div>
            {errors.username && (
              <div className="text-red-600"> {errors.username} </div>
            )}

            {/* OTP / Password Selection */}
            <RadioGroup
              value={selected}
              onChange={setSelected}
              className="mt-4"
            >
              <div className="flex space-x-4">
                {options.map((option) => (
                  <RadioGroup.Option
                    key={option}
                    value={option}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    {({ checked }) => (
                      <>
                        <div
                          className={`w-4 h-4 rounded-full border ${
                            checked ? "bg-yellow-400" : "border-gray-300"
                          }`}
                        />
                        <span className="text-white text-sm">{option}</span>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

            {/* OTP Input */}
            <div className="py-2 mt-4">
              {emailOrMobile ? (
                <div>
                  {" "}
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    className="w-full bg-transparent hover:bg-transparent focus:outline-none focus-visible:none focus:ring-0 hover:shadow-none border-b border-gray-300 outline-none text-white placeholder-gray-300 py-2"
                  />
                  {errors.otp && (
                    <div className="text-red-600"> {errors.otp} </div>
                  )}
                </div>
              ) : (
                <div>
                  {" "}
                  <input
                    type="password"
                    name="password" // ✅ Corrected name
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent hover:bg-transparent focus:outline-none focus-visible:none focus:ring-0 hover:shadow-none border-b border-gray-300 outline-none text-white placeholder-gray-300 py-2"
                  />{" "}
                  {errors.password && (
                    <div className="text-red-600"> {errors.password} </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* First Name & Last Name */}
            <div className="flex space-x-4 mt-6">
              <div className="flex items-center border-b border-gray-300 pb-2 w-1/2">
                <FaUser className="text-white mr-2" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-transparent hover:bg-transparent focus:outline-none focus-visible:none focus:ring-0 hover:shadow-none outline-none text-white placeholder-gray-300"
                />
              </div>
              {errors.firstName ||
                (errors.lastName && (
                  <div className="text-red-600">
                    {" "}
                    {errors.firstName || errors.lastName}{" "}
                  </div>
                ))}
              <div className="flex items-center border-b border-gray-300 pb-2 w-1/2">
                <FaUser className="text-white mr-2" />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-transparent hover:bg-transparent focus:outline-none focus-visible:none focus:ring-0 hover:shadow-none outline-none text-white placeholder-gray-300"
                />
              </div>
              {/* {errors.lastName && (
                <div className="text-red-600"> {errors.lastName} </div>
              )} */}
            </div>
            {/* Email Input */}
            <div className="mt-4">
              <div className="flex items-center border-b border-gray-300 pb-2">
                <FaEnvelope className="text-white mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent hover:bg-transparent focus:outline-none focus-visible:none focus:ring-0 hover:shadow-none outline-none text-white placeholder-gray-300"
                />
              </div>{" "}
              {errors.email && (
                <div className="text-red-600"> {errors.email} </div>
              )}
            </div>{" "}
            {/* Phone Number Input */}
            <div className="mt-4">
              <div className="flex items-center border-b border-gray-300 pb-2">
                <FaPhone className="text-white mr-2" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent hover:bg-transparent focus:outline-none focus-visible:none focus:ring-0 hover:shadow-none outline-none text-white placeholder-gray-300"
                />
              </div>{" "}
              {errors.phone && (
                <div className="text-red-600"> {errors.phone} </div>
              )}
            </div>{" "}
            {
              <div className="mt-4">
                <h4 className="text-white text-sm mb-2">Select Gender</h4>
                <RadioGroup
                  value={selectedGender}
                  onChange={handleGenderChange}
                  className="flex space-x-4"
                >
                  {genderOptions.map((gender) => (
                    <RadioGroup.Option
                      key={gender}
                      value={gender}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      {({ checked }) => (
                        <>
                          <div
                            className={`w-4 h-4 rounded-full border ${
                              checked ? "bg-yellow-400" : "border-gray-300"
                            }`}
                          />
                          <span className="text-white text-sm">{gender}</span>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>
              </div>
            }
          </>
        )}
        {/* Gender Selection */}

        {/* Submit Button */}
        <button
          onClick={() => formDataSubmit(isSignIn ? "signin" : "signup")}
          className="w-full mt-6 bg-yellow-500 text-gray-900 font-semibold py-2 rounded-lg hover:bg-yellow-400 transition"
        >
          {isSignIn ? "Login" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
