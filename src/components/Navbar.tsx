import { FaSearch } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-10">
      {/* Navbar Upper */}
      <div className="py-3 px-8 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="w-full flex items-center justify-between">
            {/* Logo */}
            <span className="text-xl font-bold text-orange-600 tracking-widest">UMROH</span>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative w-full md:w-[500px]">
                <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari destinasi atau tour and package"
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Login Button */}
              <button className="bg-blue-900 text-white py-2 px-6 rounded-full">Login</button>
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
              <button className="text-slate-700 text-sm font-medium hover:text-orange-400">Home</button>
              <button className="text-slate-700 text-sm font-medium hover:text-orange-400">Produk</button>
              <button className="text-slate-700 text-sm font-medium hover:text-orange-400">Kalkulator</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
