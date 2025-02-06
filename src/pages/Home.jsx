import Filters from '../Filters';

import Products from '../Products';

export default function Home() {
  return (
    <div>
      <div className='container'>
        <Filters />
        <Products />
      </div>
    </div>
  );
}
