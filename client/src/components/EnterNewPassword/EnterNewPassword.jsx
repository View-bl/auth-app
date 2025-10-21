import { useState } from "react";
import "./EnterNewPassword.css";
import { ReactComponent as LogoIcon } from "../../assets/icons/myIcon.svg";
import eyeIcon from "../../assets/icons/input.svg"; // іконка очей

export const EnterNewPassword = ({ onSave, onCancel }) => {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const toggleShow = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSave = () => {
    if (!passwords.newPassword || !passwords.confirmPassword) {
      alert("Please fill in both fields");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSave(passwords.newPassword);
  };

  return (
    <div className="enter-code-screen con">
      <LogoIcon className="enter-code__logo" />

      <div className="enter-code-content">
        <h1 className="enter-code__title">Enter new password</h1>

        <form className="enter-code-form" onSubmit={(e) => e.preventDefault()}>
          <div className="enter-code__inputs">
            <div className="password-input-wrapper">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New password"
                value={passwords.newPassword}
                onChange={handleChange}
                className="enter-code__input"
              />
              <img
                src={eyeIcon}
                alt="Toggle visibility"
                className="eye-icon"
                onClick={() => toggleShow("newPassword")}
              />
            </div>

            <div className="password-input-wrapper">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={passwords.confirmPassword}
                onChange={handleChange}
                className="enter-code__input"
              />
              <img
                src={eyeIcon}
                alt="Toggle visibility"
                className="eye-icon"
                onClick={() => toggleShow("confirmPassword")}
              />
            </div>
          </div>

          <button
            type="button"
            className="enter-code__buttonn"
            onClick={handleSave}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
