import { useContext, useState } from 'react';
import { Contextim } from './helper/Provider';
import { supabase } from './helper/supabase';
import { Link } from 'react-router-dom';

export default function FixProducts() {
  const { products, user, setProducts, filteredProducts } =
    useContext(Contextim);
  const [editing, setEditing] = useState(null);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('');

  function startEditing(product) {
    setEditing(product);
    setNewName(product.name);
    setNewPrice(product.price);
    setNewStock(product.stock);
  }

  const deleteProduct = async (productId) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);
    if (error) {
      console.error('Silme hatası:', error);
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };
  const updateProduct = async () => {
    if (!editing) return;

    const { error } = await supabase
      .from('products')
      .update({ name: newName, price: newPrice })
      .eq('id', editing.id);

    if (error) {
      console.error('Güncelleme hatası:', error);
    } else {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editing.id
            ? { ...p, name: newName, price: newPrice, stock: newStock }
            : p
        )
      );
      setEditing(null);
    }
  };

  return (
    <div>
      <div className='products'>
        {filteredProducts.map((product) => (
          <div key={product.id} className='card'>
            {user && (
              <div className='edit-side '>
                <span className='del' onClick={() => startEditing(product)}>
                  Düzenle
                </span>{' '}
                |
                <span className='del' onClick={() => deleteProduct(product.id)}>
                  Sil
                </span>
              </div>
            )}

            <div className='card-int'>
              <p className='card-int__title'>{product.name}</p>
              <p>{product.explanation}</p>
              <p className='excerpt'>{product.price}₺</p>
              <div className='card-buttons fixed-btns'>
                <Link to={`#`}>
                  <button className='btn'>Ürün Detayı</button>
                </Link>
                <button className='btn'>Sepete Ekle</button>
              </div>
            </div>
          </div>
        ))}
        {editing && (
          <div>
            <div className='fix-product'>
              <h2>Ürünü Düzenle</h2>
              <div className='input-group'>
                <span>İsim:</span>
                <input
                  type='text'
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder='Yeni isim'
                />
              </div>
              <div className='input-group'>
                <span>Fiyat:</span>
                <input
                  type='number'
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder='Yeni fiyat'
                />
              </div>
              <div className='input-group'>
                <span>Stok:</span>
                <input
                  type='number'
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  placeholder='Yeni Stok Değeri'
                />
              </div>

              <div className='buttons'>
                <button className='btn' onClick={updateProduct}>
                  Kaydet
                </button>
                <button className='btn' onClick={() => setEditing(null)}>
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
