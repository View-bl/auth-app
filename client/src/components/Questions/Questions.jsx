import { useState, useMemo } from "react";
import Select, { components } from "react-select";
import AsyncSelect from "react-select/async";
import DatePicker from "react-datepicker";
import countryList from "react-select-country-list";
import { City } from "country-state-city";
import "react-datepicker/dist/react-datepicker.css";
import "./Questions.css";
import { ReactComponent as LogoIcon } from "../../assets/icons/myIcon.svg";
import backArrowIconMobile from "../../assets/icons/nextBack.svg";
import backArrowIconDesktop from "../../assets/icons/nextBlask.svg";
import nextArrowIcon from "../../assets/icons/next.svg";
import arrowIcon from "../../assets/icons/registra.svg";
import dateIcon from "../../assets/icons/data.svg";
import selectIcon from "../../assets/icons/Select.svg";

// Кастомна стрілка для Select
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={selectIcon} alt="arrow" style={{ width: 12, height: 6 }} />
    </components.DropdownIndicator>
  );
};

export const Questions = ({ onNext, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    country: null,
    city: null,
    dateOfBirth: "",
    biography: "",
    lookingFor: "",
  });

  const options = [
    "Friends first",
    "Casual dating",
    "Serious relationships",
    "Activity partner",
  ];

  const countryOptions = useMemo(
    () =>
      countryList()
        .getData()
        .map((country) => ({
          value: country.value,
          label: country.label,
        })),
    []
  );

  const handleNext = () => {
    if (step === 1 && (!formData.country || !formData.city)) {
      alert("Please fill in both Country and City");
      return;
    }
    if (step === 2 && (!formData.dateOfBirth || !formData.biography)) {
      alert("Please fill in Date of Birth and Biography");
      return;
    }
    if (step === 3 && !formData.lookingFor) {
      alert("Please select an option");
      return;
    }
    if (step < 3) setStep(step + 1);
    else onNext(formData);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  return (
    <div className="questions-screen container">
      <LogoIcon className="questions__logo" />

      <div className="questions__nav">
        <button className="questions__back-button" onClick={handleBack}>
          <img
            src={backArrowIconMobile}
            alt="back"
            className="questions__back-icon-mobile"
          />
          <img
            src={backArrowIconDesktop}
            alt="back"
            className="questions__back-icon-desktop"
          />
          <span className="back-text">Back</span>
        </button>
        <img src={nextArrowIcon} alt="next" className="questions__next-icon" />
      </div>

      <form
        className={`questions-form 
          ${step === 1 ? "questions-form-step1" : ""} 
          ${step === 2 ? "questions-form-step2" : ""} 
          ${step === 3 ? "questions-form-step3" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <div className="questions-content">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h1 className="questions__title">Where do you live?</h1>

              {/* Country */}
              <div className="questions__field">
                <label htmlFor="country" className="questions__label">
                  Country
                </label>
                <Select
                  inputId="country"
                  options={countryOptions}
                  value={formData.country}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      country: selectedOption,
                      city: null,
                    })
                  }
                  placeholder="Select country"
                  classNamePrefix="react-select"
                  className="questions__select"
                  isSearchable={false}
                  formatOptionLabel={(option) => <span>{option.label}</span>}
                  components={{ DropdownIndicator }}
                />
              </div>

              {/* City */}
              <div className="questions__field">
                <label htmlFor="city" className="questions__label">
                  City
                </label>
                <AsyncSelect
                  inputId="city"
                  cacheOptions={false}
                  loadOptions={(inputValue) =>
                    new Promise((resolve) => {
                      if (!formData.country) return resolve([]);
                      if (inputValue.length < 2) return resolve([]);
                      const filtered = City.getCitiesOfCountry(
                        formData.country.value
                      )
                        .filter((c) =>
                          c.name
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                        )
                        .map((city) => ({
                          value: city.name,
                          label: city.name,
                        }));
                      resolve(filtered);
                    })
                  }
                  value={formData.city}
                  onChange={(selectedOption) =>
                    setFormData({ ...formData, city: selectedOption })
                  }
                  placeholder={
                    !formData.country
                      ? "Select country first"
                      : "Type at least 2 letters"
                  }
                  isDisabled={!formData.country}
                  classNamePrefix="react-select"
                  className="questions__select"
                  isSearchable={true}
                  components={{ DropdownIndicator }}
                />
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h1 className="questions__title">Tell us about yourself</h1>

              <div className="questions__field not-bootom">
                <label className="questions__label">Date of birth</label>
                <div className="input-with-icon">
                  <DatePicker
                    selected={
                      formData.dateOfBirth
                        ? new Date(formData.dateOfBirth)
                        : null
                    }
                    onChange={(date) =>
                      setFormData({
                        ...formData,
                        dateOfBirth: date.toISOString().slice(0, 10),
                      })
                    }
                    placeholderText="Select date"
                    className="questions__input"
                    dateFormat="dd.MM.yyyy"
                  />
                  <img src={dateIcon} alt="date" className="input-icon" />
                </div>
              </div>

              <div className="questions__field">
                <label htmlFor="biography" className="questions__label">
                  Biography
                </label>
                <textarea
                  id="biography"
                  name="biography"
                  value={formData.biography}
                  onChange={(e) =>
                    setFormData({ ...formData, biography: e.target.value })
                  }
                  placeholder="Enter"
                  className="questions__textarea"
                />
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h1 className="questions__title">What are you looking for?</h1>
              <ul className="questions__options-list">
                {options.map((option) => (
                  <li
                    key={option}
                    className={`questions__option-item ${
                      formData.lookingFor === option ? "selected" : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, lookingFor: option })
                    }
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <button type="submit" className="questions__button">
          Continue
          <img src={arrowIcon} alt="arrow" className="questions__button-icon" />
        </button>
      </form>
    </div>
  );
};
