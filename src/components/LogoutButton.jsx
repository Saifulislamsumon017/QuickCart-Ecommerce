'use client';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from './Spinner';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    toast.loading('Logging out...', { id: 'logout' });

    await signOut({ callbackUrl: '/login' });

    toast.success('Logged out successfully 🎉', { id: 'logout' });
    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <button
        onClick={handleLogout}
        disabled={loading}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading && <Spinner size={16} className="text-white" />}
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </>
  );
};

export default LogoutButton;
