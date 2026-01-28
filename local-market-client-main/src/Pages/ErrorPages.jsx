import React from 'react';
import { Link } from 'react-router';

const ErrorPages = () => {
    return (
        <div>
            <section className="flex items-center justify-center h-screen bg-gradient-to-tr from-purple-600 via-indigo-700 to-blue-800 text-white px-6">
  <div className="max-w-xl text-center">
    {/* Animated big error number */}
    <h1 className="text-[10rem] font-black tracking-widest opacity-20 select-none animate-pulse">
      404
    </h1>
    
    {/* Main message */}
    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
      Oops! Page Not Found
    </h2>
    
    {/* Supporting text */}
    <p className="text-lg md:text-xl mb-8 max-w-md mx-auto drop-shadow-md">
      We can’t seem to find the page you’re looking for. It might have been removed, renamed, or is temporarily unavailable.
    </p>
    
    {/* Button with hover effect */}
    <Link to={`/`} 
      
      className="inline-block bg-white text-purple-700 font-semibold rounded-lg px-8 py-3 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
      rel="noopener noreferrer"
    >
      Back to Homepage
    </Link>
    
    {/* Optional: A subtle decorative underline */}
    <div className="mt-10 flex justify-center">
      <span className="w-20 h-1 rounded-full bg-white/30 animate-pulse"></span>
    </div>
  </div>
</section>

        </div>
    );
};

export default ErrorPages;