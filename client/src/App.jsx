// src/App.jsx
import React, { useState } from "react";
import { AgeConfirmation } from "./components/AgeConfirmation/AgeConfirmation.jsx";
import { Registration } from "./components/Registration/Registration.jsx";
import "./index.css";

function App() {
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const handleConfirm = () => {
    console.log("User confirmed age 18+");
    setAgeConfirmed(true); // показати форму реєстрації
  };

  const handleLeave = () => {
    console.log("User left the service");
    window.location.href = "https://google.com"; // редірект на зовнішню сторінку
  };

  const handleRegister = (formData) => {
    console.log("User registered:", formData);
    alert("Registration successful!"); // тут можна відправити на сервер
  };

  return (
    <>
      {!ageConfirmed ? (
        <AgeConfirmation onConfirm={handleConfirm} onLeave={handleLeave} />
      ) : (
        <Registration onRegister={handleRegister} />
      )}
    </>
  );
}

export default App;
