import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../Hooks/UseAuth';
import SocialLogin from './SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import { useNavigate, useLocation, Link } from 'react-router';
import UseAxios from '../Hooks/UseAxios';
import { User, Mail, Image, Lock } from 'lucide-react';

const Signup = () => {
  const { createUser, updateUser } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = UseAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        email: data.email,
        role: 'user',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };

      await axiosInstance.post('/users', userInfo);
      await createUser(data.email, data.password);
      await updateUser({
        displayName: data.name,
        photoURL: data.photo,
      });

      toast.success('Signup successful!');
      navigate(location?.state || '/');
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="flex items-center justify-center bg-[#fbfaf7] px-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
           <Link to="/" className="flex items-center gap-2 mb-8">
  <span className="text-green-600 text-xl font-bold">🛒 কাঁচাবাজার</span>
  
</Link>

          </div>

          <h2 className="text-3xl font-bold mb-1">Create Account</h2>
          <p className="text-gray-600 mb-6">
            Join us to track market prices and more
          </p>

          {/* Google login */}
          <SocialLogin />

          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  {...register('email', { required: 'Email is required' })}
                  className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Photo */}
            <div>
              <label className="text-sm font-medium">Photo URL (Optional)</label>
              <div className="relative">
                <Image className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  {...register('photo')}
                  className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full pl-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              Create Account →
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-green-600 via-green-500 to-yellow-400 text-white px-10">
        <div className="text-center max-w-md">
          <h2 className="text-4xl font-bold mb-4">
            Join কাঁচাবাজার Today!
          </h2>
          <p className="text-lg opacity-90">
            Track prices, compare markets, and save money on your daily groceries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
