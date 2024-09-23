import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hook/AuthProvider';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '@/components/Logo';
import MainButton from '@/components/MainButton';
import UserDropdown from '@/components/UserDropdown';

interface NavbarItem {
  name: string;
  to: string;
}

const navItems: NavbarItem[] = [
  { name: 'Home', to: '/' },
  { name: 'Tentang', to: '/tentang' },
  { name: 'Produk', to: '/produk' },
  { name: 'Paket', to: '/paket' },
  { name: 'Faq', to: '/faq' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userLogout } = useAuth();

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 z-10">
      <div className="py-4 px-5 sm:px-8 bg-white border-b border-gray-200 relative z-20">
        <div className="container mx-auto max-w-7xl">
          <div className="w-full flex items-center justify-between gap-4">
            {/* Logo */}
            <Logo className="w-36 lg:w-52" />

            {/* Navigation */}
            <div className="hidden lg:flex items-center gap-11">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-xs md:text-base hover:text-primaryDark ${
                      isActive ? 'text-primary font-semibold' : 'text-slate-700 font-normal'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Language and Login */}
            <div className="hidden lg:flex items-center gap-9">
              <div className="flex gap-2">
                <span className="text-base text-primary">ID</span>
                <span className="text-base text-black">|</span>
                <span className="text-base text-black">EN</span>
              </div>
              {user ? (
                <UserDropdown user={user} onLogout={userLogout} />
              ) : (
                <MainButton text="Masuk" onClick={() => navigate('/login')} />
              )}
            </div>

            {/* Hamburger Menu */}
            <button onClick={toggleMenu} className="block lg:hidden focus:outline-none">
              {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50" onClick={toggleMenu}></div>}

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute w-full bg-white transition-all duration-300 ease-in-out p-5 sm:px-8 ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        {/* <ul className="flex flex-col gap-6 mb-7">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block text-xs sm:text-base font-medium hover:text-primaryDark ${
                    isActive ? 'text-primary' : 'text-gray-700'
                  }`
                }
                onClick={() => console.log('clicked')}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul> */}

        {/* Login Button */}
        {user ? (
          <UserDropdown user={user} onLogout={userLogout} />
        ) : (
          <MainButton text="Masuk" onClick={() => navigate('/login')} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
