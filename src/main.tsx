import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import MainLayout from '@/components/layouts/MainLayout';
import ProtectedRoute from '@/components/layouts/ProtectedRoute';
import AuthProvider from '@/hook/AuthProvider';
import About from '@/pages/About';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import Faq from '@/pages/Faq';
import Home from '@/pages/Homepage';
import Login from '@/pages/Login';
import NotAuthorized from '@/pages/NotAuthorized';
import Product from '@/pages/Product';
import Packet from '@/pages/Packet';
import Register from '@/pages/Register';
import UserProfile from '@/pages/UserProfile';
import UserTransaction from '@/pages/UserTransaction';

import './index.css';
import AdminLayout from '@/components/layouts/AdminLayout';
import UserService from '@/pages/admin/UserService';
import CalculationResult from '@/pages/CalculationResult';
import DetailProduct from '@/pages/DetailProduct';
import ProductList from '@/pages/admin/ProductLIst';
import CreateProduct from '@/pages/admin/CreateProduct';
import ProductCategory from './pages/admin/ProductCategory';
import ProductOrder from './pages/admin/ProductOrder';
// import UpdateProduct from './pages/admin/UpdateProduct';

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
        path: '/tentang',
        element: <About />,
      },
      {
        path: '/produk',
        element: <Product />,
      },
      {
        path: '/paket',
        element: <Packet />,
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
        element: <UserService />,
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
      // {
      //   path: '/admin/produk/:id',
      //   element: <UpdateProduct />,
      // },
      {
        path: '/admin/order',
        element: <ProductOrder />,
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
    </AuthProvider>
  </StrictMode>
);
