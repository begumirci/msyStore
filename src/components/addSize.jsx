import React, { useContext } from 'react';
import { useState } from 'react';
import { supabase } from '../helper/supabase';
import { Contextim } from '../helper/Provider';
export default function AddSize() {
  const [newSize, setNewSize] = useState('');
  const { sizes, setSizes } = useContext(Contextim);
  const handleChange = (e) => {
    setNewSize(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from('sizes') // Tablonun adı
      .select('id')
      .eq('name', newSize)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Hata:', error);
      return;
    }

    if (data) {
      alert('Bu beden zaten mevcut!');
      return;
    }
    const { data: insertData, error: insertError } = await supabase
      .from('sizes')
      .insert([{ name: newSize }]);

    if (insertError) {
      console.error('Ekleme hatası:', insertError);
    } else {
      alert('Yeni beden başarıyla eklendi');
      setSizes([...sizes, insertData[0]]);
    }
  }
  async function delItem(categoryId) {
    const { error } = await supabase
      .from('sizes')
      .delete()
      .eq('id', categoryId);

    if (!error) {
      setSizes(sizes.filter((x) => x.id !== categoryId)); // Silinen kategoriyi state'ten çıkar
    }
  }

  return (
    <div className='all-add-side capitalize'>
      <div className='add-card '>
        <h2>Beden</h2>
        <form action='' onSubmit={handleSubmit} className='add-form'>
          <input
            type='text'
            placeholder='Beden ismi girin'
            onChange={handleChange}
          />
          <button className='btn'>Ekle</button>
        </form>
      </div>
      <div className='urun-list'>
        {sizes.map((x) => (
          <div key={x.id} className='urun-list-item'>
            <h3>{x.name}</h3>
            <h3 className='delete-btn' onClick={() => delItem(x.id)}>
              x
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
