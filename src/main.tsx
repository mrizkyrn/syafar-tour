import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import Home from '@/pages/Homepage';
import About from '@/pages/About';
import Product from '@/pages/Product';
import ProductPaket from '@/pages/ProductPacket';
import ProductVisa from '@/pages/ProductVisa';
import ProductLA from '@/pages/ProductLA';
import Packet from '@/pages/Packet';
import Faq from '@/pages/Faq';

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
            path: 'la',
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
      }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
