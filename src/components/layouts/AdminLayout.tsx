import AdminSidebar from '@/components/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-md p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
