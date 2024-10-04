import ErrorTemplate from '@/components/ErrorTemplate';
import TableActions from '@/components/TableActions';
import formatDate from '@/utils/formatDate';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createPeriod, deletePeriod, getAllPeriods, updatePeriod } from '@/api/period-api';
import { PeriodResponse, CreatePeriodRequest, UpdatePeriodRequest, PeriodCategory } from '@/types/PeriodType';

const PeriodManagement = () => {
  const [periods, setPeriods] = useState<PeriodResponse[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createFormData, setCreateFormData] = useState<CreatePeriodRequest>({
    category: '' as PeriodCategory,
    start_date: new Date(),
    end_date: new Date(),
  });
  const [updateFormData, setUpdateFormData] = useState<UpdatePeriodRequest>({
    category: '' as PeriodCategory,
    start_date: new Date(),
    end_date: new Date(),
  });

  const fetchPeriods = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllPeriods();
      setPeriods(response.data);
    } catch (error: any) {
      console.error(error);
      setError('Terjadi kesalahan saat mengambil data periode');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeriods();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    toast.promise(createPeriod(createFormData), {
      pending: 'Menambahkan periode...',
      success: {
        render() {
          setLoading(false);
          setIsAddModalOpen(false);
          setCreateFormData({ category: 'LOW' as PeriodCategory, start_date: new Date(), end_date: new Date() });
          fetchPeriods();
          return 'Periode berhasil ditambahkan';
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

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPeriod) return;

    setLoading(true);
    toast.promise(updatePeriod(selectedPeriod.id, updateFormData), {
      pending: 'Memperbarui periode...',
      success: {
        render() {
          setLoading(false);
          setIsEditModalOpen(false);
          setUpdateFormData({ category: '' as PeriodCategory, start_date: new Date(), end_date: new Date() });
          fetchPeriods();
          return 'Periode berhasil diperbarui';
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

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Apakah Anda yakin ingin menghapus periode ini?');
    if (!confirm) return;

    setLoading(true);
    toast.promise(deletePeriod(id), {
      pending: 'Menghapus periode...',
      success: {
        render() {
          fetchPeriods();
          return 'Periode berhasil dihapus';
        },
      },
      error: {
        render({ data }) {
          return (data as { message: string }).message;
        },
      },
    });
  };

  const handleEditPress = (period: PeriodResponse) => {
    setSelectedPeriod(period);
    setUpdateFormData({
      category: period.category,
      start_date: new Date(period.start_date),
      end_date: new Date(period.end_date),
    });
    setIsEditModalOpen(true);
  };

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCreateFormData({
      ...createFormData,
      [name]: name === 'start_date' || name === 'end_date' ? new Date(value) : value,
    });
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  if (error) return <ErrorTemplate message={error} />;

  return (
    <>
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-dark">Manajemen Periode</h1>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryDark"
          >
            Tambah Periode
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-3 border-b w-12">No</th>
                <th className="text-left px-4 py-3 border-b">Kategori</th>
                <th className="text-left px-4 py-3 border-b">Tanggal Mulai</th>
                <th className="text-left px-4 py-3 border-b">Tanggal Berakhir</th>
                <th className="text-left px-4 py-3 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {periods.map((period, index) => (
                <tr key={period.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">{period.category}</td>
                  <td className="px-4 py-3 border-b">{formatDate(period.start_date)}</td>
                  <td className="px-4 py-3 border-b">{formatDate(period.end_date)}</td>
                  <td className="px-4 py-3 border-b">
                    <TableActions onEdit={() => handleEditPress(period)} onDelete={() => handleDelete(period.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Tambah Periode</h2>

            <form className="mt-4" onSubmit={handleAdd}>
              <div className="mb-4">
                <label className="block text-gray-600">Kategori</label>
                <select
                  name="category"
                  value={createFormData.category}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="LOW">LOW</option>
                  <option value="MID">MID</option>
                  <option value="HIGH">HIGH</option>
                  <option value="RAMADHAN">RAMADHAN</option>
                  <option value="ITIKAF">ITIKAF</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Tanggal Mulai</label>
                <input
                  type="date"
                  name="start_date"
                  value={createFormData.start_date.toISOString().split('T')[0]}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Tanggal Berakhir</label>
                <input
                  type="date"
                  name="end_date"
                  value={createFormData.end_date.toISOString().split('T')[0]}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primaryDark"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Tambah'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="mt-2 w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && selectedPeriod && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Periode</h2>

            <form className="mt-4" onSubmit={handleEdit}>
              <div className="mb-4">
                <label className="block text-gray-600">Kategori</label>
                <select
                  name="category"
                  value={updateFormData.category}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="LOW">LOW</option>
                  <option value="MID">MID</option>
                  <option value="HIGH">HIGH</option>
                  <option value="RAMADHAN">RAMADHAN</option>
                  <option value="ITIKAF">ITIKAF</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Tanggal Mulai</label>
                <input
                  type="date"
                  name="start_date"
                  value={updateFormData.start_date.toISOString().split('T')[0]}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Tanggal Berakhir</label>
                <input
                  type="date"
                  name="end_date"
                  value={updateFormData.end_date.toISOString().split('T')[0]}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primaryDark"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="mt-2 w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PeriodManagement;
