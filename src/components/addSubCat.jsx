import React, { useContext } from 'react';
import { useState } from 'react';
import { Contextim } from '../helper/Provider';
import { supabase } from '../helper/supabase';
export default function AddSubCategory() {
  const [newSubCategory, setNewSubCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const { categories } = useContext(Contextim);

  const handleChange = (e) => {
    setNewSubCategory(e.target.value);
  };

  function handleChangeCategory(e) {
    setCategoryId(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from('subCategories') // Tablonun adı
      .select('id')
      .eq('name', newSubCategory)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Hata:', error);
      return;
    }

    if (data) {
      alert('Bu alt kategori zaten mevcut!');
      return;
    }
    const { data: insertData, error: insertError } = await supabase
      .from('subCategories')
      .insert([{ name: newSubCategory, main_category: categoryId }]);

    if (insertError) {
      console.error('Ekleme hatası:', insertError);
    } else {
      alert('Alt kategori başarıyla eklendi');
    }
  }
  return (
    <div className='add-card'>
      <h2>Alt Kategori</h2>
      <form action='' onSubmit={handleSubmit} className='add-form'>
        <select name='category' required onChange={handleChangeCategory}>
          <option value='' required>
            Kategori
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type='text'
          placeholder='Alt kategori ismi girin'
          onChange={handleChange}
        />
        <button className='btn'>Ekle</button>
      </form>
    </div>
  );
}
