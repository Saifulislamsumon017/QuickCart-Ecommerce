'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const ProfilePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex w-full justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  const user = session.user;
  const coverImg = '/cover.jpg'; // Replace with actual cover image
  const role = 'User'; // Replace with dynamic role if available

  return (
    <div className="flex w-full justify-center items-center min-h-screen px-4 pt-10 sm:px-6  lg:px-8">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-4xl overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48 sm:h-56 md:h-64 w-full">
          <img
            src={user.image}
            alt="Cover"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center -mt-16 px-6 pb-6">
          {/* Profile Picture */}
          <div className="relative">
            <Image
              src={user.image || '/default-profile.png'}
              alt={user.name || 'User'}
              width={120}
              height={120}
              className="rounded-full border-4 border-white object-cover sm:w-28 sm:h-28 md:w-32 md:h-32"
            />
          </div>

          {/* Role Badge */}
          <span className="mt-3 px-4 py-1 text-xs sm:text-sm font-semibold text-white bg-lime-500 rounded-full">
            {role.toUpperCase()}
          </span>

          {/* User Info */}
          <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
            {user.name || 'No Name'}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">{user.email}</p>

          {/* Info Cards */}
          <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm text-center">
              <p className="text-gray-400 text-sm">User ID</p>
              <p className="mt-1 text-lg sm:text-xl font-bold text-gray-800">
                {user.id || 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm text-center">
              <p className="text-gray-400 text-sm">Role</p>
              <p className="mt-1 text-lg sm:text-xl font-bold text-gray-800">
                {role}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button className="flex-1 bg-lime-500 text-black py-2 px-4 sm:px-6 rounded-xl hover:bg-lime-700 transition font-medium">
              Update Profile
            </button>
            <button className="flex-1 bg-lime-500 text-black py-2 px-4 sm:px-6 rounded-xl hover:bg-lime-700 transition font-medium">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
