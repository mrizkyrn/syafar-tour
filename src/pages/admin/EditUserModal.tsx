import { useEffect, useState } from 'react';
import { UpdateUserRequest, UserResponse, UserRoles } from '@/types/UserType';
import { toast } from 'react-toastify';
import { updateUser } from '@/api/user-api';

interface EditUserModalProps {
  isModalOpen: boolean;
  selectedUser: UserResponse | null;
  updateUsers: (updatedUser: UserResponse) => void;
  closeModal: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isModalOpen, selectedUser, updateUsers, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    whatsapp_number: '',
    role: 'USER',
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        full_name: selectedUser.full_name,
        email: selectedUser.email,
        whatsapp_number: selectedUser.whatsapp_number,
        role: selectedUser.role,
      });
    }
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    const updatedData: UpdateUserRequest = {};

    if (formData.full_name !== selectedUser?.full_name) {
      updatedData.full_name = formData.full_name;
    }
    if (formData.whatsapp_number !== selectedUser?.whatsapp_number) {
      updatedData.whatsapp_number = formData.whatsapp_number;
    }
    if (formData.role !== selectedUser?.role) {
      updatedData.role = formData.role as UserRoles;
    }

    setLoading(true);
    toast.promise(updateUser(selectedUser.id, updatedData), {
      pending: 'Memperbarui user...',
      success: {
        render({ data }) {
          setLoading(false);
          updateUsers(data.data);
          closeModal();
          return (data as { message: string }).message;
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
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <form className="mt-4" onSubmit={onSubmit}>
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
            <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded-lg" disabled={loading}>
              {loading ? 'Loading...' : 'Perbarui'}
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

export default EditUserModal;
