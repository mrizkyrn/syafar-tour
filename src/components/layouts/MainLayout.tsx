import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MainLayout: React.FC = () => {
  return (
    <div className="font-poppins">
      <Navbar />
      <Outlet />
      <Footer />

      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
