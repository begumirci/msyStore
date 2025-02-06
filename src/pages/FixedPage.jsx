import FixProducts from '../FixProducts';
import Headers from '../Headers';
import Filters from '../Filters';
export default function FixedPage() {
  return (
    <div>
      <div className='container'>
        <Filters />
        <FixProducts />
      </div>
    </div>
  );
}
