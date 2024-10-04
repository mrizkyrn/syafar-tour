import { useNavigate } from 'react-router-dom';
import { UserResponse } from '@/types/UserType';

interface UserDropdownProps {
  user: UserResponse;
  onLogout: () => void;
  isUserDropdownOpen: boolean;
  toggleUserDropdown: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user, onLogout, isUserDropdownOpen, toggleUserDropdown }) => {
  const navigate = useNavigate();

  return (
    <div className="relative inline-block text-left">
      {/* Button to toggle the dropdown */}
      <button
        onClick={toggleUserDropdown}
        className="flex items-center justify-center w-10 h-10 text-white bg-orange-500 rounded-full"
      >
        {user.full_name[0].toUpperCase()}
      </button>

      {/* Dropdown menu */}
      {isUserDropdownOpen && (
        <div className="absolute left-0 lg:left-auto lg:right-0 z-10 w-48 py-2 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="px-4 py-2 text-center">
            <p className="font-bold">{user?.full_name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <hr className="my-1" />
          {user?.role === 'ADMIN' ? (
            <button
              className="block w-full text-sm md:text-base px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              onClick={() => {
                toggleUserDropdown();
                navigate('/admin/dashboard');
              }}
            >
              Dashboard
            </button>
          ) : (
            <>
              <button
                className="block w-full text-sm md:text-base px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  toggleUserDropdown();
                  navigate('/user/profile');
                }}
              >
                Profile
              </button>
              <button
                className="block w-full text-sm md:text-base px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  toggleUserDropdown();
                  navigate('/user/transaksi');
                }}
              >
                Transaksi
              </button>
            </>
          )}
          <button className="block w-full text-sm md:text-base px-4 py-2 text-left text-gray-700 hover:bg-gray-100" onClick={onLogout}>
            Keluar
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
