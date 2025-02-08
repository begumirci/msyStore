import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../helper/supabase';
import { Contextim } from '../helper/Provider';

export default function AddSubCategory() {
  const [newSubCategory, setNewSubCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const { categories, subCategories, setSubCategories } = useContext(Contextim);

  useEffect(() => {
    // Sayfa açıldığında alt kategorileri çek
    async function fetchSubCategories() {
      const { data, error } = await supabase.from('subCategories').select('*');
      if (!error) {
        setSubCategories(data);
      }
    }
    fetchSubCategories();
  }, []);

  const handleChange = (e) => {
    setNewSubCategory(e.target.value);
  };

  function handleChangeCategory(e) {
    setCategoryId(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from('subCategories')
      .select('id')
      .eq('name', newSubCategory)
      .eq('main_category', categoryId)
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
      .insert([{ name: newSubCategory, main_category: categoryId }])
      .select();

    if (insertError) {
      console.error('Ekleme hatası:', insertError);
    } else {
      alert('Alt kategori başarıyla eklendi');
      setNewSubCategory('');
      setSubCategories([...subCategories, insertData[0]]); // Yeni eklenen alt kategoriyi ekrana yansıt
    }
  }

  async function delItem(subCategoryId) {
    const { error } = await supabase
      .from('subCategories')
      .delete()
      .eq('id', subCategoryId);

    if (!error) {
      setSubCategories(subCategories.filter((x) => x.id !== subCategoryId)); // Silinen alt kategoriyi listeden kaldır
    }
  }

  return (
    <div className='all-add-side capitalize'>
      <div className='add-card '>
        <h2>Alt Kategori</h2>
        <form onSubmit={handleSubmit} className='add-form'>
          <select name='category' required onChange={handleChangeCategory}>
            <option value=''>Kategori Seç</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type='text'
            placeholder='Alt kategori ismi girin'
            value={newSubCategory}
            onChange={handleChange}
          />
          <button className='btn'>Ekle</button>
        </form>
      </div>
      <div className='urun-list'>
        {categoryId &&
          subCategories
            .filter((x) => x.main_category == categoryId) // Seçilen kategoriye göre filtrele
            .map((x) => (
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
