import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Contextim } from './helper/Provider';
import { Link } from 'react-router-dom';

export default function ProductDetail() {
  const { products } = useContext(Contextim);
  const { id } = useParams();
  console.log(id);

  const newProduct = products.filter((product) => product.id == id);
  if (!newProduct) {
    return (
      <div>
        <h1>Böyle bir ürün yok</h1>
      </div>
    );
  }
  function formatPrice(value) {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  return (
    <div className='detail-card'>
      <div>
        <Link to='/' className='back-side'>
          <img src='/public/back-arrow-svgrepo-com.svg' alt='' />
          <span>Geri Dön</span>
        </Link>
        {newProduct.map((x) => (
          <div className='product-flex capitalize' key={x.id}>
            <div className='product-hero'>
              <div className='container'>
                <div className='product'>
                  <div className='main-product'>
                    <h3 className='detail-name'>{x.name}</h3>

                    <div className='product-price deneme'>
                      <span>Fiyat:</span> <span>: {formatPrice(x.price)}</span>
                    </div>
                    <div className='deneme'>
                      <span>Geliş Fiyatı</span>{' '}
                      <span>: {formatPrice(x.gelis_fiyati)}</span>
                    </div>
                    <div className='deneme'>
                      <span>Marka:</span> <span>: {x.brand}</span>
                    </div>
                    <div className='deneme'>
                      <span>Stok:</span> <span>: {x.stock}</span>
                    </div>

                    <div className='deneme'>
                      <span>Beden:</span> <span>: {x.size}</span>
                    </div>

                    <div className='deneme'>
                      <span>Cinsiyet:</span> <span>: {x.gender}</span>
                    </div>
                    <div className='deneme'>
                      <span>Kategori</span> <span>: {x.main_category}</span>
                    </div>
                    <div className='deneme'>
                      <span>Alt Kategori</span> <span>: {x.sub_category}</span>
                    </div>

                    <div className='deneme'>
                      <span>Açıklama</span> <span>: {x.explanation}</span>
                    </div>

                    {/* <div className='decrease-increase'>
                      <span className='decrease' onClick={decrease}>
                        -
                      </span>
                      <p>{count}</p>
                      <span className='increase' onClick={increase}>
                        +
                      </span>
                    </div> */}

                    <button className='btn'>Sepete Ekle</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
