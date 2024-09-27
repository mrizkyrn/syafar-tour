import React, { useEffect, useState } from 'react';
import { deleteUser, getAllUsers } from '@/api/user-api';
import { UserResponse } from '@/types';
import { FaTrashAlt } from 'react-icons/fa';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);

  const handleDelete = (userId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    deleteUser(userId);
    setUsers(users.filter((user) => user.id !== userId));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      console.log('Fetching users...');
      const response = await getAllUsers();
      console.log('Users:', response);

      if (response.success) {
        setUsers(response.data);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>

      <div className="overflow-x-auto max-w-full">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-6 py-3 border-b">No</th>
              <th className="text-left px-6 py-3 border-b">Full Name</th>
              <th className="text-left px-6 py-3 border-b">Email</th>
              <th className="text-left px-6 py-3 border-b">Whatsapp</th>
              <th className="text-left px-6 py-3 border-b">Role</th>
              <th className="text-left px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-2 border-b">{idx + 1}</td>
                <td className="px-6 py-2 border-b">{user.full_name}</td>
                <td className="px-6 py-2 border-b">{user.email}</td>
                <td className="px-6 py-2 border-b">{user.whatsapp_number}</td>
                <td className="px-6 py-2 border-b">{user.role}</td>
                <td className="px-6 py-2 border-b">
                  {/* Action buttons like Edit, Delete, etc. */}
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
