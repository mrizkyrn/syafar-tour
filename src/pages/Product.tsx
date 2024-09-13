import { NavLink, Outlet } from 'react-router-dom';
import Container from '@/components/Container';

const Product: React.FC = () => {
  return (
    <div className="py-7 md:py-10">
      <Container>
        <div className="flex items-center justify-start mb-8 gap-5">
          <div className="w-1 sm:w-2 h-8 bg-primary rounded-full" />
          <h2 className="text-xl md:text-2xl font-semibold">Pilihan Terbaik</h2>
        </div>

        <div className="flex items-center mb-8 md:mb-12 w-full bg-[#F3F3F3]">
          <NavLink
            to="."
            end
            preventScrollReset
            className={({ isActive }) =>
              `text-xs md:text-lg hover:bg-primary hover:text-white text-center py-2 px-2 md:px-5 w-40 ${
                isActive ? 'text-white bg-primary' : 'text-slate-500'
              }`
            }
          >
            Paket Umroh
          </NavLink>
          <NavLink
            to="visa"
            preventScrollReset
            className={({ isActive }) =>
              `text-xs md:text-lg hover:bg-primary hover:text-white text-center py-2 px-2 md:px-5 w-40 ${
                isActive ? 'text-white bg-primary' : 'text-slate-500'
              }`
            }
          >
            Visa Umroh
          </NavLink>
          <NavLink
            to="hotel"
            preventScrollReset
            className={({ isActive }) =>
              `text-xs md:text-lg hover:bg-primary hover:text-white text-center py-2 px-2 md:px-5 w-40 ${
                isActive ? 'text-white bg-primary' : 'text-slate-500'
              }`
            }
          >
            Paket Hotel
          </NavLink>
        </div>

        <Outlet />
      </Container>
    </div>
  );
};

export default Product;
