import { FaFacebookSquare, FaInstagram, FaTwitter, FaYoutube, FaTelegram } from 'react-icons/fa';
import Container from '@/components/Container';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-y border-gray-200 py-8 mt-16">
      <Container>
        <div className="flex items-center justify-between gap-24">
          {/* Logo and Brand */}
          <div className="w-1/3">
            <Logo />
            <p className="text-black mt-4 text-sm">
              Syafar Tour adalah penyedia layanan umroh dan haji terpercaya yang berkomitmen untuk memberikan pengalaman
              ibadah yang nyaman dan aman. Kami menawarkan berbagai pilihan paket yang dapat disesuaikan dengan
              kebutuhan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Links */}
            <div className="col-span-1">
              <h2 className="font-bold text-lg mb-7 uppercase">Tautan</h2>
              <ul className="flex flex-col gap-5">
                <li>
                  <Link to="/" className="text-black text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/tentang" className="text-black text-sm">
                    Tentang
                  </Link>
                </li>
                <li>
                  <Link to="/produk" className="text-black text-sm">
                    Produk
                  </Link>
                </li>
                <li>
                  <Link to="/paket" className="text-black text-sm">
                    Paket
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-black text-sm">
                    Faq
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div className="col-span-1">
              <h2 className="font-bold text-lg mb-7 uppercase">Kebijakan</h2>
              <ul className="flex flex-col gap-5">
                <li>
                  <a href="#" className="text-black text-sm">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-black text-sm">
                    Syarat dan Ketentuan
                  </a>
                </li>
                <li>
                  <a href="#" className="text-black text-sm">
                    Kebijakan Pengembalian Dana
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="col-span-1">
              <h2 className="font-bold text-lg mb-7 uppercase">Follow Us</h2>
              <div className="flex flex-wrap gap-3">
                <a href="#" aria-label="Facebook" className="text-blue-500">
                  <FaFacebookSquare className="text-3xl" />
                </a>
                <a href="#" aria-label="Instagram" className="text-red-500">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="#" aria-label="Twitter" className="text-blue-400">
                  <FaTwitter className="text-3xl" />
                </a>
                <a href="#" aria-label="Youtube" className="text-red-500">
                  <FaYoutube className="text-3xl" />
                </a>
                <a href="#" aria-label="Telegram" className="text-blue-400">
                  <FaTelegram className="text-3xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="py-4 mt-12">
          <span className="text-base text-black">Copyright © 2024 Syafar Tour, MMG</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
