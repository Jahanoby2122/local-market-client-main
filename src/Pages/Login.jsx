import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../Hooks/UseAuth";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin/SocialLogin";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, user } = UseAuth();
  console.log(user)
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        toast.success("Sign in successfully");
        navigate(location?.state || "/");
      })
      .catch(() => {
        toast.error("Sign in failed");
      });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-green-600 via-green-500 to-yellow-400">
        <div className="text-center text-white px-10">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg opacity-90 max-w-sm mx-auto">
            Continue tracking prices and saving money on your daily groceries.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-[#fdfbf6] px-6">
        <div className="w-full max-w-md bg-[#fdfbf6]">
          
          {/* LOGO */}
          <div className="flex  mb-6">
           
            <Link to="/" className="flex items-center gap-2 mb-8">
  <h2 className="text-green-700 font-bold text-xl">
              🛒 কাঁচাবাজার
            </h2>
</Link>

          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            Login
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Enter your credentials to access your account
          </p>

          {/* GOOGLE LOGIN */}
          <SocialLogin />

          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              Login →
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-green-700 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
