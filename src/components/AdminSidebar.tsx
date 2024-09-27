import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { getAll } from '@/api/service-type';
import Logo from './Logo';

interface ServiceType {
  id: string;
  name: string;
}

const AdminSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserServiceOpen, setIsUserServiceOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  // const [isUserOpen, setIsUserOpen] = useState(false);
  const [ServiceType, setServiceType] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAll();
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

  const toggleOpen = () => {
    setIsUserServiceOpen((prev) => !prev);
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

            {/* Layanan User */}
            <li>
              <button
                onClick={toggleOpen}
                className="flex w-full px-4 py-3 justify-between items-center text-dark hover:bg-gray-200 border-b border-gray-300"
                aria-haspopup="true"
                aria-expanded={isUserServiceOpen}
              >
                Harga Layanan User {isUserServiceOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isUserServiceOpen && (
                <ul className="list-none">
                  {ServiceType.map((service) => (
                    <li key={service.id}>
                      <NavLink
                        to={`/admin/layanan-user/${parseName(service.name)}`}
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
              <NavLink
                to="/admin/order"
                className={({ isActive }) =>
                  `w-full block px-4 py-3 hover:bg-gray-200 border-b border-gray-300 ${
                    isActive ? 'bg-gray-300' : 'text-dark bg-white'
                  }`
                }
              >
                Order
              </NavLink>
            </li>

            {/* User */}
            {/* <li> */}
              {/* <button
                onClick={() => setIsUserOpen((prev) => !prev)}
                className="flex w-full px-4 py-3 justify-between items-center text-dark hover:bg-gray-200 border-b border-gray-300"
                aria-haspopup="true"
                aria-expanded={isUserOpen}
              >
                User {isUserOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isUserOpen && (
                <ul className="list-none"> */}
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
                {/* </ul> */}
              {/* )} */}
            {/* </li> */}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default AdminSidebar;
