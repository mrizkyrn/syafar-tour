import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-10">
      {/* Navbar Upper */}
      <div className="py-3 px-4 md:px-8 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="w-full flex items-center justify-between gap-4">
            {/* Logo */}
            <span className="text-sm sm:text-xl font-bold text-orange-600">UMROH</span>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative w-full md:w-[500px]">
                <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari destinasi atau tour and package"
                  className="w-full text-sm sm:text-base pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Login Button */}
              <button className="bg-blue-900 text-white text-sm sm:text-base py-2 px-6 rounded-full">Login</button>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar Lower */}
      <div className="bg-white py-3 px-8 border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="w-full flex items-center justify-center">
            {/* Menu Items */}
            <div className="flex gap-10">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-xs sm:text-sm hover:text-orange-600 ${isActive ? 'text-orange-500 font-bold' : 'text-slate-700 font-medium'}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/paket"
                className={({ isActive }) =>
                  `text-xs sm:text-sm hover:text-orange-600 ${isActive ? 'text-orange-500 font-bold' : 'text-slate-700 font-medium'}`
                }
              >
                Paket
              </NavLink>
              <NavLink
                to="/hitung-paket"
                className={({ isActive }) =>
                  `text-xs sm:text-sm hover:text-orange-600 ${isActive ? 'text-orange-500 font-bold' : 'text-slate-700 font-medium'}`
                }
              >
                Hitung Paket
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
