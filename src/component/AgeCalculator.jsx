import { useState, useRef } from "react";
import toast from "react-hot-toast";

const AgeCalculator = () => {
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");
  const dateInputRef = useRef(null);

  // Calculate age
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days += prevMonth;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const dateValue = dateInputRef.current.value;

    if (!dateValue) {
      toast.error('Please select your birthdate! ', {
        id: "birthdate-error",
        duration: 1500,
        className: "animate-fade-in bg-red-100 text-red-700 font-semibold",
      });
      setAge(null);
      return;
    }

    const birthDate = new Date(dateValue);
    const today = new Date();

    if (birthDate > today) {
      setError("Birthdate cannot be in the future!");
      setAge(null);
      dateInputRef.current.value = "";
      return;
    }

    const calculatedAge = calculateAge(dateValue);
    setAge(calculatedAge);
    setError("");

    // Clear input after calculation
    dateInputRef.current.value = "";
  };

  // Auto-open date picker on click
  const handleDateClick = () => {
    dateInputRef.current.showPicker?.();
    dateInputRef.current.focus();
    // Hide previous age result
    setAge(null);
    setError("");
  };

  // Render age text
  const renderAgeText = () => {
    if (!age) return null;

    if (age.years === 0 && age.months === 0) {
      return `Age: ${age.days} Days old`;
    } else if (age.years === 0) {
      return `Age: ${age.months} Months, ${age.days} Days old`;
    } else {
      return `Age: ${age.years} Years, ${age.months} Months, ${age.days} Days`;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-3">
        <div
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in-down"
          style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 animate-fade-in">
            Age Calculator
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="age" className="block text-gray-700 font-medium">
                Enter Your Date of Birth :
              </label>
              <input
                type="date"
                ref={dateInputRef}
                placeholder="Select Date"
                id="dateInput"
                onClick={handleDateClick}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                 text-gray-700  placeholder-gray-400 hover:border-purple-500 
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  focus:border-transparent transition duration-300 appearance-none cursor-pointer"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 outline-none hover:cursor-pointer hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Calculate
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            {error && (
              <p className="text-red-500 text-center font-semibold text-lg">{error}</p>
            )}
            {age && (
              <p className="text-center text-xl font-semibold text-gray-800 animate-fade-in">
                {renderAgeText()}
              </p>
            )}
          </div>
        </div>
      </div>
       
       {/* animation style */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 1s ease;
          }
          .animate-fade-in-down {
            animation: fadeInDown 1s cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default AgeCalculator;
