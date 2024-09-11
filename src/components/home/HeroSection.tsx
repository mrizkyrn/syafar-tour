import { FaStar, FaPlay } from 'react-icons/fa';
import Container from '../Container';

const HeroSection: React.FC = () => {
  return (
    <section
      className="flex justify-center items-center relative h-[500px] bg-cover bg-center"
      style={{ backgroundImage: `url('https://umroh360.com/banner-2.png')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <Container>
        <div className="relative flex flex-col gap-4 items-center justify-center h-full text-center text-white">
          <h1 className="text-5xl font-bold">Umroh 360</h1>
          <p className="text-lg">Rasakan berbagai pengalaman baru yang bisa kamu coba selama perjalanan umroh</p>

          {/* Rating and Buttons */}
          <div className="flex gap-1">
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <button className="bg-blue-600 text-white py-2 px-8 rounded-full text-lg hover:bg-blue-700 transition-colors">
              Kalkulator Trip
            </button>

            <button className="border border-white text-white py-2 px-8 rounded-full flex items-center hover:bg-white hover:text-black transition-colors duration-300">
              <FaPlay />
              <span className="ml-3">Cara Kami Bekerja?</span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
