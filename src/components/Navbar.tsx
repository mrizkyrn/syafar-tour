import { NavLink } from 'react-router-dom';
import Logo from '@/components/Logo';
import MainButton from './MainButton';

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
  return (
    <nav className="sticky top-0 z-10">
      <div className="py-4 px-4 md:px-8 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-7xl">
          <div className="w-full flex items-center justify-between gap-4">
            {/* Logo */}
            <Logo className="w-52" />

            {/* Navigation */}
            <div className="flex items-center gap-11">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-xs sm:text-base hover:text-orange-600 ${
                      isActive ? 'text-orange-500 font-semibold' : 'text-slate-700 font-normal'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Login Button */}
            <div className="flex items-center gap-9">
              <div className="flex gap-2">
                <span className="text-base text-primary">ID</span>
                <span className="text-base text-black">|</span>
                <span className="text-base text-black">EN</span>
              </div>
              <MainButton text="Masuk" onClick={() => console.log('Login')} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
