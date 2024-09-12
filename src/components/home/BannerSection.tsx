import Container from '@/components/Container';

const BannerSection: React.FC = () => {
  return (
    <section className="py-12 mt-12">
      <Container>
        <div className="flex justify-around items-center">
          <img src="/images/mitra1.png" alt="Mitra" className="w-28 grayscale" />
          <img src="/images/mitra2.png" alt="Mitra" className="w-28 grayscale" />
          <img src="/images/mitra3.png" alt="Mitra" className="w-24 grayscale" />
          <img src="/images/mitra4.png" alt="Mitra" className="w-24 grayscale" />
          <img src="/images/mitra5.png" alt="Mitra" className="w-24 grayscale" />
        </div>
      </Container>
    </section>
  );
};

export default BannerSection;
