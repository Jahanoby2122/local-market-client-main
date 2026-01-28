import React, { useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxios from "../../Hooks/UseAxios";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { googleSignIn } = UseAuth();
  const axiosInstance = UseAxios()
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    
    googleSignIn()
      .then(async(result) => {
        const user = result.user;
        
        // update user info in database
        const userInfo = {
          email: user.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };

        try {
          await axiosInstance.post('/users', userInfo);
          navigate(location?.state || "/");
          toast.success("Login successful! 🎉");
        } catch (error) {
          console.log("Error updating user:", error);
          toast.error("Profile setup incomplete");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google login failed. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full">
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className={`
          relative flex items-center justify-center gap-3 
          w-full px-4 py-3.5 
          bg-white hover:bg-gray-50 active:bg-gray-100
          text-gray-700 hover:text-gray-900
          border border-gray-300 hover:border-gray-400
          rounded-lg
          font-medium
          transition-all duration-200
          shadow-sm hover:shadow
          disabled:opacity-60 disabled:cursor-not-allowed
          disabled:hover:bg-white disabled:hover:shadow-sm
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
          group
        `}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <div className="transition-transform duration-200 group-hover:scale-110">
              <svg
                aria-label="Google logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
            </div>
            <span>Continue with Google</span>
          </>
        )}
      </button>

      <p className="mt-4 text-xs text-center text-gray-500">
        By continuing, you agree to our{" "}
        <a href="#" className="text-green-600 hover:text-green-700 hover:underline">
          Terms
        </a>{" "}
        and{" "}
        <a href="#" className="text-green-600 hover:text-green-700 hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default SocialLogin;