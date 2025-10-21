import { useState } from "react";
import "./Registration.css";
import { ReactComponent as LogoIcon } from "../../assets/icons/myIcon.svg";
import arrowIcon from "../../assets/icons/registra.svg";
import eyeIcon from "../../assets/icons/input.svg";

export const Registration = ({ onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.agree) {
      onRegister(formData);
    } else {
      alert("You must agree to the terms first!");
    }
  };

  return (
    <div className="registration-screen container">
      <LogoIcon className="registration__logo" />

      <div className="registration-content">
        <h1 className="registration__title">Registration</h1>

        <form className="registration" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full name"
            value={formData.fullName}
            onChange={handleChange}
            className="registration__input name-input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="registration__input email-input"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="registration__input phone-input"
          />

          <div className="registration__password">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="registration__input"
              required
            />
            <span
              className="registration__toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img
                src={eyeIcon}
                alt="toggle password visibility"
                style={{ width: "16px", height: "16px" }}
              />
            </span>
          </div>

          <label className="registration__checkbox-label">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="registration__checkbox"
            />
            <span
              className={`registration__checkbox-box ${
                formData.agree ? "checked" : ""
              }`}
            />
            <span>
              By continuing, you agree to our{" "}
              <a href="/terms" target="_blank" className="registration__link">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="/privacy" target="_blank" className="registration__link">
                Privacy Policy
              </a>
            </span>
          </label>

          <button type="submit" className="registration__button">
            <span className="registration__button-text">Continue</span>
            <img
              src={arrowIcon}
              alt="arrow"
              className="registration__button-icon"
            />
          </button>
        </form>
      </div>
    </div>
  );
};
