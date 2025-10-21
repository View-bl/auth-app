import { useState } from "react";
import "./EnterCode.css";
import { ReactComponent as LogoIcon } from "../../assets/icons/myIcon.svg";

export const EnterCode = ({
  contact,
  destinationType,
  onNext,
  onChangeEmail,
}) => {
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

      if (newCode.every((digit) => digit !== "")) {
        onNext(newCode.join(""));
      }
    }
  };

  const handleResend = () => {
    setSentMessage(true);
    setTimeout(() => setSentMessage(false), 3000);
    // тут можна викликати API для повторної відправки
  };

  return (
    <div className="enter-code-screenn con">
      <LogoIcon className="enter-code__logo" />

      <div className="enter-code-content">
        <h1 className="enter-code__titlee">Enter 6-digit recovery code</h1>

        <p className="enter-code__description">
          The recovery code was sent to <strong>{contact}</strong>. Please enter
          the code.{" "}
          {destinationType === "email" && (
            <button
              type="button"
              className="enter-code__change-inline"
              onClick={onChangeEmail}
            >
              Change email address
            </button>
          )}
        </p>

        {sentMessage && (
          <p className="enter-code__sent-message">
            The code has been resent to {contact}.
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

        <form className="enter-code-form">
          <div className="enter-code__inputss">
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
