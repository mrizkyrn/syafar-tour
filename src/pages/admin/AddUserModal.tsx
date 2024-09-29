import { useState } from 'react';
import { toast } from 'react-toastify';
import { createUser } from '@/api/user-api';
import { UserResponse, CreateUserRequest } from '@/types/UserType';

interface AddUserModalProps {
  isModalOpen: boolean;
  addUserToList: (newUser: UserResponse) => void;
  closeModal: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isModalOpen, addUserToList, closeModal }) => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    full_name: '',
    email: '',
    whatsapp_number: '',
    password: '',
    role: 'USER',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    toast.promise(createUser(formData), {
      pending: 'Memproses...',
      success: {
        render({ data }) {
          setLoading(false);
          addUserToList(data.data);
          closeModal();
          return 'User berhasil dibuat!';
        },
      },
      error: {
        render({ data }) {
          setLoading(false);
          return (data as { message: string }).message;
        },
      },
    });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>

        <form className="mt-4" onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
              required
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
              required
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
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
              required
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
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
              <option value="MITRA">Mitra</option>
            </select>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primaryDark"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Tambah'}
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
  );
};

export default AddUserModal;
