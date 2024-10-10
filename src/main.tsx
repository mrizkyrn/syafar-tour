import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AdminLayout from '@/components/layouts/AdminLayout';
import MainLayout from '@/components/layouts/MainLayout';
import ProtectedRoute from '@/components/layouts/ProtectedRoute';
import NotFound from '@/components/NotFound';
import AuthProvider from '@/hook/AuthProvider';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import CreateProduct from '@/pages/admin/CreateProduct';
import HotelManagement from '@/pages/admin/HotelManagement';
import MitraPackageManagement from '@/pages/admin/MitraPackageManagement';
import MitraPackageOrder from '@/pages/admin/MitraPackageOrder';
import OtherManagement from '@/pages/admin/OtherManagement';
import PeriodManagement from '@/pages/admin/PeriodManagement';
import ProductCategory from '@/pages/admin/ProductCategory';
import ProductList from '@/pages/admin/ProductLIst';
import ProductOrder from '@/pages/admin/ProductOrder';
import UpdateProduct from '@/pages/admin/UpdateProduct';
import UserList from '@/pages/admin/UserList';
import UserPackageOption from '@/pages/admin/UserPackageOption';
import UserPackageOrder from '@/pages/admin/UserPackageOrder';
import VendorManagement from '@/pages/admin/VendorManagement';
import CalculationResult from '@/pages/public/CalculationResult';
import DetailProduct from '@/pages/public/DetailProduct';
import Faq from '@/pages/public/Faq';
import Home from '@/pages/public/Homepage';
import Login from '@/pages/public/Login';
import NotAuthorized from '@/pages/public/NotAuthorized';
import Product from '@/pages/public/Product';
import CustomPackage from '@/pages/public/CustomPackage';
import Register from '@/pages/public/Register';
import ChangePassword from '@/pages/user/ChangePassword';
import CustomPackageMitra from '@/pages/user/CustomPackageMitra';
import DetailProfile from '@/pages/user/DetailProfile';
import UserProfile from '@/pages/user/UserProfile';
import UserTransaction from '@/pages/user/UserTransaction';
import RegisterMitra from '@/pages/user/RegisterMitra';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/produk',
        element: <Product />,
      },
      {
        path: '/paket',
        element: <CustomPackage />,
      },
      {
        path: '/faq',
        element: <Faq />,
      },
      {
        path: '/produk/:id',
        element: <DetailProduct />,
      },
      {
        path: 'kalkulasi/:id',
        element: <CalculationResult />,
      },
      {
        path: '/user/profile',
        element: (
          <ProtectedRoute requiredRoles={['ADMIN', 'MITRA', 'USER']}>
            <UserProfile />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <DetailProfile />,
          },
          {
            path: 'change-password',
            element: <ChangePassword />,
          },
          {
            path: 'daftar-mitra',
            element: <RegisterMitra />,
          },
        ],
      },
      {
        path: '/user/transaksi',
        element: (
          <ProtectedRoute requiredRoles={['ADMIN', 'MITRA', 'USER']}>
            <UserTransaction />
          </ProtectedRoute>
        ),
      },
      {
        path: '/paket/custom-mitra/:id',
        element: (
          <ProtectedRoute requiredRoles={['ADMIN', 'MITRA']}>
            <CustomPackageMitra />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Admin route
  {
    element: (
      <ProtectedRoute requiredRoles={['ADMIN']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/admin/dashboard',
        element: <AdminDashboard />,
      },
      {
        path: '/admin/paket-jamaah/:type',
        element: <UserPackageOption />,
      },
      {
        path: '/admin/produk/list',
        element: <ProductList />,
      },
      {
        path: '/admin/produk/tambah',
        element: <CreateProduct />,
      },
      {
        path: '/admin/produk/kategori',
        element: <ProductCategory />,
      },
      {
        path: '/admin/produk/:id',
        element: <UpdateProduct />,
      },
      {
        path: '/admin/order/produk',
        element: <ProductOrder />,
      },
      {
        path: '/admin/order/paket-jamaah',
        element: <UserPackageOrder />,
      },
      {
        path: '/admin/order/paket-mitra',
        element: <MitraPackageOrder />,
      },
      {
        path: '/admin/user',
        element: <UserList />,
      },
      {
        path: '/admin/paket-mitra/periode',
        element: <PeriodManagement />,
      },
      {
        path: '/admin/paket-mitra/vendor',
        element: <VendorManagement />,
      },
      {
        path: '/admin/paket-mitra/hotel/:city',
        element: <HotelManagement />,
      },
      {
        path: '/admin/paket-mitra/:type',
        element: <MitraPackageManagement />,
      },
      {
        path: '/admin/lainnya',
        element: <OtherManagement />,
      },
    ],
  },
  {
    path: '/not-authorized',
    element: <NotAuthorized />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer hideProgressBar={true} autoClose={2000} />
    </AuthProvider>
  </StrictMode>
);
