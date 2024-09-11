import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Container from '@/components/Container';
import HeadingSection from '@/components/HeadingSection';

import 'swiper/css';

const SlideContents = [
  {
    image: 'https://umroh360.com/_next/image?url=%2Fbanner-pesawat.jpg&w=384&q=75',
    alt: 'Promo Pesawat',
  },
  {
    image: 'https://umroh360.com/_next/image?url=%2Fbanner-destinasi.jpg&w=384&q=75',
    alt: 'Travel Destinasi',
  },
  {
    image: 'https://umroh360.com/_next/image?url=%2Fbanner-destinasi-menarik.jpg&w=384&q=75',
    alt: 'Ratusan Destinasi Menarik',
  },
  {
    image: 'https://umroh360.com/_next/image?url=%2Fbanner-pemesanan.jpg&w=384&q=75',
    alt: 'Ratusan Destinasi Menarik',
  },
  {
    image: 'https://umroh360.com/_next/image?url=%2Fbanner-pesawat.jpg&w=384&q=75',
    alt: 'Ratusan Destinasi Menarik',
  },
  {
    image: 'https://umroh360.com/_next/image?url=%2Fbanner-destinasi.jpg&w=384&q=75',
    alt: 'Ratusan Destinasi Menarik',
  },
];

const PromoSection = () => {
  return (
    <section className="pt-12 pb-6">
      <Container>
        <HeadingSection title="Promo Menarik Untuk Kamu" subtitle="Ayo, manfaatkan Diskon dan Promo Terbaik untuk Ibadah Umroh Anda" />

        <Swiper
          modules={[Autoplay]}
          spaceBetween={25}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {SlideContents.map((slide, index) => (
            <SwiperSlide key={index}>
              <img src={slide.image} alt={slide.alt} className="rounded-lg w-full h-auto" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default PromoSection;
