import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { getAll } from '@/api/service-type';

interface ServiceType {
  id: string;
  name: string;
}

const AdminSidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [ServiceType, setServiceType] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAll();
        setServiceType(response.data);
        console.log(response);
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
    setIsOpen((prev) => !prev);
  };

  if (loading) {
    return <p className="mt-10 mx-auto">Loading...</p>;
  }

  return (
    <div
      className={`absolute top-0 left-0 bottom-0 md:relative max-w-72 bg-white text-dark flex flex-col border-r border-gray-300 ${
        isSidebarOpen ? 'w-72' : 'w-14'
      }`}
    >
      {/* Sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="w-full p-3 text-center text-dark hover:bg-gray-200"
      >
        {isSidebarOpen ? (
          <div className="flex justify-start items-center">
            <FaAngleLeft className="text-3xl" />
            <span className="text-lg font-medium ml-3">Admin Dashboard</span>
          </div>
        ) : (
          <FaAngleRight className="text-3xl" />
        )}
      </button>

      {/* Navigation links */}
      {isSidebarOpen && (
        <nav className="flex-1 py-6 w-full">
          <ul className="flex flex-col">
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

            {/* <hr className="border-t border-gray-300 my-2" /> */}

            {/* Layanan User */}
            <li className="mb-4">
              <button
                onClick={toggleOpen}
                className="flex w-full px-4 py-3 justify-between items-center text-dark hover:bg-gray-200 border-b border-gray-300"
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                Harga Layanan User {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isOpen && (
                <ul className="">
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
          </ul>
        </nav>
      )}
    </div>
  );
};

export default AdminSidebar;
