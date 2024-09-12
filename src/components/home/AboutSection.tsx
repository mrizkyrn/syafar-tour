import { useNavigate } from 'react-router-dom';
import Container from '@/components/Container';
import MainButton from '@/components/MainButton';

const AboutSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 sm:gap-10">
          <div className="w-full md:w-1/2">
            <img src="/images/about.png" alt="About" className="w-full" />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center items-start gap-4 sm:gap-6">
            <h1 className="text-lg sm:text-2xl font-medium text-dark">Tentang</h1>
            <h2 className="text-4xl sm:text-5xl md:leading-tight font-bold text-dark">Kenali Syafar Tour Lebih Dekat</h2>
            <p className="text-sm sm:text-lg leading-5 sm:leading-8 text-slate-500 mb-4">
              Syafar Tour adalah agen perjalanan umroh dan haji yang berkomitmen untuk menyediakan layanan terbaik bagi
              setiap jamaah. Dengan pengalaman bertahun-tahun, kami menawarkan berbagai paket umroh dan haji yang dapat
              disesuaikan dengan kebutuhan Anda. Didukung oleh tim profesional, kami memastikan kenyamanan, keamanan,
              dan kemudahan perjalanan anda.
            </p>
          <MainButton text="Selengkapnya" onClick={() => navigate('/tentang')} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
