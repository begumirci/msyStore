import React, { useContext, useState } from 'react';
import { Contextim } from '../helper/Provider';
import { supabase } from '../helper/supabase';

export default function AddBrand() {
  const [newBrand, setNewBrand] = useState('');
  const handleChange = (e) => {
    setNewBrand(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from('brands') // Tablonun adı
      .select('id')
      .eq('name', newBrand)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Hata:', error);
      return;
    }

    if (data) {
      alert('Bu marka zaten mevcut!');
      return;
    }

    // Marka yoksa ekleme işlemi yap
    const { data: insertData, error: insertError } = await supabase
      .from('brands')
      .insert([{ name: newBrand }]);

    if (insertError) {
      console.error('Ekleme hatası:', insertError);
    } else {
      alert('Marka başarıyla eklendi');
    }
  }

  return (
    <div className='add-card'>
      <h2>Marka</h2>
      <form action='' onSubmit={handleSubmit} className='add-form'>
        <input
          type='text'
          placeholder='Marka ismi girin'
          onChange={handleChange}
        />
        <button className='btn'>Ekle</button>
      </form>
    </div>
  );
}
