import { useNavigate } from 'react-router-dom';
import Container from '@/components/Container';
import MainButton from '@/components/MainButton';

const AboutSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <Container>
        <div className="flex justify-between items-center gap-10">
          <div className="w-1/2">
            <img src="/images/about.png" alt="About" className="w-full" />
          </div>
          <div className="w-1/2 flex flex-col justify-center items-start gap-6">
            <h1 className="text-2xl font-medium text-dark">Tentang</h1>
            <h2 className="text-5xl leading-tight font-bold text-dark">Kenali Syafar Tour Lebih Dekat</h2>
            <p className="text-lg leading-8 text-slate-500">
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
