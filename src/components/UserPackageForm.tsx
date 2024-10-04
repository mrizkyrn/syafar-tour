import ErrorTemplate from './ErrorTemplate';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserPackage } from '@/api/user-package-api';
import { getAllUserPackageOptions } from '@/api/user-package-option-api';
import { SelectInput, SliderInput, TextInput } from '@/components/Input';
import { SpinnerLoading } from '@/components/Loading';
import { CreateUserPackageRequest } from '@/types/UserPackageType';
import { UserPackageOptionResponse } from '@/types/UserPackageOptionType';

const initialFormData = {
  number_of_pax: 1,
  transportation_id: '',
  flight_id: '',
  travel_duration: 0,
  mekkah_duration: 0,
  madinah_duration: 0,
  hotel_mekkah_id: '',
  hotel_madinah_id: '',
  muthawif_id: '',
  handling_id: '',
};

type ItemOption = {
  value: string;
  label: string;
};

const UserPackageForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateUserPackageRequest>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState({
    tiketPesawatOptions: [] as ItemOption[],
    transportasiOptions: [] as ItemOption[],
    hotelMekkahOptions: [] as ItemOption[],
    hotelMaddinahOptions: [] as ItemOption[],
    muthawwifOptions: [] as ItemOption[],
    handlingOptions: [] as ItemOption[],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getAllUserPackageOptions();

        return response.data;
      } catch (error: any) {
        console.error(error);
        setError('Terjadi kesalahan. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    const initializeOptions = async () => {
      const optionResponse: UserPackageOptionResponse[] = await fetchData();

      const filterOptions = (packageOption: string) => {
        return optionResponse
          .filter((option: any) => option.package_option_name === packageOption)
          .map((option: any) => ({
            value: option.id,
            label: option.name,
          }));
      };

      setOptions({
        tiketPesawatOptions: filterOptions('Tiket Pesawat'),
        transportasiOptions: filterOptions('Transportasi'),
        hotelMekkahOptions: filterOptions('Hotel Makkah'),
        hotelMaddinahOptions: filterOptions('Hotel Madinah'),
        muthawwifOptions: filterOptions('Muthawif'),
        handlingOptions: filterOptions('Handling'),
      });

      setFormData(
        (prev) =>
          ({
            ...prev,
            transportation_id: filterOptions('Transportasi')[0]?.value,
            flight_id: filterOptions('Tiket Pesawat')[0]?.value,
            hotel_mekkah_id: filterOptions('Hotel Makkah')[0]?.value,
            hotel_madinah_id: filterOptions('Hotel Madinah')[0]?.value,
            muthawif_id: filterOptions('Muthawif')[0]?.value,
            handling_id: filterOptions('Handling')[0]?.value,
          } as CreateUserPackageRequest)
      );
    };

    initializeOptions();
  }, []);

  const handleDurationChange = (field: 'mekkah_duration' | 'madinah_duration', value: number) => {
    if (formData.travel_duration === 0) return;
    const totalAvailableDays = formData.travel_duration - 2;

    if (value > totalAvailableDays) {
      value = totalAvailableDays;
    }

    if (field === 'mekkah_duration') {
      const remainingDays = totalAvailableDays - value;
      setFormData((prev) => ({
        ...prev,
        mekkah_duration: value,
        madinah_duration: remainingDays >= 0 ? remainingDays : 0,
      }));
    } else {
      const remainingDays = totalAvailableDays - value;
      setFormData((prev) => ({
        ...prev,
        madinah_duration: value,
        mekkah_duration: remainingDays >= 0 ? remainingDays : 0,
      }));
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'number_of_pax' || name === 'travel_duration' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    toast.promise(createUserPackage(formData), {
      pending: 'Menghitung estimasi harga...',
      success: {
        render({ data }) {
          setLoading(false);
          navigate(`/kalkulasi/${data.data.id}`, { state: { data: data.data } });
          return 'Paket berhasil dihitung!';
        },
      },
      error: {
        render({ data }) {
          setLoading(false);
          return (data as { message: string }).message;
        },
      },
    });
  };

  if (loading) return <SpinnerLoading />;
  if (error) return <ErrorTemplate message={error} />;

  return (
    <form className="flex flex-col gap-5 md:gap-8" onSubmit={handleSubmit}>
      {/* Jumlah Jama'ah (Slider) */}
      <SliderInput
        label="Jumlah Jama'ah"
        value={formData.number_of_pax}
        name="number_of_pax"
        min={1}
        max={35}
        onChange={handleChange}
        required
      />

      {/* Tiket Pesawat */}
      <SelectInput
        label="Tiket Pesawat"
        options={options.tiketPesawatOptions}
        name="flight_id"
        value={formData.flight_id}
        onChange={handleChange}
        required
      />

      {/* Transportasi */}
      <SelectInput
        label="Transportasi"
        options={options.transportasiOptions}
        name="transportation_id"
        value={formData.transportation_id}
        onChange={handleChange}
        required
      />

      <div className="w-full flex flex-col md:flex-row items-end gap-5 md:gap-8">
        {/* Durasi Perjalanan */}
        <TextInput
          label="Durasi Perjalanan"
          showInfo={true}
          placeholder="0"
          infoText="Durasi Perjalanan minimal 4 hari. Setiap durasi perjalanan akan dikurangi 2 hari untuk keperluan durasi perjalanan."
          name="travel_duration"
          value={formData.travel_duration || ''}
          onChange={handleChange}
          type="number"
          min={4}
          required
          onWheel={(e: { currentTarget: { blur: () => any; }; }) => e.currentTarget.blur()}
        />

        {/* Kota Mekkah (Days) */}
        <TextInput
          label="Durasi Kota Mekkah"
          name="mekkah_duration"
          placeholder="0"
          value={formData.mekkah_duration || ''}
          type="number"
          min={0}
          onChange={(e: { target: { value: any } }) => handleDurationChange('mekkah_duration', Number(e.target.value))}
          onWheel={(e: { currentTarget: { blur: () => any; }; }) => e.currentTarget.blur()}
        />

        {/* Kota Maddinah (Days) */}
        <TextInput
          label="Durasi Kota Maddinah"
          name="madinah_duration"
          placeholder="0"
          value={formData.madinah_duration || ''}
          type="number"
          min={0}
          onChange={(e: { target: { value: any } }) => handleDurationChange('madinah_duration', Number(e.target.value))}
          onWheel={(e: { currentTarget: { blur: () => any; }; }) => e.currentTarget.blur()}
        />
      </div>

      {/* Hotel Mekkah */}
      <SelectInput
        label="Hotel di Mekkah"
        options={options.hotelMekkahOptions}
        name="hotel_mekkah_id"
        value={formData.hotel_mekkah_id}
        onChange={handleChange}
        required
      />

      {/* Hotel Maddinah */}
      <SelectInput
        label="Hotel di Maddinah"
        options={options.hotelMaddinahOptions}
        name="hotel_madinah_id"
        value={formData.hotel_madinah_id}
        onChange={handleChange}
        required
      />

      {/* Muthawwif */}
      <SelectInput
        label="Muthawif"
        options={options.muthawwifOptions}
        name="muthawif_id"
        value={formData.muthawif_id}
        onChange={handleChange}
        required
      />

      {/* Handling */}
      <SelectInput
        label="Handling"
        options={options.handlingOptions}
        name="handling_id"
        value={formData.handling_id}
        onChange={handleChange}
        required
      />

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

export default UserPackageForm;
