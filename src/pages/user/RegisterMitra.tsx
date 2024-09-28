import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegCopy } from 'react-icons/fa';
import { upgrateUserToMitra } from '@/api/user-api';
import { UserResponse } from '@/types/UserType';

const RegisterMitra: React.FC = () => {
  const { user, setUser } = useOutletContext<{
    user: UserResponse;
    setUser: React.Dispatch<React.SetStateAction<UserResponse>>;
  }>();

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name,
    email: user?.email,
    whatsapp_number: user?.whatsapp_number,
    ktp: null,
    bukti_bayar: null,
    upgrade_mitra: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleConfirm = async () => {
    await toast.promise(upgrateUserToMitra(user.id), {
      pending: 'Upgrading user...',
      success: {
        render({ data }) {
          setUser(data.data);
          return `${data.message}`;
        },
      },
      error: {
        render({ data }) {
          return `Error: ${(data as { message: string }).message}`;
        },
      },
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700">Daftar Mitra</h3>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block text-gray-600">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-500 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
            disabled
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-500 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
            disabled
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600">
            Nomor WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="whatsapp_number"
            value={formData.whatsapp_number}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-500 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
            disabled
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600">
            Upload KTP <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="ktp"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-600">
            Upgrade Mitra <span className="text-red-500">*</span>
          </label>
          <select
            name="upgrade_mitra"
            value={formData.upgrade_mitra}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">-- Pilih Upgrade Mitra --</option>
            <option value="5000000">Rp. 5.000.000</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-gray-600">
            Upload Bukti Bayar <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="bukti_bayar"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button type="submit" className="mt-6 w-full py-2 rounded-lg bg-primary text-white hover:bg-primaryDark">
          Daftar
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Silakan lakukan pembayaran sebesar</h3>
              <p className="text-2xl font-bold text-primary">Rp. 5.000.000</p>
            </div>
            {/* no rekening and copy */}
            <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-600">No. Rekening: 1234567890</p>
              <button onClick={() => navigator.clipboard.writeText('1234567890')} className="ml-2 text-gray-600">
                <FaRegCopy />
              </button>
            </div>
            <div className="mt-4">
              <img
                src="https://buatlogoonline.com/wp-content/uploads/2022/10/Logo-BCA-PNG.png"
                alt="Bank Logo"
                className="w-24 mx-auto"
              />
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="mr-4 bg-gray-300 text-center text-gray-700 text-sm md:text-base px-6 sm:px-10 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
            >
              Batal
            </button>
            <button
              onClick={handleConfirm}
              className="bg-primary text-center text-white text-sm md:text-base px-6 sm:px-10 py-2 rounded-md hover:bg-primaryDark transition-colors duration-300"
            >
              Konfirmasi Bayar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterMitra;
