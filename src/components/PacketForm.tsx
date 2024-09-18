import React, { useState, useEffect } from 'react';
import { SelectInput, SliderInput, TextInput } from '@/components/Input';
import { getAll } from '@/api/price-api';
import { calculateTotal } from '@/api/calculation-api';
import { useNavigate } from 'react-router-dom';

const PacketForm = () => {
  const [formData, setFormData] = useState({
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
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [editingKotaMekkah, setEditingKotaMekkah] = useState(false);
  const [editingKotaMaddinah, setEditingKotaMaddinah] = useState(false);
  const [tiketPesawatOptions, setTiketPesawatOptions] = useState<string[]>([]);
  const [transportasiOptions, setTransportasiOptions] = useState<string[]>([]);
  const [hotelMekkahOptions, setHotelMekkahOptions] = useState<string[]>([]);
  const [hotelMaddinahOptions, setHotelMaddinahOptions] = useState<string[]>([]);
  const [muthawwifOptions, setMuthawwifOptions] = useState<string[]>([]);
  const [handlingOptions, setHandlingOptions] = useState<string[]>([]);

  const [tiketPesawatIds, setTiketPesawatIds] = useState<string[]>([]);
  const [transportasiIds, setTransportasiIds] = useState<string[]>([]);
  const [hotelMekkahIds, setHotelMekkahIds] = useState<string[]>([]);
  const [hotelMaddinahIds, setHotelMaddinahIds] = useState<string[]>([]);
  const [muthawwifIds, setMuthawwifIds] = useState<string[]>([]);
  const [handlingIds, setHandlingIds] = useState<string[]>([]);

  const getOptiions = async (name: string, setOptions: any, setIdOptions: any) => {
    const response = await getAll(name);
    const options = response.data.map((item: any) => item.name);
    const ids = response.data.map((item: any) => item.id);
    setOptions(options);
    setIdOptions(ids);
  };

  useEffect(() => {
    getOptiions('flight', setTiketPesawatOptions, setTiketPesawatIds);
    getOptiions('transportation', setTransportasiOptions, setTransportasiIds);
    getOptiions('hotel-mekkah', setHotelMekkahOptions, setHotelMekkahIds);
    getOptiions('hotel-maddinah', setHotelMaddinahOptions, setHotelMaddinahIds);
    getOptiions('muthawwif', setMuthawwifOptions, setMuthawwifIds);
    getOptiions('handling', setHandlingOptions, setHandlingIds);
  }, []);

  useEffect(() => {
    if (editingKotaMekkah && formData.durasiPerjalanan && formData.kotaMekkah) {
      const remainingDays = formData.durasiPerjalanan - formData.kotaMekkah - 2;
      setFormData((prev) => ({
        ...prev,
        kotaMaddinah: remainingDays >= 0 ? remainingDays : 0,
      }));
    }
  }, [formData.kotaMekkah, formData.durasiPerjalanan, editingKotaMekkah]);

  useEffect(() => {
    if (editingKotaMaddinah && formData.durasiPerjalanan && formData.kotaMaddinah) {
      const remainingDays = formData.durasiPerjalanan - formData.kotaMaddinah - 2;
      setFormData((prev) => ({
        ...prev,
        kotaMekkah: remainingDays >= 0 ? remainingDays : 0,
      }));
    }
  }, [formData.kotaMaddinah, formData.durasiPerjalanan, editingKotaMaddinah]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === 'number' ? Number(value) : value,
    }));
  };

  const handleKotaMekkahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingKotaMekkah(true);
    setEditingKotaMaddinah(false);
    handleChange(e);
  };

  const handleKotaMaddinahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingKotaMaddinah(true);
    setEditingKotaMekkah(false);
    handleChange(e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const selectedFlightId = tiketPesawatIds[tiketPesawatOptions.indexOf(formData.tiketPesawat)];
    const selectedHotelMekkahId = hotelMekkahIds[hotelMekkahOptions.indexOf(formData.hotelMekkah)];
    const selectedHotelMaddinahId = hotelMaddinahIds[hotelMaddinahOptions.indexOf(formData.hotelMaddinah)];
    const selectedTransportasiId = transportasiIds[transportasiOptions.indexOf(formData.transportasi)];
    const selectedMuthawwifId = muthawwifIds[muthawwifOptions.indexOf(formData.muthawwif)];
    const selectedHandlingId = handlingIds[handlingOptions.indexOf(formData.handling)];

    try {
      setLoading(true);

      const response = await calculateTotal({
        number_of_pax:
          typeof formData.jumlahJamaah === 'number' ? formData.jumlahJamaah : Number(formData.jumlahJamaah),
        transportation_id: selectedTransportasiId,
        flight_id: selectedFlightId,
        travel_duration: formData.durasiPerjalanan,
        mekkah_duration: formData.kotaMekkah,
        maddinah_duration: formData.kotaMaddinah,
        hotel_mekkah_id: selectedHotelMekkahId,
        hotel_maddinah_id: selectedHotelMaddinahId,
        muthawwif_id: selectedMuthawwifId,
        handling_id: selectedHandlingId,
      });

      if (response.error) {
        setError(response.message);
        return;
      }

      navigate(`/kalkulasi/${response.data.id}`);
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
        options={tiketPesawatOptions}
        name="tiketPesawat"
        value={formData.tiketPesawat}
        onChange={handleChange}
        required
      />

      {/* Transportasi */}
      <SelectInput
        label="Transportasi"
        options={transportasiOptions}
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
          onChange={handleKotaMekkahChange}
          required
        />

        {/* Kota Maddinah (Days) */}
        <TextInput
          label="Durasi Kota Maddinah"
          name="kotaMaddinah"
          value={formData.kotaMaddinah}
          type="number"
          onChange={handleKotaMaddinahChange}
          required
        />
      </div>

      {/* Hotel Mekkah */}
      <SelectInput
        label="Hotel di Mekkah"
        options={hotelMekkahOptions}
        name="hotelMekkah"
        value={formData.hotelMekkah}
        onChange={handleChange}
        required
      />

      {/* Hotel Maddinah */}
      <SelectInput
        label="Hotel di Maddinah"
        options={hotelMaddinahOptions}
        name="hotelMaddinah"
        value={formData.hotelMaddinah}
        onChange={handleChange}
        required
      />

      {/* Muthawwif */}
      <SelectInput
        label="Muthawwif"
        options={muthawwifOptions}
        name="muthawwif"
        value={formData.muthawwif}
        onChange={handleChange}
        required
      />

      {/* Handling */}
      <SelectInput
        label="Handling"
        options={handlingOptions}
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
