import Select from 'react-select';
import formatDate from '@/utils/formatDate';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllPeriods } from '@/api/period-api';
import { PeriodResponse } from '@/types/PeriodType';
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
import { CreateMitraPackageRequest } from '@/types/MitraPackageType';
import { createMitraPackage } from '@/api/mitra-package-api';

const formatDateToInput = (date: string | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};
const MitraPackageForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateMitraPackageRequest>({
    number_of_pax: 1,
    period_id: '',
    departure_date: new Date(),
    travel_duration: 0,
    mekkah_duration: 0,
    madinah_duration: 0,
    airline_id: '',
    vendor_id: '',
    hotel_mekkah_id: '',
    hotel_madinah_id: '',
    mekkah_room_type: '',
    madinah_room_type: '',
    visa_id: '',
    transportation_id: '',
    muthawif_id: '',
    handling_saudi_id: '',
    handling_domestic_id: '',
    siskopatuh_id: '',
    equipment_id: '',
    tour_plus_id: '',
    manasik_id: '',
    tour_leader: 0,
    margin: 0,
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

        setFormData((prev) => ({
          ...prev,
          airline_id: airlines.data[0].id,
          visa_id: visas.data[0].id,
          transportation_id: transportations.data[0].id,
          muthawif_id: muthawifs.data[0].id,
          handling_saudi_id: handlingSaudis.data[0].id,
          handling_domestic_id: handlingDomestics.data[0].id,
          siskopatuh_id: siskopatuhs.data[0].id,
          equipment_id: equipments.data[0].id,
          tour_plus_id: tours.data[0].id,
          manasik_id: manasiks.data[0].id,
        }));
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!formData.vendor_id || !formData.period_id) return;

    const fetchHotels = async () => {
      try {
        const hotelMekkah = await getAllHotels({
          city: 'MEKKAH',
          vendor_id: formData.vendor_id,
          period_id: formData.period_id,
        });
        const hotelMadinah = await getAllHotels({
          city: 'MADINAH',
          vendor_id: formData.vendor_id,
          period_id: formData.period_id,
        });
        setHotelMekkahOptions(hotelMekkah.data);
        setHotelMadinahOptions(hotelMadinah.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotels();
  }, [formData.period_id, formData.vendor_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'margin') {
      const cleanValue = value.replace(/\D/g, '');
      setFormData((prev) => ({
        ...prev,
        margin: Number(cleanValue),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === 'number_of_pax' || name === 'travel_duration' || name === 'tour_leader' ? Number(value) : value,
      }));
    }
  };

  const handleSelectChange = (selectedOption: any, field: string) => {
    if (field === 'hotel_mekkah_id' || field === 'hotel_madinah_id') {
      const roomType = selectedOption?.label?.split(' - ')[0].split(' (')[1].replace(')', '');

      setFormData((prev) => ({
        ...prev,
        [field]: selectedOption?.value || '',
        [field === 'hotel_mekkah_id' ? 'mekkah_room_type' : 'madinah_room_type']: roomType,
      }));
      return;
    }

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
        period_id: selectedOption?.value || '',
        departure_date: new Date(),
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
    toast.promise(createMitraPackage(formData), {
      pending: 'Menghitung estimasi harga...',
      success: {
        render({ data }) {
          setLoading(false);
          navigate(`custom-mitra/${data.data}`);
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

    try {
      await createMitraPackage(formData);
    } catch (error) {
      console.error(error);
    }
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
          name="period_id"
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
          value={formatDateToInput(formData.departure_date)}
          onChange={handleChange}
          min={minDate}
          max={maxDate}
          disabled={!formData.period_id}
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
          name="airline_id"
          defaultValue={{
            value: airlineOptions[0]?.id,
            label: `${airlineOptions[0]?.name} - ${formatPrice(airlineOptions[0]?.price_idr)}`,
          }}
          options={airlineOptions.map((airline) => ({
            value: airline.id,
            label: `${airline.name} - ${formatPrice(airline.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'airline_id')}
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
          name="vendor_id"
          options={vendorOptions.map((vendor) => ({
            value: vendor.id,
            label: vendor.name,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'vendor_id')}
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
          name="hotel_mekkah_id"
          options={hotelMekkahOptions.flatMap((hotel) =>
            hotel.periods.flatMap((period) => [
              {
                value: `${hotel.id}`,
                label: `${hotel.name} (Double) - ${formatPrice(period.price_double * sarToIdr)}`,
              },
              {
                value: `${hotel.id}`,
                label: `${hotel.name} (Triple) - ${formatPrice(period.price_triple * sarToIdr)}`,
              },
              {
                value: `${hotel.id}`,
                label: `${hotel.name} (Quad) - ${formatPrice(period.price_quad * sarToIdr)}`,
              },
            ])
          )}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'hotel_mekkah_id')}
          placeholder="Pilih hotel di Mekkah"
          isSearchable
          required
          isDisabled={!formData.vendor_id || !formData.period_id}
          styles={selectStyles}
        />
      </div>

      {/* Hotel Madinah */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Hotel di Madinah</label>
        <Select
          name="hotel_madinah_id"
          options={hotelMadinahOptions.flatMap((hotel) =>
            hotel.periods.flatMap((period) => [
              {
                value: `${hotel.id}`,
                label: `${hotel.name} (Double) - ${formatPrice(period.price_double * sarToIdr)}`,
              },
              {
                value: `${hotel.id}`,
                label: `${hotel.name} (Triple) - ${formatPrice(period.price_triple * sarToIdr)}`,
              },
              {
                value: `${hotel.id}`,
                label: `${hotel.name} (Quad) - ${formatPrice(period.price_quad * sarToIdr)}`,
              },
            ])
          )}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'hotel_madinah_id')}
          placeholder="Pilih hotel di Madinah"
          isSearchable
          required
          isDisabled={!formData.vendor_id || !formData.period_id}
          styles={selectStyles}
        />
      </div>

      {/* Visa */}
      <div className="flex flex-col gap-3">
        <label className="text-sm md:text-lg font-medium text-dark">Visa</label>
        <Select
          name="visa_id"
          defaultValue={{
            value: visaOptions[0]?.id,
            label: `${visaOptions[0]?.name} - ${formatPrice(visaOptions[0]?.price_idr)}`,
          }}
          options={visaOptions.map((visa) => ({
            value: visa.id,
            label: `${visa.name} - ${formatPrice(visa.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'visa_id')}
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
          name="transportation_id"
          defaultValue={{
            value: transportationOptions[0]?.id,
            label: `${transportationOptions[0]?.name} - ${formatPrice(transportationOptions[0]?.price_idr)}`,
          }}
          options={transportationOptions.map((transportation) => ({
            value: transportation.id,
            label: `${transportation.name} - ${formatPrice(transportation.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'transportation_id')}
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
          name="muthawif_id"
          defaultValue={{
            value: muthawifOptions[0]?.id,
            label: `${muthawifOptions[0]?.name} - ${formatPrice(muthawifOptions[0]?.price_idr)}`,
          }}
          options={muthawifOptions.map((muthawif) => ({
            value: muthawif.id,
            label: `${muthawif.name} - ${formatPrice(muthawif.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'muthawif_id')}
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
          name="handling_saudi_id"
          defaultValue={{
            value: handlingSaudiOptions[0]?.id,
            label: `${handlingSaudiOptions[0]?.name} - ${formatPrice(handlingSaudiOptions[0]?.price_idr)}`,
          }}
          options={handlingSaudiOptions.map((handlingSaudi) => ({
            value: handlingSaudi.id,
            label: `${handlingSaudi.name} - ${formatPrice(handlingSaudi.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'handling_saudi_id')}
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
          name="handling_domestic_id"
          defaultValue={{
            value: handlingDomesticOptions[0]?.id,
            label: `${handlingDomesticOptions[0]?.name} - ${formatPrice(handlingDomesticOptions[0]?.price_idr)}`,
          }}
          options={handlingDomesticOptions.map((handlingDomestic) => ({
            value: handlingDomestic.id,
            label: `${handlingDomestic.name} - ${formatPrice(handlingDomestic.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'handling_domestic_id')}
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
          name="siskopatuh_id"
          defaultValue={{
            value: siskopatuhOptions[0]?.id,
            label: `${siskopatuhOptions[0]?.name} - ${formatPrice(siskopatuhOptions[0]?.price_idr)}`,
          }}
          options={siskopatuhOptions.map((siskopatuh) => ({
            value: siskopatuh.id,
            label: `${siskopatuh.name} - ${formatPrice(siskopatuh.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'siskopatuh_id')}
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
          name="equipment_id"
          defaultValue={{
            value: equipmentOptions[0]?.id,
            label: `${equipmentOptions[0]?.name} - ${formatPrice(equipmentOptions[0]?.price_idr)}`,
          }}
          options={equipmentOptions.map((equipment) => ({
            value: equipment.id,
            label: `${equipment.name} - ${formatPrice(equipment.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'equipment_id')}
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
          name="tour_plus_id"
          defaultValue={{
            value: tourOptions[0]?.id,
            label: `${tourOptions[0]?.name} - ${formatPrice(tourOptions[0]?.price_idr)}`,
          }}
          options={tourOptions.map((tour) => ({
            value: tour.id,
            label: `${tour.name} - ${formatPrice(tour.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'tour_plus_id')}
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
          name="manasik_id"
          defaultValue={{
            value: manasikOptions[0]?.id,
            label: `${manasikOptions[0]?.name} - ${formatPrice(manasikOptions[0]?.price_idr)}`,
          }}
          options={manasikOptions.map((manasik) => ({
            value: manasik.id,
            label: `${manasik.name} - ${formatPrice(manasik.price_idr)}`,
          }))}
          onChange={(selectedOption) => handleSelectChange(selectedOption, 'manasik_id')}
          placeholder="Pilih manasik"
          isSearchable
          required
          styles={selectStyles}
        />
      </div>

      {/* Tour Leader */}
      <TextInput
        label="Jumlah Tour Leader"
        placeholder="0"
        name="tour_leader"
        value={formData.tour_leader}
        onChange={handleChange}
        type="text"
        min={0}
        required
      />

      {/* Margin */}
      <TextInput
        label="Margin"
        placeholder="0"
        name="margin"
        value={formatPrice(formData.margin)}
        onChange={handleChange}
        type="text"
        min={0}
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

export default MitraPackageForm;
