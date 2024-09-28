import { UserResponse } from '@/types/UserType';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserDropdownProps {
  user: UserResponse;
  onLogout: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button to toggle the dropdown */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 text-white bg-orange-500 rounded-full"
      >
        D
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 w-48 py-2 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="px-4 py-2 text-center">
            <p className="font-bold">{user?.full_name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <hr className="my-1" />
          {user?.role === 'ADMIN' ? (
            <button
              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              onClick={() => {
                navigate('/admin/dashboard');
                setIsOpen(false);
              }}
            >
              Dashboard
            </button>
          ) : (
            <>
              <button
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  navigate('/user/profile');
                  setIsOpen(false);
                }}
              >
                Profile
              </button>
              <button
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  navigate('/user/transaksi');
                  setIsOpen(false);
                }}
              >
                Transaksi
              </button>
            </>
          )}
          <button className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100" onClick={onLogout}>
            Keluar
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
