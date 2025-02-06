import React, { useContext } from 'react';
import { useState } from 'react';
import { Contextim } from './helper/Provider';

export default function Filters() {
  const {
    brands,
    sizes,
    categories,
    subCategories,
    handleFilterChange,
    setSearch,
  } = useContext(Contextim);
  const [openBrand, setOpenBrand] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const genders = [
    { id: 1, name: 'Kadın' },
    { id: 2, name: 'Erkek' },
  ];

  console.log(brands);
  return (
    <div>
      <div className='filters filter-mobil capitalize'>
        <div className='search-input mobil-no'>
          <svg
            fill='#0000001A'
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            width='100'
            height='100'
            viewBox='0 0 50 50'
          >
            <path d='M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z'></path>
          </svg>
          <input
            type='text'
            placeholder='Ürün Ara'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='brand f-w'>
          <div className='header-filter'>
            <h4>Markalar</h4>
            <img
              src='/down-arrow-svgrepo-com.svg'
              alt=''
              onClick={() => setOpenBrand(!openBrand)}
            />
          </div>

          {openBrand && (
            <div className='brands'>
              {brands.map((x) => (
                <div className='product-filter' key={x.id}>
                  <input
                    type='checkbox'
                    name={x.name}
                    value={x.id}
                    onChange={(e) => handleFilterChange('brands', x.name)}
                  />
                  <span>{x.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* KATEGORİLER & ALT KATEGORİLER */}
        <div className='color f-w'>
          <div className='header-filter'>
            <h4>Kategoriler</h4>
            <img
              src='/down-arrow-svgrepo-com.svg'
              alt=''
              onClick={() => setOpenCategory(!openCategory)}
            />
          </div>

          {openCategory && (
            <div>
              {categories.map((category) => (
                <div key={category.id}>
                  {/* Ana Kategori */}
                  <div
                    className='product-filter'
                    onClick={() =>
                      setOpenSubCategory(
                        openSubCategory === category.id ? null : category.id
                      )
                    }
                  >
                    <input
                      type='checkbox'
                      name={category.name}
                      value={category.id}
                      onChange={(e) =>
                        handleFilterChange('categories', category.name)
                      }
                    />
                    <span className='cat'>{category.name}</span>
                  </div>

                  {/* Alt Kategoriler */}
                  {openSubCategory === category.id && (
                    <div style={{ paddingLeft: '20px' }}>
                      {subCategories
                        .filter((sub) => sub.main_category === category.id)
                        .map((sub) => (
                          <div
                            key={sub.main_category}
                            className='product-filter'
                          >
                            <input
                              type='checkbox'
                              name={sub.name}
                              value={sub.main_category}
                              onChange={(e) =>
                                handleFilterChange('subCategories', sub.name)
                              }
                            />
                            <span className='subCat'>{sub.name}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='size f-w'>
          <div className='header-filter'>
            <h4>Beden</h4>
            <img
              src='/down-arrow-svgrepo-com.svg'
              alt=''
              onClick={() => setOpenSize(!openSize)}
            />
          </div>

          {openSize && (
            <div className='brands'>
              {sizes.map((x) => (
                <div className='product-filter' key={x.id}>
                  <input
                    type='checkbox'
                    name={x.name}
                    value={x.id}
                    onChange={(e) => handleFilterChange('sizes', x.name)}
                  />
                  <span>{x.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='gender f-w'>
          <div className='header-filter'>
            <h4>Cinsiyet</h4>
            <img
              src='/down-arrow-svgrepo-com.svg'
              alt=''
              onClick={() => setOpenGender(!openGender)}
            />
          </div>
          {openGender && (
            <div className='brands'>
              {genders.map((x) => (
                <div className='product-filter' key={x.id}>
                  <input
                    type='checkbox'
                    name={x.name}
                    value={x.name}
                    onChange={(e) => handleFilterChange('genders', x.name)}
                  />
                  <span>{x.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
