import { useState } from "react";
import "./RestorePassword.css";
import { ReactComponent as LogoIcon } from "../../assets/icons/myIcon.svg";

export const RestorePassword = ({ onSendCode, onBack }) => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendCode(email);
  };

  return (
    <div className="restore-screen con">
      <LogoIcon className="restore__logo" />

      <div className="restore-content">
        <h1 className="restore__title">Forgot password?</h1>
        <p className="restore__description">
          Provide your account’s email for which you want to <br />
          restore password!
        </p>

        <form className="restore-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="restore__input"
            required
          />

          <button type="submit" className="restore__button">
            Send code
          </button>
        </form>
      </div>
    </div>
  );
};
