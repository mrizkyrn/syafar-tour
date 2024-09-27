import React, { useEffect, useState } from 'react';
import { deleteUser, getAllUsers, updateUser } from '@/api/user-api';
import { UserResponse } from '@/types';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    whatsapp_number: '',
    role: 'USER', // Default role
  });

  // Fetch all users when the component loads
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response.success) {
        setUsers(response.data);
      }
    };
    fetchUsers();
  }, []);

  // Handle Delete user
  const handleDelete = (userId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    deleteUser(userId);
    setUsers(users.filter((user) => user.id !== userId));
  };

  // Handle Edit user - Open modal and populate form
  const handleEdit = (user: UserResponse) => {
    setSelectedUser(user);
    setFormData({
      full_name: user.full_name,
      email: user.email,
      whatsapp_number: user.whatsapp_number,
      role: user.role,
    });
    setIsModalOpen(true); // Open the modal
  };

  // Handle input change in the edit form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle update user
  const handleUpdate = async () => {
    if (!selectedUser) return;

    // Create an object to store only modified fields
    const modifiedData: Partial<UserResponse> = {};

    // Compare formData with selectedUser and add only modified fields
    for (const key in formData) {
      if (formData[key as keyof typeof formData] !== selectedUser[key as keyof UserResponse]) {
        modifiedData[key as keyof typeof modifiedData] = formData[key as keyof typeof formData];
      }
    }

    if (Object.keys(modifiedData).length > 0) {
      console.log('Modified Data:', modifiedData);
      const response = await updateUser(selectedUser.id, modifiedData);

      if (response.success) {
        setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, ...modifiedData } : user)));
        setIsModalOpen(false); // Close the modal
      }
    }
  };

  // Close modal handler
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

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
                  <button onClick={() => handleEdit(user)} className="text-blue-500 hover:underline mr-2">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for editing user */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Edit User</h3>
            <form
              className="mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Whatsapp</label>
                <input
                  type="text"
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                  <option value="MITRA">MITRA</option>
                </select>
              </div>
              <div className="mt-6">
                <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded-lg">
                  Update User
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-2 w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
