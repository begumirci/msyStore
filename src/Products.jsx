import { useContext, useState } from 'react';
import { Contextim } from './helper/Provider';
import { Link } from 'react-router-dom';

export default function Products() {
  const { products, filteredProducts, addBasket, setBasket } =
    useContext(Contextim);
  const [count, setCount] = useState(1);

  function formatPrice(value) {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  function addClick(product) {
    setBasket((prevBasket) => {
      const existingProduct = prevBasket.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevBasket.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + count,
                price: item.price,
              }
            : item
        );
      } else {
        return [...prevBasket, { ...product, quantity: count }];
      }
    });
  }

  return (
    <div>
      <div className='products'>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            // onClick={() => addBasket(product)}
            className='card'
          >
            <div className='card-int'>
              <p className='card-int__title'>{product.name}</p>
              <p>{product.explanation}</p>
              <p className='excerpt'>{formatPrice(product.price)}</p>
              <div className='card-buttons'>
                <Link to={`/${product.id}`}>
                  <button className='btn'>Ürün Detayı</button>
                </Link>
                <button className='btn' onClick={() => addClick(product)}>
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
