import { useState } from "react";
import "./Login.css";
import { ReactComponent as LogoIcon } from "../../assets/icons/myIcon.svg";
import arrowIcon from "../../assets/icons/registra.svg";
import eyeIcon from "../../assets/icons/input.svg";

export const Login = ({ onLogin, onRegister, onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="login-screen con">
      <LogoIcon className="login__logo" />

      <div className="login-content">
        <h1 className="login__title">Welcome back!</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="identifier"
            placeholder="Email/Phone"
            value={formData.identifier}
            onChange={handleChange}
            className="login__input"
            required
            autoComplete="username"
          />

          <div className="login__password">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="login__input"
              required
              autoComplete="current-password"
            />
            <span
              className="login__toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img
                src={eyeIcon}
                alt="toggle password visibility"
                className="login__eye"
              />
            </span>
          </div>

          <div className="login__forgot">
            <button
              type="button"
              className="login__link"
              onClick={onForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="login__button">
            <span className="login__button-text">Log in</span>
            <img src={arrowIcon} alt="arrow" className="login__button-icon" />
          </button>
        </form>

        <p className="login__footer-text">
          Don’t have an account?{" "}
          <button
            type="button"
            className="login__register-link"
            onClick={onRegister}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};
