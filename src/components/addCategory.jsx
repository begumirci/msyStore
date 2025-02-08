import React, { useContext, useState } from 'react';
import { supabase } from '../helper/supabase';
import { Contextim } from '../helper/Provider';

export default function AddCategory() {
  const [newCategory, setNewCategory] = useState('');
  const { categories, setCategories } = useContext(Contextim); // Context'ten setCategories'i al

  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from('categories')
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
      .insert([{ name: newCategory }])
      .select();

    if (insertError) {
      console.error('Ekleme hatası:', insertError);
    } else {
      alert('Kategori başarıyla eklendi');
      setNewCategory('');
      setCategories([...categories, insertData[0]]); // Yeni kategoriyi ekle
    }
  }

  async function delItem(categoryId) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);

    if (!error) {
      setCategories(categories.filter((x) => x.id !== categoryId)); // Silinen kategoriyi state'ten çıkar
    }
  }

  return (
    <div className='all-add-side capitalize'>
      <div className='add-card'>
        <h2>Kategori</h2>
        <form action='' onSubmit={handleSubmit} className='add-form'>
          <input
            type='text'
            placeholder='Kategori ismi girin'
            value={newCategory}
            onChange={handleChange}
          />
          <button className='btn'>Ekle</button>
        </form>
      </div>
      <div className='urun-list'>
        {categories.map((x) => (
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
