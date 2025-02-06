import React from 'react';
import { useState } from 'react';
import { supabase } from '../helper/supabase';
export default function AddSize() {
  const [newSize, setNewSize] = useState('');
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
    }
  }
  return (
    <div className='add-card'>
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
  );
}
