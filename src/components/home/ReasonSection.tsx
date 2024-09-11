import Container from '@/components/Container';
import ReasonCard from '../cards/ReasonCard';
import { ReasonContents } from '@/datas';

const ReasonSection: React.FC = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-3xl md:text-5xl font-bold w-2/5 text-dark">
              Mengapa memilih
              <p className="text-primary mt-5">Syafar Tour?</p>
            </h1>
            <p className="text-xl text-slate-800 w-2/5 font-medium leading-relaxed">
              Layanan Terbaik untuk Perjalanan Ibadah yang Aman dan Nyaman
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
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
