import { useState } from "react";
import "./EnterNewEmail.css";
import { ReactComponent as LogoIcon } from "../../assets/icons/myIcon.svg";
export const EnterNewEmail = ({ onSave, onCancel }) => {
  const [emails, setEmails] = useState({
    newEmail: "",
    confirmEmail: "",
  });

  const handleChange = (e) => {
    setEmails({ ...emails, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!emails.newEmail || !emails.confirmEmail) {
      alert("Please fill in both fields");
      return;
    }
    if (emails.newEmail !== emails.confirmEmail) {
      alert("Emails do not match");
      return;
    }
    onSave(emails.newEmail);
  };

  return (
    <div className="enter-email-screen con">
      <LogoIcon className="enter-email__logo" />

      <div className="enter-email-content">
        <h1 className="enter-email__title">Enter new email</h1>

        <form className="enter-email-form" onSubmit={(e) => e.preventDefault()}>
          <div className="enter-email__inputs">
            <div className="email-input-wrapper">
              <input
                type="email"
                name="newEmail"
                placeholder="New email"
                value={emails.newEmail}
                onChange={handleChange}
                className="enter-email__input"
              />
            </div>

            <div className="email-input-wrapper">
              <input
                type="email"
                name="confirmEmail"
                placeholder="Confirm email"
                value={emails.confirmEmail}
                onChange={handleChange}
                className="enter-email__input"
              />
            </div>
          </div>

          <button
            type="button"
            className="enter-email__button"
            onClick={handleSave}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
