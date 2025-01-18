'use client'; // This is important to mark the file as a client component

import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    file: null,
  });
  const [errors, setErrors] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const schema = yup.object().shape({
    name: yup.string().min(3, "Name must be at least 3 characters long").required("Name is required"),
    age: yup.number().min(18, "Age must be at least 18").max(100, "Age must be less than 100").required("Age is required"),
    file: yup
      .mixed<File>()
      .nullable()
      .required("File is required")
      .test("fileSize", "File size is too large", (value) => {
        return value ? value.size <= 5242880 : false;
      })
      .test("fileType", "Unsupported file type", (value) => {
        return value ? ["image/jpeg", "image/png"].includes(value.type) : false; // Validate type only if the file exists
      }),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      console.log("Form Data:", formData);
      try {
        await axios.post("http://localhost:4000/form", formData);
        setSuccessMessage("Form submitted successfully!");
        setErrors({});
      }
      catch (error: any) {
        console.error("Error:", error.message);
        alert("An error occurred. Please try again later.");
      }
    } catch (validationErrors: any) {
      const formattedErrors: any = {};
      validationErrors.inner.forEach((err: any) => {
        formattedErrors[err.path] = err.message;
      });
      setErrors(formattedErrors);
      setSuccessMessage(null);
    }
  };
 return (
  <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        Create Your Account
      </h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-purple-600">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
        />
        {errors.name && <p className="text-sm text-purple-500 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-purple-600">
          Age
        </label>
        <input
          type="number"
          name="age"
          id="age"
          value={formData.age}
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
        />
        {errors.age && <p className="text-sm text-purple-500 mt-1">{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-medium text-purple-600">
          Profile Picture
        </label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={handleChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {errors.file && <p className="text-sm text-purple-500 mt-1">{errors.file}</p>}
      </div>

      {successMessage && (
        <p className="text-green-500 mt-4 text-center font-bold">{successMessage}</p>
      )}
      
      <button 
        type="submit" 
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Submit
      </button>
    </form>
  </div>
);

  
};

export default Form;
