import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
    gender: "",
    address: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // State for submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8085/students",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setIsSubmitted(true); // Update submission status
      } else {
        alert("Registration successful!");
      }

      // Clear form data after submission
      setFormData({
        name: "",
        email: "",
        password: "",
        course: "",
        gender: "",
        address: "",
      });
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred while registering the student.");
    }
  };

  const handleResetForm = (e) => {
    e.preventDefault(); // Prevent default behavior
    setIsSubmitted(false); // Reset submission status
  };

  return (
    <div className="container">
      <h1>Student Registration Form</h1>

      {isSubmitted ? (
        <div className="success-message">
          <p>Details are submitted successfully!</p>
          <a href="#!" onClick={handleResetForm}>
            Fill the form again
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="course">Course:</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your course
            </option>
            <option value="B.Sc">B.Sc</option>
            <option value="B.Tech">B.Tech</option>
            <option value="MBA">MBA</option>
          </select>

          <label htmlFor="gender">Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
                required
              />
              Other
            </label>
          </div>

          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            rows="4"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default App;
