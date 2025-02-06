import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Contextim } from './helper/Provider';

export default function Headers() {
  const { basket, user } = useContext(Contextim);
  const totalItems = basket.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className='header'>
      <div className='logo'>
        {/* <Link to='/'>
          <img src='vista.jpg' alt='hahha' />
        </Link> */}

        <Link to='/'>
          <h1>MSY STORE</h1>
        </Link>
      </div>
      {user && (
        <div className='add-side'>
          <Link to='/kategoriekle'>Kategori Ekle</Link>
          <Link to='/altkategoriekle'>Alt Kategori Ekle</Link>
          <Link to='/markaekle'>Marka Ekle</Link>
          <Link to='/bedenekle'>Beden Ekle</Link>
        </div>
      )}

      <div className='links'>
        <div className='basket-img'>
          <Link to={basket.length > 0 ? '/basket' : '#'}>
            <img src='/basket-shopping-alt-svgrepo-com.svg' alt='' />
            {totalItems > 0 && <span className='counter'>{totalItems}</span>}
          </Link>
        </div>
        <Link to='/records' className='go-record'>
          Günlük Satışları Gör
        </Link>
        {user && (
          <>
            <Link to='urunekle'>Ürün Ekle</Link>
            <Link to='urunduzenle'>Ürün Düzenle</Link>
          </>
        )}
        {!user && <Link to='/auth'>Giriş Yap</Link>}

        {/* <a
          href='/custom'
          target='_blank'
          rel='noopener noreferrer'
          className='go-record'
        >
          Müşteri Tarafı
        </a> */}
      </div>
    </div>
  );
}
