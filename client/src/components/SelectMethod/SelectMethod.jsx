import { useState } from "react";
import "./SelectMethod.css";
import { ReactComponent as LogoIcon } from "../../assets/icons/myIcon.svg";
import mailIcon from "../../assets/icons/mail.svg";
import telIcon from "../../assets/icons/tel.svg";
import arrowIcon from "../../assets/icons/registra.svg";
import nextBack from "../../assets/icons/nextBack.svg"; // імпорт кнопки назад

export const SelectMethod = ({ onNext, onCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMethod) {
      onNext(selectedMethod);
    } else {
      alert("Please select a method first!");
    }
  };

  return (
    <div className="select-method-screen con">
      <button className="select-method__back-btn" onClick={onCancel}>
        <img src={nextBack} alt="Back" width={16} height={16} />
      </button>

      <LogoIcon className="select-method__logo" />

      <div className="select-method-content">
        <h1 className="select-method__title">Make selection</h1>
        <p className="select-method__description">
          Select which contact detail should we use to reset your password.
        </p>

        <form className="select-method-form" onSubmit={handleSubmit}>
          <label
            className={`select-method__option ${
              selectedMethod === "mail" ? "selected" : ""
            }`}
            onClick={() => handleSelect("mail")}
          >
            <img
              src={mailIcon}
              alt="mail icon"
              className="select-method__icon"
            />
            <div className="select-method__text">
              <span className="email-tel">via mail:</span>
              <span className="select-method__detail">useremail@gmail.com</span>
            </div>
          </label>

          <label
            className={`select-method__option ${
              selectedMethod === "sms" ? "selected" : ""
            }`}
            onClick={() => handleSelect("sms")}
          >
            <img
              src={telIcon}
              alt="tel icon"
              className="select-method__icon select-method__icon--tel"
            />
            <div className="select-method__text">
              <span className="email-tel">via sms:</span>
              <span className="select-method__detail">+8 (32) 646 22 11</span>
            </div>
          </label>

          <button type="submit" className="select-method__button">
            <span className="select-method__button-text">Next</span>
            <img
              src={arrowIcon}
              alt="arrow"
              className="select-method__button-icon"
            />
          </button>
        </form>
        <button
          type="button"
          className="select-method__cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
