import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './products.css';
import './basket.css';
import App from './App.jsx';
import Provider from './helper/Provider.jsx';
import { RouterProvider } from 'react-router-dom';
import { routes } from './helper/routes.jsx';

createRoot(document.getElementById('root')).render(
  <Provider>
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
  </Provider>
);
