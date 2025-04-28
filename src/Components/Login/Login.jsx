import React, { useRef, useState } from "react";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { toast } from "react-toastify";
import { Link } from "react-router";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
        toast.success("Successfully logged in with Google");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Failed to log in with Google");
      });
  };

  const handleGoogleLogOut = () => {
    setUser({});
    signOut(auth)
      .then(() => toast.success("Successfully logged out"))
      .catch((err) => console.log(err));
  };

  const handleLogInFormSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setErrorMessage("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        toast.success("successfully log in");
        console.log(result.user);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("send an email on your register email");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-80 bg-white shadow-lg rounded-lg p-6">
        {user?.displayName && (
          <p className="text-center font-bold text-2xl mb-8">
            {user.displayName}
          </p>
        )}
        {user?.email && (
          <p className="text-center font-bold text-2xl mb-8">{user.email}</p>
        )}
        {user?.photoURL && (
          <div className="rounded-full flex justify-center">
            <img
              className="rounded-full"
              src={user.photoURL}
              alt="User Profile"
            />
          </div>
        )}
        <p className="text-center font-bold text-2xl mb-8">Welcome back</p>
        <form
          onSubmit={handleLogInFormSubmit}
          className="flex flex-col gap-4 mb-4"
        >
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="rounded-full border border-gray-300 px-4 py-3 focus:outline-none"
          />
          <div className="relative">
            <input
              name="password"
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              className="w-full rounded-full border border-gray-300 px-4 py-3 focus:outline-none"
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
          <p
            className="text-xs text-gray-500 underline text-right cursor-pointer hover:text-black"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </p>
          <button
            type="submit"
            className="bg-teal-500 text-white rounded-full py-3 shadow-md hover:bg-teal-600 active:shadow-none"
          >
            Log in
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center">
          Don't have an account?
          <span className="ml-1 text-teal-500 underline font-bold cursor-pointer">
            <Link to="/register">Register</Link>
          </span>
        </p>

        <div className="flex flex-col gap-4 mt-6">
          {user?.displayName ? (
            <button
              onClick={handleGoogleLogOut}
              className="flex items-center justify-center gap-2 rounded-full bg-white text-black py-3 border-2 border-gray-400 shadow-md cursor-pointer hover:bg-gray-100"
            >
              <span className="text-xs font-semibold">Log Out with Google</span>
            </button>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 rounded-full bg-white text-black py-3 border-2 border-gray-400 shadow-md cursor-pointer hover:bg-gray-100"
            >
              <span className="text-xs font-semibold">Log in with Google</span>
            </button>
          )}
          {errorMessage && (
            <div className="bg-red-500 text-white p-2 rounded-md">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
