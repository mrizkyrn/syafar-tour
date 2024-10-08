import Select from 'react-select';

import { useEffect, useState } from 'react';
import { getAllPeriods } from '@/api/period-api';
import { PeriodResponse } from '@/types/PeriodType';
import formatDate from '@/utils/formatDate';
import { getAllVendors } from '@/api/vendor-api';
import { VendorResponse } from '@/types/VendorType';
import {
  getAllAirlines,
  getAllEquipments,
  getAllHandlingDomestics,
  getAllHandlingSaudis,
  getAllManasik,
  getAllMuthawifs,
  getAllSiskopatuh,
  getAllTours,
  getAllTransportations,
  getAllVisas,
} from '@/api/mitra-package-option-api';
import formatPrice from '@/utils/formatPrice';
import { MitraPackageOptionResponse } from '@/types/MitraPackageOptionType';
import { HotelResponse } from '@/types/HotelType';
import { getAllHotels } from '@/api/hotel-api';
import { SliderInput, TextInput } from './Input';
import { getAllExchangeRates } from '@/api/exchange-rate-api';

const formatDateToInput = (date: string | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const MitraPackageForm = () => {
  const [formData, setFormData] = useState({
    number_of_pax: 1,
    period: '',
    departure_date: '',
    airline: '',
    travel_duration: 0,
    mekkah_duration: 0,
    madinah_duration: 0,
    vendor: '',
    hotel_mekkah: '',
    hotel_madinah: '',
    visa: '',
    transportation: '',
    muthawif: '',
    handling_saudi: '',
    handling_domestic: '',
    siskopatuh: '',
    equipment: '',
    tour: '',
    manasik: '',
  });
  const [periodOptions, setPeriodOptions] = useState<PeriodResponse[]>([]);
  const [airlineOptions, setAirlineOptions] = useState<MitraPackageOptionResponse[]>([]);
  const [vendorOptions, setVendorOptions] = useState<VendorResponse[]>([]);
  const [hotelMekkahOptions, setHotelMekkahOptions] = useState<HotelResponse[]>([]);
  const [hotelMadinahOptions, setHotelMadinahOptions] = useState<HotelResponse[]>([]);
  const [visaOptions, setVisaOptions] = useState<MitraPackageOptionResponse[]>([]);
  const [transportationOptions, setTransportationOptions] = useState<MitraPackageOptionResponse[]>([]);
  const [muthawifOptions, setMuthawifOptions] = useState<MitraPackageOptionResponse[]>([]);
  const [handlingSaudiOptions, setHandlingSaudiOptions] = useState<MitraPackageOptionResponse[]>([]);
  const [handlingDomesticOptions, setHandlingDomesticOptions] = useState<MitraPackageOptionResponse[]>([]);
  const [siskopatuhOptions, setSiskopatuhOptions] = useState<MitraPackageOptionResponse[]>([]);
  const [equipmentOptions, setEquipmentOptions] = useState<MitraPackageOptionResponse[]>([]);
  const [tourOptions, setTourOptions] = useState<MitraPackageOptionResponse[]>([]);
  const [manasikOptions, setManasikOptions] = useState<MitraPackageOptionResponse[]>([]);
  const [sarToIdr, setSarToIdr] = useState(0);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          periods,
          airlines,
          vendors,
          visas,
          transportations,
          muthawifs,
          handlingSaudis,
          handlingDomestics,
          siskopatuhs,
          equipments,
          tours,
          manasiks,
          exchanges,
        ] = await Promise.all([
          getAllPeriods(),
          getAllAirlines(),
          getAllVendors(),
          getAllVisas(),
          getAllTransportations(),
          getAllMuthawifs(),
          getAllHandlingSaudis(),
          getAllHandlingDomestics(),
          getAllSiskopatuh(),
          getAllEquipments(),
          getAllTours(),
          getAllManasik(),
          getAllExchangeRates(),
        ]);

        setPeriodOptions(periods.data);
        setAirlineOptions(airlines.data);
        setVendorOptions(vendors.data);
        setVisaOptions(visas.data);
        setTransportationOptions(transportations.data);
        setMuthawifOptions(muthawifs.data);
        setHandlingSaudiOptions(handlingSaudis.data);
        setHandlingDomesticOptions(handlingDomestics.data);
        setSiskopatuhOptions(siskopatuhs.data);
        setEquipmentOptions(equipments.data);
        setTourOptions(tours.data);
        setManasikOptions(manasiks.data);
        setSarToIdr(exchanges.data.find((exchange: any) => exchange.currency === 'SAR')?.rate_idr || 0);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!formData.vendor || !formData.period) return;

    const fetchHotels = async () => {
      try {
        const hotelMekkah = await getAllHotels({
          city: 'MEKKAH',
          vendor_id: formData.vendor,
          period_id: formData.period,
        });
        const hotelMadinah = await getAllHotels({
          city: 'MADINAH',
          vendor_id: formData.vendor,
          period_id: formData.period,
        });
        console.log(hotelMekkah.data);
        setHotelMekkahOptions(hotelMekkah.data);
        setHotelMadinahOptions(hotelMadinah.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotels();
  }, [formData.period, formData.vendor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'duration_mekkah' || name === 'duration_madinah') {
      if (isNaN(Number(value))) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'number_of_pax' || name === 'travel_duration' ? Number(value) : value,
    }));
  };

  const handleSelectChange = (selectedOption: any, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption?.value || '',
    }));
  };

  const handlePeriodChange = (selectedOption: any) => {
    const selectedPeriod = periodOptions.find((period) => period.id === selectedOption?.value);

    if (selectedPeriod) {
      const startDate = formatDateToInput(selectedPeriod.start_date);
      const endDate = formatDateToInput(selectedPeriod.end_date);

      setMinDate(startDate);
      setMaxDate(endDate);

      setFormData((prev) => ({
        ...prev,
        period: selectedOption?.value || '',
        departure_date: '',
      }));
    }
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const selectStyles = {
    control: (styles: any) => ({
      ...styles,
      minHeight: '3rem',
      height: '3rem',
      padding: '0 1rem',
    }),
    option: (styles: any, { isSelected }: any) => ({
      ...styles,
      backgroundColor: isSelected ? '#3182ce' : 'white',
      color: isSelected ? 'white' : 'black',
      padding: '0.5rem',
    }),
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form className="flex flex-col gap-4 md:gap-8" onSubmit={handleSubmit}>
      {/* Number of Pax */}
      <SliderInput
        label="Jumlah Jama'ah"
        value={formData.number_of_pax}
        name="number_of_pax"
        min={1}
        max={35}
        onChange={handleChange}
        required
      />

      {/* Period */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Periode</label>
        <Select
          name="period"
          options={periodOptions.map((period) => ({
            value: period.id,
            label: `${formatDate(period.start_date)} - ${formatDate(period.end_date)}`,
          }))}
          onChange={handlePeriodChange}
          placeholder="Pilih periode"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

      {/* Departure Date */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Tanggal Keberangkatan</label>
        <input
          className="w-full px-3 py-3 md:px-5 text-xs md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          type="date"
          name="departure_date"
          value={formData.departure_date}
          onChange={handleChange}
          min={minDate}
          max={maxDate}
          disabled={!formData.period}
          required
        />
      </div>

      {/* Duration */}
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
          onWheel={(e: { currentTarget: { blur: () => any } }) => e.currentTarget.blur()}
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
          onWheel={(e: { currentTarget: { blur: () => any } }) => e.currentTarget.blur()}
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
          onWheel={(e: { currentTarget: { blur: () => any } }) => e.currentTarget.blur()}
        />
      </div>

      {/* Airline */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Maskapai</label>
        <Select
          name="airline"
          options={airlineOptions.map((airline) => ({
            value: airline.id,
            label: `${airline.name} - ${formatPrice(airline.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'airline')}
          placeholder="Pilih maskapai"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

      {/* Vendor */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Vendor</label>
        <Select
          name="vendor"
          options={vendorOptions.map((vendor) => ({
            value: vendor.id,
            label: vendor.name,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'vendor')}
          placeholder="Pilih vendor"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

      {/* Hotel Mekkah */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Hotel di Mekkah</label>
        <Select
          name="hotel_mekkah"
          options={hotelMekkahOptions.flatMap((hotel) =>
            hotel.periods.flatMap((period) => [
              {
                value: `${hotel.id}-double`,
                label: `${hotel.name} (Double) - ${formatPrice(period.price_double * sarToIdr)}`,
              },
              {
                value: `${hotel.id}-triple`,
                label: `${hotel.name} (Triple) - ${formatPrice(period.price_triple * sarToIdr)}`,
              },
              {
                value: `${hotel.id}-quad`,
                label: `${hotel.name} (Quad) - ${formatPrice(period.price_quad * sarToIdr)}`,
              },
            ])
          )}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'hotel_mekkah')}
          placeholder="Pilih hotel di Mekkah"
          isSearchable
          required
          isDisabled={!formData.vendor || !formData.period}
          styles={selectStyles}
        />
      </div>

      {/* Hotel Madinah */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Hotel di Madinah</label>
        <Select
          name="hotel_madinah"
          options={hotelMadinahOptions.flatMap((hotel) =>
            hotel.periods.flatMap((period) => [
              {
                value: `${hotel.id}-double`,
                label: `${hotel.name} (Double) - ${formatPrice(period.price_double * sarToIdr)}`,
              },
              {
                value: `${hotel.id}-triple`,
                label: `${hotel.name} (Triple) - ${formatPrice(period.price_triple * sarToIdr)}`,
              },
              {
                value: `${hotel.id}-quad`,
                label: `${hotel.name} (Quad) - ${formatPrice(period.price_quad * sarToIdr)}`,
              },
            ])
          )}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'hotel_madinah')}
          placeholder="Pilih hotel di Madinah"
          isSearchable
          required
          isDisabled={!formData.vendor || !formData.period}
          styles={selectStyles}
        />
      </div>

      {/* Visa */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Visa</label>
        <Select
          name="visa"
          options={visaOptions.map((visa) => ({
            value: visa.id,
            label: `${visa.name} - ${formatPrice(visa.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'visa')}
          placeholder="Pilih visa"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

      {/* Transportation */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Transportasi</label>
        <Select
          name="transportation"
          options={transportationOptions.map((transportation) => ({
            value: transportation.id,
            label: `${transportation.name} - ${formatPrice(transportation.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'transportation')}
          placeholder="Pilih transportasi"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

      {/* Muthawif */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Muthawif</label>
        <Select
          name="muthawif"
          options={muthawifOptions.map((muthawif) => ({
            value: muthawif.id,
            label: `${muthawif.name} - ${formatPrice(muthawif.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'muthawif')}
          placeholder="Pilih muthawif"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

      {/* Handling Saudi */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Handling Saudi</label>
        <Select
          name="handling_saudi"
          options={handlingSaudiOptions.map((handlingSaudi) => ({
            value: handlingSaudi.id,
            label: `${handlingSaudi.name} - ${formatPrice(handlingSaudi.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'handling_saudi')}
          placeholder="Pilih handling Saudi"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

      {/* Handling Domestic */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Handling Domestik</label>
        <Select
          name="handling_domestic"
          options={handlingDomesticOptions.map((handlingDomestic) => ({
            value: handlingDomestic.id,
            label: `${handlingDomestic.name} - ${formatPrice(handlingDomestic.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'handling_domestic')}
          placeholder="Pilih handling domestik"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

      {/* Siskopatuh */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Siskopatuh</label>
        <Select
          name="siskopatuh"
          options={siskopatuhOptions.map((siskopatuh) => ({
            value: siskopatuh.id,
            label: `${siskopatuh.name} - ${formatPrice(siskopatuh.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'siskopatuh')}
          placeholder="Pilih siskopatuh"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

      {/* Equipment */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Perlengkapan</label>
        <Select
          name="equipment"
          options={equipmentOptions.map((equipment) => ({
            value: equipment.id,
            label: `${equipment.name} - ${formatPrice(equipment.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'equipment')}
          placeholder="Pilih perlengkapan"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

      {/* Tour */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Tour</label>
        <Select
          name="tour"
          options={tourOptions.map((tour) => ({
            value: tour.id,
            label: `${tour.name} - ${formatPrice(tour.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'tour')}
          placeholder="Pilih tour"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

      {/* Manasik */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Manasik</label>
        <Select
          name="manasik"
          options={manasikOptions.map((manasik) => ({
            value: manasik.id,
            label: `${manasik.name} - ${formatPrice(manasik.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'manasik')}
          placeholder="Pilih manasik"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

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

export default MitraPackageForm;
