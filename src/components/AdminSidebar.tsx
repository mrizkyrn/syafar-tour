import Logo from './Logo';

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { getAllPakcageTypes } from '@/api/package-type-api';

interface ServiceType {
  id: string;
  name: string;
}

const AdminSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserPackageOpen, setUserPackageOpen] = useState(false);
  const [isMitraPackageOpen, setMitraPackageOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [ServiceType, setServiceType] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllPakcageTypes();
        setServiceType(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseName = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  if (loading) {
    return <p className="mt-10 mx-auto">Loading...</p>;
  }

  return (
    <div
      className={`absolute top-0 left-0 bottom-0 md:relative max-w-52 bg-white text-dark flex flex-col border-r border-gray-300 ${
        isSidebarOpen ? 'w-52' : 'w-14'
      }`}
    >
      {/* Logo */}
      <div className="flex justify-center items-center h-16 border-b border-gray-300 mt-5 cursor-pointer">
        {isSidebarOpen && <Logo className="w-36" />}
      </div>

      {/* Sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="w-full p-3 text-center text-dark hover:bg-gray-200"
      >
        {isSidebarOpen ? (
          <div className="flex justify-start items-center">
            <FaAngleLeft className="text-xl" />
            <span className="font-medium ml-3">Admin Dashboard</span>
          </div>
        ) : (
          <FaAngleRight className="text-xl" />
        )}
      </button>

      {/* Navigation links */}
      {isSidebarOpen && (
        <nav className="flex-1 w-full text-sm">
          <ul className="flex flex-col list-none ">
            {/* Dashboard */}
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `w-full block px-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                    isActive ? 'bg-gray-300' : 'text-dark bg-white'
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>

            {/* Paket Jamaah */}
            <li>
              <button
                onClick={() => setUserPackageOpen((prev) => !prev)}
                className="flex w-full px-4 py-3 justify-between items-center text-dark hover:bg-gray-200 border-b border-gray-300"
                aria-haspopup="true"
                aria-expanded={isUserPackageOpen}
              >
                Paket Jamaah {isUserPackageOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isUserPackageOpen && (
                <ul className="list-none">
                  {ServiceType.map((service) => (
                    <li key={service.id}>
                      <NavLink
                        to={`/admin/paket-jamaah/${parseName(service.name)}`}
                        className={({ isActive }) =>
                          `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                            isActive ? 'bg-gray-300' : 'text-dark bg-white'
                          }`
                        }
                      >
                        {service.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Paket Mitra */}
            <li>
              <button
                onClick={() => setMitraPackageOpen((prev) => !prev)}
                className="flex w-full px-4 py-3 justify-between items-center text-dark hover:bg-gray-200 border-b border-gray-300"
                aria-haspopup="true"
                aria-expanded={isMitraPackageOpen}
              >
                Paket Mitra {isMitraPackageOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isMitraPackageOpen && (
                <ul className="list-none">
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/periode"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Periode
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/vendor"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Vendor
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/hotel/mekkah"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Hotel Mekkah
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/hotel/madinah"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Hotel Madinah
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/pesawat"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Pesawat
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/visa"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Visa
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/transportasi"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Transportasi
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/muthawif"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Muthawif
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/handling-saudi"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Handling Saudi
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/handling-domestik"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Handling Domestik
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/siskopatuh"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Siskopatuh
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/perlengkapan"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Perlengkapan
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/wisata"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Wisata
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/paket-mitra/manasik"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Manasik
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Product */}
            <li>
              <button
                onClick={() => setIsProductOpen((prev) => !prev)}
                className="flex w-full px-4 py-3 justify-between items-center text-dark hover:bg-gray-200 border-b border-gray-300"
                aria-haspopup="true"
                aria-expanded={isProductOpen}
              >
                Produk {isProductOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isProductOpen && (
                <ul className="list-none">
                  <li>
                    <NavLink
                      to="/admin/produk/list"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Produk List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/produk/kategori"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Kategori
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/produk/tambah"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Tambah Produk
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Order */}
            <li>
              <button
                onClick={() => setIsOrderOpen((prev) => !prev)}
                className="flex w-full px-4 py-3 justify-between items-center text-dark hover:bg-gray-200 border-b border-gray-300"
                aria-haspopup="true"
                aria-expanded={isOrderOpen}
              >
                Order {isOrderOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isOrderOpen && (
                <ul className="list-none">
                  <li>
                    <NavLink
                      to="/admin/order/produk"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Produk
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/order/paket-jamaah"
                      className={({ isActive }) =>
                        `w-full block pl-8 pr-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                          isActive ? 'bg-gray-300' : 'text-dark bg-white'
                        }`
                      }
                    >
                      Paket Jamaah
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* User */}
            <li>
              <NavLink
                to="/admin/user"
                className={({ isActive }) =>
                  `w-full block px-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                    isActive ? 'bg-gray-300' : 'text-dark bg-white'
                  }`
                }
              >
                User
              </NavLink>
            </li>

            {/* Other */}
            <li>
              <NavLink
                to="/admin/lainnya"
                className={({ isActive }) =>
                  `w-full block px-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                    isActive ? 'bg-gray-300' : 'text-dark bg-white'
                  }`
                }
              >
                lainnya
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default AdminSidebar;
