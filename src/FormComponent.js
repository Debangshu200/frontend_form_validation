import React, { useState } from "react";
import axios from "axios";
import "./FormComponent.css";
import logo from "./assets/EZ Works Blue.png";
import researchIcon1 from "./assets/Research@4x.png";
import researchIcon2 from "./assets/Research@4x-1.png";
import researchIcon3 from "./assets/Research@4x-2.png";
import researchIcon4 from "./assets/Research@4x-3.png";
import researchIcon5 from "./assets/Research@4x-4.png";
import researchIcon6 from "./assets/Research@4x-5.png";

const FormComponent = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Invalid email address");
      return;
    }

    try {
      const response = await axios.post("http://3.228.97.110:9000/api", {
        email,
      });
      if (response.status === 200) {
        setMessage("Form Submitted");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setMessage(error.response.data.message);
      } else {
        setMessage(
          "An error occurred while submitting the form. Please try again!"
        );
      }
    }
  };

  return (
    <div className="form-container">
      <img src={logo} alt="EZ Works" className="logo" />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Contact Me</button>
        {message && <p className="message">{message}</p>}
      </form>
      <div className="icons-container">
        <img
          src={researchIcon1}
          alt="Research Icon 1"
          className="research-icon"
        />
        <img
          src={researchIcon2}
          alt="Research Icon 2"
          className="research-icon"
        />
        <img
          src={researchIcon3}
          alt="Research Icon 3"
          className="research-icon"
        />
        <img
          src={researchIcon4}
          alt="Research Icon 4"
          className="research-icon"
        />
        <img
          src={researchIcon5}
          alt="Research Icon 5"
          className="research-icon"
        />
        <img
          src={researchIcon6}
          alt="Research Icon 6"
          className="research-icon"
        />
      </div>
    </div>
  );
};

export default FormComponent;
