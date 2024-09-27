import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { updateCurrentUser } from '@/api/user-api';

interface UserContext {
  full_name: string;
  email: string;
  whatsapp_number: string;
}

const DetailProfile = () => {
  const userData = useOutletContext<UserContext>();
  const [isModified, setIsModified] = useState(false);
  const [formData, setFormData] = useState({
    full_name: userData?.full_name,
    email: userData?.email,
    whatsapp_number: userData?.whatsapp_number,
  });
  const [initialData, setInitialData] = useState({
    full_name: userData?.full_name,
    email: userData?.email,
    whatsapp_number: userData?.whatsapp_number,
  });

  useEffect(() => {
    const isDataModified = JSON.stringify(formData) !== JSON.stringify(initialData);
    setIsModified(isDataModified);
  }, [formData, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const modifiedData: Partial<typeof formData> = {};

    for (const key in formData) {
      if (formData[key as keyof typeof formData] !== initialData[key as keyof typeof initialData]) {
        modifiedData[key as keyof typeof formData] = formData[key as keyof typeof formData];
      }
    }

    if (Object.keys(modifiedData).length > 0) {
      const response = await updateCurrentUser(modifiedData);
      console.log('Update User:', response);
      setInitialData({ ...initialData, ...modifiedData });
    } else {
      console.log('No fields have been modified');
    }
  };
  return (
    <div className="px-6">
      <h3 className="text-lg font-semibold text-gray-700">Detail Profil</h3>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block text-gray-600">Nama Lengkap</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Contact Details */}
        <h3 className="text-lg font-semibold text-gray-700 mt-6">Detail Kontak</h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1 text-gray-400"
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-600">Nomor Whatsapp</label>
            <input
              type="text"
              name="whatsapp_number"
              value={formData.whatsapp_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!isModified}
          className={`mt-6 w-full py-2 rounded-lg ${
            isModified ? 'bg-primary text-white hover:bg-primaryDark' : 'bg-gray-300 text-gray-800 cursor-not-allowed'
          }`}
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default DetailProfile;
