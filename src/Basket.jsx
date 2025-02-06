import { useContext, useState } from 'react';
import { Contextim } from './helper/Provider';
import React from 'react';

export default function Basket() {
  const [NotOrderOkey, setNotOrderOkey] = useState(false);

  const {
    basket,
    setOpenDelBasket,
    setDelBasket,
    setBasket,
    user,
    OrderOkey,
    setOrderOkey,
    saveOrderToLocalStorage,
  } = useContext(Contextim);

  function formatPrice(value) {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  const totalPrice = basket.reduce((total, item) => {
    return total + item.price * item.quantity; // Fiyat * Miktar
  }, 0);

  function addClickBasket(product) {
    setBasket((prevBasket) => {
      const existingProduct = prevBasket.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevBasket.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                price: item.price,
              }
            : item
        );
      }
    });
  }

  function removeClickBasket(product) {
    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.map((item) =>
        item.id === product.id && item.quantity > 0
          ? {
              ...item,
              quantity: item.quantity - 1,
              price: item.price,
            }
          : item
      );

      // Sepetten quantity'si sıfır olan ürünü çıkar
      const filteredBasket = updatedBasket.filter((item) => item.quantity > 0);

      return filteredBasket;
    });
  }

  function delBasketItem(delBasket) {
    const newBasketItems = basket.filter((x) => x.id !== delBasket.id);
    setBasket(newBasketItems);
  }

  return (
    <div className='container'>
      {basket.length > 0 && (
        <div className='basket-side'>
          <div className='basket-main'>
            <div className='basket-ayar-main '>
              <div className='basket-header-main'>
                <p>İsim</p>
                <p>Beden</p>
                <p>Cinsiyet</p>
                <p>Marka</p>
                <p>Miktar</p>
                <p>Ücret</p>
                <p></p>
              </div>
              <div className='baskets-main'>
                {basket.map((bask) => (
                  <div className='basket-main-items' key={bask.id}>
                    <p className='name'>{bask.name}</p>
                    <p>{bask.size}</p>
                    <p>{bask.gender}</p>
                    <p>{bask.brand}</p>

                    <p>
                      <span
                        className='eksi'
                        onClick={() => removeClickBasket(bask)}
                      >
                        -
                      </span>
                      {bask.quantity}

                      <span
                        className='arti'
                        onClick={() => addClickBasket(bask)}
                      >
                        +
                      </span>
                    </p>
                    <p>{formatPrice(bask.price * bask.quantity)}</p>
                    <p className='del' onClick={() => delBasketItem(bask)}>
                      X
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='total-price'>
            Toplam Fiyat: {formatPrice(totalPrice)}
          </div>

          <button className='btn' onClick={saveOrderToLocalStorage}>
            Sipariş Oluştur
          </button>
        </div>
      )}

      {basket.length == 0 && <div className='warm'>Sepetinizde Ürün Yok.</div>}
    </div>
  );
}
