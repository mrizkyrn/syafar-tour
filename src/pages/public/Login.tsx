import Logo from '@/components/Logo';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { loginUser } from '@/api/auth-api';
import { useAuth } from '@/hook/AuthProvider';
import { LoginUserRequest } from '@/types/UserType';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LoginUserRequest>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    toast.promise(loginUser(formData), {
      pending: 'Mengautentikasi...',
      success: {
        render({ data }) {
          setLoading(false);
          setUser(data.data);
          navigate('/');
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-lg">
        {/* Logo */}
        <Logo className="w-52 mx-auto" />

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-10">Masuk</h2>

        {/* Login Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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

          {/* Forgot Password */}
          <p className="text-right text-gray-600">
            <a href="/forgot-password" className="text-black font-medium">
              Lupa Password?
            </a>
          </p>

          {/* Register Link */}
          <p className="text-gray-600 text-sm">
            Belum punya akun?{' '}
            <a href="/register" className="text-black font-medium">
              Daftar Sekarang
            </a>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white font-medium py-3 rounded-lg shadow-lg hover:bg-primaryDark transition-colors"
          >
            {loading ? 'Loading...' : 'Masuk Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
