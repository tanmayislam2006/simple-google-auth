import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import auth from "../../firebase/firebase.init";
import { toast } from "react-toastify";
import { Link } from "react-router";

const Login = () => {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
        toast.success("Success fully Log In with Google");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleGoogleLogOut = () => {
    setUser({});
    signOut(auth)
      .then(() => toast.success("success FULLY log out"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-80 bg-white shadow-lg rounded-lg p-6">
        <p className="text-center font-bold text-2xl mb-8">
          {user.displayName}
        </p>
        <p className="text-center font-bold text-2xl mb-8">{user.email}</p>
        <div className="rounded-full flex justify-center">
        <img className="rounded-full" src={user.photoURL} alt="" />
        </div>
        <p className="text-center font-bold text-2xl mb-8">Welcome back</p>
        <form className="flex flex-col gap-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            className="rounded-full border border-gray-300 px-4 py-3 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="rounded-full border border-gray-300 px-4 py-3 focus:outline-none"
          />
          <p className="text-xs text-gray-500 underline text-right cursor-pointer hover:text-black">
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
            <Link to="/registar">Registar</Link>
          </span>
        </p>

        <div className="flex flex-col gap-4 mt-6">
          {user?.displayName ? (
            <button
              onClick={handleGoogleLogOut}
              className="flex items-center justify-center gap-2 rounded-full bg-white text-black py-3 border-2 border-gray-400 shadow-md cursor-pointer hover:bg-gray-100"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                className="text-lg"
                viewBox="0 0 48 48"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              <span className="text-xs font-semibold">Log Out with Google</span>
            </button>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 rounded-full bg-white text-black py-3 border-2 border-gray-400 shadow-md cursor-pointer hover:bg-gray-100"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                className="text-lg"
                viewBox="0 0 48 48"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
      	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
      	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
      	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
      	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
      	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              <span className="text-xs font-semibold">Log in with Google</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
