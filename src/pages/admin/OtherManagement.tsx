import { useEffect, useState } from 'react';
import { getAllExchangeRates, updateExchangeRate } from '@/api/exchange-rate-api';
import { ExchangeRateResponse, UpdateExchangeRateRequest } from '@/types/ExchangeRate.Type';
import { toast } from 'react-toastify';
import formatPrice from '@/utils/formatPrice';
import { getAllContacts, updateContact } from '@/api/contact-api';
import { ContactResponse, UpdateContactRequest } from '@/types/ContactType';

const OtherManagement: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRateResponse[]>([]);
  const [contact, setContact] = useState<ContactResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true);
      try {
        const rates = await getAllExchangeRates();
        const contacts = await getAllContacts();

        setExchangeRates(rates.data);
        setContact(contacts.data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleRateChange = (id: string, value: string) => {
    const cleanValue = parseFloat(value.replace(/\D/g, '')) || 0;
    setExchangeRates((prevRates) =>
      prevRates.map((rate) => (rate.id === id ? { ...rate, rate_idr: cleanValue } : rate))
    );
  };

  const handleContactChange = (name: string, value: string) => {
    setContact((prevContact) => prevContact.map((c) => (c.name === name ? { ...c, value } : c)));
  };

  const handleSave = async () => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menyimpan perubahan?');
    if (!confirmed) return;

    const updatedRates = exchangeRates.map((rate) => ({
      id: rate.id,
      currency: rate.currency,
      rate_idr: rate.rate_idr,
    })) as UpdateExchangeRateRequest[];
    const updatedContact = contact.map((c) => ({ id: c.id, name: c.name, value: c.value })) as UpdateContactRequest[];

    const savePromises = Promise.all([updateExchangeRate(updatedRates), updateContact(updatedContact)]);

    setLoading(true);
    toast.promise(savePromises, {
      pending: 'Menyimpan...',
      success: {
        render() {
          setLoading(false);
          return 'Perubahan berhasil disimpan';
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

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-dark">Manajemen Lainnya</h1>

        <button
          className="bg-primary text-white px-10 py-2 rounded-md hover:bg-primaryDark"
          onClick={handleSave}
          disabled={loading}
        >
          Simpan
        </button>
      </div>

      <h2 className="text-xl font-semibold text-dark mb-5">Kurs Mata Uang</h2>

      <div className="flex flex-col gap-5 mb-10">
        {exchangeRates.map((rate) => (
          <div key={rate.id} className="flex items-center gap-2">
            <span className="text-dark font-medium w-16">{rate.currency}</span>
            <input
              type="text"
              className="border px-3 py-2 rounded-md w-52 text-right"
              value={rate.rate_idr ? formatPrice(rate.rate_idr) : ''}
              onChange={(e) => handleRateChange(rate.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-dark mb-5">Kontak</h2>

      <div className="flex flex-col gap-5 w-1/2">
        <div className="flex items-center justify-between">
          <span className="text-dark font-medium">Nomor Whatsapp</span>
          <input
            type="text"
            className="border px-3 py-2 rounded-md w-72 text-right"
            value={contact.find((c) => c.name === 'whatsapp')?.value || ''}
            onChange={(e) => handleContactChange('whatsapp', e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-dark font-medium">Email</span>
          <input
            type="text"
            className="border px-3 py-2 rounded-md w-72 text-right"
            value={contact.find((c) => c.name === 'email')?.value || ''}
            onChange={(e) => handleContactChange('email', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default OtherManagement;
