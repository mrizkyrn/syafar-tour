import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateCurrentUser } from '@/api/user-api';
import { UpdateUserRequest, UserResponse } from '@/types/UserType';

const DetailProfile: React.FC = () => {
  const { user, setUser } = useOutletContext<{
    user: UserResponse;
    setUser: React.Dispatch<React.SetStateAction<UserResponse>>;
  }>();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UpdateUserRequest>({
    full_name: user?.full_name,
    email: user?.email,
    whatsapp_number: user?.whatsapp_number,
  });

  const isModified = useMemo(() => {
    return (
      formData.full_name !== user.full_name ||
      formData.whatsapp_number !== user.whatsapp_number
    );
  }, [formData, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const modifiedData: UpdateUserRequest = {};

    if (formData.full_name !== user.full_name) modifiedData.full_name = formData.full_name;
    if (formData.whatsapp_number !== user.whatsapp_number) modifiedData.whatsapp_number = formData.whatsapp_number;

    setLoading(true);
    toast.promise(updateCurrentUser(modifiedData), {
      pending: 'Memperbarui...',
      success: {
        render({ data }) {
          setFormData({ ...formData, ...modifiedData });
          setUser((prev) => (prev ? { ...prev, ...modifiedData } : prev));
          setLoading(false);
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

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700">Detail Profil</h3>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block text-gray-600">Nama Lengkap</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1 border-gray-400 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Contact Details */}
        <h3 className="text-lg font-semibold text-gray-700 mt-6">Detail Kontak</h3>
        <div className="flex flex-col md:flex-row gap-4 mt-4 w-full">
          <div className="w-full">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1 border-gray-400 text-gray-400"
              disabled
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-600">Nomor Whatsapp</label>
            <input
              type="text"
              name="whatsapp_number"
              value={formData.whatsapp_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1 border-gray-400 focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isModified || loading}
          className={`mt-6 w-full py-2 rounded-lg ${
            isModified ? 'bg-primary text-white hover:bg-primaryDark' : 'bg-gray-300 text-gray-800 cursor-not-allowed'
          }`}
          aria-disabled={!isModified || loading}
        >
          {loading ? 'Memperbarui...' : 'Perbarui Profil'}
        </button>
      </form>
    </div>
  );
};

export default DetailProfile;
