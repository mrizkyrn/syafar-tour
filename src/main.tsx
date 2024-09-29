import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AdminLayout from '@/components/layouts/AdminLayout';
import MainLayout from '@/components/layouts/MainLayout';
import ProtectedRoute from '@/components/layouts/ProtectedRoute';
import AuthProvider from '@/hook/AuthProvider';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import CreateProduct from '@/pages/admin/CreateProduct';
import ProductCategory from '@/pages/admin/ProductCategory';
import ProductList from '@/pages/admin/ProductLIst';
import ProductOrder from '@/pages/admin/ProductOrder';
import UpdateProduct from '@/pages/admin/UpdateProduct';
import UserPackageOption from '@/pages/admin/UserPackageOption';
import UserPackageOrder from '@/pages/admin/UserPackageOrder';
import UserList from '@/pages/admin/UserList';
import ChangePassword from '@/pages/user/ChangePassword';
import DetailProfile from '@/pages/user/DetailProfile';
import UserProfile from '@/pages/user/UserProfile';
import UserTransaction from '@/pages/user/UserTransaction';
import RegisterMitra from '@/pages/user/RegisterMitra';
import CalculationResult from '@/pages/public/CalculationResult';
import DetailProduct from '@/pages/public/DetailProduct';
import Faq from '@/pages/public/Faq';
import Home from '@/pages/public/Homepage';
import Login from '@/pages/public/Login';
import NotAuthorized from '@/pages/public/NotAuthorized';
import Product from '@/pages/public/Product';
import CustomPackage from '@/pages/public/CustomPackage';
import Register from '@/pages/public/Register';

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
          }
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
        path: '/admin/layanan-user/:type',
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
        path: '/admin/user',
        element: <UserList />,
      }
    ],
  },
  {
    path: '/not-authorized',
    element: <NotAuthorized />,
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer 
        hideProgressBar={true}
        autoClose={2000}
      />
    </AuthProvider>
  </StrictMode>
);
