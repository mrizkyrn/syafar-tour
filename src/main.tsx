import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Homepage';
import Paket from './pages/Paket';
import HitungPaket from './pages/HitungPaket';
import MainLayout from './components/layouts/MainLayout';
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
        path: '/paket',
        element: <Paket />,
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
