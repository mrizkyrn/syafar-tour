import Container from '@/components/Container';
import MainButton from '@/components/MainButton';

const Packet: React.FC = () => {
  return (
    <>
      <section className="py-16 bg-image-linear-gradient bg-cover bg-center">
        <Container>
          <div className="flex flex-col justify-center items-center gap-10">
            <h1 className="text-5xl leading-normal font-bold text-dark text-center">
              Buat Paket Umroh yang Sesuai dengan Kebutuhan Anda
            </h1>
            <p className="text-2xl leading-9 text-center text-dark">
              Paket Custom Syafar Tour memberi Anda fleksibilitas penuh untuk merencanakan perjalanan umroh sesuai
              keinginan. Pilih sendiri layanan yang Anda butuhkan, mulai dari visa, hotel, transportasi, hingga tiket
              pesawat. Paket ini dirancang khusus bagi Anda yang menginginkan pengalaman umroh yang lebih personal dan
              sesuai dengan preferensi.
            </p>
            <p className="text-2xl leading-9 text-center text-dark">BUAT PAKET CUSTOM SEKARANG</p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="w-full py-3 bg-[#F3F3F3] mb-12">
            <h1 className="text-2xl leading-normal font-medium text-dark text-center">Paket custom umrah</h1>
          </div>

          <form className="flex flex-col gap-8">
            {/* Jumlah Jama'ah */}
            <div>
              <label htmlFor="jumlah-jamaah-slider" className="text-xl font-medium text-gray-700 mb-3">
                Jumlah Jama'ah <span id="sliderValue" className='font-bold'>50</span> Orang
              </label>
              <input
                id="jumlah-jamaah-slider"
                type="range"
                min="1"
                max="50"
                step="1"
                defaultValue={50} // Set default value
                className="w-full h-2 bg-gray-200 rounded-lg mt-5 appearance-none cursor-pointer focus:outline-none focus:ring-primary focus:border-primary"
                onChange={(e) => (document.getElementById('sliderValue')!.innerText = e.target.value)}
              />
            </div>

            {/* Tiket Pesawat */}
            <div>
              <label htmlFor="tiket-pesawat" className="block text-xl font-medium text-gray-700 mb-3">
                Tiket Pesawat
              </label>
              <select
                id="tiket-pesawat"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Pilih Tiket Pesawat</option>
                <option value="garuda">Garuda Indonesia</option>
                <option value="lion">Lion Air</option>
                <option value="sriwijaya">Sriwijaya Air</option>
              </select>
            </div>

            {/* Durasi Perjalanan, Kota Mekkah, Kota Madinah */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="durasi" className="block text-xl font-medium text-gray-700 mb-3">
                  Durasi Perjalanan
                </label>
                <input
                  id="durasi"
                  type="number"
                  placeholder="Jumlah Hari"
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="kota-mekkah" className="block text-xl font-medium text-gray-700 mb-3">
                  Kota Mekkah
                </label>
                <input
                  id="kota-mekkah"
                  type="number"
                  placeholder="Jumlah Hari"
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="kota-madinah" className="block text-xl font-medium text-gray-700 mb-3">
                  Kota Madinah
                </label>
                <input
                  id="kota-madinah"
                  type="number"
                  placeholder="Jumlah Hari"
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Pilihan Transportasi */}
            <div>
              <label htmlFor="transportasi" className="block text-xl font-medium text-gray-700 mb-3">
                Pilihan Transportasi
              </label>
              <select
                id="transportasi"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Pilih Transportasi</option>
                <option value="bus">Bus</option>
                <option value="pesawat">Pesawat</option>
                <option value="kapal">Kapal Laut</option>
              </select>
            </div>

            {/* Pilihan Hotel */}
            <div>
              <label htmlFor="hotel" className="block text-xl font-medium text-gray-700 mb-3">
                Pilihan Hotel
              </label>
              <select
                id="hotel"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Pilih Hotel</option>
                <option value="hotel1">Hotel 1</option>
                <option value="hotel2">Hotel 2</option>
                <option value="hotel3">Hotel 3</option>
              </select>
            </div>

            {/* Handling */}
            <div>
              <label htmlFor="handling" className="block text-xl font-medium text-gray-700 mb-3">
                Handling
              </label>
              <select
                id="handling"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Pilih Handling</option>
                <option value="handling1">Handling 1</option>
                <option value="handling2">Handling 2</option>
                <option value="handling3">Handling 3</option>
              </select>
            </div>

            {/* Button Submit */}
            <div className="mx-auto mt-5">
              <MainButton text="Simpan Paket" onClick={() => {}} type="submit" />
            </div>
          </form>
        </Container>
      </section>
    </>
  );
};

export default Packet;
