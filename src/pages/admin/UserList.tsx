import Pagination from '@/components/Pagination';
import SortableHeader from '@/components/SortableHeader';
import TableActions from '@/components/TableActions';
import EditUserModal from '@/pages/admin/EditUserModal';
import AddUserModal from '@/pages/admin/AddUserModal';

import { useEffect, useMemo, useState } from 'react';
import { deleteUser, getAllUsers } from '@/api/user-api';
import { PaginationResponse } from '@/types/PaginationType';
import { UserQueryParams, UserResponse, UserRoles } from '@/types/UserType';
import ErrorTemplate from '@/components/ErrorTemplate';

const columns = [
  { label: 'Nama Lengkap', key: 'full_name' },
  { label: 'Email', key: 'email' },
  { label: 'Whatsapp', key: 'whatsapp_number' },
  { label: 'Role', key: 'role' },
  { label: 'Created At', key: 'created_at' },
];

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<UserQueryParams>({
    full_name: '',
    role: '' as UserRoles,
    sort: 'created_at',
    order: 'desc' as 'asc' | 'desc',
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState<PaginationResponse>({
    total: 0,
    current_page: 1,
    total_pages: 1,
    limit: 10,
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers(searchParams);
      setUsers(response.data.data);
      setPagination(response.data.pagination);
      setSearchParams((prev) => ({ ...prev }));
    } catch (error: any) {
      console.error(error);
      setError("Terjadi kesalahan saat mengambil data user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchParams.limit,
    searchParams.page,
    searchParams.full_name,
    searchParams.sort,
    searchParams.order,
    searchParams.role,
  ]);

  const handleDelete = async (userId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    await deleteUser(userId);
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEdit = (user: UserResponse) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const addUserToList = (newUser: UserResponse) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

  const handleSort = (column: string) => {
    setSearchParams((prev) => ({
      ...prev,
      sort: column,
      order: prev.sort === column ? (prev.order === 'asc' ? 'desc' : 'asc') : 'asc',
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, full_name: e.target.value, page: 1 });
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, limit: parseInt(e.target.value), page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleRoleFilter = (role: UserRoles) => {
    setSearchParams({ ...searchParams, role, page: 1 });
  };

  const updateUsers = (updatedUser: UserResponse) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const filteredUsers = useMemo(() => {
    return users.map((user, idx) => ({
      ...user,
      index: idx + 1 + (searchParams.page - 1) * searchParams.limit,
    }));
  }, [users, searchParams.page, searchParams.limit]);

  if (error) return <ErrorTemplate message={error} />;

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-dark">Manajemen User</h1>

        <button onClick={handleAdd} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryDark">
          Tambah User
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchParams.full_name}
            onChange={handleSearch}
            placeholder="Cari berdasarkan nama"
            className="border px-4 py-1 rounded-md border-gray-400"
          />

          <div>
            <label className="text-gray-600 ml-5" htmlFor="role">
              Filter
            </label>
            <select
              name="role"
              value={searchParams.role || ''}
              onChange={(e) => handleRoleFilter(e.target.value as UserRoles)}
              className="border px-4 py-1 rounded-md ml-5 border-gray-400"
            >
              <option value="">Semua Role</option>
              <option value="ADMIN">Admin</option>
              <option value="MITRA">Mitra</option>
              <option value="USER">User</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-gray-600" htmlFor="limit">
            Show
          </label>
          <select
            name="limit"
            value={searchParams.limit}
            onChange={handleLimitChange}
            className="border px-4 py-1 rounded-md border-gray-400"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-full">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-3 border-b">No</th>
              {columns.map((col) => (
                <SortableHeader
                  key={col.key}
                  label={col.label}
                  sortKey={col.key}
                  currentSort={searchParams.sort || ''}
                  currentOrder={searchParams.order || ''}
                  onSort={handleSort}
                />
              ))}
              <th className="text-left px-4 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b">{user.index}</td>
                <td className="px-4 py-3 border-b">{user.full_name}</td>
                <td className="px-4 py-3 border-b">{user.email}</td>
                <td className="px-4 py-3 border-b">{user.whatsapp_number}</td>
                <td className="px-4 py-3 border-b">{user.role}</td>
                <td className="px-4 py-3 border-b">{new Date(user.created_at).toLocaleString()}</td>
                <td className="px-4 py-3 border-b">
                  <TableActions onEdit={() => handleEdit(user)} onDelete={() => handleDelete(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Error and Loading */}
      {loading && <p>Loading...</p>}

      {/* Pagination */}
      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={handlePageChange}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isModalOpen={isEditModalOpen}
        selectedUser={selectedUser}
        updateUsers={updateUsers}
        closeModal={closeEditModal}
      />

      {/* Add User Modal */}
      <AddUserModal isModalOpen={isAddModalOpen} addUserToList={addUserToList} closeModal={closeAddModal} />
    </div>
  );
};

export default UserList;
