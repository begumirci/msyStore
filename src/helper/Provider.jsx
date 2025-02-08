import { createContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
export const Contextim = createContext();

export default function Provider({ children }) {
  const [isOkey, setIsOkey] = useState(false);
  const [basket, setBasket] = useState(() => {
    const savedBasket = localStorage.getItem('basket');
    return savedBasket ? JSON.parse(savedBasket) : [];
  });
  const [user, setUser] = useState();
  const [isAddBasket, setIsAddBasket] = useState(false);
  const [dailySales, setDailySales] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [genderChose, setGenderChose] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    subCategories: [],
    sizes: [],
    genders: [],
  });
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  async function saveOrderToLocalStorage() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD formatında tarih
    const existingData = JSON.parse(localStorage.getItem('dailySales')) || {};

    // O günün mevcut verilerini alıyoruz, yoksa boş bir dizi olarak başlatıyoruz
    const dailyData = existingData[today] || [];

    // Sepet ürünlerini güncelleyerek veya ekleyerek yeni günlük veriyi oluştur
    const updatedData = [...dailyData];

    for (const newItem of basket) {
      const existingItemIndex = updatedData.findIndex(
        (item) => item.name === newItem.name
      );

      if (existingItemIndex !== -1) {
        // Aynı isimde bir ürün bulunduğunda, miktarı günceller
        updatedData[existingItemIndex].quantity += newItem.quantity;
        updatedData[existingItemIndex].price +=
          newItem.price * newItem.quantity;
      } else {
        // Aynı isimde ürün yoksa yeni ürün olarak ekler
        updatedData.push({
          name: newItem.name,
          quantity: newItem.quantity,
          single_price: newItem.price,
          price: newItem.price * newItem.quantity,
          gelis_fiyati: newItem.gelis_fiyati,
          category: newItem.main_category,
          gender: newItem.gender,
          brand: newItem.brand,
          explanation: newItem.explanation,
        });
      }

      // Ürünün stoğunu güncelle
      const { data, error } = await supabase
        .from('products')
        .select('id, stock')
        .eq('id', newItem.id)
        .single(); // Tek bir ürünü alıyoruz

      if (error) {
        console.error('Ürün bulunamadı:', error.message);
        return;
      }

      // Stok miktarını güncelle
      if (data) {
        const newStock = data.stock - newItem.quantity;
        if (newStock >= 0) {
          const { error: updateError } = await supabase
            .from('products')
            .update({ stock: newStock })
            .eq('id', newItem.id); // Ürünün stok miktarını azalt

          if (updateError) {
            console.error('Stok güncelleme hatası:', updateError.message);
            return;
          }
        } else {
          setNotOrderOkey(true);
          setTimeout(() => {
            setNotOrderOkey(false);
          }, 1000);
          return;
        }
      }
    }

    // Güncellenmiş günlük veriyi ana veri yapısına kaydediyoruz
    existingData[today] = updatedData;

    // Güncellenmiş veriyi `localStorage`'a kaydediyoruz
    localStorage.setItem('dailySales', JSON.stringify(existingData));
    setIsOkey(true);
    setTimeout(() => {
      setIsOkey(false);
    }, 1000);
    setBasket([]); // Sepeti boşalt
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[filterType];
      if (currentValues.includes(value)) {
        return {
          ...prevFilters,
          [filterType]: currentValues.filter((item) => item !== value),
        };
      } else {
        return {
          ...prevFilters,
          [filterType]: [...currentValues, value],
        };
      }
    });
  };

  const filteredProducts = products.filter((product) => {
    const brandMatch =
      filters.brands.length === 0 || filters.brands.includes(product.brand);

    const sizeMatch =
      filters.sizes.length === 0 || filters.sizes.includes(product.size);

    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const gendersMatch =
      filters.genders.length === 0 || filters.genders.includes(product.gender);

    const genderChooseMatch =
      genderChose === '' || product.gender === genderChose;

    // **Kategoriye Göre Filtreleme**
    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.includes(product.main_category);

    // **Alt Kategoriye Göre Filtreleme**
    const subCategoryMatch =
      filters.subCategories.length === 0 ||
      filters.subCategories.includes(product.sub_category);

    return (
      brandMatch &&
      sizeMatch &&
      searchMatch &&
      gendersMatch &&
      genderChooseMatch &&
      categoryMatch &&
      subCategoryMatch
    );
  });

  useEffect(() => {
    async function getData() {
      let { data: products, error: ErrorData } = await supabase
        .from('products')
        .select('*');

      setProducts(products);

      let { data: categories, error } = await supabase
        .from('categories')
        .select('*');

      let { data: sizes, error: errorSize } = await supabase
        .from('sizes')
        .select('*');

      let { data: brands, error: errorBrand } = await supabase
        .from('brands')
        .select('*');

      let { data: subCategories, error: errorSub } = await supabase
        .from('subCategories')
        .select('*');
      setSubCategories(subCategories);

      setBrands(brands);
      setSizes(sizes);
      setCategories(categories);
    }
    getData();
  }, []);
  return (
    <Contextim.Provider
      value={{
        products,
        categories,
        sizes,
        brands,
        filteredProducts,
        subCategories,
        handleFilterChange,
        setSearch,
        saveOrderToLocalStorage,
        basket,
        setBasket,
        setDailySales,
        dailySales,
        user,
        setUser,
        setProducts,
        setCategories,
        setSizes,
        setSubCategories,
      }}
    >
      {children}
    </Contextim.Provider>
  );
}
