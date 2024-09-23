import AdminSidebar from '@/components/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
      <div className="relative container mx-auto max-w-7xl flex justify-center min-h-screen">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main content area */}
        <div className="flex-1 px-6 py-10">
            <Outlet />
        </div>
      </div>
  );
};

export default AdminLayout;
