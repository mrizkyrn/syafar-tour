import Container from '@/components/Container';
import MitraPackageForm from '@/components/MitraPackageForm';
import UserPackageForm from '@/components/UserPackageForm';
import { useAuth } from '@/hook/AuthProvider';

const CustomPackage: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <section className="py-16 bg-image-linear-gradient bg-cover bg-center">
        <Container>
          <div className="flex flex-col justify-center items-center gap-7 md:gap-10">
            <h1 className="text-2xl md:text-5xl md:leading-normal font-bold text-dark text-center">
              Buat Paket Umroh yang Sesuai dengan Kebutuhan Anda
            </h1>
            <p className="text-xs md:text-2xl md:leading-9 text-center text-dark">
              Paket Custom Syafar Tour memberi Anda fleksibilitas penuh untuk merencanakan perjalanan umroh sesuai
              keinginan. Pilih sendiri layanan yang Anda butuhkan, mulai dari visa, hotel, transportasi, hingga tiket
              pesawat. Paket ini dirancang khusus bagi Anda yang menginginkan pengalaman umroh yang lebih personal dan
              sesuai dengan preferensi.
            </p>
            <button
              className="text-xs md:text-xl font-medium text-center text-dark bg-white rounded-md px-5 py-2 uppercase"
              onClick={() => {
                document.getElementById('packet-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Buat Paket Custom Sekarang
            </button>
          </div>
        </Container>
      </section>

      <section className="py-16" id="packet-form">
        <Container>
          <div className="w-full py-3 bg-[#F3F3F3] mb-12">
            <h1 className="text-base md:text-2xl font-medium text-dark text-center">Paket custom umrah</h1>
          </div>

          {user && (user.role === 'MITRA' || user.role === 'ADMIN') ? <MitraPackageForm /> : <UserPackageForm />}
        </Container>
      </section>
    </>
  );
};

export default CustomPackage;
