import "./AgeConfirmation.css";
import { ReactComponent as LogoIcon } from "../../assets/icons/myIcon.svg";

export const AgeConfirmation = ({ onConfirm, onLeave }) => {
  return (
    <div className="age-confirmation container">
      {/* Логотип зверху */}
      <LogoIcon className="age-confirmation__logo" />

      {/* Внутрішній контейнер */}
      <div className="age-confirmation__inner">
        <h1 className="age-confirmation__title">
          18<span className="age-confirmation__plus">+</span>
        </h1>

        <p className="age-confirmation__text">
          By continuing, you confirm that you are at least 18 years old and
          legally permitted to use this service.
        </p>

        <div className="age-confirmation__buttons">
          <button
            className="age-confirmation__button age-confirmation__button--confirm"
            onClick={onConfirm}
          >
            I’m over 18 years old
          </button>
          <button
            className="age-confirmation__button age-confirmation__button--leave"
            onClick={onLeave}
          >
            Leave the service
          </button>
        </div>
      </div>
    </div>
  );
};
