import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-64 bg-dark text-white flex flex-col">
      {/* Logo */}
      <div className="p-4 text-center bg-primary">
        <h1 className="text-lg font-bold">Syafar Tour</h1>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-4 py-6">
        <ul className="">
          <li className="mb-2">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `w-full block px-4 py-2 hover:bg-secondary rounded-md ${
                  isActive ? 'text-primary bg-secondary' : 'text-white bg-dark'
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="mb-4">
            <button
              onClick={toggleDropdown}
              className="flex w-full px-4 justify-between items-center text-blue-200 hover:text-primary focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              Harga {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isOpen && (
              <ul className="mt-2 space-y-2">
                <li>
                  <NavLink
                    to="/admin/tiket-pesawat"
                    className={({ isActive }) =>
                      `w-full block px-6 py-2 hover:bg-secondary rounded-md ${
                        isActive ? 'text-primary bg-secondary' : 'text-white bg-dark'
                      }`
                    }
                  >
                    Tiket Pesawat
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/hotel-makkah"
                    className={({ isActive }) =>
                      `w-full block px-6 py-2 hover:bg-secondary rounded-md ${
                        isActive ? 'text-primary bg-secondary' : 'text-white bg-dark'
                      }`
                    }
                  >
                    Hotel Mekkah
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/hotel-madinah"
                    className={({ isActive }) =>
                      `w-full block px-6 py-2 hover:bg-secondary rounded-md ${
                        isActive ? 'text-primary bg-secondary' : 'text-white bg-dark'
                      }`
                    }
                  >
                    Hotel Maddinah
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/transportasi"
                    className={({ isActive }) =>
                      `w-full block px-6 py-2 hover:bg-secondary rounded-md ${
                        isActive ? 'text-primary bg-secondary' : 'text-white bg-dark'
                      }`
                    }
                  >
                    Transportasi
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/muthawif"
                    className={({ isActive }) =>
                      `w-full block px-6 py-2 hover:bg-secondary rounded-md ${
                        isActive ? 'text-primary bg-secondary' : 'text-white bg-dark'
                      }`
                    }
                  >
                    Muthawwif
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/handling"
                    className={({ isActive }) =>
                      `w-full block px-6 py-2 hover:bg-secondary rounded-md ${
                        isActive ? 'text-primary bg-secondary' : 'text-white bg-dark'
                      }`
                    }
                  >
                    Handling
                  </NavLink>
                </li>

              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 text-center">
        <p>© 2024 Company Name</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
