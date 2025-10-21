import { useState } from "react";
import { Login } from "./components/Login/Login.jsx";
import { AgeConfirmation } from "./components/AgeConfirmation/AgeConfirmation.jsx";
import { Registration } from "./components/Registration/Registration.jsx";
import { Questions } from "./components/Questions/Questions.jsx";
import { RestorePassword } from "./components/RestorePassword/RestorePassword.jsx";
import { SelectMethod } from "./components/SelectMethod/SelectMethod.jsx";
import { EnterCode } from "./components/EnterCode/EnterCode.jsx";
import { EnterNewPassword } from "./components/EnterNewPassword/EnterNewPassword.jsx";
import { EnterNewEmail } from "./components/EnterNewEmail/EnterNewEmail.jsx";
import { ConfirmEmailByPhone } from "./components/ConfirmEmailByPhone/ConfirmEmailByPhone.jsx";
import "./index.css";

function App() {
  const [screen, setScreen] = useState("login");
  const [userData, setUserData] = useState(null);
  const [emailForRecovery, setEmailForRecovery] = useState(
    "roffmawkaa722@gmail.com"
  );
  const [contact, setContact] = useState(""); // email або телефон
  const [destinationType, setDestinationType] = useState(""); // "email" або "phone"

  // === LOGIN ===
  const handleLogin = (formData) => console.log("User logged in:", formData);
  const handleGoToAge = () => setScreen("age");
  const handleGoToRestore = () => setScreen("restore");

  // === AGE CONFIRMATION ===
  const handleConfirmAge = () => setScreen("register");
  const handleLeave = () => (window.location.href = "https://google.com");

  // === REGISTRATION ===
  const handleRegister = (formData) => {
    setUserData(formData);
    setScreen("questions");
  };

  // === QUESTIONS ===
  const handleNext = (selectedOption) =>
    alert(`You selected: ${selectedOption}`);
  const handleBack = () => setScreen("register");

  // === RESTORE PASSWORD ===
  const handleSendCode = (email) => {
    setEmailForRecovery(email);
    setScreen("selectMethod");
  };

  // === SELECT METHOD ===
  const handleSelectMethod = (selectedMethod) => {
    if (selectedMethod === "mail") {
      setDestinationType("email");
      setContact(emailForRecovery);
    } else if (selectedMethod === "sms") {
      setDestinationType("phone");
      setContact("+8 (32) 646 22 11"); // приклад номера
    }
    setScreen("enterCode");
  };

  // === ENTER CODE ===
  const handleVerifyCode = (code) => setScreen("enterNewPassword");

  // === CHANGE EMAIL ===
  const handleChangeEmail = () => setScreen("enterNewEmail");

  const handleSaveNewEmail = (newEmail) => {
    setEmailForRecovery(newEmail);
    setContact(newEmail);
    setDestinationType("email");
    setScreen("confirmContact"); // переходимо на підтвердження коду
  };

  // === CONFIRM EMAIL/PHONE ===
  const handleConfirmContact = (code) => {
    console.log(`Confirmed ${destinationType} with code:`, code);
    setScreen("enterCode"); // або можна на інший екран після підтвердження
  };

  // === ENTER NEW PASSWORD ===
  const handleSaveNewPassword = (newPassword) => {
    alert("Password saved successfully!");
    setScreen("login");
  };

  // === BACK TO LOGIN ===
  const handleBackToLogin = () => setScreen("login");

  return (
    <>
      {screen === "login" && (
        <Login
          onLogin={handleLogin}
          onRegister={handleGoToAge}
          onForgotPassword={handleGoToRestore}
        />
      )}

      {screen === "age" && (
        <AgeConfirmation onConfirm={handleConfirmAge} onLeave={handleLeave} />
      )}

      {screen === "register" && <Registration onRegister={handleRegister} />}

      {screen === "questions" && (
        <Questions
          onNext={handleNext}
          onBack={handleBack}
          userData={userData}
        />
      )}

      {screen === "restore" && (
        <RestorePassword
          onSendCode={handleSendCode}
          onBack={handleBackToLogin}
        />
      )}

      {screen === "selectMethod" && (
        <SelectMethod
          onNext={handleSelectMethod}
          onCancel={handleBackToLogin}
        />
      )}

      {screen === "enterCode" && (
        <EnterCode
          contact={contact}
          destinationType={destinationType}
          onNext={handleVerifyCode}
          onCancel={() => setScreen("selectMethod")}
          onChangeEmail={handleChangeEmail}
        />
      )}

      {screen === "enterNewEmail" && (
        <EnterNewEmail
          onSave={handleSaveNewEmail}
          onCancel={() => setScreen("enterCode")}
        />
      )}

      {screen === "confirmContact" && (
        <ConfirmEmailByPhone
          contact={contact}
          destinationType={destinationType}
          onConfirm={handleConfirmContact}
          onCancel={() => setScreen("enterNewEmail")}
        />
      )}

      {screen === "enterNewPassword" && (
        <EnterNewPassword
          onSave={handleSaveNewPassword}
          onCancel={handleBackToLogin}
        />
      )}
    </>
  );
}

export default App;
