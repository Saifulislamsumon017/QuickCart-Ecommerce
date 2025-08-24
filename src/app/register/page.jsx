'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { IoMdEyeOff } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Spinner from '@/components/Spinner';

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    image: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async e => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    setLoading(false);
    if (res.ok) {
      toast.success('Account created successfully 🎉');
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.error || 'Registration failed');
      toast.error(data.error || 'Registration failed ❌');
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true);
      await signIn('google', { callbackUrl: '/all-products' });
    } catch (err) {
      toast.error('Google signup failed ❌');
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row h-full items-center justify-center px-4 py-10 md:py-20 gap-10">
        <div className="w-full md:w-1/3">
          <div className="w-full shadow-md rounded-2xl dark:bg-gray-800 dark:border-gray-600 bg-white border">
            <div className="p-6">
              <h1 className="text-center text-2xl font-bold">
                Create An Account
              </h1>
              <p className="text-center font-light mt-2 dark:text-gray-300 text-gray-600">
                Enter your details below to create your account
              </p>

              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}

              <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                {/* Full Name */}
                <div>
                  <label className="block mb-1 pl-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
                    onChange={e =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block mb-1 pl-2">Profile Image URL</label>
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    required
                    className="w-full border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
                    onChange={e => setForm({ ...form, image: e.target.value })}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 pl-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="block mb-1 pl-2">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    required
                    className="w-full border pl-3 py-2 rounded dark:border-gray-600 dark:bg-gray-900"
                    onChange={e =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 text-gray-500"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? <FaEye /> : <IoMdEyeOff />}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex gap-2 items-center justify-center shadow-2xl rounded-md py-2 border cursor-pointer bg-lime-500 text-white hover:bg-lime-600 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Spinner size={18} className="text-white" />
                      Creating...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </button>
              </form>

              {/* Social Login */}
              <div className="mt-4">
                <button
                  onClick={handleGoogleSignUp}
                  disabled={googleLoading}
                  className="w-full flex gap-2 items-center justify-center bg-red-500 text-white py-2 rounded hover:bg-red-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {googleLoading ? (
                    <>
                      <Spinner size={18} className="text-white" />
                      Connecting...
                    </>
                  ) : (
                    'Sign Up with Google'
                  )}
                </button>
              </div>

              {/* Login Link */}
              <p className="text-center font-light pt-2 dark:text-gray-300">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="underline text-orange-600 font-semibold"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
