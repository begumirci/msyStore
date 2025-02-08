import React, { useContext, useState } from 'react';
import { supabase } from './helper/supabase';
import { Contextim } from './helper/Provider';

export default function Admin() {
  const { categories, sizes, brands, subCategories } = useContext(Contextim);
  const [categoryId, setCategoryId] = useState('');

  const genders = [
    { id: 1, name: 'Kadın' },
    { id: 2, name: 'Erkek' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    size: '',
    stock: '',
    subCategory: '',
    gelis_fiyati: '',
    explanation: '',
    gender: '',
    brand: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Eğer kategori değişirse alt kategoriyi sıfırla
    if (name === 'category') {
      setCategoryId(value);
      setFormData((prev) => ({ ...prev, subCategory: '' }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Form Verileri:', formData);

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name: formData.name,
          price: formData.price,
          main_category: formData.category,
          size: formData.size,
          sub_category: formData.subCategory,
          gelis_fiyati: formData.gelis_fiyati,
          stock: formData.stock,
          gender: formData.gender,
          explanation: formData.explanation,
          brand: formData.brand,
        },
      ])
      .select();

    if (error) {
      alert('Ürün Yüklenirken Hata Oluştu');
    } else {
      alert('Ürün Başarıyla Oluştu', data);
      setFormData({
        name: '',
        price: '',
        category: '',
        size: '',
        stock: '',
        subCategory: '',
        gelis_fiyati: '',
        explanation: '',
        gender: '',
        brand: '',
      });
    }
  }

  // Seçilen kategoriye göre alt kategorileri filtrele
  const filteredSubCategories = subCategories.filter(
    (sub) => sub.main_category == categoryId
  );

  return (
    <div>
      <h1 className='addFormHeader'>Ürün Ekle</h1>
      <form action='' className='addForm' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Ürün İsmi'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type='text'
          name='explanation'
          value={formData.explanation}
          placeholder='Ürün Açıklaması'
          onChange={handleChange}
        />
        <input
          type='number'
          placeholder='Ürün Fiyatı'
          name='price'
          value={formData.price}
          onChange={handleChange}
        />
        <select
          name='gender'
          onChange={handleChange}
          required
          value={formData.gender}
        >
          <option value=''>Cinsiyet Seçin</option>
          {genders.map((gender) => (
            <option key={gender.id} value={gender.name}>
              {gender.name}
            </option>
          ))}
        </select>
        <input
          type='text'
          placeholder='Ürün Stok'
          name='stock'
          value={formData.stock}
          onChange={handleChange}
        />
        <select
          name='size'
          required
          onChange={handleChange}
          value={formData.size}
        >
          <option value='' required>
            Size
          </option>
          {sizes.map((size) => (
            <option key={size.id} value={size.name}>
              {size.name}
            </option>
          ))}
        </select>
        <select name='category' required onChange={handleChange}>
          <option value=''>Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          name='brand'
          required
          onChange={handleChange}
          value={formData.brand}
        >
          <option value=''>Marka</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
        <select
          name='subCategory'
          required
          value={formData.subCategory}
          onChange={handleChange}
          disabled={!categoryId} // Eğer kategori seçilmemişse alt kategori seçilemez
        >
          <option value=''>Alt Kategori</option>
          {filteredSubCategories.map((sub) => (
            <option key={sub.id} value={sub.name}>
              {sub.name}
            </option>
          ))}
        </select>
        <input
          type='text'
          name='gelis_fiyati'
          value={formData.gelis_fiyati}
          placeholder='Geliş Fiyatı'
          onChange={handleChange}
        />

        <button className='btn'>Gönder</button>
      </form>
    </div>
  );
}
