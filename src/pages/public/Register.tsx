import Logo from '@/components/Logo';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { registerUser } from '@/api/auth-api';
import { RegisterUserRequest } from '@/types/UserType';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterUserRequest & { password_confirmation: string }>({
    full_name: '',
    email: '',
    whatsapp_number: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      toast.error('Password dan konfirmasi password tidak sama');
      return;
    }

    setLoading(true);
    toast.promise(registerUser(formData), {
      pending: 'Mendaftarkan...',
      success: {
        render({ data }) {
          setLoading(false);
          navigate('/login');
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-5">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-lg">
        {/* Logo */}
        <Logo className="w-52 mx-auto" />

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 mt-10">Daftar</h2>

        {/* Registration Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <input
              type="text"
              id="full_name"
              placeholder="Nama Lengkap"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* WhatsAppNumber Number */}
          <div>
            <input
              type="text"
              id="whatsapp_number"
              placeholder="Nomor WhatsApp"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={formData.whatsapp_number}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute top-0 right-0 h-full flex items-center pr-3"
            >
              {passwordVisible ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
            </button>
          </div>

          {/* Password Confirmation */}
          <div className="relative">
            <input
              type={passwordConfirmationVisible ? 'text' : 'password'}
              id="password_confirmation"
              placeholder="Konfirmasi Password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setPasswordConfirmationVisible(!passwordConfirmationVisible)}
              className="absolute top-0 right-0 h-full flex items-center pr-3"
            >
              {passwordConfirmationVisible ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </button>
          </div>

          {/* Login Link */}
          <p className="text-gray-600 text-sm">
            Sudah punya akun?{' '}
            <a href="/login" className="text-black font-medium">
              Masuk Sekarang
            </a>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white font-medium py-3 rounded-lg shadow-lg hover:bg-primaryDark transition-colors"
          >
            {loading ? 'Loading...' : 'Daftar Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
