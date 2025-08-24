'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { IoMdEyeOff } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Spinner from '@/components/Spinner';

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (!res.error) {
      toast.success('Login successful 🎉');
      router.push('/all-products');
    } else {
      setError('Invalid credentials');
      toast.error('Login failed ❌');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await signIn('google', { callbackUrl: '/all-products' });
    } catch (err) {
      toast.error('Google login failed ❌');
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row h-full items-center justify-center px-4 py-10 md:py-20 gap-10">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="w-full md:w-1/3">
          <div className="w-full shadow-md rounded-2xl dark:bg-gray-800 dark:border-gray-600 bg-white border">
            <div className="p-6">
              <h1 className="text-center text-2xl font-bold">Log In</h1>
              <p className="text-center font-light mt-2 dark:text-gray-300 text-gray-600">
                Enter your details below to log in
              </p>

              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
                    placeholder="Enter your password"
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
                      Logging in...
                    </>
                  ) : (
                    'Log In'
                  )}
                </button>
              </form>

              {/* Social Login */}
              <div className="mt-4">
                <button
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                  className="w-full flex gap-2 items-center justify-center bg-red-500 text-white py-2 rounded hover:bg-red-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {googleLoading ? (
                    <>
                      <Spinner size={18} className="text-white" />
                      Connecting...
                    </>
                  ) : (
                    'Login with Google'
                  )}
                </button>
              </div>

              {/* Register Link */}
              <p className="text-center font-light pt-2 dark:text-gray-300">
                Don't have an account?{' '}
                <Link
                  href="/register"
                  className="underline text-orange-600 font-semibold"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
