import Container from '@/components/Container';
import ReasonCard from '@/components/cards/ReasonCard';

export const ReasonContents = [
  {
    imageUrl: 'images/reason1.png',
    title: 'Layanan Profesional',
    description: 'Tim berpengalaman siap memberikan bantuan dan informasi untuk memastikan kenyamanan Anda.',
  },
  {
    imageUrl: 'images/reason2.png',
    title: 'Fasilitas Lengkap',
    description:
      'Pilih akomodasi sesuai preferensi Anda, dari hotel bintang 3 hingga bintang 5, dengan layanan terbaik.',
  },
  {
    imageUrl: 'images/reason3.png',
    title: 'Paket Fleksibel',
    description:
      'Kami menawarkan beragam paket umroh, dari reguler hingga private, serta opsi custom untuk kebutuhan khusus.',
  },
];

const ReasonSection: React.FC = () => {
  return (
    <section className="py-12 lg:py-16 bg-linear-gradient">
      <Container>
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col lg:flex-row gap-5 justify-between items-center w-full">
            <h1 className="text-4xl lg:text-5xl font-bold w-full lg:w-2/5 text-dark">
              Mengapa memilih
              <span className="text-primary"> Syafar Tour?</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-800 w-full lg:w-2/5 font-medium leading-5">
              Layanan Terbaik untuk Perjalanan Ibadah yang Aman dan Nyaman
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14">
            {ReasonContents.map((reason, index) => (
              <ReasonCard key={index} reason={reason} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ReasonSection;
