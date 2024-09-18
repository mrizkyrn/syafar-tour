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
import ProductPaket from '@/pages/ProductPacket';
import ProductVisa from '@/pages/ProductVisa';
import ProductLA from '@/pages/ProductLA';
import Packet from '@/pages/Packet';
import Register from '@/pages/Register';
import UserProfile from '@/pages/UserProfile';
import UserTransaction from '@/pages/UserTransaction';

import './index.css';
import AdminLayout from './components/layouts/AdminLayout';
import Price from './pages/admin/Price';
import CalculationResult from './pages/CalculationResult';

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
        children: [
          {
            index: true,
            element: <ProductPaket />,
          },
          {
            path: 'visa',
            element: <ProductVisa />,
          },
          {
            path: 'hotel',
            element: <ProductLA />,
          },
        ],
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
      // Admin route
    ],
  },
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
        path: '/admin/:type',
        element: <Price />,
      },
    ],
  },
  {
    path: '/not-authorized',
    element: <NotAuthorized />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
