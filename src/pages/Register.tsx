import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { register } from '@/api/auth-api';
import Logo from '@/components/Logo';

const Register: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsappNumber: '',
    password: '',
    passwordConfirmation: '',
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    if (formData.password !== formData.passwordConfirmation) {
      setErrors('Password dan konfirmasi password tidak sama.');
      return;
    }

    try {
      setLoading(true);

      const response = await register({
        full_name: formData.fullName,
        email: formData.email,
        whatsapp_number: formData.whatsappNumber,
        password: formData.password,
        password_confirmation: formData.passwordConfirmation,
      });

      if (!response.success) {
        setErrors(response.message);
        return;
      }

      setSuccess('Registrasi berhasil. Anda akan diarahkan ke halaman login dalam 3 detik.');

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      setErrors(error.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-4">
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
              id="fullName"
              placeholder="Nama Lengkap"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={formData.fullName}
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
              id="whatsappNumber"
              placeholder="Nomor WhatsApp"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={formData.whatsappNumber}
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
              id="passwordConfirmation"
              placeholder="Konfirmasi Password"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              value={formData.passwordConfirmation}
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

          {/* Error and Success Messages */}
          {errors && <p className="text-red-500 text-sm">{errors}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

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
