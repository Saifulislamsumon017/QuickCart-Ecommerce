'use client';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { assets } from '@/assets/assets';

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/all-products', label: 'Shop' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-colors">
      <div className="max-w-8xl mx-auto flex items-center justify-between px-6 md:px-16 lg:px-32 py-3">
        {/* Logo */}
        <Image
          src={assets.logo}
          alt="logo"
          className="w-28 md:w-32 cursor-pointer"
          onClick={() => (window.location.href = '/')}
        />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${
                pathname === link.href
                  ? 'px-4 py-1.5 rounded-full border border-orange-600 bg-orange-600 text-white hover:bg-orange-700'
                  : 'px-4 py-1.5 rounded-full border border-orange-600 text-orange-600 hover:bg-orange-50'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Desktop Auth Buttons */}
          {!session ? (
            <>
              <Link
                href="/login"
                className="px-4 py-1.5 rounded-full border border-orange-600 bg-orange-600 text-white hover:bg-orange-700 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 rounded-full border border-orange-600 text-orange-600 hover:bg-orange-50 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span>{session.user.name || session.user.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="px-4 py-1.5 rounded-full border border-orange-600 bg-orange-600 text-white hover:bg-orange-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-200 transition"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md w-full px-6 py-4 flex flex-col gap-3 transition-colors">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${
                pathname === link.href
                  ? 'px-4 py-2 rounded-full border border-orange-600 bg-orange-600 text-white hover:bg-orange-700'
                  : 'px-4 py-2 rounded-full border border-orange-600 text-orange-600 hover:bg-orange-50'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Auth Buttons */}
          {!session ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-full border border-orange-600 bg-orange-600 text-white hover:bg-orange-700 transition"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-full border border-orange-600 text-orange-600 hover:bg-orange-50 transition"
                onClick={() => setMobileOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span>{session.user.name || session.user.email}</span>
              <button
                onClick={() => {
                  signOut({ callbackUrl: '/login' });
                  setMobileOpen(false);
                }}
                className="px-4 py-2 rounded-full border border-orange-600 bg-orange-600 text-white hover:bg-orange-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
