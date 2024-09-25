import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hook/AuthProvider';
import { get } from '@/api/product-api';
import { createOrder } from '@/api/order-api';
import { Product } from '@/types/ProductType';
import { FaCheck, FaTimes, FaAngleDown, FaAngleUp, FaUsers } from 'react-icons/fa';
import Container from '@/components/Container';
import formatPrice from '@/utils/formatPrice';

const DetailProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const whatsappTo = '6287881311283';

  const [product, setProduct] = useState<Product | null>(null);
  const [participantCount, setParticipantCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isParticipantOpen, setIsParticipantOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const minimumPriceVariation = product?.variations?.reduce(
    (min, variation) => (Number(variation.price) < min ? Number(variation.price) : min),
    Infinity
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await get(id);
          setProduct(response.data);

          if (response.data.variations.length > 0) {
            setSelectedVariation(0);
          }
        } else {
          setError('Invalid product ID.');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Terjadi kesalahan saat mengambil data produk.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increment = () => setParticipantCount((prev) => prev + 1);
  const decrement = () => setParticipantCount((prev) => Math.max(1, prev - 1));

  const handleOrder = () => {
    if (!user) {
      const response = window.confirm(
        'Anda harus login terlebih dahulu untuk memesan produk ini. Apakah Anda ingin login?'
      );
      if (response) {
        navigate('/login');
      }
      return;
    }

    setShowModal(true);
  };

  const confirmOrder = async () => {
    if (!product || !user || !selectedDate) return;

    try {
      const order = {
        product_id: product.id,
        variation: selectedVariation !== null ? product.variations[selectedVariation].name : null,
        departure: selectedDate.toISOString(),
        number_of_pax: participantCount,
        per_pax_price: selectedVariation !== null ? Number(product.variations[selectedVariation].price) : product.price,
        total_price:
          selectedVariation !== null
            ? Number(product.variations[selectedVariation].price) * participantCount
            : (product.price ?? 0) * participantCount,
      };

      const response = await createOrder(order);
      
      if (!response.success) {
        console.error('Error creating order:', response.message);
        return;
      }
    } catch (error) {
      console.error('Error creating order:', error);
      return;
    }

    const message = `Halo, saya tertarik untuk memesan produk ini. Berikut detailnya:

      Nama: ${user?.full_name ?? 'N/A'}
      Email: ${user?.email ?? 'N/A'}
      
      Detail Pesanan:
      - Nama Produk: ${product?.name}
      - Jumlah Peserta: ${participantCount} orang
      - Tanggal Keberangkatan: ${selectedDate?.toDateString()}
      ${selectedVariation !== null ? `- Variasi: ${product?.variations[selectedVariation].name}` : ''}
      - Pembayaran Per PAX: ${formatPrice(
        selectedVariation !== null ? Number(product?.variations[selectedVariation].price ?? 0) : product?.price ?? 0
      )}
      - Total Pembayaran: ${formatPrice(
        selectedVariation !== null
          ? Number(product?.variations[selectedVariation].price) * participantCount
          : (product?.price ?? 0) * participantCount
      )}

      Terima kasih.`;

    const trimmedMessage = message
      .split('\n')
      .map((line) => line.trim())
      .join('\n');

    const whatsappUrl = `https://wa.me/${whatsappTo}?text=${encodeURIComponent(trimmedMessage)}`;
    setShowModal(false);
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      {product ? (
        <div className="py-7 md:py-10">
          {/* Header */}
          <h1 className="text-xl md:text-3xl font-semibold mb-5 md:mb-10">{product.name}</h1>

          {/* Images Section */}
          <div className="mb-5 md:mb-10">
            {/* Main Image */}
            <div>
              <img
                src={import.meta.env.VITE_BASE_URL + product.thumbnail}
                alt="Main Umrah Image"
                className="w-full h-[450px] object-cover rounded-lg"
              />
            </div>
            {/* Secondary Images */}
            {/* <div className="grid grid-rows-2 gap-4">
              <img src="/images/about.png" alt="Camels" className="w-full h-auto" />
              <img src="/images/about.png" alt="Mecca Towers" className="w-full h-auto" />
            </div> */}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-10 md:gap-16">
            <div className="w-full md:w-3/4 order-2 md:order-1">
              {/* Description Section */}
              <div className="mb-4 md:mb-8">
                <h2 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4">Deskripsi</h2>
                <p className="text-sm md:text-xl text-gray-700 leading-5 md:leading-8">{product.description}</p>
              </div>

              {/* Include Exclude */}
              <div className="mb-8 bg-white shadow-md rounded-lg p-5 md:p-8">
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-4">Include</h3>
                    <ul className="list-none text-sm md:text-lg leading-8 text-gray-700">
                      {product.includes.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <FaCheck className="text-green-500 min-w-6" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-4">Exclude</h3>
                    <ul className="list-disc text-sm md:text-lg leading-8 text-gray-700">
                      {product.excludes.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <FaTimes className="text-red-500 min-w-6" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="px-5 py-7 bg-primary mb-8" id="form">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white">Pilih Peserta dan Tanggal</h2>
                <div className="flex flex-col md:flex-row relative justify-between gap-5 md:gap-10 w-full">
                  {/* Dropdown for Participants */}
                  <div className="w-full">
                    <button
                      className="flex items-center gap-10 bg-white text-black px-4 py-2 rounded-md w-full"
                      onClick={() => setIsParticipantOpen((prev) => !prev)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <FaUsers />
                        <span>Orang x {participantCount}</span>
                      </div>
                      {isParticipantOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </button>

                    {/* Dropdown Content */}
                    {isParticipantOpen && (
                      <div className="absolute bg-white shadow-md text-dark rounded-md flex gap-5 items-center px-5 py-8">
                        <span className="text-gray-600">Dewasa (Usia 99 tahun ke bawah)</span>
                        <div className="flex items-center space-x-2">
                          <button className="text-xl bg-gray-200 rounded-full px-2" onClick={decrement}>
                            -
                          </button>
                          <span>{participantCount}</span>
                          <button className="text-xl bg-gray-200 rounded-full px-2" onClick={increment}>
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Date Picker */}
                  <div className="w-full">
                    <input
                      type="date"
                      value={selectedDate?.toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                      min={new Date().toISOString().split('T')[0]}
                      className="px-4 py-2 rounded-md w-full"
                    />
                  </div>

                  {/* Check availablelity */}
                  <div className="w-full">
                    <button
                      className="bg-dark text-white px-4 py-2 rounded-md w-full"
                      onClick={() => setIsPaymentOpen(true)}
                    >
                      Cek Ketersediaan
                    </button>
                  </div>
                </div>
              </div>

              {isPaymentOpen && (
                <div className="p-6 bg-white rounded-lg border border-primary shadow-lg">
                  {/* Package Details */}
                  <div className="flex flex-col justify-between items-start mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

                    <div className="w-full mt-4 text-sm text-gray-600">
                      {product.variations.length > 0 ? (
                        product.variations.map((variation, index) => (
                          <div key={index} className="flex flex-col justify-between mb-3 border-b pb-3">
                            {/* Radio Button for Variation Selection */}
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="variation"
                                value={index}
                                checked={selectedVariation === index}
                                onChange={() => setSelectedVariation(index)}
                                className="mr-2"
                              />
                              <span className="font-semibold">{variation.name}</span>
                            </label>

                            {/* Show Subtotal if this variation is selected */}
                            <div className="flex justify-between mt-2">
                              <span>Subtotal untuk Per Pax</span>
                              <span className="font-semibold">{formatPrice(variation.price)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Subtotal untuk Produk</span>
                              <span className="font-semibold">
                                {formatPrice(Number(variation.price) * Number(participantCount))}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex justify-between mb-3">
                            <span>Subtotal untuk Per Pax</span>
                            <span className="font-semibold">{formatPrice(product.price)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Subtotal untuk Produk</span>
                            <span className="font-semibold">{formatPrice(product.price * participantCount)}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Total Payment Section */}
                  <div className="border-t pt-4">
                    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                      <div className="mb-4 md:mb-0">
                        <p className="text-gray-700 mb-1">Total Pembayaran</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(
                            selectedVariation !== null
                              ? Number(product.variations[selectedVariation].price) * participantCount
                              : product.price * participantCount
                          )}
                          <span className="ml-1 text-sm font-medium text-gray-500">{participantCount} PAX</span>
                        </p>
                      </div>

                      <button
                        className="bg-primary text-center text-white text-sm md:text-base px-6 sm:px-10 py-2 rounded-md hover:bg-primaryDark transition-colors duration-300"
                        onClick={handleOrder}
                      >
                        Pesan sekarang
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/4 order-1 md:order-2">
              {/* Pricing and Call to Action */}
              <div className="flex flex-col items-end justify-between bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex flex-col items-end gap-2 mb-5">
                  <p className="text-base md:text-xl">Mulai dari</p>
                  <p className="text-3xl font-bold text-yellow-500">
                    {formatPrice(selectedVariation !== null ? minimumPriceVariation ?? 0 : product.price)}
                  </p>
                  <p className="text-sm text-gray-500">Per pax/jama'ah</p>
                </div>
                <a
                  className="bg-primary text-center text-white text-sm md:text-base px-6 sm:px-10 py-2 rounded-md hover:bg-primaryDark transition-colors duration-300"
                  href="#form"
                >
                  Pesan Sekarang
                </a>
              </div>
            </div>
          </div>

          {/* Modal for confirming order */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Konfirmasi Pesanan</h2>
                <p className="text-gray-600 mb-4">
                  Anda akan diarahkan ke WhatsApp untuk melanjutkan proses pemesanan dengan detail berikut:
                </p>
                <ul className="list-none text-gray-600 mb-4 ">
                  <li className="">Jumlah Peserta: {participantCount} orang</li>
                  <li className="">Tanggal Keberangkatan: {selectedDate?.toDateString()}</li>
                  {selectedVariation !== null && (
                    <li className="">Variasi: {product?.variations[selectedVariation].name}</li>
                  )}
                  <li className="">
                    Pembayaran Per PAX:{' '}
                    {formatPrice(
                      selectedVariation !== null ? product?.variations[selectedVariation].price : product?.price
                    )}
                  </li>
                  <li className="">
                    Total Pembayaran:{' '}
                    {formatPrice(
                      selectedVariation !== null
                        ? Number(product?.variations[selectedVariation].price) * participantCount
                        : (product?.price ?? 0) * participantCount
                    )}
                  </li>
                </ul>
                <div className="flex justify-end gap-4 mt-4">
                  <button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={() => setShowModal(false)}>
                    Batal
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-md" onClick={confirmOrder}>
                    Konfirmasi
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </Container>
  );
};

export default DetailProduct;
