import { NavLink, Outlet } from 'react-router-dom';
import Container from '@/components/Container';

const Product: React.FC = () => {
  return (
    <div className="py-10">
      <Container>
        <div className="flex items-center justify-start mb-8 gap-6">
          <div className="w-2 h-8 bg-primary" />
          <h2 className="text-xl md:text-2xl font-bold">Pilihan Terbaik</h2>
        </div>

        <div className="flex items-center mb-8 gap-10">
          <NavLink
            to="."
            end
            className={({ isActive }) =>
              `text-sm hover:text-slate-800 ${isActive ? 'text-slate-700 font-bold' : 'text-slate-500 font-medium'}`
            }
          >
            Paket
          </NavLink>
          <NavLink
            to="visa"
            className={({ isActive }) =>
              `text-sm hover:text-slate-800 ${isActive ? 'text-slate-700 font-bold' : 'text-slate-500 font-medium'}`
            }
          >
            Visa
          </NavLink>
          <NavLink
            to="la"
            className={({ isActive }) =>
              `text-sm hover:text-slate-800 ${isActive ? 'text-slate-700 font-bold' : 'text-slate-500 font-medium'}`
            }
          >
            LA
          </NavLink>
        </div>

        <Outlet />
      </Container>
    </div>
  );
};

export default Product;
