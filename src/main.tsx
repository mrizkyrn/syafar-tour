import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Homepage';
import Produk from '@/pages/Produk';
import HitungPaket from '@/pages/HitungPaket';
import MainLayout from '@/components/layouts/MainLayout';
import ProdukPaket from '@/pages/ProdukPaket';
import ProdukVisa from '@/pages/ProdukVisa';
import ProdukLA from '@/pages/ProdukLA';

import './index.css';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/produk',
        element: <Produk />,
        children: [
          {
            index: true,
            element: <ProdukPaket />,
          },
          {
            path: 'visa',
            element: <ProdukVisa />,
          },
          {
            path: 'la',
            element: <ProdukLA />,
          },
        ],
      },
      {
        path: '/hitung-paket',
        element: <HitungPaket />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
