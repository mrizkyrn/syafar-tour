import React from 'react';
import Container from './Container';
import { FaFacebookSquare, FaInstagram, FaTwitter, FaYoutube, FaTelegram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-y border-gray-200 py-8 mt-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6">
          {/* Logo and Brand */}
          <div className="col-span-1 flex flex-col items-start">
            <span className="text-3xl font-bold text-orange-600 tracking-widest">UMROH</span>
          </div>

          {/* Explore More */}
          <div className="col-span-1">
            <h4 className="font-semibold text-lg mb-4">Pelajari Selengkapnya</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Pernyataan Resmi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Kebijakan Privasi
                </a>
              </li>
            </ul>
          </div>

          {/* Our Community */}
          <div className="col-span-1">
            <h4 className="font-semibold text-lg mb-4">Komunitas Kami</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600">
                  Travel Umroh
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-1">
            <h4 className="font-semibold text-lg mb-4">Hubungi Kami</h4>
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

          {/* VA Payment Methods */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-lg mb-4">Metode Pembayaran VA</h4>
            <ul className="flex flex-wrap gap-2">
              <li className="border rounded p-2 flex items-center justify-center">
                <img src="https://umroh360.com/logo-bank-mandiri.svg" alt="Mandiri" width={30} height={30}/>
              </li>
              <li className="border rounded p-2 flex items-center justify-center">
                <img src="https://umroh360.com/logo-bank-bni.svg" alt="BNI" width={30} height={30}/>
              </li>
              <li className="border rounded p-2 flex items-center justify-center">
                <img src="https://umroh360.com/logo-bank-bsi.svg" alt="BSI" width={30} height={30}/>
              </li>
              <li className="border rounded p-2 flex items-center justify-center">
                <img src="https://umroh360.com/logo-bank-permata.svg" alt="Permata" width={30} height={30}/>
              </li>
              <li className="border rounded p-2 flex items-center justify-center">
                <img src="https://umroh360.com/logo-bank-bca.svg" alt="BCA" width={30} height={30}/>
              </li>
              <li className="border rounded p-2 flex items-center justify-center">
                <img src="https://umroh360.com/logo-bank-bri.svg" alt="BRI" width={30} height={30}/>
              </li>
              <li className="border rounded p-2 flex items-center justify-center">
                <img src="https://umroh360.com/logo-bank-cimb.svg" alt="CIMB" width={30} height={30}/>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center py-4 border-t border-gray-300 mt-12">
          <span className="text-sm text-gray-600">© 2024 Umroh360 | All rights reserved</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
