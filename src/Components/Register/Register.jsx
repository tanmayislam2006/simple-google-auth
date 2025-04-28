import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      setIsLoading(false);
      return;
    }

    if (!terms) {
      toast.warn("Please agree to the terms.");
      setIsLoading(false);
      return;
    }

    // Password validation
    const hasNumber = /(?=.*\d)/.test(password); // Checks for at least one digit
    const hasLowercase = /(?=.*[a-z])/.test(password); // Checks for at least one lowercase letter
    const hasUppercase = /(?=.*[A-Z])/.test(password); // Checks for at least one uppercase letter
    const hasMinimumLength = /.{8,}/.test(password); // Checks for a minimum length of 8 characters

    if (!hasNumber) {
      toast.error("Password must contain at least one number.");
      setIsLoading(false);
      return;
    }

    if (!hasLowercase) {
      toast.error("Password must contain at least one lowercase letter.");
      setIsLoading(false);
      return;
    }

    if (!hasUppercase) {
      toast.error("Password must contain at least one uppercase letter.");
      setIsLoading(false);
      return;
    }

    if (!hasMinimumLength) {
      setErrorMessage("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    // Proceed with Firebase registration
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {

        console.log(result);
        if(!result.user.emailVerified){
          toast.warn("please verify your email")
        }
        else{
          toast.success("Successfully Registered");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="max-w-sm mx-auto mt-10 rounded-2xl bg-slate-800 shadow-lg">
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-4 p-8">
        <p className="text-center text-3xl font-bold text-gray-200 mb-6">
          Register
        </p>

        {/* Email Input */}
        <label htmlFor="email" className="text-gray-400 text-sm">
          Email
        </label>
        <input
          name="email"
          type="email"
          className="bg-slate-900 w-full rounded-lg border border-gray-500 px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
          placeholder="Enter your email"
          required
        />

        {/* Password Input */}
        <label htmlFor="password" className="text-gray-400 text-sm">
          Password
        </label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="bg-slate-900 w-full rounded-lg border border-gray-500 px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            className="absolute bg-green-600 text-white font-bold px-4 py-2 rounded-2xl right-4 top-1 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Terms of Use */}
        <label className="flex items-center justify-between text-gray-400 text-sm mt-2">
          <span>Accept terms of use</span>
          <div className="relative inline-block">
            <input
              name="terms"
              className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-500 bg-gray-600 checked:border-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              type="checkbox"
            />
            <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-gray-500 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-400" />
          </div>
        </label>

        {/* Register Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 w-full rounded-lg px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-teal-500 hover:bg-teal-600 focus:ring-teal-400"
          }`}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-500 text-white p-2 rounded-md">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
