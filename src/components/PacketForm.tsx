import { useState, useEffect } from 'react';
import { SelectInput, SliderInput, TextInput } from '@/components/Input';
import { getAll } from '@/api/user-service-api';
import { create } from '@/api/calculation-api';
import { useNavigate } from 'react-router-dom';

const initialFormData = {
  jumlahJamaah: 1,
  tiketPesawat: '',
  transportasi: '',
  durasiPerjalanan: 0,
  kotaMekkah: 0,
  kotaMaddinah: 0,
  hotelMekkah: '',
  hotelMaddinah: '',
  muthawwif: '',
  handling: '',
};

type ServiceOption = {
  value: string;
  label: string;
};

const PacketForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [editingField, setEditingField] = useState<'kotaMekkah' | 'kotaMaddinah' | null>(null);
  const [options, setOptions] = useState({
    tiketPesawatOptions: [] as ServiceOption[],
    transportasiOptions: [] as ServiceOption[],
    hotelMekkahOptions: [] as ServiceOption[],
    hotelMaddinahOptions: [] as ServiceOption[],
    muthawwifOptions: [] as ServiceOption[],
    handlingOptions: [] as ServiceOption[],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (editingField === 'kotaMekkah' && formData.durasiPerjalanan && formData.kotaMekkah !== undefined) {
      const remainingDays = formData.durasiPerjalanan - formData.kotaMekkah - 2;
      setFormData((prev) => ({
        ...prev,
        kotaMaddinah: remainingDays >= 0 ? remainingDays : 0,
      }));
    }
  }, [formData.kotaMekkah, formData.durasiPerjalanan, editingField]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getAll();

        return response.data;
      } catch (error: any) {
        setError(error.message || 'Terjadi kesalahan. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    const initializeOptions = async () => {
      const serviceResponse = await fetchData();

      const filterOptions = (serviceType: string) => {
        return serviceResponse
          .filter((service: any) => service.service_type === serviceType)
          .map((service: any) => ({ value: service.id, label: service.name }));
      };

      setOptions({
        tiketPesawatOptions: filterOptions('Tiket Pesawat'),
        transportasiOptions: filterOptions('Transportasi'),
        hotelMekkahOptions: filterOptions('Hotel Makkah'),
        hotelMaddinahOptions: filterOptions('Hotel Madinah'),
        muthawwifOptions: filterOptions('Muthawif'),
        handlingOptions: filterOptions('Handling'),
      });
    };

    initializeOptions();

  }, []);
  
  console.log(options);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === 'number' ? Number(value) : value,
    }));
  };

  const handleFieldChange = (field: 'kotaMekkah' | 'kotaMaddinah') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingField(field);
    handleChange(e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      const response = await create({
        number_of_pax:
          typeof formData.jumlahJamaah === 'number' ? formData.jumlahJamaah : parseInt(formData.jumlahJamaah),
        transportation_id: formData.transportasi,
        flight_id: formData.tiketPesawat,
        travel_duration: formData.durasiPerjalanan,
        mekkah_duration: formData.kotaMekkah,
        madinah_duration: formData.kotaMaddinah,
        hotel_mekkah_id: formData.hotelMekkah,
        hotel_madinah_id: formData.hotelMaddinah,
        muthawif_id: formData.muthawwif,
        handling_id: formData.handling,
      });

      if (response.error) {
        setError(response.message);
        return;
      }

      navigate(`/kalkulasi/${response.data.id}`, { state: { data: response.data } });
    } catch (error: any) {
      setError(error.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-5 md:gap-8" onSubmit={handleSubmit}>
      {/* Jumlah Jama'ah (Slider) */}
      <SliderInput
        label="Jumlah Jama'ah"
        value={formData.jumlahJamaah}
        name="jumlahJamaah"
        min={1}
        max={35}
        onChange={handleChange}
        required
      />

      {/* Tiket Pesawat */}
      <SelectInput
        label="Tiket Pesawat"
        options={options.tiketPesawatOptions}
        name="tiketPesawat"
        value={formData.tiketPesawat}
        onChange={handleChange}
        required
      />

      {/* Transportasi */}
      <SelectInput
        label="Transportasi"
        options={options.transportasiOptions}
        name="transportasi"
        value={formData.transportasi}
        onChange={handleChange}
        required
      />

      <div className="w-full flex flex-col md:flex-row items-end gap-5 md:gap-8">
        {/* Durasi Perjalanan */}
        <TextInput
          label="Durasi Perjalanan"
          showInfo={true}
          infoText="Durasi Perjalanan minimal 4 hari. Setiap durasi perjalanan akan dikurangi 2 hari untuk keperluan durasi perjalanan."
          name="durasiPerjalanan"
          value={formData.durasiPerjalanan}
          onChange={handleChange}
          type="number"
          min="4"
          required
        />

        {/* Kota Mekkah (Days) */}
        <TextInput
          label="Durasi Kota Mekkah"
          name="kotaMekkah"
          value={formData.kotaMekkah}
          type="number"
          onChange={handleFieldChange('kotaMekkah')}
          required
        />

        {/* Kota Maddinah (Days) */}
        <TextInput
          label="Durasi Kota Maddinah"
          name="kotaMaddinah"
          value={formData.kotaMaddinah}
          type="number"
          onChange={handleFieldChange('kotaMaddinah')}
          required
        />
      </div>

      {/* Hotel Mekkah */}
      <SelectInput
        label="Hotel di Mekkah"
        options={options.hotelMekkahOptions}
        name="hotelMekkah"
        value={formData.hotelMekkah}
        onChange={handleChange}
        required
      />

      {/* Hotel Maddinah */}
      <SelectInput
        label="Hotel di Maddinah"
        options={options.hotelMaddinahOptions}
        name="hotelMaddinah"
        value={formData.hotelMaddinah}
        onChange={handleChange}
        required
      />

      {/* Muthawwif */}
      <SelectInput
        label="Muthawwif"
        options={options.muthawwifOptions}
        name="muthawwif"
        value={formData.muthawwif}
        onChange={handleChange}
        required
      />

      {/* Handling */}
      <SelectInput
        label="Handling"
        options={options.handlingOptions}
        name="handling"
        value={formData.handling}
        onChange={handleChange}
        required
      />

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white font-medium py-3 mt-5 rounded-lg shadow-lg hover:bg-primaryDark transition-colors"
      >
        {loading ? 'Loading...' : 'Simpan Paket'}
      </button>
    </form>
  );
};

export default PacketForm;
