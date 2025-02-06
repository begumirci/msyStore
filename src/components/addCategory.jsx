import React from 'react';
import { useState } from 'react';
import { supabase } from '../helper/supabase';
export default function AddCategory() {
  const [newCategory, setNewCategory] = useState('');
  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from('categories') // Tablonun adı
      .select('id')
      .eq('name', newCategory)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Hata:', error);
      return;
    }

    if (data) {
      alert('Bu kategori zaten mevcut!');
      return;
    }
    const { data: insertData, error: insertError } = await supabase
      .from('categories')
      .insert([{ name: newCategory }]);

    if (insertError) {
      console.error('Ekleme hatası:', insertError);
    } else {
      alert('Kategori başarıyla eklendi');
    }
  }
  return (
    <div className='add-card'>
      <h2>Kategori</h2>
      <form action='' onSubmit={handleSubmit} className='add-form'>
        <input
          type='text'
          placeholder='Kategori ismi girin'
          onChange={handleChange}
        />
        <button className='btn'>Ekle</button>
      </form>
    </div>
  );
}
