import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import App from '../App';
import ProductDetail from '../ProductDetail';
import Basket from '../Basket';
import Records from '../pages/Records';
import Auth from '../Auth';
import FixProducts from '../FixProducts';
import FixedPage from '../pages/FixedPage';
import AddProductPage from '../pages/AddProductPage';
import AddBrand from '../components/addBrand';
import AddSize from '../components/addSize';
import AddCategory from '../components/addCategory';
import AddSubCategory from '../components/addSubCat';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/:id',
        element: <ProductDetail />,
      },
      {
        path: '/basket',
        element: <Basket />,
      },
      {
        path: '/records',
        element: <Records />,
      },
      {
        path: '/auth',
        element: <Auth />,
      },
      {
        path: '/urunduzenle',
        element: <FixedPage />,
      },
      {
        path: 'urunekle',
        element: <AddProductPage />,
      },
      {
        path: '/markaekle',
        element: <AddBrand />,
      },
      {
        path: '/bedenekle',
        element: <AddSize />,
      },
      {
        path: '/kategoriekle',
        element: <AddCategory />,
      },
      {
        path: '/altkategoriekle',
        element: <AddSubCategory />,
      },
    ],
  },
]);
