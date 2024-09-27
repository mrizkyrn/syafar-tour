import { useState } from 'react';
import { UpdatePasswordRequest } from '@/types';
import { updateCurrentUserPassword } from '@/api/user-api';

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      alert('Password baru dan konfirmasi password tidak sama');
      return;
    }
    console.log('Form Data:', formData);
    const response = await updateCurrentUserPassword(formData as UpdatePasswordRequest);

    if (response.success) {
      alert('Password berhasil diubah');

      setFormData({
        old_password: '',
        new_password: '',
        confirm_password: '',
      });
    } else {
      alert('Gagal mengubah password');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700">Ganti Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block text-gray-600">Password Lama</label>
          <input
            type="password"
            name="old_password"
            value={formData.old_password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <div className="mt-4 w-1/2">
            <label className="block text-gray-600">Password Baru</label>
            <input
              type="password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-4 w-1/2">
            <label className="block text-gray-600">Konfirmasi Password Baru</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button type="submit" className="mt-6 w-full py-2 rounded-lg bg-primary text-white hover:bg-primaryDark">
          Ganti Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
