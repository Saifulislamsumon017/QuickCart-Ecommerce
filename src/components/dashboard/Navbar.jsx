import React from 'react';
import logo from '../../assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  return (
    <div className="flex items-center px-4 md:px-8 py-3 justify-between border-b">
      <Link href="/">
        <Image className="w-28 lg:w-32 cursor-pointer" src={logo} alt="logo" />
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className=" bg-red-500 text-white hover:bg-red-600   px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
