import Container from '@/components/Container';

import React, { useState, useEffect } from 'react';
import { UserResponse } from '@/types/UserType';
import { getCurrentUser } from '@/api/user-api';
import { Link, NavLink, Outlet } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const role = user?.role || 'USER';

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getCurrentUser();

      if (response.success) {
        setUser(response.data);
      }
    };

    fetchUser();
  }, []);

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-12 rounded-lg pt-10 pb-20">
        {/* Left Sidebar */}
        <div className="md:w-1/3">
          {/* Profile Card */}
          <div className="bg-primary text-white text-center p-6 rounded-lg">
            <h2 className="text-2xl font-bold">{user?.full_name}</h2>
            <p className="text-lg">{user?.email}</p>
            {/* user role */}
            <p className="text-sm mt-2">{role}</p>
          </div>

          {/* register mitra button */}
          {role === 'USER' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700">Upgrade menjadi Mitra</h3>
              <p className="text-sm text-gray-500 mt-2">
                Upgrade akun Anda menjadi Mitra untuk menikmati fitur-fitur premium.
              </p>
              <Link to="daftar-mitra">
                <button className="mt-4 w-full py-2 rounded-lg bg-primary text-white hover:bg-primaryDark">
                  Upgrade Sekarang
                </button>
              </Link>
            </div>
          )}

          {/* Sidebar Menu */}
          <div className="mt-4 border border-gray-300">
            <NavLink
              end
              to="."
              className={({ isActive }) =>
                `w-full block pl-8 pr-4 py-4 border-b border-gray-300 ${
                  isActive ? 'bg-primary text-white font-semibold' : 'text-dark bg-white'
                }`
              }
            >
              Detail Profil
            </NavLink>
            <NavLink
              to="change-password"
              className={({ isActive }) =>
                `w-full block pl-8 pr-4 py-4 border-b border-gray-300 ${
                  isActive ? 'bg-primary text-white font-semibold' : 'text-dark bg-white'
                }`
              }
            >
              Ganti Password
            </NavLink>
            {role === 'USER' && (
              <NavLink
                to="daftar-mitra"
                className={({ isActive }) =>
                  `w-full block pl-8 pr-4 py-4 border-b border-gray-300 ${
                    isActive ? 'bg-primary text-white font-semibold' : 'text-dark bg-white'
                  }`
                }
              >
                Daftar Mitra
              </NavLink>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-2/3">
          {user && (
            <React.Suspense fallback={<div>Loading...</div>}>
              <Outlet context={{ user, setUser }} />
            </React.Suspense>
          )}
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;
