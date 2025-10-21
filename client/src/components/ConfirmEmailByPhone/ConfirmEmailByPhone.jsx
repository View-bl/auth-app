import { useState } from "react";
import { ReactComponent as LogoIcon } from "../../assets/icons/myIcon.svg";
import "./ConfirmEmailByPhone.css"; 

export const ConfirmEmailByPhone = ({ phone, onConfirm }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [sentMessage, setSentMessage] = useState(false);

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }

      if (newCode.every((d) => d !== "")) {
        onConfirm(newCode.join(""));
      }
    }
  };

  const handleResend = () => {
    setSentMessage(true);

    setTimeout(() => setSentMessage(false), 3000);
  };

  return (
    <div className="enter-code-screenn con">
      <LogoIcon className="enter-code__logo" />

      <div className="enter-code-content">
        <h1 className="enter-code__titlee">Confirm new email</h1>
        <p className="enter-code__description">
          A verification code was sent to your phone: <strong>{phone}</strong>
        </p>

        {sentMessage && (
          <p className="enter-code__sent-message">
            The code has been resent to {phone}.
          </p>
        )}

        {!sentMessage && (
          <button
            type="button"
            className="enter-code__resend-button"
            onClick={handleResend}
          >
            Resend code
          </button>
        )}

        <form className="enter-code-form" onSubmit={(e) => e.preventDefault()}>
          <div className="enter-code__inputsit">
            {code.map((digit, i) => (
              <input
                key={i}
                id={`code-${i}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="enter-code__inputt"
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};
