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
        className="px-4 py-2 rounded-full border border-orange-600 bg-orange-600 text-white hover:bg-orange-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
