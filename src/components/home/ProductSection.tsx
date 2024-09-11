import Container from '../Container';
import HeadingSection from '../HeadingSection';
import ProductCard from '../ProductCard';

const Products = [
  {
    title: 'Umroh Smart Family - Platinum 12D',
    type: 'Private - Tour',
    priceDesc: 'Mulai Mulai Rp. 19,900,000 PER PAX',
    imageUrl: 'https://api.umroh360.com/public/storage/thumbnail/BuahTangan/HsRRueRiZh4rzsIflgzHEzyAZ1C4RCp2.png',
  },
  {
    title: 'Umroh Smart Family - Platinum 9D',
    type: 'Private - Tour',
    priceDesc: 'Mulai Mulai Rp. 16,900,000 PER PAX',
    imageUrl: 'https://api.umroh360.com/public/storage/thumbnail/BuahTangan/1zSnAPshMkyktxyOxA1APK0bwUIltRkw.png',
  },
  {
    title: 'Umroh Smart Family - Platinum 12D',
    type: 'Private - Tour',
    priceDesc: 'Mulai Mulai Rp. 19,900,000 PER PAX',
    imageUrl: 'https://api.umroh360.com/public/storage/thumbnail/BuahTangan/HsRRueRiZh4rzsIflgzHEzyAZ1C4RCp2.png',
  },
  {
    title: 'Umroh Smart Family - Platinum 9D',
    type: 'Private - Tour',
    priceDesc: 'Mulai Mulai Rp. 16,900,000 PER PAX',
    imageUrl: 'https://api.umroh360.com/public/storage/thumbnail/BuahTangan/1zSnAPshMkyktxyOxA1APK0bwUIltRkw.png',
  },
];

const ProductSection: React.FC = () => {
  return (
    <>
      {/* First Products */}
      <section className="py-6">
        <Container>
          <HeadingSection
            title="Visa dan Umroh"
            subtitle="Jangan lewatkan paket umroh di waktu terdekat. Ayo cek sekarang!"
          />

          <div className="flex flex-col lg:flex-row gap-4 justify-center">
            {Products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-8 sm:mt-12">
            <button className="border border-gray-300 py-2 px-10 rounded-full text-sm hover:bg-blue-900 hover:text-white transition-colors duration-300">
              Lihat Selengkapnya
            </button>
          </div>
        </Container>
      </section>

      {/* Second Products */}
      <section className="py-6">
        <Container>
          <HeadingSection title="Tour And Package" subtitle="Ayo, Kunjungi destinasi favorit kamu. Ayo cek sekarang!" />

          <div className="flex flex-col lg:flex-row gap-4 justify-center">
            {Products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-8 sm:mt-12">
            <button className="border border-gray-300 py-2 px-10 rounded-full text-sm hover:bg-blue-900 hover:text-white transition-colors duration-300">
              Lihat Selengkapnya
            </button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductSection;
