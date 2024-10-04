import ErrorTemplate from '@/components/ErrorTemplate';
import TableActions from '@/components/TableActions';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createVendor, deleteVendor, getAllVendors, updateVendor } from '@/api/vendor-api';
import { VendorResponse, CreateVendorRequest, UpdateVendorRequest } from '@/types/VendorType';

const VendorManagement = () => {
  const [vendors, setVendors] = useState<VendorResponse[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<VendorResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createFormData, setCreateFormData] = useState<CreateVendorRequest>({
    name: '',
  });
  const [updateFormData, setUpdateFormData] = useState<UpdateVendorRequest>({
    name: '',
  });

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllVendors();
      setVendors(response.data);
    } catch (error: any) {
      console.error(error);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    toast.promise(createVendor(createFormData), {
      pending: 'Menambahkan vendor...',
      success: {
        render() {
          setLoading(false);
          setIsAddModalOpen(false);
          setCreateFormData({ name: '' });
          fetchVendors();
          return 'Vendor berhasil ditambahkan';
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
    if (!selectedVendor) return;

    setLoading(true);
    toast.promise(updateVendor(selectedVendor.id, updateFormData), {
      pending: 'Memperbarui vendor...',
      success: {
        render() {
          setLoading(false);
          setIsEditModalOpen(false);
          setUpdateFormData({ name: '' });
          fetchVendors();
          return 'Vendor berhasil diperbarui';
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
    const confirm = window.confirm('Apakah Anda yakin ingin menghapus vendor ini?');
    if (!confirm) return;

    setLoading(true);
    toast.promise(deleteVendor(id), {
      pending: 'Menghapus vendor...',
      success: {
        render() {
          fetchVendors();
          return 'Vendor berhasil dihapus';
        },
      },
      error: {
        render({ data }) {
          return (data as { message: string }).message;
        },
      },
    });
  };

  const handleEditPress = (vendor: VendorResponse) => {
    setSelectedVendor(vendor);
    setUpdateFormData({ name: vendor.name });
    setIsEditModalOpen(true);
  };

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateFormData({ ...createFormData, [name]: value });
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  if (error) return <ErrorTemplate message={error} />;

  return (
    <>
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-dark">Manajemen Vendor</h1>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryDark"
          >
            Tambah Vendor
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-3 border-b w-12">No</th>
                <th className="text-left px-4 py-3 border-b">Nama Vendor</th>
                <th className="text-left px-4 py-3 border-b">Tanggal Dibuat</th>
                <th className="text-left px-4 py-3 border-b">Terakhir Diubah</th>
                <th className="text-left px-4 py-3 border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border-b">{index + 1}</td>
                  <td className="px-4 py-3 border-b">{vendor.name}</td>
                  <td className="px-4 py-3 border-b">{new Date(vendor.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 border-b">{new Date(vendor.updated_at).toLocaleString()}</td>
                  <td className="px-4 py-3 border-b">
                    <TableActions onEdit={() => handleEditPress(vendor)} onDelete={() => handleDelete(vendor.id)} />
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
            <h2 className="text-xl font-semibold mb-4">Tambah Vendor</h2>

            <form className="mt-4" onSubmit={handleAdd}>
              <div className="mb-4">
                <label className="block text-gray-600">Nama Vendor</label>
                <input
                  type="text"
                  name="name"
                  value={createFormData.name}
                  onChange={handleCreateChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                  required
                  autoFocus
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

      {isEditModalOpen && selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Vendor</h2>

            <form className="mt-4" onSubmit={handleEdit}>
              <div className="mb-4">
                <label className="block text-gray-600">Nama Vendor</label>
                <input
                  type="text"
                  name="name"
                  value={updateFormData.name}
                  onChange={handleUpdateChange}
                  className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:border-blue-500"
                  required
                  autoFocus
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primaryDark"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Simpan'}
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

export default VendorManagement;
