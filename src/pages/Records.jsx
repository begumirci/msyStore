import { useContext, useEffect, useState } from 'react';

import { Contextim } from '../helper/Provider';
import { Link } from 'react-router-dom';

export default function Records() {
  const { dailySales, setDailySales, open, setOpen } = useContext(Contextim);

  useEffect(() => {
    const salesData = JSON.parse(localStorage.getItem('dailySales')) || {};
    setDailySales(salesData);
  }, []);

  function calculateDailyTotal(sales) {
    return sales.reduce(
      (total, sale) => total + sale.single_price * sale.quantity,
      0
    );
  }
  function calculateDailyNetProfit(sales) {
    return sales.reduce(
      (total, sale) =>
        total + sale.quantity * (sale.single_price - sale.gelis_fiyati),
      0
    );
  }
  function delEverything() {
    localStorage.removeItem('dailySales');
  }
  //   function handleClickPassword(e) {
  //     e.preventDefault();
  //     console.log(inputValue);
  //     if (inputValue == passwordControl) {
  //       setSuccesful(true);
  //     } else {
  //       alert('Şifre Yanlış');
  //       setSuccesful(false);
  //     }
  //   }
  return (
    <div>
      <div>
        {dailySales && (
          <div className='daily-sales'>
            {Object.entries(dailySales).map(([date, sales]) => (
              <div key={date} className='sales'>
                <h4>{date}</h4>
                <div className='record-tarafi-header'>
                  <p>Adet</p>
                  <p>İsim</p>
                  <p>Birim Fiyat</p>
                  <p>Fiyat</p>
                  <p>Marka</p>
                  <p>Cinsiyet</p>

                  <p>Geliş Fiyatı</p>
                  <p>Kar</p>
                </div>
                {sales.map((sale, index) => (
                  <div key={index} className='record-tarafi'>
                    <p>{sale.quantity}x</p>
                    <p>{sale.name}</p>
                    <p>
                      {new Intl.NumberFormat('tr-TR', {
                        style: 'currency',
                        currency: 'TRY',
                      }).format(sale.single_price)}
                    </p>
                    <p>
                      {new Intl.NumberFormat('tr-TR', {
                        style: 'currency',
                        currency: 'TRY',
                      }).format(sale.price)}
                    </p>
                    <p>{sale.brand}</p>
                    <p>{sale.gender}</p>
                    <p>
                      {' '}
                      {new Intl.NumberFormat('tr-TR', {
                        style: 'currency',
                        currency: 'TRY',
                      }).format(sale.gelis_fiyati)}
                    </p>
                    <p>
                      {new Intl.NumberFormat('tr-TR', {
                        style: 'currency',
                        currency: 'TRY',
                      }).format(
                        sale.quantity * (sale.single_price - sale.gelis_fiyati)
                      )}
                    </p>
                  </div>
                ))}
                <h5 className='total-win'>
                  Günlük Toplam:{' '}
                  {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  }).format(calculateDailyTotal(sales))}
                </h5>
                <h5 className='total-win'>
                  Günlük Kar:{' '}
                  {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  }).format(calculateDailyNetProfit(sales))}
                </h5>
              </div>
            ))}
          </div>
        )}

        <button onClick={delEverything} className='clear-sales '>
          Verileri Sil
        </button>
        <Link to='/'>
          <button className='clear-sales'>Geri Dön</button>
        </Link>
      </div>
    </div>
  );
}
